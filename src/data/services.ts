import { Shield, Users, Building, Eye, BriefcaseBusiness, type LucideIcon } from "lucide-react";
import corporateImg from "@/assets/IMG_2239.jpg";
import trainingImg from "@/assets/parttern.jpg";
import physicalImg from "@/assets/pop2.jpg";
import surveillanceImg from "@/assets/IMG_2219.jpg";
import consultingImg from "@/assets/security-consulting.jpg";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imagePosition?: string; // CSS object-position, for photos whose subject is off-centre
  features: string[];
}

export const services: Service[] = [
  {
    id: "corporate-security",
    title: "Corporate Security",
    image: corporateImg,
    description: "Comprehensive security programs tailored for corporate environments, ensuring the protection of assets and personnel.",
    icon: Building,
    features: [
      "24/7 Security Monitoring",
      "Access Control Systems",
      "Executive Protection",
      "Security Risk Assessments",
      "Emergency Response Planning"
    ]
  },
  {
    id: "training-development",
    title: "Security Training & Development",
    image: trainingImg,
    description: "World-class training programs designed to develop highly skilled security professionals for diverse operational environments.",
    icon: Users,
    features: [
      "Basic Security Training",
      "Advanced Tactical Operations",
      "Crisis Management",
      "First Responder Training",
      "Specialized Certifications"
    ]
  },
  {
    id: "physical-security",
    title: "Physical Security Services",
    image: physicalImg,
    description: "Professional deployment of trained security personnel for events, facilities, and high-value asset protection.",
    icon: Shield,
    features: [
      "Event Security Management",
      "Facility Protection",
      "VIP & Executive Protection",
      "Armed & Unarmed Guards",
      "Mobile Patrol Services"
    ]
  },
 
  {
    id: "surveillance",
    title: "Surveillance & Monitoring",
    image: surveillanceImg,
    description: "State-of-the-art surveillance systems and monitoring services for comprehensive situational awareness.",
    icon: Eye,
    features: [
      "CCTV System Installation",
      "Remote Monitoring Services",
      "Alarm System Integration",
      "Analytics & Reporting",
      "24/7 Control Room Operations"
    ]
  },
  {
    id: "consulting",
    title: "Security Consulting",
    image: consultingImg,
    imagePosition: "left center",
    description: "Expert advisory services to design, strengthen, and optimize your organization’s security strategy and operations.",
    icon: BriefcaseBusiness,
    features: [
      "Security Assessments",
      "Policy Development",
      "Compliance Audits",
      "Strategic Planning",
      "Vendor Management"
    ]
  }
];

