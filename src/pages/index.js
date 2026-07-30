import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import news from '../data/news';
import styles from './index.module.css';

const cards = [
  {
    title: '🚀 Gyors kezdés',
    description: 'Eszköz beszerzésétől az első üzenetig — lépésről lépésre.',
    to: '/docs/gyors-kezdes',
  },
  {
    title: '📻 Firmware',
    description:
      'Companion, Repeater és Room Server — melyik mire való, és hogyan állítsd be.',
    to: '/docs/category/firmware',
  },
  {
    title: '🔧 Hardver',
    description:
      'Támogatott eszközök, antennák és tápellátás a közösség tapasztalatai alapján.',
    to: '/docs/category/hardver',
  },
  {
    title: '❓ GyIK',
    description:
      'Gyakran ismételt kérdések — hatótáv, engedélyek, összehasonlítások.',
    to: '/docs/gyik',
  },
];

const socials = [
  {name: 'Telegram', href: 'https://t.me/meshcore_hu', icon: '/img/telegram.svg'},
  {name: 'Discord', href: 'https://discord.gg/meshcore', icon: '/img/discord.svg'},
  {name: 'Facebook', href: 'https://facebook.com/meshcore.hu', icon: '/img/facebook.svg'},
  {name: 'GitHub', href: 'https://github.com/meshcore-dev', icon: '/img/github.svg'},
  {name: 'YouTube', href: 'https://youtube.com/@meshcore_hu', icon: '/img/youtube.svg'},
];

function NewsBox() {
  if (!news.length) {
    return null;
  }
  return (
    <aside className={styles.newsBox}>
      <h2 className={styles.newsTitle}>📰 Hírek</h2>
      <ul className={styles.newsList}>
        {news.map((item) => {
          const body = (
            <>
              <time className={styles.newsDate}>{item.date}</time>
              <h3 className={styles.newsItemTitle}>{item.title}</h3>
              {item.text && <p className={styles.newsText}>{item.text}</p>}
            </>
          );
          // Egyedi protokoll (pl. meshcore://) — sima <a>, hogy ne nyisson üres fület.
          const isAppLink = item.href && !/^https?:/i.test(item.href);
          return (
            <li className={styles.newsItem} key={item.date + item.title}>
              {item.to || item.href ? (
                isAppLink ? (
                  <a className={styles.newsLink} href={item.href}>
                    {body}
                  </a>
                ) : (
                  <Link className={styles.newsLink} to={item.to} href={item.href}>
                    {body}
                  </Link>
                )
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <p className={styles.eyebrow}>Közösségi rádióhálózat</p>
        <Heading as="h1" className={styles.heroTitle}>
          MeshCore Magyarország
        </Heading>
        <p className={styles.heroText}>
          Internet nélküli, titkosított üzenetküldés LoRa-hálózaton — nem kell
          mérnöknek lenned ahhoz, hogy megértsd.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/bevezetes">
            Belevágok 📡
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://map.meshcore.hu/#/live">
            Megnézem az élő térképet
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Kezdőlap" description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <section className={styles.cardsSection}>
          <div className="container">
            <div className="row">
              <div className="col col--4 margin-bottom--lg">
                <NewsBox />
              </div>
              <div className="col col--8">
                <div className="row">
                  {cards.map((card) => (
                    <div className="col col--6 margin-bottom--lg" key={card.to}>
                      <Link className="homepage-card" to={card.to}>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.socialRow}>
              <p className={styles.socialTitle}>Csatlakozz hozzánk</p>
              <div className="footer-social">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} title={s.name} target="_blank" rel="noopener noreferrer">
                    <img src={s.icon} alt={s.name} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
