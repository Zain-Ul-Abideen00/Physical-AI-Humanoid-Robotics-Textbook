# Data Model: Book Content Expansion & Homepage Redesign

**Feature**: `002-content-expansion`
**Date**: 2025-12-07

## 1. Homepage Data (`src/data/homepage.ts`)

### Feature Card
```typescript
interface FeatureItem {
  title: string;
  icon: React.ComponentType; // Icon component
  description: JSX.Element;
  link: string;
}
```

### Learning Outcome
```typescript
interface LearningOutcome {
  title: string;
  description: string;
}
```

## 2. Expanded Chapter Structure (Markdown)

Every `docs/**/*.md` file will be normalized to:

```markdown
---
title: [Title]
description: [SEO Description]
---

# [Title]

[Introduction Paragraph: Context & Goal]

## [Section 1]
[Content]
[Mermaid Diagram if applicable]

## [Section 2]
[Content]
[Code Block with Expected Output]

## Summary
[Bullet points of key takeaways]

## What's Next?
[Link to next chapter]: "Now that you understand X, let's move on to [Y](link)."
```

## 3. Component Props

### Hero Component
- `title`: string
- `subtitle`: string
- `ctaLink`: string
- `ctaText`: string

### Hardware Card
- `title`: string
- `image`: string (path)
- `costLevel`: '$' | '$$' | '$$$'
- `description`: string
