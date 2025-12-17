# Physical AI & Humanoid Robotics Textbook

![Project Banner](static/img/docusaurus-social-card.jpg)

**Focus and Theme**: AI Systems in the Physical World. Embodied Intelligence.
**Goal**: Bridging the gap between the digital brain and the physical body.

This is the source repository for the **Physical AI & Humanoid Robotics Textbook**, a comprehensive interactive guide for students and researchers. It covers the full stack of embodied AI, from ROS 2 middleware to NVIDIA Isaac Sim and Vision-Language-Action (VLA) models.

## 📚 Syllabus Overview

The textbook is structured into four core modules and a 13-week curriculum:

*   **Module 1: The Robotic Nervous System (ROS 2)** - Middleware, Nodes, Topics, and URDF.
*   **Module 2: The Digital Twin (Gazebo & Unity)** - Physics simulation, environment building, and sensor simulation.
*   **Module 3: The AI-Robot Brain (NVIDIA Isaac)** - Perception, VSLAM, Navigation, and Isaac Sim.
*   **Module 4: Vision-Language-Action (VLA)** - LLMs in robotics, voice commands (Whisper), and cognitive planning.

## 🛠️ Tech Stack

This website is built using **[Docusaurus 3.9](https://docusaurus.io/)**, a modern static website generator tailored for documentation.

*   **Framework**: React, TypeScript
*   **Content**: Markdown/MDX
*   **Diagrams**: Mermaid.js
*   **Styling**: Infima / CSS Modules

## Quick Start

### Backend (FastAPI + RAG)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    uv sync
    ```

3.  Set up environment variables:
    ```bash
    cp .env.example .env
    # Add your API keys (GEMINI_API_KEY, QDRANT_URL, etc.)
    ```

4.  Run the backend server:
    ```bash
    uv run uvicorn main:app --reload
    ```
    API will be available at [http://localhost:8000](http://localhost:8000).

### Frontend (Docusaurus)

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm start
    ```
    Website will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

Generate static content into the `build` directory:

```bash
npm run build
```

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
