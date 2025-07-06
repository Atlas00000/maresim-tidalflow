# ⚡ Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. **Installation**

```bash
# Clone the repository
git clone https://github.com/your-username/maresim-tidalflow.git
cd maresim-tidalflow

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### 2. **Open Your Browser**

Navigate to `http://localhost:3000` and you'll see the MareSim TidalFlow interface!

## 🎯 First Steps

### **Understanding the Interface**

The MareSim interface has four main control panels:

1. **🌊 Tide Controls** (Top Left) - Station selection and basic parameters
2. **📊 Simulation Panel** (Top Right) - Current conditions and performance
3. **🌙 Lunar Panel** (Bottom Left) - Moon phase and lunar effects
4. **☀️ Solar Panel** (Bottom Right) - Solar position and syzygy events

### **Basic Controls**

#### **Select a Tide Station**
1. Click the station dropdown in the Tide Controls panel
2. Choose from available NOAA stations:
   - The Battery, NY
   - Boston, MA
   - Lamberts Point, VA
   - Charleston, SC
   - Mayport, FL

#### **Adjust Time**
1. Use the time slider in the Tide Controls panel
2. Range: 0-24 hours
3. Click "Play Time" to start automatic progression

#### **Modify Wave Conditions**
1. Adjust "Wave Height" slider (0-5m)
2. Modify "Wind Speed" (0-30 m/s)
3. Change "Wind Direction" (0-360°)

#### **Explore Lunar Effects**
1. Adjust "Moon Phase" (0-100%)
2. Modify "Lunar Distance" (356k-405k km)
3. Watch tidal strength indicator change

#### **Investigate Solar Interactions**
1. Change "Day of Year" (1-365)
2. Adjust "Solar Distance" (147M-152M km)
3. Observe syzygy events and tidal range changes

## 🎮 Interactive 3D Scene

### **Camera Controls**
- **Left Click + Drag**: Rotate camera around the scene
- **Right Click + Drag**: Pan the view
- **Scroll Wheel**: Zoom in/out
- **Camera Limits**: Restricted to prevent disorientation

### **Visual Elements**
- **Ocean Surface**: Realistic water with dynamic waves
- **Coastal Features**: Shoreline and seabed visualization
- **Floating Buoys**: Real-time tide level indicators
- **Moon/Sun**: Celestial bodies (when enabled)

## 🔬 Scientific Features

### **Tidal Physics**
- **Real-time NOAA Data**: Live tide data from selected stations
- **Lunar Influence**: Moon phase affects tidal strength
- **Solar Effects**: Seasonal solar position impacts tides
- **Syzygy Events**: Special alignments cause extreme tides

### **Wave Dynamics**
- **Wind-driven Waves**: Wind speed affects wave height
- **Tidal Wave Interaction**: Combined wind and tidal effects
- **Dynamic Generation**: Real-time wave pattern changes

### **Advanced Modes**
- **Storm Surge Mode**: Enhanced simulation for extreme weather
- **Caustics Effects**: Advanced underwater light refraction
- **Sediment Transport**: Visual coastal erosion simulation

## 🎨 Customization

### **Adjusting Simulation Parameters**

#### **Tide Controls**
```typescript
// Example: Set specific parameters
setWaveHeight(2.5)        // 2.5m wave height
setWindSpeed(15)          // 15 m/s wind speed
setTime(14.5)             // 2:30 PM simulation time
```

#### **Lunar Parameters**
```typescript
// Example: Full moon configuration
setMoonPhase(0.5)         // Full moon (50%)
setLunarDistance(384400)  // Average lunar distance
setLunarTidalAmplification(1.2) // 20% amplification
```

#### **Solar Parameters**
```typescript
// Example: Summer solstice
setSolarDay(172)          // June 21st
setSolarDistance(152100000) // Aphelion distance
setSolarTidalAmplification(0.8) // 80% solar influence
```

### **Performance Optimization**

#### **For Lower-end Devices**
1. Disable "Show Caustics" in Simulation Panel
2. Reduce wave height for smoother performance
3. Close other browser tabs to free up memory

#### **For High-end Devices**
1. Enable all visual effects
2. Increase wave height for more dramatic scenes
3. Use maximum quality settings

## 🐛 Troubleshooting

### **Common Issues**

#### **Application Won't Start**
```bash
# Check Node.js version
node --version  # Should be 18+

# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### **3D Scene Not Loading**
- Ensure WebGL is enabled in your browser
- Try a different browser (Chrome/Firefox recommended)
- Check browser console for errors

#### **NOAA Data Not Loading**
- Check internet connection
- Verify NOAA API availability
- Application will use simulated data as fallback

#### **Performance Issues**
- Reduce wave height and wind speed
- Disable advanced visual effects
- Close other applications to free up resources

### **Browser Compatibility**

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |

## 📚 Next Steps

### **Learn More**
- Read the [Full Documentation](README.md)
- Explore [Advanced Features](docs/FEATURES.md)
- Check out [Screenshots](docs/SCREENSHOTS.md)

### **Contribute**
- Report bugs on [GitHub Issues](https://github.com/your-username/maresim-tidalflow/issues)
- Suggest features in [Discussions](https://github.com/your-username/maresim-tidalflow/discussions)
- Submit pull requests for improvements

### **Get Help**
- Join our [Discord Community](https://discord.gg/maresim)
- Check [FAQ](docs/FAQ.md) for common questions
- Contact support at support@maresim-tidalflow.com

---

**🎉 Congratulations! You're now ready to explore the fascinating world of tidal simulation with MareSim TidalFlow!**

*Happy simulating! 🌊* 