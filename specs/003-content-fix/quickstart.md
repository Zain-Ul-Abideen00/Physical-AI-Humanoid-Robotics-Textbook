# Quickstart: Content Fix Verification

**Feature**: `003-content-fix`
**Date**: 2025-12-07

## Weekly Schedule Verification

1. **Start Development Server**: `npm start`
2. **Navigate to specific weeks**:
   - `/docs/weeks/week-01` -> Verify "Introduction to Physical AI" content.
   - `/docs/weeks/week-03` -> Verify "ROS 2 Fundamentals" content.
   - `/docs/weeks/week-06` -> Verify "Robot Simulation with Gazebo" content.
   - `/docs/weeks/week-08` -> Verify "NVIDIA Isaac Platform" content.
   - `/docs/weeks/week-11` -> Verify "Humanoid Robot Development" content.
   - `/docs/weeks/week-13` -> Verify "Conversational Robotics" content.
3. **Check Titles**: Ensure page titles (`# Week XX: ...`) match the week's content.

## Hardware Guide Verification

1. **Navigate to Hardware Guide**: `/docs/hardware/intro`
2. **Verify Content**: Check for detailed sections:
   - "The 'Digital Twin' Workstation" with GPU/CPU/RAM details.
   - "The 'Physical AI' Edge Kit" with Jetson, RealSense, etc.
   - "The Robot Lab" with Options A, B, C.
   - "Summary of Architecture" table.
   - "The 'Ether' Lab (Cloud-Native)" details.
   - "The Economy Jetson Student Kit" table.
   - "The Latency Trap (Hidden Cost)" section.
3. **Check Formatting**: Ensure tables are correctly rendered and code blocks are formatted.

## Build Check

1. **Run Build**: `npm run build`
2. **Verify No Errors**: Ensure the build completes with 0 errors and 0 broken links.
3. **Run Lint**: `npm run lint:md`
4. **Verify No Warnings/Errors**: Ensure all markdown files pass linting.