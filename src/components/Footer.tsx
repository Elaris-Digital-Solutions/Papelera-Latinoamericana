import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Globe, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=51946468146&text=Hola%20Papeler%C3%ADa%20Latinoamericana%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20productos.";

  return (
    <footer id="contacto" className="bg-ink text-paper py-16 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <img src={logo} alt="Papelería Latinoamericana" className="h-16 w-auto mb-6 brightness-0 invert" />
            <p className="font-body text-paper/80 leading-relaxed mb-6">
              En Papelería Latinoamericana SAC, ofrecemos productos de alta calidad, brindándoles a nuestros clientes la mejor garantía e innovación.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-paper hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-paper hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-paper hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-display font-bold mb-6 border-b border-paper/30 pb-2">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3 font-body">
              <li>
                <a href="#inicio" className="text-paper/80 hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#productos" className="text-paper/80 hover:text-primary transition-colors">
                  Productos
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-paper/80 hover:text-primary transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-paper/80 hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-display font-bold mb-6 border-b border-paper/30 pb-2">
              Contacto
            </h3>
            <ul className="space-y-4 font-body">
              <li className="flex items-start gap-3">
                <Mail size={20} className="mt-1 text-primary flex-shrink-0" />
                <span className="text-paper/80">ventas@palasac.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-1 text-primary flex-shrink-0" />
                <span className="text-paper/80">
                  (01) 683-0250 / (01) 255-0567 <br />
                  946 468 146
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={20} className="mt-1 text-primary flex-shrink-0" />
                <a href="https://www.palasac.com" target="_blank" rel="noreferrer" className="text-paper/80 hover:text-primary transition-colors">
                  www.palasac.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 text-primary flex-shrink-0" />
                <span className="text-paper/80">Mz. U Lote 3, Urb. Huertos de Lurín, Lima</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={20} className="mt-1 text-primary flex-shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-paper/80 hover:text-primary transition-colors">
                  Escríbenos por WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-paper/20 pt-8 text-center">
          <p className="text-paper/60 font-body text-sm">
            &copy; {new Date().getFullYear()} Papelería Latinoamericana. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
