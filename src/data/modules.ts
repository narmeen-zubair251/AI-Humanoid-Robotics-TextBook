import type {ModuleItem} from '@site/src/types/module';

// Module data extracted from sidebar configuration
export const moduleData: ModuleItem[] = [
  {
    title: 'Module 01 - ROS 2',
    description: 'Learn about Robot Operating System 2, the next generation of ROS for building robotic applications. Think of ROS 2 as the central nervous system for your robots, allowing different parts to communicate and coordinate seamlessly.',
    path: '/docs/module-01-ros2/chapter-01-introduction/',
  },
  {
    title: 'Module 02 - Digital Twin',
    description: 'Explore digital twin technology for robotics simulation and development. Understand how Gazebo and Unity create comprehensive Digital Twin solutions for safe, efficient, and innovative humanoid robot development.',
    path: 'docs/digital-twin-intro', 
  },
  {
    title: 'Module 03 - AI-Robot Brain (NVIDIA Isaac™)',
    description: 'Discover cutting-edge AI-powered robotics using the NVIDIA Isaac™ platform. Learn how Isaac™ serves as the powerful core of the AI-Robot Brain, intelligent training processes, and fully autonomous robot behavior.',
    path: '/docs/module-03-isaac/',
  },
  {
    title: 'Module 04 - Vision-Language-Action (VLA)',
    description: 'Understand Vision-Language-Action models for advanced robotic perception and control. Explore how LLMs enable robots to bridge the gap between high-level human commands and low-level robot control.',
    path: '/docs/module-04-vla/',
  },
];