import img2172 from "@/assets/IMG_2172 2.jpg";
import img2174 from "@/assets/IMG_2174 2.jpg";
import odebunmi from "@/assets/odebunmi_edited.png";
import odebunmiAlt from "@/assets/new.png";
import olumide from "@/assets/olumide_edited.png";
import olumideAlt from "@/assets/amoug.jpg";
import familusi from "@/assets/familusi_edited.png";

export interface Director {
  id: string;
  name: string;
  title: string;
  bio: string;
  achievements: string[];
  images: string[];
  social: {
    tiktok?: string;
    instagram?: string;
    facebook?: string;
  };
}

export const directors: Director[] = [
  {
    id: "adekunmi-odebunmi",
    name: "Adekunmi Odebunmi",
    title: "Managing Director",
    bio: "Adekunmi Odebunmi is an experienced security and business leader with a career spanning both the public and private sectors. He began in 1996 with the Nigerian Air Force, serving for ten years and taking part in several national operations.\n\nAfter leaving the military, he built a strong career in corporate security and risk management, working with organizations such as General Electric, Control Risks (UK), and Halogen Group, where he rose to General Manager and helped drive major business growth and digital transformation.\n\nHe later served as Executive Director at Arksego Nigeria Limited, Managing Director of Fortknox Guards & Checks, and is currently the Managing Director of Proton Security Services Limited.\n\nHe is a graduate of Bayero University, Kano, and an alumnus of Lagos Business School's Senior Management Program. He is also a devoted husband and father.",
    achievements: [
      "Former General Manager ,Physical Security & Mobility Division at Halogen Group",
      "Over 20 years of leadership in security risk management and operations across Africa",
      "Expert in digital transformation and security systems modernization",
      "Executive Director (Operations & Business Development) at Arksego Nigeria Limited",
      "Alumnus of Lagos Business School, Senior Management Program (SMP 46)"
    ],
    images: [odebunmi, odebunmiAlt],
    social: {}
  },
  {
    id: "olumide-olayinka",
    name: "Dr. Olumide Olayinka",
    title: "Director of Finance, Administration and Quality Control",
    bio: "Dr. Olumide Olayinka is a seasoned legal practitioner with over thirty-two years of experience, having been called to the Nigerian Bar in 1992. A graduate of the Ogun State University, he obtained both the Master of Industrial and Labour Relations (MILR) and Master of Laws (LLM) degrees from the University of Lagos. Further, he earned a PhD in Law from the Leeds Beckett University, Leeds, United Kingdom. He was at various times, inter alia, Senior State Counsel in the Ministry of Justice, Ogun State; as well as General Counsel, at the Troyka Group in Lagos State.",
    achievements: [
      "Called to the Nigerian Bar in 1992, with over 32 years of legal practice",
      "PhD in Law from Leeds Beckett University, United Kingdom",
      "Master of Laws (LLM) and Master of Industrial and Labour Relations (MILR), University of Lagos",
      "Former Senior State Counsel, Ogun State Ministry of Justice",
      "Former General Counsel at the Troyka Group, Lagos State"
    ],
    images: [olumide, olumideAlt],
    social: {}
  },
  {
    id: "olabisi-familusi",
    name: "Olabisi Familusi",
    title: "Director of Business Development and Strategy",
    bio: "A dynamic, results-driven, and innovative business strategist with nearly 18 years of progressive experience in Sales, Marketing, and Revenue Optimization. Recognized for driving sustainable growth, improving brand visibility, and developing high-performing teams across diverse markets and industries.",
    achievements: [
      "Drove 40% regional revenue growth through strategic business expansion.",
      "Built and maintained high-value relationships with multinational clients.",
      "Led digital transformation initiatives improving operational efficiency.",
      "Directed cross-functional teams to exceed performance targets.",
      "Launched new services that boosted market visibility and client retention."
    ],
    images: [familusi, img2172, img2174],
    social: {}
  },
];
