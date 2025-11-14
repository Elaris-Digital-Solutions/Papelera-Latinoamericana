import { MapPin, Truck, Package, Shield } from "lucide-react";

const Cobertura = () => {
  const regions = [
    { name: "Lima y Callao", description: "Distribución diaria en toda la capital" },
    { name: "Costa Norte", description: "Piura, Tumbes, Lambayeque, La Libertad" },
    { name: "Costa Sur", description: "Ica, Arequipa, Moquegua, Tacna" },
    { name: "Sierra Central", description: "Junín, Pasco, Huánuco, Huancavelica" },
    { name: "Sierra Sur", description: "Cusco, Apurímac, Ayacucho, Puno" },
    { name: "Selva", description: "Loreto, Ucayali, San Martín, Amazonas" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Cobertura Nacional
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Presencia en todo el Perú, llevando calidad y confianza a cada rincón del país
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

          {/* Map Illustration */}
          <div className="mb-16 bg-gradient-subtle rounded-lg p-8 md:p-12 border border-border">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-64 h-80 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-32 w-32 text-primary" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
                  <Truck className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <p className="text-center text-xl font-semibold text-foreground">
              Distribución en las 25 regiones del Perú
            </p>
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {regions.map((region, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {region.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {region.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Distribución Rápida
              </h3>
              <p className="text-muted-foreground">
                Entregas oportunas en todo el territorio nacional con nuestra red logística.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Stock Garantizado
              </h3>
              <p className="text-muted-foreground">
                Disponibilidad permanente de todos nuestros productos en almacenes regionales.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Calidad Asegurada
              </h3>
              <p className="text-muted-foreground">
                Productos que mantienen su calidad desde la fábrica hasta tu negocio.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-primary rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Necesitas distribución en tu región?
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Contáctanos y te conectamos con nuestro distribuidor más cercano
            </p>
            <a
              href="/contacto"
              className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors"
            >
              Contactar Ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cobertura;