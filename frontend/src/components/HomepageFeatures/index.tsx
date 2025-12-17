import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import FeatureCard from './FeatureCard';
import { FeatureList } from '../../data/homepage';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center margin-bottom--md">Curriculum Modules</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <FeatureCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}