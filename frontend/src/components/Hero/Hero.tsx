import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Hero() {
  return (
    <header className="aurora-bg" style={{ padding: '10rem 0 8rem 0' }}>
      {/* Grid Overlay for Tech Feel */}
      <div className="tech-grid-overlay" />

      <div className="container hero-content-layer">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <h1 className="hero-title-modern">
            The Future is <br />
            <span>Physical AI</span>
          </h1>

          <p className="hero-subtitle-modern">
            From Code to Reality. The Open Source Curriculum for <br/>
            <strong>Humanoid Robotics</strong> and <strong>VLA Models</strong>.
          </p>

          <div className={styles.buttons} style={{ gap: '2rem' }}>
            <Link
              className="cyber-button"
              to="/docs/modules/module-1-ros2/intro">
              Start Learning
            </Link>

            <Link
              className="secondary-button-glass"
              to="https://github.com/your-repo">
              <span style={{ marginRight: '10px' }}>★</span> Star on GitHub
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
