import { Target, Eye, Compass, Award, Shield, Zap } from "lucide-react";

const MisionVision = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[640px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-sky-900/50 z-10"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4 z-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Misión y Visión
            </h1>
            <p className="text-lg text-slate-100">
              Los principios que guían nuestro camino hacia la excelencia
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

          <div className="space-y-12">
            {/* Misión y Visión Section */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Misión y Visión</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Nuestra razón de ser y la dirección hacia la que trabajamos cada día.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="bg-card border border-border rounded-lg p-8 md:p-12">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center text-foreground mb-4">Misión</h3>
                  <div className="text-center text-lg text-muted-foreground leading-relaxed">
                    Fabricamos y diseñamos servilletas cortadas, dobladas, impresas, papel higiénico y papel toalla,
                    institucional y ecológico, empleando en su elaboración solo insumos de alta calidad y totalmente
                    atóxicos (Papel de fibra de bagazo de caña y tintas orgánicas), abasteciendo así al mercado
                    nacional e internacional.
                  </div>
                </article>

                <article className="bg-card border border-border rounded-lg p-8 md:p-12">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center text-foreground mb-4">Visión</h3>
                  <div className="text-center text-lg text-muted-foreground leading-relaxed">
                    Fabricamos y diseñamos servilletas cortadas, dobladas, impresas, papel higiénico y papel toalla,
                    institucional y ecológico, empleando en su elaboración solo insumos de alta calidad y totalmente
                    atóxicos (Papel de fibra de bagazo de caña y tintas orgánicas), abasteciendo así al mercado
                    nacional e internacional.
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Nuestros Valores Section (separate) */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Nuestros Valores</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Principios que definen nuestra forma de trabajo y compromiso con clientes y colaboradores.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Award className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Calidad</h3>
                <p className="text-slate-600 leading-relaxed">Productos que cumplen los más altos estándares de fabricación.</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Shield className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Confianza</h3>
                <p className="text-slate-600 leading-relaxed">25 años respaldando a nuestros clientes en todo el Perú.</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Zap className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Innovación</h3>
                <p className="text-slate-600 leading-relaxed">Mejorando continuamente nuestros procesos y productos.</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4 mx-auto">
                  <Compass className="h-7 w-7 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Responsabilidad</h3>
                <p className="text-slate-600 leading-relaxed">Comprometidos con el medio ambiente y el desarrollo sostenible.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MisionVision;