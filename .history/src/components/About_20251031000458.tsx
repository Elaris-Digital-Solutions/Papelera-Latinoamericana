const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-background relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 49px,
            hsl(var(--divider)) 49px,
            hsl(var(--divider)) 50px
          )`
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="newspaper-border py-8 mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center text-foreground mb-4">
              Nuestra Empresa
            </h2>
          </div>

          <div className="space-y-8 font-body text-lg leading-relaxed">
            <p className="text-foreground first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-primary">
              Las servilletas y papel CLASICA son marcas BANDERA, contamos con con más de 25 años de historia y experiencia produciendo y comercializando productos de alta calidad, reconocidos en el mercado peruano como productos y diseños para el negocio y hogar.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-card p-6 vintage-shadow border-l-4 border-primary">
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  Nuestra Misión
                </h3>
                <p className="text-muted-foreground">
                  Fabricamos y diseñamos servilletas cortadas, dobladas, impresas, papel higiénico y papel toalla, institucional y ecológico, empleando en su elaboración solo insumos de alta calidad y totalmente atóxicos (Papel de fibra de bagazo de caña y tintas orgánicas), abasteciendo así al mercado nacional e internacional.
                </p>
              </div>

              <div className="bg-card p-6 vintage-shadow border-l-4 border-primary">
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  Nuestra Visión
                </h3>
                <p className="text-muted-foreground">
                  Trabajamos para que nuestros productos se conviertan en sus principales aliados en su institución o empresa, en sus eventos especiales y ser parte de cada uno de sus días.
                </p>
              </div>
            </div>

            <p className="text-foreground">
              Tenemos atención a todos los departamentos y ciudades a nivel nacional. Contáctanos y te aseguraremos al ejecutivo de ventas responsable de tu región para coordinar la mecánica de pedido y despacho para poder atenderlos.
            </p>

            <div className="bg-accent/30 p-8 my-8 border-t-2 border-b-2 border-primary">
              <p className="text-xl font-display italic text-center text-foreground">
                "La calidad nunca pasa de moda. Cada rollo de papel que distribuimos lleva consigo décadas de experiencia y nuestro compromiso con la excelencia."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
