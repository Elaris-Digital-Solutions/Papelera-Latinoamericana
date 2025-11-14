import { Target, Eye, Compass } from "lucide-react";

const MisionVision = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Misión y Visión
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Los principios que guían nuestro camino hacia la excelencia
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          <div className="space-y-12">
            {/* Misión */}
            <div className="bg-card border border-border rounded-lg p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-center text-foreground mb-6">
                Nuestra Misión
              </h2>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">
                Fabricar y distribuir productos de papel de la más alta calidad, ofreciendo 
                soluciones integrales que satisfagan las necesidades de nuestros clientes en 
                todo el Perú. Nos comprometemos a mantener estándares de excelencia en cada 
                etapa de producción, desde la selección de materias primas hasta la entrega 
                final, contribuyendo al desarrollo de nuestros colaboradores y al crecimiento 
                sostenible de nuestra comunidad.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-card border border-border rounded-lg p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-center text-foreground mb-6">
                Nuestra Visión
              </h2>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">
                Ser reconocidos como la empresa líder en la fabricación de papel institucional, 
                papel toalla y servilletas en el Perú, destacándonos por nuestra innovación 
                constante, calidad superior y compromiso con el medio ambiente. Aspiramos a 
                expandir nuestra presencia en el mercado latinoamericano, manteniendo nuestra 
                esencia de empresa peruana comprometida con la excelencia y el servicio al cliente.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-gradient-primary rounded-lg p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Compass className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-center text-white mb-8">
                Nuestros Valores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Calidad</h3>
                  <p className="text-white/90">
                    Compromiso inquebrantable con la excelencia en cada producto que fabricamos.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Integridad</h3>
                  <p className="text-white/90">
                    Actuamos con transparencia y honestidad en todas nuestras relaciones comerciales.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Innovación</h3>
                  <p className="text-white/90">
                    Mejoramos continuamente nuestros procesos y productos para servir mejor.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Responsabilidad</h3>
                  <p className="text-white/90">
                    Comprometidos con el medio ambiente y el desarrollo sostenible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisionVision;