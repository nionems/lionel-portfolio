export default function StructuredData() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Lionel Coevoet",
      "jobTitle": "Full Stack Developer & Mobile App Developer",
      "description": "Full Stack Developer with 4+ years of experience in React, Next.js, Node.js, Python, Java, Firebase, MongoDB, and AWS. Specializing in mobile app development and innovative technology solutions.",
      "url": "https://lionel-portfolio.vercel.app",
      "image": "https://lionel-portfolio.vercel.app/images/FA2_5340_2_edited.png",
      "email": "coevoetlionel@gmail.com",
      "telephone": "+61-XXX-XXX-XXX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sydney",
        "addressRegion": "NSW",
        "addressCountry": "Australia"
      },
      "sameAs": [
        "https://www.linkedin.com/in/lionelcoevoet",
        "https://github.com/nionems",
        "https://www.youtube.com/@lionelcoevoet"
      ],
      "knowsAbout": [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Python",
        "Java",
        "Firebase",
        "MongoDB",
        "PostgreSQL",
        "AWS",
        "Docker",
        "Git",
        "Mobile App Development",
        "Full Stack Development",
        "Web Development",
        "API Development",
        "Cloud Computing",
        "Database Design",
        "UI/UX Development"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Full Stack Developer",
        "description": "Develops web and mobile applications using modern technologies",
        "occupationLocation": {
          "@type": "City",
          "name": "Sydney, Australia"
        }
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Mobile App Development Program",
        "location": {
          "@type": "Place",
          "addressLocality": "Australia"
        }
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance Developer"
      },
      "seeks": "Full-time Developer Position",
      "availableForWork": true
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Lionel Coevoet Portfolio",
      "url": "https://lionel-portfolio.vercel.app",
      "description": "Portfolio website showcasing Full Stack Developer Lionel Coevoet's projects, skills, and experience",
      "author": {
        "@type": "Person",
        "name": "Lionel Coevoet"
      },
      "inLanguage": "en-US",
      "copyrightYear": "2024",
      "genre": "Portfolio"
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Lionel Coevoet - Full Stack Development Services",
      "description": "Professional full stack development services including web applications, mobile apps, and cloud solutions",
      "provider": {
        "@type": "Person",
        "name": "Lionel Coevoet"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Australia"
      },
      "serviceType": [
        "Web Development",
        "Mobile App Development",
        "Full Stack Development",
        "API Development",
        "Cloud Solutions"
      ],
      "url": "https://lionel-portfolio.vercel.app"
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
} 