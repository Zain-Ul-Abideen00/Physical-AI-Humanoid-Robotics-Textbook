import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Hero from '../components/Hero/Hero';
import HomepageFeatures from '../components/HomepageFeatures';
import LearningOutcomes from '../components/LearningOutcomes';
import HardwareRequirements from '../components/HomepageFeatures/HardwareRequirements';
import styles from './index.module.css';
import { WhyPhysicalAI } from '../data/homepage';

function WhySection() {
  return (
    <section className={styles.whySection}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">Why Physical AI Matters</h2>
        <div className="row">
          {WhyPhysicalAI.map((item, idx) => (
            <div key={idx} className="col col--4">
              <div className="text--center padding--md">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="A comprehensive resource for learning physical AI and humanoid robotics.">
      <Hero />
      <main>
        <HomepageFeatures />
        <WhySection />
        <LearningOutcomes />
        <HardwareRequirements />
      </main>
    </Layout>
  );
}