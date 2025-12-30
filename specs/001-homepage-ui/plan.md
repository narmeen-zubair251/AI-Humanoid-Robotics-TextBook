# Implementation Plan: Homepage UI

**Feature**: Homepage UI with 4 module cards
**Branch**: 001-homepage-ui
**Created**: 2025-12-29

## Overview

This plan outlines the implementation of a new homepage UI that displays 4 module cards with existing metadata, using the #084d45 color palette, while maintaining Docusaurus compatibility and not modifying any book content.

## Architecture Decision Summary

- Replace the existing HomepageFeatures component with a new ModuleCards component
- Use the existing Docusaurus configuration and routing system
- Maintain all existing functionality while enhancing the UI
- Apply the #084d45 color palette with highlighted borders and shadows

## Implementation Steps

### Step 1: Data Analysis and Module Identification

- Identify the 4 main modules from the sidebar configuration:
  1. Module 01 - ROS 2
  2. Module 02 - Digital Twin
  3. Module 03 - AI-Robot Brain (NVIDIA Isaac™)
  4. Module 04 - Vision-Language-Action (VLA)
- Extract titles and create short descriptions based on the existing category labels
- Determine correct navigation paths for each module

### Step 2: Component Creation

- Create a new `ModuleCard` component that displays:
  - Module title
  - Short description
  - "Start Reading" button with proper navigation
- Create a `ModuleCardsGrid` component to arrange the 4 cards in a responsive grid
- Ensure all components are properly typed with TypeScript

### Step 3: Homepage Update

- Replace the existing `HomepageFeatures` component with the new `ModuleCardsGrid` component
- Maintain the existing hero section with the site title and tagline
- Keep the existing layout structure and navigation

### Step 4: Styling Implementation

- Update the CSS to implement the #084d45 color palette
- Create highlighted borders and shadows derived from #084d45:
  - Use lighter/warmer complementary shades for borders
  - Implement soft tinted glow shadows for cards
- Apply consistent styling to cards, buttons, header, and footer
- Ensure styling works for both light and dark modes

### Step 5: Animation Implementation

- Add hover animations to cards (subtle lift + enhanced shadow glow)
- Add hover effects to buttons (soft color transition and gentle elevation)
- Implement subtle entrance animation for hero title

### Step 6: Responsive Design

- Ensure the grid layout works properly on mobile devices
- Adjust card sizes and spacing for different screen sizes
- Test navigation and interactions on various screen sizes

## Technical Implementation Details

### Module Data Structure
```typescript
type ModuleItem = {
  title: string;
  description: string;
  path: string; // Navigation path to the module
};
```

### ModuleCard Component
- Display module title prominently
- Show short description in a readable format
- Include "Start Reading" button that navigates to the module path
- Apply the #084d45-based styling with highlighted borders/shadows
- Implement hover animations (lift effect and enhanced shadow)

### ModuleCardsGrid Component
- Arrange 4 ModuleCard components in a responsive grid
- Use CSS Grid or Flexbox for layout
- Ensure proper spacing and alignment
- Maintain responsiveness across screen sizes

### Styling Approach
- Update CSS custom properties in `custom.css` to use #084d45 as the primary color
- Create new CSS modules for the ModuleCard and ModuleCardsGrid components
- Implement the highlighted border and shadow effect using box-shadow with color variations of #084d45
- Ensure accessibility with proper contrast ratios

## Risk Mitigation

- **Risk**: Breaking existing navigation routes
  - **Mitigation**: Use existing navigation paths from sidebar configuration; test all navigation links before deployment

- **Risk**: Performance issues with animations
  - **Mitigation**: Use CSS transforms and opacity for animations; avoid animating properties that trigger layout changes

- **Risk**: Responsive layout issues
  - **Mitigation**: Test on multiple screen sizes during development; use mobile-first approach

## Success Criteria

- [ ] Homepage displays exactly 4 module cards with real content
- [ ] Cards use existing module metadata (titles and descriptions)
- [ ] "Start Reading" buttons navigate to correct modules
- [ ] #084d45 color palette applied consistently with highlighted borders/shadows
- [ ] Smooth hover animations on cards and buttons
- [ ] Subtle hero title animation
- [ ] Fully responsive layout on desktop and mobile
- [ ] All existing functionality preserved
- [ ] No changes to documentation content
- [ ] Accessibility standards maintained