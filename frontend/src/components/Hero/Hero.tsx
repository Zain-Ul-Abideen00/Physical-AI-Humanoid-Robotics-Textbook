import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Hero() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Master Physical AI & Humanoid Robotics</h1>
        <p className="hero__subtitle">
          A comprehensive, open-source curriculum to build the next generation of intelligent robots. 
          From ROS 2 fundamentals to VLA models on edge hardware.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/modules/module-1-ros2/intro">
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}
