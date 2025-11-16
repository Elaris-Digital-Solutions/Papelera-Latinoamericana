import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="flex items-start">
            <img src="/assets/logo.png" alt="Papelera Latinoamericana" className="h-10 w-auto mr-4 object-contain" />
            <div>
              <h3 className="text-lg font-bold text-primary mb-4 sr-only">Papelera Latinoamericana</h3>
              <p className="text-sm text-muted-foreground">
                25 años de experiencia fabricando papel institucional, papel toalla y servilletas de la más alta calidad.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/historia"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Nuestra Historia
                </Link>
              </li>
              <li>
                <Link
                  to="/mision-vision"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Misión y Visión
                </Link>
              </li>
              <li>
                <Link
                  to="/cobertura"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cobertura
                </Link>
              </li>
              <li>
                <Link
                  to="/productos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Canales Oficiales
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Teléfonos</p>
                  <p className="text-sm text-muted-foreground">
                    <a href="tel:+5116830250" className="hover:text-primary">(01) 683-0250</a>, <a href="tel:+5112550567" className="hover:text-primary">(01) 255-0567</a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <a href="tel:+51946468146" className="hover:text-primary">946 468 146</a>
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">
                    <a href="mailto:ventas@palasac.com" className="hover:text-primary">ventas@palasac.com</a>
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Dirección</p>
                  <p className="text-sm text-muted-foreground">
                    <a href="https://www.google.com/maps/place/PAPELERA+LATINOAMERICANA/@-12.2556131,-76.8908834,18.67z/data=!4m14!1m7!3m6!1s0x9105bd0fe5e983bd:0x8648870348814a69!2sPAPELERA+LATINOAMERICANA!8m2!3d-12.2556866!4d-76.8900134!16s%2Fg%2F11h6h1_yk7!3m5!1s0x9105bd0fe5e983bd:0x8648870348814a69!8m2!3d-12.2556866!4d-76.8900134!16s%2Fg%2F11h6h1_yk7?entry=ttu&g_ep=EgoyMDI1MTExMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      Mz. U Lote 3 Urb. Huertos de Lurín
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Papelera Latinoamericana. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;