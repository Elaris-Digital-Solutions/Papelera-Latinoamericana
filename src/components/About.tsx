import { Mail, Phone, MapPin, Globe, MessageCircle } from "lucide-react";
import galleryOne from "@/assets/page_2_image_1.jpeg";
import galleryTwo from "@/assets/page_2_image_2.jpeg";
import galleryThree from "@/assets/page_2_image_3.jpeg";
import warehouse from "@/assets/page_9_image_1.jpeg";
import mapPeru from "@/assets/MAPA-PERU.jpeg";

const About = () => {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=51946468146&text=Hola%20Papeler%C3%ADa%20Latinoamericana%2C%20me%20gustar%C3%ADa%20coordinar%20una%20cita.";

  return (
    <section id="nosotros" className="relative bg-background py-24">
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 49px,
              hsl(var(--divider)) 49px,
              hsl(var(--divider)) 50px
            )`,
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 space-y-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Sobre Nosotros
          </p>
          <h2 className="mt-4 text-4xl font-display text-ink md:text-5xl">
            Historia, misión y cobertura que respaldan cada entrega
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Las servilletas y papel CLÁSICA pertenecen a Papelera Latinoamericana
            SAC, empresa peruana con más de 25 años fabricando y comercializando
            productos de alta calidad reconocidos en todo el país para negocios y
            hogares.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <article className="rounded-3xl border border-divider bg-card/90 p-8 shadow-lg">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Nuestra Historia
            </span>
            <h3 className="mt-6 text-3xl font-display text-ink">
              Más de dos décadas produciendo confianza
            </h3>
            <p className="mt-4 text-base text-muted-foreground">
              Desde Lima, abastecemos al mercado peruano con productos y diseños
              pensados para la operación diaria. Hemos perfeccionado procesos de
              impresión, corte y doblado que garantizan abastecimiento continuo a
              retailers, hoteles, caterings y negocios independientes.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { label: "Años de experiencia", value: "+25" },
                { label: "Cobertura", value: "Todo el Perú" },
                { label: "Líneas activas", value: "Papel & servilletas" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-divider/60 bg-background/70 p-4 text-center">
                  <dt className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-display text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <div className="grid gap-4">
            {[galleryOne, warehouse, galleryTwo, galleryThree].map((image, index) => (
              <div
                key={index}
                className="h-40 w-full overflow-hidden rounded-3xl border border-divider bg-muted shadow-sm"
              >
                <img
                  src={image}
                  alt="Instalaciones de Papelera Latinoamericana"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <article className="rounded-3xl border-l-4 border-primary bg-card p-8 shadow-md">
            <h3 className="text-2xl font-display text-ink">Nuestra Misión</h3>
            <p className="mt-4 text-base text-muted-foreground">
              Fabricamos y diseñamos servilletas cortadas, dobladas, impresas, papel
              higiénico y papel toalla — institucionales y ecológicos — empleando
              insumos de alta calidad y totalmente atóxicos como papel de fibra de
              bagazo de caña y tintas orgánicas, atendiendo al mercado nacional e
              internacional.
            </p>
          </article>

          <article className="rounded-3xl border-l-4 border-primary bg-card p-8 shadow-md">
            <h3 className="text-2xl font-display text-ink">Nuestra Visión</h3>
            <p className="mt-4 text-base text-muted-foreground">
              Trabajamos para que nuestros productos se conviertan en aliados
              esenciales para tu institución, empresa o eventos especiales y
              acompañen cada día de tus operaciones.
            </p>
          </article>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <article className="rounded-3xl border border-divider bg-card/90 p-8 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Cobertura a nivel nacional
                </span>
                <h3 className="mt-2 text-3xl font-display text-ink">Atención en cada región</h3>
              </div>
              <a
                href="/contacto"
                className="rounded-full border border-primary px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Contáctanos
              </a>
            </div>
            <p className="mt-6 text-base text-muted-foreground">
              Coordinamos pedidos y despachos con ejecutivos asignados por región para
              asegurar abastecimiento constante y soporte cercano. Nuestra logística
              cubre departamentos y ciudades en toda la geografía peruana.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <span>Equipo comercial descentralizado para cada macroregión.</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <span>Coordinación directa para pedidos recurrentes y urgentes.</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="mt-1 h-5 w-5 text-primary" />
                <span>Atención nacional con alianzas logísticas estratégicas.</span>
              </li>
            </ul>
          </article>

          <div className="rounded-3xl border border-divider bg-muted/50 p-6 shadow-inner">
            <img
              src={mapPeru}
              alt="Cobertura a nivel nacional"
              className="h-full w-full rounded-2xl object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid gap-6 rounded-3xl border border-divider bg-card/95 p-8 shadow-lg md:grid-cols-[1.2fr,0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Contacto directo
            </p>
            <h3 className="mt-3 text-3xl font-display text-ink">Canales oficiales</h3>
            <p className="mt-4 text-base text-muted-foreground">
              Escríbenos o programa una videollamada para revisar catálogos, precios y
              cronogramas de entrega. Respondemos dentro del mismo día útil.
            </p>
            <dl className="mt-6 space-y-4 text-base text-foreground">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Email comercial
                  </dt>
                  <dd className="font-semibold">ventas@palasac.com</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Central telefónica
                  </dt>
                  <dd className="font-semibold">(01) 683-0250 / (01) 255-0567</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    WhatsApp comercial
                  </dt>
                  <dd className="font-semibold">946 468 146</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Web corporativa
                  </dt>
                  <dd className="font-semibold">www.palasac.com</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-primary/30 bg-primary/5 p-6 text-primary">
            <p className="text-sm uppercase tracking-[0.35em]">Agenda rápida</p>
            <p className="text-base text-primary/90">
              Gestiona pedidos a través de WhatsApp Business y recibe confirmaciones
              inmediatas del equipo comercial.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground shadow-lg transition hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Escribir formulario
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
