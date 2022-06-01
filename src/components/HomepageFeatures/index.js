import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


const FeatureList = [
  {
    title: 'Tokens',
    img: '/img/token.png',
    link: './aragonOS/token-manager',
    description: (
      <>
      Create and manage tokens; distributing reputation, granting membership or augmenting governance rights using the Token-Manager.
      </>
    ),
  },
  {
    title: 'Voting',
    img: '/img/voting.png',
    link: './aragonOS/voting',
    description: (
      <>
        Make decisions collectively via token-weighted voting. Streamline your governance and unlock the full potential of DeGov.
      </>
    ),
  },
  {
    title: 'Treasury',
    img: '/img/treasury.png',
    link: './aragonOS/finance',
    description: (
      <>
      Manage your finances, create budgets, scheduled payments and disburse funds to your DAO members. EVMcrispr can help you get it all done.
      </>
    ),
  },
];

function Feature({img, title,link, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={link}><img src={img} className={styles.featureSvg} /></a>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
