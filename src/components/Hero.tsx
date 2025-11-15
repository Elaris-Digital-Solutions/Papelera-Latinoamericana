import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center py-20 md:py-32"
      style={{ backgroundImage: "url('/assets/Imagen_hero.png')" }}
    >
        {/* Contenedor del contenido (sin overlay) */}
        <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Título con sombra sutil para mejorar legibilidad sobre la imagen */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.45)" }}
          >
            Papelera Latinoamericana
          </h1>
          {/* Párrafo principal con ligera sombra para mejor contraste */}
          <p
            className="text-xl md:text-2xl text-black mb-4"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}
          >
            25 años fabricando calidad para el Perú
          </p>
          {/* Descripción con sombra ligera; se mantiene responsividad y posición */}
          <p
            className="text-lg text-black mb-8 max-w-2xl mx-auto"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}
          >
            Líderes en la fabricación de papel institucional, papel toalla y servilletas. 
            Distribución nacional con la confianza de miles de clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/productos">
              {/* Botón: fondo inicial igual a `text-primary` del footer (usamos `bg-primary`),
                  texto en blanco por contraste. Al hacer hover: texto y borde negros. */}
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-primary text-black border-transparent hover:bg-transparent hover:text-black transition-colors duration-200"
              >
                Ver Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contacto">
              {/* Botón: fondo inicial igual a `text-primary` del footer; hover cambia texto y borde a negro */}
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-primary text-black border-transparent hover:bg-transparent hover:text-black transition-colors duration-200"
              >
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative wave removed to allow background image to fill the hero */}
    </section>
  );
};

export default Hero;