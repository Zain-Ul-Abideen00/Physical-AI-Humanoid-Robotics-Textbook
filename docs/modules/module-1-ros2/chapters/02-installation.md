---
title: Installation & Setup
description: Setting up ROS 2 Humble on Ubuntu 22.04.
sidebar_position: 2
tags: [ros2, installation, ubuntu]
---

# Installation & Setup

## Prerequisites

- Ubuntu 22.04 LTS (Jammy Jellyfish)
- UTF-8 Locale

## Installation Steps

1. **Set Locale**
   ```bash
   locale  # check for UTF-8

   sudo apt update && sudo apt install locales
   sudo locale-gen en_US.UTF-8
   sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
   export LANG=en_US.UTF-8
   ```

2. **Add ROS 2 GPG Key and Repository**
   ```bash
   sudo apt install software-properties-common
   sudo add-apt-repository universe
   sudo apt update && sudo apt install curl -y
   sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
   ```

3. **Install ROS 2 packages**
   ```bash
   sudo apt update
   sudo apt install ros-humble-desktop
   ```

4. **Environment Setup**
   Add this to your `.bashrc`:
   ```bash
   source /opt/ros/humble/setup.bash
   ```

## Expected Output

After sourcing the setup file, you can verify the installation:

```bash
printenv | grep ROS
```

Output should contain variables like `ROS_VERSION=2`, `ROS_PYTHON_VERSION=3`, `ROS_DISTRO=humble`.

## Summary

You have successfully installed ROS 2 Humble. Your system is now ready for robotics development.

## What's Next?

Now that your environment is ready, let's start [Writing Code](./04-writing-code.md) to create your first ROS 2 nodes.