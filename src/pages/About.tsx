import { Shield, Target, Eye, Heart, Globe, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import boardImage from "@/assets/board-meeting.jpg";
import img333 from "@/assets/IMG_2174 2.jpg";
import img2228 from "@/assets/IMG_2228.jpg";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Excellence",
      description: "Committed to the highest standards in every aspect of our service delivery"
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Building trust through transparent and ethical practices"
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Leveraging cutting-edge technology and modern security solutions"
    },
    {
      icon: Award,
      title: "Professionalism",
      description: "Maintaining the highest level of professional conduct and expertise"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary via-accent to-primary text-white">
        <div className="container-custom px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">About Proton Security</h1>
              <p className="text-xl text-gray-200">
                Leading the industry in comprehensive security solutions with over 25 years of excellence
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <Card className="h-full bg-gradient-to-br from-primary to-accent text-white">
                <CardContent className="p-8">
                  <Eye size={48} className="text-highlight mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                  <p className="text-lg leading-relaxed">
                    To be the global leader in security solutions, recognized for innovation, excellence, and unwavering commitment to protecting what matters most to our clients.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <Card className="h-full bg-gradient-to-br from-accent to-primary text-white">
                <CardContent className="p-8">
                  <Target size={48} className="text-highlight mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg leading-relaxed">
                    To deliver comprehensive security solutions that exceed expectations, combining world-class training, advanced technology, and unmatched expertise to protect organizations and individuals worldwide.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-4xl font-bold text-primary mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Proton Security Services Nigeria Limited (Proton) was established in 2003 in Lagos State, Nigeria, with a clear mission to elevate professional security services through highly trained personnel, rigorous operational standards, and the effective integration of modern technology.
                </p>
                <p className="text-gray-600 mb-4">
                  Since its inception, the company has expanded steadily across all 36 states of Nigeria. Today, Proton Security Services Nigeria Limited (Proton) employs hundreds of dedicated security professionals whose discipline, competence, and commitment form the foundation of its trusted reputation nationwide.
                </p>
                <p className="text-gray-600">
                  This sustained pursuit of excellence has earned the company national recognition, including SON ISO 9001:2015 certification, underscoring its commitment to quality management systems, client satisfaction, and consistent operational performance.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <img
                src={img2228}
                alt="Proton Security Team"
                className="rounded-lg shadow-2xl"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-t-4 border-t-accent">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-highlight/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="text-accent" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* International Interaction */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <Globe size={56} className="text-highlight mb-6" />
                <h2 className="text-4xl font-bold mb-6">Global Reach and Strategic Partnerships</h2>
                <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                  Proton Security maintains strategic partnerships and operational presence across six continents, enabling us to deliver consistent, high-quality security solutions globally.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-highlight rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Global Network</h4>
                      <p className="text-gray-300">Partnerships with leading security organizations worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-highlight rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Cultural Expertise</h4>
                      <p className="text-gray-300">Deep understanding of regional security challenges and requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-highlight rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-semibold mb-1">International Standards</h4>
                      <p className="text-gray-300">Compliance with global security protocols and certifications</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-highlight">Our Impact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
                    <div className="p-2">
                      <div className="text-4xl font-bold text-highlight mb-1">
                        <CountUp end={21} suffix="+" />
                      </div>
                      <div className="text-sm text-gray-300 uppercase tracking-wider">Years Experience</div>
                    </div>
                    <div className="p-2">
                      <div className="text-4xl font-bold text-highlight mb-1">
                        <CountUp end={12000} suffix="+" />
                      </div>
                      <div className="text-sm text-gray-300 uppercase tracking-wider">Trained Professionals</div>
                    </div>
                    <div className="p-2">
                      <div className="text-4xl font-bold text-highlight mb-1">
                        <CountUp end={60} suffix="+" />
                      </div>
                      <div className="text-sm text-gray-300 uppercase tracking-wider">Corporate Clients</div>
                    </div>
                    <div className="p-2">
                      <div className="text-4xl font-bold text-highlight mb-1">
                        <CountUp end={7} suffix="+" />
                      </div>
                      <div className="text-sm text-gray-300 uppercase tracking-wider">Countries Served</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;