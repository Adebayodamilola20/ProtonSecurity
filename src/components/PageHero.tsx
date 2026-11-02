import AnimatedSection from "@/components/AnimatedSection";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
}

// Clean white page header: text on the left, optional photo on the right.
const PageHero = ({ eyebrow, title, subtitle, image, imageAlt = "" }: PageHeroProps) => (
  <section className="bg-white pt-16 pb-12 md:pt-24 md:pb-16">
    <div
      className={`container-custom grid grid-cols-1 gap-10 lg:gap-16 items-center ${
        image ? "lg:grid-cols-2" : ""
      }`}
    >
      <AnimatedSection>
        <div className="inline-block bg-highlight/10 text-highlight px-4 py-1 rounded-full text-sm font-semibold mb-5 uppercase">
          {eyebrow}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight mb-6">{title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">{subtitle}</p>
      </AnimatedSection>
      {image && (
        <AnimatedSection delay={150}>
          <img src={image} alt={imageAlt} className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl" />
        </AnimatedSection>
      )}
    </div>
  </section>
);

export default PageHero;
