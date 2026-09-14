import { About, Blog, Gallery, Home, Newsletter, Person, Resume, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Ali",
  lastName: "Hanafiah",
  name: `Ali Hanafiah`,
  role: "Software Engineer & UI/UX Designer",
  avatar: "/images/Ali.jpg",
  email: "mahdialihanafiah@gmail.com",
  location: "Asia/Kuala_Lumpur", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Bahasa Melayu", "Japanese (JLPT N3)"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Mahdiali97",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/ali-hanafiah-778365353/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building meaningful digital products & intuitive interfaces</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">UPSI / SecureLabX</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm {person.firstName}, a Software Engineering student at <Text as="span" size="xl" weight="strong">UPSI</Text> and UI/UX Design Intern at SecureLabX. I turn ideas into real solutions through code and creative design.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Kuala Lumpur, Malaysia`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Ali Hanafiah is a Software Engineering student from Universiti Pendidikan Sultan Idris (UPSI) with a passion for designing intuitive interfaces and building meaningful digital products. He enjoys turning ideas into real solutions through code and design, aiming to combine creativity, technology, and problem solving to create maximum impact.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "SecureLabX Sdn Bhd",
        timeframe: "Feb 2026 – Aug 2026",
        role: "UI/UX Designer Internship",
        achievements: [
          <>
            Crafted intuitive digital interfaces and user-centered design prototypes for core platform features.
          </>,
          <>
            Collaborated closely with engineering teams to ensure design consistency and seamless user experiences.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Universiti Pendidikan Sultan Idris (UPSI)",
        description: <>Bachelor of Software Engineering (2022 – Present)</>,
      },
      {
        name: "Kedah Matriculation College",
        description: <>Matriculation Program (2020 – 2021) • CGPA 3.83</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Frontend Development",
        description: (
          <>Building modern, responsive UI/UX interfaces with React, Vue.js, TypeScript, Tailwind CSS, Flutter, and Dart.</>
        ),
        tags: [
          { name: "React", icon: "react" },
          { name: "Vue.js", icon: "vue" },
          { name: "TypeScript", icon: "typescript" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Tailwind CSS", icon: "tailwind" },
          { name: "Flutter", icon: "flutter" },
        ],
        images: [],
      },
      {
        title: "Backend & Database",
        description: (
          <>Developing scalable server architectures and databases using PHP, Laravel, Express, Prisma, MySQL, Supabase, and Firebase.</>
        ),
        tags: [
          { name: "PHP", icon: "php" },
          { name: "Laravel", icon: "laravel" },
          { name: "MySQL", icon: "mysql" },
          { name: "Supabase", icon: "supabase" },
          { name: "Firebase", icon: "firebase" },
        ],
        images: [],
      },
      {
        title: "UI/UX & Graphic Design",
        description: (
          <>Designing intuitive user experiences, wireframes, vector illustrations, and brand assets in Figma, Adobe Illustrator, Photoshop, and Canva.</>
        ),
        tags: [
          { name: "Figma", icon: "figma" },
          { name: "Illustrator", icon: "illustrator" },
          { name: "Photoshop", icon: "photoshop" },
        ],
        images: [],
      },
      {
        title: "DevOps & Tools",
        description: (
          <>Managing deployments and workflows using Docker, Linux/Ubuntu, Azure, CI/CD pipelines, and Git/GitHub.</>
        ),
        tags: [
          { name: "Docker", icon: "docker" },
          { name: "Linux", icon: "linux" },
          { name: "Git", icon: "git" },
        ],
        images: [],
      },
    ],
  },
};

const resume: Resume = {
  path: "/resume",
  label: "Resume",
  title: `Resume – ${person.name}`,
  description: `Professional resume and CV of ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, resume, work, gallery };
