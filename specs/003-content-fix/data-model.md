# Data Model: Fix Content Duplication & Expand Hardware

**Feature**: `003-content-fix`
**Date**: 2025-12-07

## 1. Weekly Page Structure (`docs/weeks/week-XX.md`)

```markdown
---
title: Week XX - <Week Topic>
sidebar_position: <XX>
description: <Concise summary of the week's content.>
---

# Week XX: <Week Topic>

## Goals for this Week
- [Goal 1]
- [Goal 2]

## Schedule

| Day | Topic | Resource |
|-----|-------|----------|
| Mon | ...   | ...      |
| Wed | ...   | ...      |
| Fri | ...   | ...      |

## Assignments
- [ ] Assignment 1
- [ ] Assignment 2
```

## 2. Hardware Guide Structure (`docs/hardware/intro.md`)

The file will contain sections mapped directly from the source document:

- `# Hardware Requirements` (Main Heading)
    - `## 1. The "Digital Twin" Workstation`
        - GPU, CPU, RAM, OS details.
    - `## 2. The "Physical AI" Edge Kit`
        - Components (Jetson, RealSense, IMU, Microphone).
    - `## 3. The Robot Lab`
        - `### Option A: The "Proxy" Approach`
        - `### Option B: The "Miniature Humanoid" Approach`
        - `### Option C: The "Premium" Lab`
    - `## 4. Summary of Architecture` (Table)
    - `### Option 2 High OpEx: The "Ether" Lab (Cloud-Native)`
    - `### The Economy Jetson Student Kit` (Table)
    - `### The Latency Trap (Hidden Cost)`
