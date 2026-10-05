import { Person, Social, Home, About, Work, Gallery } from "@/types";

export const person: Person = {
  firstName: "Ali",
  lastName: "Hanafiah",
  name: "Muhamad Ali Hanafiah",
  role: "Creative Software Engineer & UI/UX Designer",
  avatar: "/Portfolio-Ali/images/Ali.jpg",
  email: "mahdialihanafiah@gmail.com",
  location: "Asia/Kuala_Lumpur",
  languages: ["English", "Bahasa Melayu", "Japanese (JLPT N3)"],
  locale: "en",
};

export const social: Social = [
  { name: "GitHub", icon: "github", link: "https://github.com/Mahdiali97", essential: true },
  { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/ali-hanafiah-778365353/", essential: true },
  { name: "Email", icon: "email", link: "mailto:mahdialihanafiah@gmail.com", essential: true },
];

export const home: Home = {
  path: "/",
  label: "Home",
  title: "Muhamad Ali Hanafiah — Portfolio",
  description: "Creative Software Engineer & UI/UX Designer portfolio.",
  image: "/Portfolio-Ali/images/ALI-HANAFIAH.png",
  headline: <>Building meaningful digital products & intuitive interfaces</>,
  featured: {
    display: true,
    title: "Featured Engineering Work",
    href: "/work",
  },
  subline: <>Ali Hanafiah, Creative Software Engineer at UPSI. Turning ideas into real solutions through code and design.</>,
};

export const about: About = {
  path: "/about",
  label: "About",
  title: "About – Ali Hanafiah",
  description: "Creative Software Engineer & UI/UX Designer from Kuala Lumpur.",
  tableOfContent: { display: false, subItems: false },
  avatar: { display: true },
  calendar: { display: false, link: "" },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Creative Software Engineer bridging the gap between robust backend systems and award-winning frontend experiences.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "SecureLabX Sdn Bhd",
        timeframe: "Feb 2026 – Aug 2026",
        role: "Software Designer Intern",
        achievements: [
          <>UI/UX Design, Figma, Design Systems, Workflow Design, Software Engineering, Frontend Development, Enterprise Systems.</>
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Universiti Pendidikan Sultan Idris (UPSI)",
        description: <>Bachelor of Software Engineering (2022 – 2026). Dean's List: Semesters 1-8.</>,
      },
      {
        name: "Kedah Matriculation College",
        description: <>Matriculation Program (2020 – 2021) • CGPA: 3.63</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        title: "Engineering",
        tags: [{ name: "Python" }, { name: "TypeScript" }, { name: "Next.js" }, { name: "Docker" }, { name: "Prisma" }],
      },
      {
        title: "Design",
        tags: [{ name: "Figma" }, { name: "UI/UX" }, { name: "Interaction Design" }],
      },
    ],
  },
};

export const work: Work = {
  path: "/work",
  label: "Work",
  title: "Projects",
  description: "Exhibition of engineering and design projects.",
};

export const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Milestones",
  description: "Moments & Milestones collection.",
  images: [], // To be populated
};

/**
 * UNRESOLVED FACTS / CONFIRMATIONS NEEDED:
 * 1. UPSI Graduation Status: Confirm if 2026 is the final expected graduation year.
 * 2. Gallery Assets: Confirm list of gallery items to include.
 * 3. Discrepancy Note: Kedah Matriculation CGPA confirmed as 3.63 by user.
 */
