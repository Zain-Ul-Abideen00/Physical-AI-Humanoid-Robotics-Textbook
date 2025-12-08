import React from 'react';
import styles from './styles.module.css';
import HardwareCard from './HardwareCard';
import { HardwareList } from '../../data/homepage';

export default function HardwareRequirements(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center margin-bottom--md">Hardware Tracks</h2>
        <p className="text--center margin-bottom--lg">Choose the lab setup that fits your budget and goals.</p>
        <div className="row">
          {HardwareList.map((props, idx) => (
            <HardwareCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
