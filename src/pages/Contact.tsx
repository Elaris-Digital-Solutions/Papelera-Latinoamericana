import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, Globe, MapPin, MessageCircle } from "lucide-react";

const initialFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=51946468146&text=Hola%20Papeler%C3%ADa%20Latinoamericana%2C%20quisiera%20coordinar%20un%20pedido.";

const Contact = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const body = `
Nombre: ${formValues.name}
Empresa: ${formValues.company}
Correo: ${formValues.email}
Teléfono: ${formValues.phone}

Mensaje:
${formValues.message}
    `;

    const mailtoLink = `mailto:ventas@palasac.com?subject=Consulta%20desde%20la%20web&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setTimeout(() => setSubmitting(false), 800);
  };

  return (
    <div className="min-h-screen bg-background" id="inicio">
      <Navbar />
      <main className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-divider bg-card/80 p-8 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Contacto corporativo
            </p>
            <h1 className="mt-4 text-4xl font-display text-ink md:text-5xl">Hablemos sobre tu pedido</h1>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground">
              Completa el formulario o utiliza los canales directos para coordinar cotizaciones, pedidos recurrentes o
              visitas a planta. Respondemos dentro del mismo día útil.
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Nombre completo
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      required
                      className="rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Empresa / RUC
                    </span>
                    <input
                      type="text"
                      name="company"
                      value={formValues.company}
                      onChange={handleChange}
                      className="rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                    />
                  </label>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Correo electrónico
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      required
                      className="rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Teléfono
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      className="rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Mensaje
                  </span>
                  <textarea
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </label>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Enviando..." : "Enviar formulario"}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>
                </div>
              </form>

              <aside className="space-y-6 rounded-3xl border border-divider bg-background/80 p-6 shadow-inner">
                {[
                  {
                    icon: Mail,
                    label: "Correo",
                    value: "ventas@palasac.com",
                    href: "mailto:ventas@palasac.com",
                  },
                  {
                    icon: Phone,
                    label: "Teléfonos",
                    value: "(01) 683-0250 / (01) 255-0567",
                    href: "tel:+5116830250",
                  },
                  {
                    icon: Phone,
                    label: "WhatsApp",
                    value: "946 468 146",
                    href: "https://api.whatsapp.com/send?phone=51946468146",
                  },
                  {
                    icon: Globe,
                    label: "Sitio web",
                    value: "www.palasac.com",
                    href: "https://www.palasac.com",
                  },
                  {
                    icon: MapPin,
                    label: "Dirección",
                    value: "Mz. U Lote 3, Urb. Huertos de Lurín, Lima",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 rounded-2xl border border-divider/50 bg-card/60 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          className="text-lg font-display text-ink hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg font-display text-ink">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

