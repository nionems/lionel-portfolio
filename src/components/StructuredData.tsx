export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lionel Coevoet",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer with 4+ years of experience in React, Next.js, Node.js, Python, Java, Firebase, MongoDB, and AWS. Specializing in mobile app development and innovative technology solutions.",
    "url": "https://lionel-portfolio.vercel.app",
    "image": "https://lionel-portfolio.vercel.app/images/FA2_5340_2_edited.png",
    "email": "coevoetlionel@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sydney",
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
      "Web Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "description": "Develops web and mobile applications using modern technologies"
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
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
} 