import ClientMarquee from "@/components/ClientMarquee";
import Testimonials from "@/components/Testimonials";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import clientsHeroImg from "@/assets/pop.jpg";

const Clients = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        eyebrow="Our Clients"
        title="Our Clients"
        subtitle="Trusted by leading organizations worldwide"
        image={clientsHeroImg}
        imageAlt="Proton Security officers at a client site"
      />

      {/* Client Logos Marquee */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Trusted By Industry Leaders</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're proud to serve a growing list of corporate clients across diverse industries
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <ClientMarquee />
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Clients;
