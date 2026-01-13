import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx("hero__title", styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx("hero__subtitle", styles.heroSubtitle)}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Enter the Wiki
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description, link}: {title: string; description: string; link: string}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link className="button button--primary" to={link}>
          Explore
        </Link>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="D&D 5E Campaign Wiki for The Aeternum Crisis and The Plagas Prophecy">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <Feature
                title="Aeternum"
                description="The continent of four great houses, ancient magic, and political intrigue. Home of The Aeternum Crisis campaign."
                link="/docs/aeternum"
              />
              <Feature
                title="Gul'Rath"
                description="The eastern continent of trading empires, yuan-ti serpent folk, dwarven holds, and the mysterious Magisterium."
                link="/docs/gulrath"
              />
              <Feature
                title="Plagas"
                description="A wild jungle archipelago of leonin tribes, colonial settlements, and titanic beasts. Setting of The Plagas Prophecy."
                link="/docs/plagas"
              />
              <Feature
                title="The Pantheon"
                description="Gods, titans, and divine beings. From the ascended demigods of Aeternum to the primordial forces of creation."
                link="/docs/gods"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
