---
title: Simulation Basics
description: Why we simulate robots before building them.
sidebar_position: 1
tags: [simulation, gazebo, digital-twin]
---

# Simulation Basics

## Why Simulate?

Simulation is a critical step in robotics development. It allows us to:
- **Test safely**: Crash a virtual robot without costing thousands of dollars.
- **Develop faster**: Iterate on code without waiting for hardware batteries to charge.
- **Scale**: Train AI agents on thousands of instances simultaneously.

## The Digital Twin

A "Digital Twin" is a virtual representation that serves as the real-time digital counterpart of a physical object or process. In robotics, this means a simulation that closely matches the physics, visuals, and sensor characteristics of the real robot. It connects directly to the [ROS 2 Nodes](../../module-1-ros2/intro.md) you built in Module 1.

## Diagram: Digital Twin Architecture

```mermaid
sequenceDiagram
    participant User
    participant ROS2 as ROS 2 Nodes
    participant Bridge as ros_gz_bridge
    participant Gazebo as Gazebo Sim
    participant Unity as Unity Visualizer

    User->>ROS2: Send Velocity Command (cmd_vel)
    ROS2->>Bridge: Publish /cmd_vel
    Bridge->>Gazebo: Forward Command
    Gazebo->>Gazebo: Physics Step (Move Robot)
    Gazebo->>Bridge: Return Sensor Data (Lidar/Camera)
    Bridge->>ROS2: Publish /scan /image_raw
    ROS2->>Unity: TCP/IP Stream (Visualization)
    Unity->>User: Render High-Fidelity Scene
```

## Tools We Will Use

- **Gazebo**: The de-facto standard open-source physics simulator for ROS.
- **Unity**: A game engine providing high-fidelity rendering and XR capabilities.

## Summary

We simulate to save time, money, and ensure safety. The Digital Twin concept integrates simulation deeply into the development lifecycle.

## What's Next?

Learn how to define your environment by creating a [Gazebo World File](./02-gazebo-world.md).
