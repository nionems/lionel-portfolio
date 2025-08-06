# Lionel Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌙 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized
- 🎨 **Modern Design** - Beautiful glassmorphism effects and gradients
- 🔗 **Contact Integration** - Real LinkedIn and GitHub links

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Theme**: Custom dark/light mode implementation
- **Backend**: Firebase (Firestore, Analytics)
- **Deployment**: Ready for Vercel deployment

## Pages

- **Home**: Hero section with profile picture and tech stack
- **About**: Personal journey, skills, and statistics
- **Portfolio**: Showcase of projects with case studies
- **Contact**: Contact form with social media links

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/nionems/lionel-portfolio.git
cd lionel-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database and Analytics
   - Add a web app to your project
   - Copy the Firebase config values
   - Create a `.env.local` file with your Firebase configuration:
   ```bash
   cp firebase-env-template.txt .env.local
   # Edit .env.local with your Firebase config values
   ```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contact

- **LinkedIn**: [Lionel Coevoet](https://www.linkedin.com/in/lionelcoevoet)
- **GitHub**: [@nionems](https://github.com/nionems)
- **Email**: nionems@icloud.com
- **Location**: Sydney, Australia

## License

This project is open source and available under the [MIT License](LICENSE).
