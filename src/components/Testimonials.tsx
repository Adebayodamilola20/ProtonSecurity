import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/clients";
import AnimatedSection from "./AnimatedSection";

const Testimonials = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-highlight mx-auto"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={index * 100}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-t-4 border-t-accent">
                <CardContent className="p-6 flex flex-col">
                  <Quote className="text-highlight mb-4" size={40} />
                  <p className="text-gray-700 mb-6 italic leading-relaxed flex-1">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {testimonial.company
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="font-semibold text-primary">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
