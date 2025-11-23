interface CloudinaryUploadResponse {
  secure_url: string;
  url?: string;
  public_id?: string;
  error?: {
    message?: string;
  };
}

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const folder = import.meta.env.VITE_CLOUDINARY_FOLDER ?? "PALASAC";
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

const missingConfig: string[] = [];
if (!cloudName) missingConfig.push("VITE_CLOUDINARY_CLOUD_NAME");
if (!uploadPreset) missingConfig.push("VITE_CLOUDINARY_UPLOAD_PRESET");

const cloudinaryUploadUrl = cloudName
  ? `https://api.cloudinary.com/v1_1/${cloudName}/upload`
  : null;

export async function uploadProductImage(file: File): Promise<string> {
  if (missingConfig.length > 0 || !cloudinaryUploadUrl) {
    throw new Error(
      `Cloudinary no está configurado correctamente. Falta(n): ${missingConfig.join(", ")}`
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset!);
  if (folder) {
    formData.append("folder", folder);
  }

  const response = await fetch(cloudinaryUploadUrl, {
    method: "POST",
    body: formData,
  });

  const payload = (await response.json()) as CloudinaryUploadResponse;

  if (!response.ok || !payload.secure_url) {
    const message = payload.error?.message ?? "No se pudo subir la imagen a Cloudinary";
    throw new Error(message);
  }

  return payload.secure_url;
}

const destroyMissingConfig: string[] = [];
if (!cloudName) destroyMissingConfig.push("VITE_CLOUDINARY_CLOUD_NAME");
if (!apiKey) destroyMissingConfig.push("VITE_CLOUDINARY_API_KEY");
if (!apiSecret) destroyMissingConfig.push("VITE_CLOUDINARY_API_SECRET");

const cloudinaryDestroyUrl = cloudName
  ? `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`
  : null;

const textEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

async function sha1Hex(input: string): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle || !textEncoder) {
    throw new Error("El navegador no soporta la API de criptografía necesaria para firmar la solicitud");
  }
  const data = textEncoder.encode(input);
  const hashBuffer = await subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function generateSignature(params: Record<string, string>): Promise<string> {
  const sortedKeys = Object.keys(params).sort();
  const base = sortedKeys
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  if (!apiSecret) {
    throw new Error("Falta VITE_CLOUDINARY_API_SECRET para firmar la solicitud");
  }
  return sha1Hex(`${base}${apiSecret}`);
}

export function extractCloudinaryPublicId(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const uploadIndex = parts.findIndex((segment) => segment === "upload");
    if (uploadIndex === -1) return null;
    const rawSegments = parts.slice(uploadIndex + 1);

    let index = 0;
    while (index < rawSegments.length) {
      const segment = rawSegments[index];
      if (!segment) {
        index++;
        continue;
      }
      if (segment.includes(",")) {
        // Transformation chunk, skip it
        index++;
        continue;
      }
      if (/^v\d+$/.test(segment)) {
        // Version marker, skip and keep going
        index++;
        continue;
      }
      break;
    }

    const resourceParts = rawSegments.slice(index);
    if (resourceParts.length === 0) return null;

    const lastPart = resourceParts.pop()!;
    const withoutExtension = lastPart.replace(/\.[^.]+$/, "");
    resourceParts.push(withoutExtension);

    return resourceParts.join("/");
  } catch {
    return null;
  }
}

export async function deleteCloudinaryAssetByPublicId(publicId: string): Promise<"ok" | "not found"> {
  if (destroyMissingConfig.length > 0 || !cloudinaryDestroyUrl || !apiKey || !apiSecret) {
    throw new Error(
      `Cloudinary (destroy) no está configurado correctamente. Falta(n): ${destroyMissingConfig.join(", ")}`
    );
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign: Record<string, string> = {
    invalidate: "true",
    public_id: publicId,
    timestamp,
  };

  const signature = await generateSignature(paramsToSign);
  const body = new URLSearchParams({
    ...paramsToSign,
    api_key: apiKey,
    signature,
  });

  const response = await fetch(cloudinaryDestroyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const payload = (await response.json()) as { result?: string; error?: { message?: string } };

  if (!response.ok) {
    const message = payload.error?.message ?? "No se pudo eliminar la imagen en Cloudinary";
    throw new Error(message);
  }

  const result = payload.result ?? "error";
  if (result !== "ok" && result !== "not found") {
    throw new Error(payload.error?.message ?? `Cloudinary retornó: ${result}`);
  }

  return result as "ok" | "not found";
}

export async function deleteCloudinaryAssetByUrl(imageUrl: string): Promise<void> {
  const publicId = extractCloudinaryPublicId(imageUrl);
  if (!publicId) return;
  await deleteCloudinaryAssetByPublicId(publicId);
}
