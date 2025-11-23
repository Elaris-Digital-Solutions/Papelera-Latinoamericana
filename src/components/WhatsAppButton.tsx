import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare, Phone } from "lucide-react";
import { useProductQuery } from "@/hooks/useProducts";

const PHONE_NUMBER = "51946468146"; // +51 946 468 146 -> wa.me needs country code without +

const encode = (s: string) => encodeURIComponent(s);

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const isAdminRoute = pathParts[0] === "admin";

  // detect product slug if on a product page: /productos/:slug
  let productSlug: string | null = null;
  if (pathParts[0] === "productos" && pathParts[1]) {
    productSlug = pathParts[1];
  }
  const { data: product } = useProductQuery(productSlug ?? undefined);

  if (isAdminRoute) return null;

  const productMessage = product
    ? `Hola! Estoy interesado en el producto *${product.name}* (ref: ${product.slug}). ¿Me podrían indicar precio y disponibilidad? Gracias.`
    : `Hola! Quisiera recibir más información sobre sus productos y precios. Gracias.`;

  const generalMessage = `Hola! Me gustaría recibir asesoría sobre sus productos y cotizaciones. Gracias.`;

  const waLink = (text: string) => `https://wa.me/${PHONE_NUMBER}?text=${encode(text)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-3">
        {open && (
          <div className="flex flex-col items-end">
            <a
              href={waLink(productMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full shadow-lg hover:shadow-2xl transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              {product ? "Consultar producto" : "Realizar Cotización"}
            </a>

            <a
              href={waLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full shadow-lg hover:shadow-2xl transition"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              Contacto general
            </a>
          </div>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="Chat por WhatsApp"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7">
            <path
              fill="currentColor"
              d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.372 0 0 5.373 0 12c0 2.115.553 4.088 1.605 5.854L0 24l6.438-1.634A11.948 11.948 0 0 0 12 24c6.628 0 12-5.373 12-12 0-3.207-1.25-6.208-3.48-8.52zM12 21.5c-1.592 0-3.158-.372-4.57-1.077l-.328-.164-3.827.972.98-3.728-.214-.361A9.484 9.484 0 0 1 2.5 12C2.5 6.753 6.753 2.5 12 2.5S21.5 6.753 21.5 12 17.247 21.5 12 21.5z"
            />
            <path
              fill="currentColor"
              d="M17.472 14.382c-.297-.148-1.758-.867-2.03-.966-.273-.099-.472-.148-.672.148-.198.297-.77.966-.944 1.164-.173.198-.347.223-.644.074-.297-.148-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.148-.672-1.611-.921-2.205-.242-.579-.487-.5-.672-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.214 3.074c.148.198 2.096 3.2 5.077 4.487.709.306 1.26.489 1.69.625.71.226 1.355.194 1.865.118.569-.085 1.758-.719 2.006-1.414.248-.695.248-1.29.173-1.414-.074-.124-.273-.198-.57-.347z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
