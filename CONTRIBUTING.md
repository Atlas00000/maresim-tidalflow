# 🤝 Contributing to MareSim TidalFlow

Thank you for your interest in contributing to MareSim TidalFlow! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- pnpm (recommended) or npm
- Git
- A modern web browser

### **Fork and Clone**
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/your-username/maresim-tidalflow.git
cd maresim-tidalflow

# Add the original repository as upstream
git remote add upstream https://github.com/original-username/maresim-tidalflow.git
```

### **Install Dependencies**
```bash
pnpm install
```

### **Start Development Server**
```bash
pnpm dev
```

## 🛠️ Development Setup

### **Environment Setup**
1. **Node.js**: Ensure you have Node.js 18+ installed
2. **pnpm**: Install pnpm globally: `npm install -g pnpm`
3. **Editor**: Use VS Code with recommended extensions
4. **Browser**: Chrome/Firefox for development

### **Recommended VS Code Extensions**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### **Development Scripts**
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

## 📝 Contributing Guidelines

### **Types of Contributions**

#### **🐛 Bug Fixes**
- Fix bugs in existing functionality
- Improve error handling
- Optimize performance issues

#### **✨ New Features**
- Add new simulation parameters
- Implement new visualization effects
- Create additional NOAA station integrations

#### **📚 Documentation**
- Improve README and documentation
- Add code comments and JSDoc
- Create tutorials and guides

#### **🎨 UI/UX Improvements**
- Enhance user interface design
- Improve accessibility
- Add responsive design features

#### **🧪 Testing**
- Add unit tests
- Create integration tests
- Improve test coverage

### **Before You Start**

1. **Check Existing Issues**: Search for existing issues before creating new ones
2. **Discuss Major Changes**: Open an issue to discuss significant changes
3. **Follow the Style Guide**: Adhere to the established code style
4. **Test Your Changes**: Ensure your changes work as expected

## 🎨 Code Style

### **TypeScript Guidelines**

#### **Type Safety**
```typescript
// ✅ Good: Explicit typing
interface SimulationState {
  tideLevel: number;
  waveHeight: number;
  time: number;
}

// ❌ Bad: Implicit any
const state = {
  tideLevel: 1.5,
  waveHeight: 2.0,
  time: 12
};
```

#### **Component Structure**
```typescript
// ✅ Good: Functional component with proper typing
interface TideControlsProps {
  tideLevel: number;
  onTideLevelChange: (level: number) => void;
}

export function TideControls({ tideLevel, onTideLevelChange }: TideControlsProps) {
  return (
    <div className="tide-controls">
      {/* Component content */}
    </div>
  );
}
```

### **React Guidelines**

#### **Hooks Usage**
```typescript
// ✅ Good: Custom hooks for complex logic
export function useTideData(stationId: string) {
  const [data, setData] = useState<TideData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch tide data
  }, [stationId]);

  return { data, loading };
}

// ❌ Bad: Complex logic in components
function TideComponent() {
  // Complex data fetching logic mixed with UI
}
```

#### **State Management**
```typescript
// ✅ Good: Use Zustand for global state
export const useSimulationStore = create<SimulationState>((set) => ({
  tideLevel: 0,
  setTideLevel: (level) => set({ tideLevel: level }),
}));

// ❌ Bad: Prop drilling
function App({ tideLevel, setTideLevel, ...otherProps }) {
  return <Component tideLevel={tideLevel} setTideLevel={setTideLevel} />;
}
```

### **CSS/Styling Guidelines**

#### **Tailwind CSS**
```typescript
// ✅ Good: Semantic class names
<div className="bg-blue-500 text-white rounded-lg p-4 shadow-md">
  Tide Level: {tideLevel}m
</div>

// ❌ Bad: Inline styles
<div style={{ backgroundColor: 'blue', color: 'white', padding: '16px' }}>
  Tide Level: {tideLevel}m
</div>
```

#### **Component Styling**
```typescript
// ✅ Good: Consistent component styling
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-background",
        elevated: "bg-background shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
