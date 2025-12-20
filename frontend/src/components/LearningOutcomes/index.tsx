import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { LearningOutcomesList } from '../../data/homepage';

function OutcomeItem({title, description, Icon}: any) {
  return (
    <div className={clsx('col col--3')}>
      <div className={clsx(styles.outcomeCard, 'text--center')}>
        <Icon className={styles.outcomeIcon} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function LearningOutcomes(): JSX.Element {
  return (
    <section className={styles.outcomes}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">Learning Outcomes</h2>
        <div className="row">
          {LearningOutcomesList.map((props, idx) => (
            <OutcomeItem key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
