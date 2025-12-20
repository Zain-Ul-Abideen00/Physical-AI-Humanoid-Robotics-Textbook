import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { FeatureItem } from '../../data/homepage';

export default function FeatureCard({title, Icon, description, link}: FeatureItem) {
  return (
    <Link to={link} className={styles.featureLink}>
      <div className="text--center">
        <Icon className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}
