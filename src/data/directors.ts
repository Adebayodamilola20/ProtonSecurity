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
    name: "Prince Adekunmi Odebunmi",
    title: "Managing Director",
    bio: "He is a seasoned professional with an extensive career spanning the public and private sectors, marked by excellence, integrity, and impact He commenced his professional journey in 1996 with a distinguished enlistment into the Nigerian Air Force, where he served honorably for a decade. During his meritorious service, he participated in several national campaigns, earning recognition for his dedication and commitment to the nation. Upon his transition to the private sector, Prince Odebunmi began his career with in an Enterprise Security Risks Solutions Organization as an Operations Officer. His outstanding performance soon propelled him into greater responsibilities, leading him to join General Electrics as Security Manager for the General Electric Aero Energy Project in Obajana, Kogi State. Subsequently, he worked with Control Risks, a London-based Risk Mitigation firm, as Team Lead for Security Operations on a Schlumberger project in Port Harcourt. In 2010, he came back to the Halogen Group as Regional Manager for the South-South and South-East regions, where he spearheaded significant business growth, strengthened operational stability, and positioned the company ahead of competition in those regions. His success led to his appointment as Head of Lagos and Western Regional Business Operations, where he further distinguished himself in business growth, client satisfaction, and operational excellence. Prince Odebunmi played a pivotal role in driving the digitization program of Halogen Group’s Physical Security and Mobility Division. His exceptional contributions and leadership capacity earned him steady career advancement, culminating in his appointment as General Manager of Halogen Group.",
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
