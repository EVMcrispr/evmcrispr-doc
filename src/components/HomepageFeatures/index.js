import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


const FeatureList = [
  {
    title: 'AragonOS Ready',
    Svg: require('@site/static/img/Aragon_Logo1.svg').default,
    description: (
      <>
        Optimize your Aragon DAO operations. EVMcrispr is tailor made to be used with AragonOS Apps.
      </>
    ),
  },
  {
    title: 'Evolve your DAO tooling',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Install and modify apps, streamline your governance and unlock the full potential of DeGov.
      </>
    ),
  },
  {
    title: 'Accessible for all',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Create powerful and complex EVM scripts without needing to be a developer. EVMcrispr is open-source and easy to use.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
