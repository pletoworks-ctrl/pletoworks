# PLETO Works

A modern, responsive portfolio website built with React, Three.js, and Framer Motion. Features interactive 3D elements, smooth animations, and a sleek dark theme.

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Three.js / React Three Fiber** - 3D graphics
- **Framer Motion** - Animations
- **Tailwind CSS v4** - Styling
- **Lenis** - Smooth scrolling

## Features

- Interactive 3D glass cubes that follow cursor movement
- Smooth scroll with Lenis
- Custom animated cursor
- Responsive design (mobile, tablet, desktop)
- Lazy-loaded 3D scene for optimized performance
- Section animations on scroll
- Magnetic button effects
- Marquee text animations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pleto.git

# Navigate to project directory
cd pleto

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── canvas/
│   │   ├── Scene.jsx        # Three.js canvas setup
│   │   └── HeroModel.jsx    # Interactive 3D cubes
│   └── ui/
│       ├── Overlay.jsx      # Main layout & hero section
│       ├── Work.jsx         # Projects section
│       ├── Services.jsx     # Services section
│       ├── Contact.jsx      # Contact & footer
│       ├── CustomCursor.jsx # Animated cursor
│       ├── MagneticButton.jsx
│       ├── Marquee.jsx
│       ├── Preloader.jsx
│       ├── ScrollProgress.jsx
│       └── SplitText.jsx
├── App.jsx                  # Root component
├── main.jsx                 # Entry point
└── index.css                # Global styles & Tailwind config
```

## Customization

### Colors

Edit the theme in `src/index.css`:

```css
@theme {
    --color-dark: #0a0a0a;
    --color-darker: #050505;
    --color-light: #f0f0f0;
    --color-accent: #c9ff00;
    --color-muted: #666666;
    --color-card: #141414;
}
```

### Fonts

The project uses:
- **Syncopate** - Headers
- **Syne** - Body text

## Performance

The build is optimized with code-splitting:
- React core loaded first
- Three.js lazy-loaded after initial render
- Vendor chunks cached separately for faster repeat visits

## License

MIT

## Contact

hello@pletoworks.com
