import { clientLogos } from "@/data/clients";

const ClientMarquee = () => {
  // Duplicate the list once for a seamless loop
  const loopLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none"></div>

      <div className="flex animate-slide-right hover:[animation-play-state:paused]">
        {loopLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex-shrink-0 flex items-center justify-center h-24 w-40 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={logo.image}
              alt={logo.alt}
              title={logo.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientMarquee;
