import { Clock, TrendingUp, Heart } from "lucide-react";

const Historia = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[640px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-sky-900/50 z-10"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4 z-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Nuestra Historia
            </h1>
            <p className="text-lg text-slate-100">
              25 años construyendo confianza y calidad en el mercado peruano
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          <div className="space-y-12">
            {/* Timeline Item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary"></div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">1999 - Los Inicios</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Papelera Latinoamericana nace con una visión clara: fabricar productos de papel 
                  de alta calidad para el mercado peruano. Con un pequeño equipo y gran determinación, 
                  comenzamos nuestra operación en Lima, enfocándonos en papel institucional para 
                  empresas y negocios.
                </p>
              </div>
            </div>

            {/* Timeline Item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary"></div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">2005-2015 - Expansión</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Durante esta década, expandimos nuestra línea de productos para incluir papel toalla 
                  y servilletas de diversas categorías. Ampliamos nuestra capacidad de producción y 
                  establecimos una red de distribución que cubre todo el territorio nacional. 
                  Nuestros productos comenzaron a llegar a hoteles, restaurantes y hogares en cada 
                  región del Perú.
                </p>
              </div>
            </div>

            {/* Timeline Item */}
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary"></div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">2024 - 25 Años de Confianza</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Hoy celebramos 25 años de trayectoria, siendo una de las empresas más confiables 
                  del rubro en el Perú. Con más de 100 productos en nuestro catálogo, desde papel 
                  institucional hasta servilletas para eventos especiales, servimos a miles de clientes 
                  en todo el país. Nuestro compromiso con la calidad, innovación y servicio se mantiene 
                  tan firme como el primer día.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg bg-secondary">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Años de Experiencia</div>
            </div>
            <div className="p-6 rounded-lg bg-secondary">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Productos</div>
            </div>
            <div className="p-6 rounded-lg bg-secondary">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Clientes Satisfechos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historia;