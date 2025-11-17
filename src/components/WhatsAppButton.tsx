import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare, Phone } from "lucide-react";
import { getProductBySlug } from "@/data/products";

const PHONE_NUMBER = "51946468146"; // +51 946 468 146 -> wa.me needs country code without +

const encode = (s: string) => encodeURIComponent(s);

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // detect product slug if on a product page: /productos/:slug
  const pathParts = location.pathname.split("/").filter(Boolean);
  let productSlug: string | null = null;
  if (pathParts[0] === "productos" && pathParts[1]) {
    productSlug = pathParts[1];
  }

  const product = productSlug ? getProductBySlug(productSlug) : undefined;

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
            <path fill="currentColor" d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.372 0 0 5.373 0 12c0 2.115.553 4.088 1.605 5.854L0 24l6.438-1.634A11.948 11.948 0 0 0 12 24c6.628 0 12-5.373 12-12 0-3.207-1.25-6.208-3.48-8.52zM12 21.5c-1.592 0-3.158-.372-4.57-1.077l-.328-.164-3.827.972.98-3.728-.214-.361A9.484 9.484 0 0 1 2.5 12C2.5 6.753 6.753 2.5 12 2.5S21.5 6.753 21.5 12 17.247 21.5 12 21.5z" />
            <path fill="currentColor" d="M17.56 14.03c-.3-.15-1.77-.87-2.04-.97s-.46-.15-.65.15-.74.97-.9 1.17c-.16.2-.31.22-.57.07-.26-.15-1.1-.41-2.1-1.3-.78-.69-1.3-1.55-1.45-1.81-.15-.26-.02-.4.12-.54.12-.12.26-.31.39-.47.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.46-.07-.15-.65-1.57-.89-2.15-.24-.56-.48-.48-.66-.49l-.56-.01c-.19 0-.5.07-.76.37s-1 1-1 2.44 1.03 2.83 1.17 3.03c.15.2 2.03 3.1 4.92 4.35 1.13.49 2.01.78 2.7 1. ." />
          </svg>
        </button>
      </div>
    </div>
  );
}
