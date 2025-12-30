# Homepage UI Components Documentation

## Overview
This documentation describes the new components created for the homepage UI featuring 4 module cards with the #084d45 color palette.

## Components

### ModuleCard
- **Location**: `src/components/ModuleCard/index.tsx`
- **Purpose**: Displays a single module with title, description, and navigation button
- **Props**:
  - `title`: string - Module title
  - `description`: string - Module description
  - `path`: string - Navigation path to the module
- **Features**:
  - Hover animation with lift effect and enhanced shadow
  - #084d45 color palette styling
  - Responsive design
  - Accessible button with focus states

### ModuleCardsGrid
- **Location**: `src/components/ModuleCardsGrid/index.tsx`
- **Purpose**: Arranges multiple ModuleCard components in a responsive grid
- **Props**:
  - `modules`: ModuleItem[] - Array of module objects
- **Features**:
  - Responsive grid layout (1 column on mobile, 2 on tablet, 4 on desktop)
  - Consistent spacing and alignment

### Module Data
- **Location**: `src/data/modules.ts`
- **Purpose**: Contains the 4 module definitions with titles, descriptions, and paths
- **Structure**: ModuleItem[] array with title, description, and path properties

### Type Definitions
- **Location**: `src/types/module.ts`
- **Purpose**: Defines the ModuleItem type interface
- **Structure**: { title: string, description: string, path: string }

## Styling
- Primary color: #084d45 with derived shades for different states
- Hover effects: Subtle lift and enhanced shadow glow
- Animations: CSS-based for performance
- Responsive: Adapts to different screen sizes