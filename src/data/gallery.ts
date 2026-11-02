import img3 from "@/assets/IMG_2230.jpg";
import img4 from "@/assets/IMG_2219.jpg";
import img5 from "@/assets/IMG_2223.jpg";
import img6 from "@/assets/IMG_2234.jpg";
import img7 from "@/assets/IMG_2236.jpg";
import img8 from "@/assets/IMG_2221.jpg";
import img9 from "@/assets/IMG_2237.jpg";
import img10 from "@/assets/IMG_2238.jpg";
import img11 from "@/assets/IMG_2239.jpg";
import img12 from "@/assets/IMG_2240.jpg";
import img13 from "@/assets/IMG_2241.jpg";
import img14 from "@/assets/IMG_2243.jpg";
import img15 from "@/assets/IMG_2245.jpg";
import img16 from "@/assets/IMG_2247.jpg";
import img17 from "@/assets/IMG_2251.jpg";
import img18 from "@/assets/IMG_2250.jpg";
import img19 from "@/assets/IMG_2211 2.jpg";

import fcmb1 from "@/assets/fcmb-award-1.jpg";
import fcmb2 from "@/assets/fcmb-award-2.jpg";
import fcmb3 from "@/assets/fcmb-award-3.jpg";
import fcmb4 from "@/assets/fcmb-award-4.jpg";
import fcmb5 from "@/assets/fcmb-award-5.jpg";
import fcmb6 from "@/assets/fcmb-award-6.jpg";
import fcmb7 from "@/assets/fcmb-award-7.jpg";
import fcmb8 from "@/assets/fcmb-award-8.jpg";

export interface GalleryItem {
  id: string;
  url: string; // Local image import
  title: string;
  category: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "fcmb-1",
    url: fcmb1,
    title: "FCMB Service Excellence Award",
    category: "Awards",
  },
  {
    id: "fcmb-2",
    url: fcmb2,
    title: "Award Recipient Interview",
    category: "Awards",
  },
  {
    id: "fcmb-3",
    url: fcmb3,
    title: "Celebrating Service Excellence",
    category: "Awards",
  },
  {
    id: "fcmb-4",
    url: fcmb4,
    title: "Proud Award Recipient",
    category: "Awards",
  },
  {
    id: "fcmb-5",
    url: fcmb5,
    title: "Award Presentation with FCMB",
    category: "Awards",
  },
  {
    id: "fcmb-6",
    url: fcmb6,
    title: "FCMB Recognition Ceremony",
    category: "Awards",
  },
  {
    id: "fcmb-7",
    url: fcmb7,
    title: "Honoured by FCMB Management",
    category: "Awards",
  },
  {
    id: "fcmb-8",
    url: fcmb8,
    title: "FCMB Service Excellence Award Team",
    category: "Awards",
  },
  {
    id: "1",
    url: img19,
    title: "Security Training Exercise",
    category: "Training",
  },
  {
    id: "2",
    url: img3,
    title: "Corporate Security Team",
    category: "Operations",
  },
  {
    id: "3",
    url: img4,
    title: "Security Control Room",
    category: "Technology",
  },
  {
    id: "4",
    url: img5,
    title: "Tactical Response Training",
    category: "Training",
  },
  {
    id: "5",
    url: img6,
    title: "Executive Protection Detail",
    category: "VIP Security",
  },
  {
    id: "6",
    url: img7,
    title: "Event Security Management",
    category: "Events",
  },
  {
    id: "7",
    url: img8,
    title: "Security Assessment",
    category: "Consulting",
  },
  {
    id: "8",
    url: img9,
    title: "Team Building Exercise",
    category: "Training",
  },
  {
    id: "9",
    url: img10,
    title: "Emergency Response Drill",
    category: "Training",
  },
  {
    id: "10",
    url: img11,
    title: "Security Operations Center",
    category: "Operations",
  },
  {
    id: "11",
    url: img12,
    title: "Physical Security Check",
    category: "Operations",
  },
  {
    id: "12",
    url: img13,
    title: "Advanced Training Course",
    category: "Training",
  },
  {
    id: "13",
    url: img14,
    title: "Client Meeting",
    category: "Business",
  },
  {
    id: "14",
    url: img15,
    title: "Team Briefing",
    category: "Operations",
  },
  {
    id: "15",
    url: img16,
    title: "Operational Review",
    category: "Business",
  },
  {
    id: "16",
    url: img17,
    title: "Field Operations",
    category: "Operations",
  },
  {
    id: "17",
    url: img18,
    title: "Guard Force Deployment",
    category: "Operations",
  },
];
