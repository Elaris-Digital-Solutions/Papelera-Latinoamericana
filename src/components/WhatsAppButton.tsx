import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=51946468146&text=Hola%20Papeler%C3%ADa%20Latinoamericana%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20productos.";

const WhatsAppButton = () => {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold uppercase tracking-[0.3em] text-white shadow-xl transition hover:bg-green-600 hover:-translate-y-0.5"
      aria-label="Escribenos por WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
};

export default WhatsAppButton;