```

### **File Organization**

#### **Component Structure**
```
components/
├── ui/                    # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── slider.tsx
├── lunar-panel.tsx       # Feature-specific components
├── ocean-scene.tsx
├── solar-panel.tsx
└── tide-controls.tsx
```

#### **Utility Organization**
```
utils/
├── lunar-calculations.ts     # Lunar physics
├── solar-lunar-calculations.ts # Combined calculations
└── index.ts                  # Export utilities
```

## 🧪 Testing

### **Testing Guidelines**

#### **Unit Tests**
```typescript
// ✅ Good: Test utility functions
describe('LunarCalculations', () => {
  it('should calculate tidal amplitude correctly', () => {
    const amplitude = LunarCalculations.calculateTidalAmplitude(0.5, 384400, 1.0, 1.0);
    expect(amplitude).toBeCloseTo(1.0, 2);
  });
});
```

#### **Component Tests**
```typescript
// ✅ Good: Test component behavior
describe('TideControls', () => {
  it('should update tide level when slider changes', () => {
    const mockOnChange = jest.fn();
    render(<TideControls tideLevel={1.0} onTideLevelChange={mockOnChange} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '2.0' } });
    
    expect(mockOnChange).toHaveBeenCalledWith(2.0);
  });
});
```

### **Running Tests**
```bash
pnpm test              # Run all tests
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage report
```

## 🔄 Pull Request Process

### **Before Submitting**

1. **Update Documentation**: Update README and docs if needed
2. **Add Tests**: Include tests for new functionality
3. **Check Linting**: Ensure code passes ESLint
4. **Type Check**: Verify TypeScript compilation
5. **Test Locally**: Test your changes thoroughly

### **Pull Request Template**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Added unit tests
- [ ] Updated existing tests
- [ ] All tests pass locally

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Mobile responsive tested

## Screenshots (if applicable)
Add screenshots for UI changes
```

### **Review Process**

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: Maintainers review the PR
3. **Address Feedback**: Respond to review comments
4. **Merge**: PR is merged after approval

## 🐛 Reporting Bugs

### **Bug Report Template**

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- Browser: [e.g., Chrome 90]
- OS: [e.g., Windows 10]
- Node.js: [e.g., 18.0.0]

## Screenshots
Add screenshots if applicable

## Console Errors
Any console errors or warnings
```

### **Before Reporting**

1. **Search Existing Issues**: Check if the bug is already reported
2. **Reproduce Consistently**: Ensure the bug is reproducible
3. **Provide Details**: Include environment and steps to reproduce
4. **Test Latest Version**: Ensure you're using the latest code

## 💡 Feature Requests

### **Feature Request Template**

```markdown
## Feature Description
Clear description of the requested feature

## Use Case
Why this feature would be useful

## Proposed Implementation
How you think it could be implemented

## Alternatives Considered
Other approaches you considered

## Additional Context
Any other relevant information
```

### **Before Requesting**

1. **Check Existing Features**: Ensure the feature doesn't already exist
2. **Search Discussions**: Look for similar feature requests
3. **Consider Scope**: Ensure the feature fits the project's scope
4. **Provide Context**: Explain why the feature is needed

## 📚 Documentation

### **Documentation Guidelines**

#### **Code Comments**
```typescript
/**
 * Calculates tidal amplitude based on lunar phase and distance
 * @param moonPhase - Lunar phase (0-1, where 0.5 is full moon)
 * @param lunarDistance - Distance from Earth to Moon in km
 * @param baseAmplitude - Base tidal amplitude multiplier
 * @param amplification - Additional amplification factor
 * @returns Calculated tidal amplitude
 */
export function calculateTidalAmplitude(
  moonPhase: number,
  lunarDistance: number,
  baseAmplitude = 1.0,
  amplification = 1.0
): number {
  // Implementation
}
```

#### **README Updates**
- Update installation instructions if needed
- Add new features to the features list
- Update screenshots for UI changes
- Maintain accurate version information

### **Documentation Types**

1. **Code Documentation**: JSDoc comments and inline comments
2. **User Documentation**: README, guides, and tutorials
3. **API Documentation**: Function signatures and usage examples
4. **Architecture Documentation**: System design and component relationships

## 🎯 Areas for Contribution

### **High Priority**
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Mobile responsiveness
- [ ] Test coverage expansion

### **Medium Priority**
- [ ] Additional NOAA stations
- [ ] New visualization effects
- [ ] Enhanced 3D models
- [ ] Documentation improvements

### **Low Priority**
- [ ] UI theme variations
- [ ] Additional export formats
- [ ] Social sharing features
- [ ] Localization support

## 🏆 Recognition

### **Contributor Recognition**
- Contributors are listed in the README
- Significant contributions are highlighted
- Regular contributors may be invited as maintainers

### **Types of Contributions**
- **Bug Fixes**: Critical for stability
- **Features**: Enhance functionality
- **Documentation**: Improve usability
- **Testing**: Ensure reliability
- **Design**: Improve user experience

## 📞 Getting Help

### **Communication Channels**
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Discord**: For real-time chat and support
- **Email**: For private or sensitive matters

### **Resources**
- [Project Wiki](https://github.com/your-username/maresim-tidalflow/wiki)
- [API Documentation](docs/API.md)
- [Development Guide](docs/DEVELOPMENT.md)
- [Architecture Overview](docs/ARCHITECTURE.md)

---

**Thank you for contributing to MareSim TidalFlow! 🌊**

*Your contributions help make oceanographic simulation accessible to everyone.* 