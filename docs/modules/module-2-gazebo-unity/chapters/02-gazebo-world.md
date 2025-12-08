---
title: Gazebo World File
description: Example of a Gazebo world file in XML.
sidebar_position: 2
tags: [gazebo, simulation, xml]
---

# Gazebo World File

## Basic World

A simple world with a ground plane and a sun.

```xml
<?xml version="1.0" ?>
<sdf version="1.6">
  <world name="default">
    <!-- A global light source -->
    <include>
      <uri>model://sun</uri>
    </include>
    <!-- A ground plane -->
    <include>
      <uri>model://ground_plane</uri>
    </include>
  </world>
</sdf>
```

## Spawning a Robot (URDF/SDF)

To spawn a model in Gazebo, you can use the `ros_gz_sim` package or include it directly in the world file if it's static.

```xml
<include>
  <uri>model://my_robot</uri>
  <pose>0 0 0 0 0 0</pose>
</include>
```

**Expected Output:**
When you run this world file in Gazebo, you should see a 3D environment with a sun light source and an infinite ground plane. If you added the robot include, your robot model should appear at the origin.

## Summary

SDF files define the environment your robot interacts with. Mastering them is key to creating useful simulations.

## What's Next?

With a world ready, let's add some intelligence. Move on to [Module 3: NVIDIA Isaac](../../module-3-isaac/intro.md) to explore AI-driven robotics, or review [ROS 2 Basics](../../module-1-ros2/intro.md) if you need a refresher on nodes.
