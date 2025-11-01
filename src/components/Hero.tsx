import heroImage from "@/assets/hero-stationery.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[600px] md:min-h-[700px] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${heroImage})` 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="border-l-4 border-primary pl-6 mb-8">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 leading-tight font-sans-condensed uppercase">
              Soluciones de Papel para Negocios que Exigen Calidad
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-body leading-relaxed font-sans-condensed uppercase">
              Más de 25 años ofreciendo papel higiénico, servilletas y productos de papel con la suavidad y resistencia que mereces.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold tracking-wide uppercase text-base font-sans-condensed"
            >
              Ver Productos
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-body font-semibold tracking-wide uppercase text-base bg-transparent font-sans-condensed"
            >
              Conocer Más
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
