import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center py-16 md:py-28"
      style={{ backgroundImage: "url('/assets/Imagen_hero.png')" }}
    >
      {/* Overlay gradient dark bluish */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-sky-900/50 z-10" />

      {/* Contenedor del contenido con z-index encima del overlay */}
      <div className="relative z-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-12 md:py-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
              Papelera Latinoamericana
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-100 mb-3">
              25 años fabricando calidad para el Perú
            </p>

            <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Líderes en la fabricación de papel institucional, papel toalla y servilletas. Distribución
              nacional con la confianza de miles de clientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/productos">
                <button className="bg-sky-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-sky-700 transition">
                  Ver Productos
                </button>
              </Link>

              <Link to="/contacto">
                <button className="bg-transparent border border-white/80 text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-sky-900 transition">
                  Contactar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;