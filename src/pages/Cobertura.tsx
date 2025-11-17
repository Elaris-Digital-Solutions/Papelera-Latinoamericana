import { MapPin, Truck, Package, Shield } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInUpItem,
  scaleIn,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";

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
      <motion.section
        className="relative h-screen min-h-[640px] overflow-hidden"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-sky-900/50 z-10"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4 z-20">
          <motion.div className="max-w-4xl" variants={staggerContainer} initial="hidden" animate="show">
            <motion.h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" variants={fadeInUpItem}>
              Cobertura Nacional
            </motion.h1>
            <motion.p className="text-lg text-slate-100" variants={fadeInUpItem}>
              Presencia en todo el Perú, llevando calidad y confianza a cada rincón del país
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

         

          {/* Regions Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
            {regions.map((region, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                variants={fadeInUpItem}
                custom={index}
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
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
            <motion.div className="text-center" variants={scaleIn}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Distribución Rápida
              </h3>
              <p className="text-muted-foreground">
                Entregas oportunas en todo el territorio nacional con nuestra red logística.
              </p>
            </motion.div>

            <motion.div className="text-center" variants={scaleIn}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Stock Garantizado
              </h3>
              <p className="text-muted-foreground">
                Disponibilidad permanente de todos nuestros productos en almacenes regionales.
              </p>
            </motion.div>

            <motion.div className="text-center" variants={scaleIn}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Calidad Asegurada
              </h3>
              <p className="text-muted-foreground">
                Productos que mantienen su calidad desde la fábrica hasta tu negocio.
              </p>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 bg-primary rounded-lg p-8 md:p-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Necesitas distribución en tu región?
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Contáctanos y te conectamos con nuestro distribuidor más cercano
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/contacto"
                className="inline-block bg-sky-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-sky-700 transition"
              >
                Contactar Ahora
              </a>

              <a
                href="/assets/CATALOGO-PALASAC-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-transparent border border-white/80 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-sky-900 transition"
                download
              >
                Descargar Catálogo
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cobertura;