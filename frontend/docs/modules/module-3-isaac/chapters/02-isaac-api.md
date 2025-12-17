---
title: Isaac Python API
description: Using the Isaac Python API for simulation control.
sidebar_position: 2
tags: [isaac, python, simulation]
---

# Isaac Python API

## Loading a Stage

```python
from omni.isaac.kit import SimulationApp

simulation_app = SimulationApp({"headless": False})

from omni.isaac.core import World
from omni.isaac.core.objects import DynamicCuboid
import numpy as np

my_world = World(stage_units_in_meters=1.0)
my_world.scene.add_default_ground_plane()

cube = my_world.scene.add(
    DynamicCuboid(
        prim_path="/World/Cube",
        name="cube",
        position=np.array([0, 0, 1.0]),
        scale=np.array([0.5, 0.5, 0.5]),
        color=np.array([1.0, 0, 0]),
    )
)

my_world.reset()

while simulation_app.is_running():
    my_world.step(render=True)

simulation_app.close()
```

**Expected Output:**
An Isaac Sim window opens, displaying a red cube resting on a ground plane.

## Isaac ROS YAML Configuration

Example configuration for `isaac_ros_visual_slam`.

```yaml
/**:
  ros__parameters:
    enable_rectified_pose: true
    denoise_input_images: false
    rectified_images: true
    base_frame: "base_link"
    enable_debug_mode: false
    # ...
```

## Summary

The Python API gives you full control over the simulation lifecycle, allowing for automated testing and training scenarios.

## What's Next?

Now that we have a smart robot, let's look at the future of interaction. Proceed to [Module 4: VLA](../../module-4-vla/intro.md).
