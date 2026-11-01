import { services } from "@/data/services";
import { clientLogos } from "@/data/clients";  // New: Import your clients data
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Services = () => {
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...clientLogos, ...clientLogos];  

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AnimatedSection>
            <div className="inline-block bg-highlight/10 text-highlight px-4 py-1 rounded-full text-sm font-semibold mb-5">
              OUR SERVICES
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight mb-6">
              Security built around the way you operate
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              From corporate sites to high-profile events, we combine trained personnel, technology and
              intelligence to deliver protection tailored to your organisation.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <img
              src={services[0].image}
              alt="Proton Security officer on duty"
              className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Services: alternating left/right rows */}
      <section className="pb-20 md:pb-28 bg-white">
        <div className="container-custom space-y-20 md:space-y-28">
          {services.map((service, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-28"
              >
                <AnimatedSection className={reversed ? "lg:order-2" : ""}>
                  <div className="overflow-hidden rounded-3xl shadow-lg group">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={150} className={reversed ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl font-bold text-highlight/80 leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                      <service.icon className="text-highlight" size={24} />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="text-highlight flex-shrink-0 mt-1" size={18} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button className="btn-highlight">
                      Request this service <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                </AnimatedSection>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 bg-background border-t border-gray-200">  {/* Straight line divider */}
        <div className="container-custom">
          <AnimatedSection delay={0}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary">Our Esteemed Clients</h3>
              <p className="text-gray-600 mt-2">Trusted by leading organizations worldwide</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="marquee-container overflow-hidden rounded-lg bg-white py-4">  {/* White background */}
              <div className="marquee-content flex items-center gap-20 px-4">  {/* Removed invalid h-50; seamless flex line */}
                {duplicatedLogos.map((logo) => {
                  // No shadows, no extra styling: Logos blend directly with white container
                  const logoContainerClass = "flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center";
                  
                  return (
                    <div
                      key={logo.id}
                      className={logoContainerClass}
                    >
                      <img
                        src={logo.image}  // Fixed: Use logo.src (not image)
                        alt={logo.alt}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        title={logo.name}  // Tooltip on hover
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section - Moved to Last Position */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <Card className="bg-gradient-to-r from-primary to-accent text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Need a Custom Security Solution?</h2>
                <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
                  Let's discuss your specific security requirements and create a tailored solution
                </p>
                <Link to="/contact">
                  <Button size="lg" className="btn-highlight text-lg px-8">
                    Contact Our Team
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Services;
