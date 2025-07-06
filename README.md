# 🌊 MareSim: TidalFlow Simulator

[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-latest-green?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **Real-time Oceanographic Visualization & Tidal Simulation Platform**

MareSim TidalFlow is an advanced 3D oceanographic simulation platform that provides real-time visualization of tidal patterns, lunar-solar interactions, and coastal dynamics. Built with cutting-edge web technologies, it offers an immersive experience for understanding complex marine phenomena.

## 🚀 Features

### 🌊 **Real-time Tidal Simulation**
- **NOAA Data Integration**: Live tide data from multiple coastal stations
- **Dynamic Wave Generation**: Realistic wave patterns based on wind and tidal forces
- **Coastal Dynamics**: Interactive shoreline and seabed visualization
- **Tide Level Indicators**: Real-time water level monitoring with floating buoys

### 🌙 **Lunar-Solar Interactions**
- **Moon Phase Visualization**: Realistic lunar cycle representation
- **Solar Position Tracking**: Seasonal sun movement and positioning
- **Syzygy Events**: Special alignment events (Spring/Neap tides, King Tides)
- **Tidal Amplification**: Dynamic tidal strength based on celestial positions

### 🎮 **Interactive Controls**
- **Multi-panel Interface**: Separate control panels for different simulation aspects
- **Real-time Parameter Adjustment**: Live modification of wind, waves, and tidal forces
- **Time Simulation**: Play/pause functionality with variable time progression
- **Station Selection**: Multiple NOAA tide stations across the US coastline

### 🎨 **Advanced Visualization**
- **3D Ocean Rendering**: High-fidelity water surface with realistic lighting
- **Caustics Effects**: Advanced underwater light refraction
- **Sediment Transport**: Visual representation of coastal erosion and deposition
- **Storm Surge Mode**: Enhanced simulation for extreme weather conditions

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 14**: React framework with App Router
- **React 18**: Modern React with concurrent features
- **TypeScript**: Type-safe development

### **3D Graphics & Visualization**
- **Three.js**: WebGL-based 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for React Three Fiber

### **UI Components & Styling**
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Class Variance Authority**: Type-safe component variants

### **State Management & Data**
- **Zustand**: Lightweight state management
- **React Hook Form**: Performant forms with validation
- **Zod**: TypeScript-first schema validation

### **Development Tools**
- **pnpm**: Fast, disk space efficient package manager
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization

## 📦 Installation

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recommended) or npm
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/maresim-tidalflow.git
   cd maresim-tidalflow
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🎯 Usage Guide

### **Main Interface**

The MareSim interface consists of several interactive panels:

#### **🌊 Tide Controls Panel** (Top Left)
- **Station Selection**: Choose from multiple NOAA tide stations
- **Time Control**: Adjust simulation time (0-24 hours)
- **Wave Parameters**: Modify wave height and wind conditions
- **Real-time Data**: Live NOAA tide data integration

#### **📊 Simulation Panel** (Top Right)
- **Current Conditions**: Real-time tide level and wave status
- **Performance Metrics**: FPS and GPU usage monitoring
- **Simulation Modes**: Toggle storm surge, caustics, and sediment transport
- **Reset Functionality**: Return to default simulation parameters

#### **🌙 Lunar Panel** (Bottom Left)
- **Moon Phase Control**: Adjust lunar cycle (0-100%)
- **Lunar Distance**: Modify moon's distance from Earth
- **Tidal Amplification**: Control lunar influence on tides
- **Tidal Strength Indicator**: Visual representation of current tidal force

#### **☀️ Solar Panel** (Bottom Right)
- **Solar Parameters**: Day of year and solar distance controls
- **Syzygy Analysis**: Alignment strength and tidal range calculations
- **Seasonal Effects**: Solar position and seasonal variations
- **Combined Forces**: Lunar-solar interaction visualization

### **3D Scene Navigation**

- **Mouse Controls**: 
  - Left click + drag: Rotate camera
  - Right click + drag: Pan view
  - Scroll wheel: Zoom in/out
- **Camera Limits**: Restricted to prevent disorientation
- **Auto-rotation**: Optional automatic scene rotation

## 🏗️ Project Structure

```
maresim-tidalflow/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── lunar-panel.tsx   # Lunar controls
│   ├── ocean-scene.tsx   # 3D ocean visualization
│   ├── solar-panel.tsx   # Solar controls
│   ├── tide-controls.tsx # Tide simulation controls
│   └── ...               # Other components
├── hooks/                # Custom React hooks
│   ├── use-tide-data.ts  # NOAA data integration
│   └── use-mobile.tsx    # Mobile detection
├── store/                # State management
│   └── simulation-store.ts # Zustand store
├── utils/                # Utility functions
│   ├── lunar-calculations.ts    # Lunar physics
│   └── solar-lunar-calculations.ts # Combined calculations
├── lib/                  # Library utilities
└── public/              # Static assets
```

## 🔬 Scientific Background

### **Tidal Mechanics**
MareSim implements realistic tidal physics based on:
- **Lunar Gravitational Forces**: Primary tidal driver
- **Solar Gravitational Forces**: Secondary tidal influence (~46% of lunar)
- **Inverse Cube Law**: Distance-based gravitational force calculation
- **Syzygy Events**: Special alignments causing extreme tides

### **Wave Dynamics**
- **Wind-driven Waves**: Surface wave generation based on wind speed/direction
- **Tidal Wave Interaction**: Combined effects of wind and tidal forces
- **Coastal Reflection**: Wave interaction with shorelines and seabed

### **Celestial Mechanics**
- **Lunar Cycle**: 29.5-day synodic month simulation
- **Solar Position**: Seasonal variations in solar influence
- **Orbital Dynamics**: Realistic Earth-Moon-Sun positioning

## 🎨 Customization

### **Adding New Tide Stations**
1. Update the stations array in `components/tide-controls.tsx`
2. Ensure NOAA data availability for the station
3. Test data integration and visualization

### **Modifying Simulation Parameters**
1. Edit the simulation store in `store/simulation-store.ts`
2. Adjust calculation functions in `utils/` directory
3. Update UI components to reflect new parameters

### **Custom 3D Assets**
1. Add new geometries in `components/ocean-scene.tsx`
2. Import custom textures and materials
3. Integrate with existing lighting and physics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### **Code Style**
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add proper JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NOAA**: For providing real-time tide data
- **Three.js Community**: For excellent 3D graphics tools
- **React Three Fiber**: For seamless React-3D integration
- **Radix UI**: For accessible component primitives

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/maresim-tidalflow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/maresim-tidalflow/discussions)
- **Email**: support@maresim-tidalflow.com

---

<div align="center">

**Made with ❤️ by the MareSim Team**

*Exploring the mysteries of the ocean, one simulation at a time*

[![GitHub stars](https://img.shields.io/github/stars/your-username/maresim-tidalflow?style=social)](https://github.com/your-username/maresim-tidalflow)
[![GitHub forks](https://img.shields.io/github/forks/your-username/maresim-tidalflow?style=social)](https://github.com/your-username/maresim-tidalflow)
[![GitHub issues](https://img.shields.io/github/issues/your-username/maresim-tidalflow)](https://github.com/your-username/maresim-tidalflow/issues)

</div> 