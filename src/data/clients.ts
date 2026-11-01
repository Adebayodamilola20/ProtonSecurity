import logo1 from "@/assets/Screenshot 2025-10-09 at 17.25.12.png";
import logo2 from "@/assets/Screenshot 2025-10-09 at 17.36.32.png";
import logo3 from "@/assets/Screenshot 2025-10-09 at 17.50.42.png";
import logo4 from "@/assets/Screenshot 2025-10-09 at 18.00.07.png";
import logo5 from "@/assets/Screenshot 2025-10-10 at 09.16.11.png";
import logo6 from "@/assets/Screenshot 2025-10-10 at 09.18.53.png";
import logo7 from "@/assets/Screenshot 2025-10-10 at 09.20.46.png";
import logo8 from "@/assets/Screenshot 2025-10-10 at 09.23.23.png";
import logo9 from "@/assets/Screenshot 2025-10-10 at 09.26.10.png";
import logo10 from "@/assets/Screenshot 2025-10-10 at 09.37.48.png";
import logo11 from "@/assets/Screenshot 2025-10-10 at 09.30.20.png";
import logo12 from "@/assets/Screenshot 2025-10-10 at 09.32.15.png";

export interface ClientLogo {
  id: string;
  image: string; // Imported image
  alt: string;
  name: string; // For accessibility/screen readers
}

export const clientLogos: ClientLogo[] = [
  { id: "mtn", image: logo1, alt: "MTN Nigeria Logo", name: "MTN Nigeria" },
  { id: "fcmb", image: logo2, alt: "FCMB Logo", name: "FCMB" },
  { id: "multichoice", image: logo3, alt: "MultiChoice Logo", name: "MultiChoice" },
  { id: "uber", image: logo4, alt: "Uber Logo", name: "Uber" },
  { id: "9mobile", image: logo5, alt: "9mobile Logo", name: "9mobile" },
  { id: "ihs", image: logo6, alt: "IHS Logo", name: "IHS" },
  { id: "airtel", image: logo7, alt: "Airtel Nigeria Logo", name: "Airtel Nigeria" },
  { id: "beloxxi", image: logo8, alt: "Beloxxi Logo", name: "Beloxxi" },
  { id: "genesis", image: logo9, alt: "Genesis Logo", name: "Genesis" },
  { id: "firstbank", image: logo10, alt: "FirstBank Logo", name: "FirstBank" },
  { id: "execujet", image: logo11, alt: "ExecuJet MRO Services Logo", name: "ExecuJet MRO Services" },
  { id: "cns-marine", image: logo12, alt: "CNS Marine Nigeria Logo", name: "CNS Marine Nigeria" },
];

export interface Testimonial {
  id: number;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    company: "CHI Limited",
    quote:
      "Proton Security transformed our corporate security infrastructure. Their professionalism and expertise are unmatched. Highly recommended!",
  },
  {
    id: 2,
    company: "MTN Nigeria",
    quote:
      "The training programs are world-class. Our security team is now more confident and capable than ever before. Excellent investment!",
  },
  {
    id: 3,
    company: "Ardova PLC",
    quote:
      "Outstanding service! Their event security management for our annual conference was flawless. Professional team, highly efficient.",
  },
  {
    id: 4,
    company: "Cumming West Africa",
    quote:
      "Best security partner we've ever worked with. Their attention to detail and rapid response capabilities are exceptional. Five stars!",
  },
  {
    id: 5,
    company: "Julius Berger Nigeria",
    quote:
      "Their crisis management training saved our team during a critical situation. Professional, thorough, and highly effective. Thank you!",
  },
  {
    id: 6,
    company: "SAHCOL",
    quote:
      "Reliable, professional, and always available. Proton Security has been protecting our facilities for years. Couldn't be happier!",
  },
];
