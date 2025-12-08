import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { HardwareItem } from '../../data/homepage';

export default function HardwareCard({title, description, image, cost}: HardwareItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.hardwareCard}>
        <div className={styles.hardwareImageContainer}>
          <img src={image} alt={title} className={styles.hardwareImage} />
          <span className={styles.costBadge}>{cost}</span>
        </div>
        <div className="padding--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
