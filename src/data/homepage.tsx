import React from 'react';
import { IconType } from 'react-icons';
import { FaRobot, FaLayerGroup, FaBrain, FaEye, FaCheckCircle, FaUniversity, FaMicrochip, FaCloud } from 'react-icons/fa';

export interface FeatureItem {
  title: string;
  Icon: IconType;
  description: JSX.Element;
  link: string;
}

export interface LearningOutcome {
  title: string;
  description: string;
  Icon: IconType;
}

export interface HardwareItem {
  title: string;
  description: string;
  image: string;
  cost: string;
}

export const FeatureList: FeatureItem[] = [
  {
    title: 'Module 1: ROS 2',
    Icon: FaRobot,
    description: (
      <>
        Master the Robotic Nervous System. Nodes, topics, services, and actions in ROS 2 Humble.
      </>
    ),
    link: '/docs/modules/module-1-ros2/intro',
  },
  {
    title: 'Module 2: Gazebo & Unity',
    Icon: FaLayerGroup,
    description: (
      <>
        Build Digital Twins. Simulate physics and visualize robot behavior before touching hardware.
      </>
    ),
    link: '/docs/modules/module-2-gazebo-unity/intro',
  },
  {
    title: 'Module 3: NVIDIA Isaac',
    Icon: FaBrain,
    description: (
      <>
        The AI-Robot Brain. Leverage Isaac Sim and Isaac ROS for high-performance perception and learning.
      </>
    ),
    link: '/docs/modules/module-3-isaac/intro',
  },
  {
    title: 'Module 4: VLA Models',
    Icon: FaEye,
    description: (
      <>
        Vision-Language-Action. Deploy multimodal foundation models like RT-2 and PaLM-E.
      </>
    ),
    link: '/docs/modules/module-4-vla/intro',
  },
];

export const LearningOutcomesList: LearningOutcome[] = [
  {
    title: 'Full-Stack Robotics',
    description: 'Build end-to-end robotic applications from hardware drivers to high-level AI planning.',
    Icon: FaUniversity,
  },
  {
    title: 'Simulation Mastery',
    description: 'Create photorealistic digital twins to train and test robots safely.',
    Icon: FaLayerGroup,
  },
  {
    title: 'AI Integration',
    description: 'Deploy state-of-the-art VLA models and reinforcement learning agents on edge hardware.',
    Icon: FaBrain,
  },
  {
    title: 'Production Ready',
    description: 'Learn best practices for ROS 2 lifecycle, testing, and deployment.',
    Icon: FaCheckCircle,
  },
];

export const HardwareList: HardwareItem[] = [
  {
    title: 'Cloud "Ether Lab"',
    description: 'Zero-install, browser-based environment. Perfect for getting started immediately.',
    image: '/img/hardware/ether-lab.jpg',
    cost: '$205 per quarter',
  },
  {
    title: 'Economy Jetson Kit',
    description: 'Affordable physical track using NVIDIA Jetson Orin Nano and basic sensors.',
    image: '/img/hardware/jetson-kit.jpg',
    cost: '$700',
  },
  {
    title: '3-Robot Lab',
    description: 'Advanced university-style setup with Quadruped (Go2), Manipulator, and Mobile Base.',
    image: '/img/hardware/robot-lab.jpg',
    cost: '$$1,800 – $3,000',
  },
];

export const WhyPhysicalAI: { title: string; description: string }[] = [
  {
    title: 'Bridging the Gap',
    description: 'Physical AI connects the reasoning power of LLMs with the physical actuation of robots.',
  },
  {
    title: 'Embodied Intelligence',
    description: 'Move beyond text generation to generating motion and interaction in the real world.',
  },
  {
    title: 'The Next Frontier',
    description: 'Robotics is the next major platform shift for AI, enabling autonomous agents in our daily lives.',
  },
];
