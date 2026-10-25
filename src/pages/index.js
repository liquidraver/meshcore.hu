import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {usePluginData} from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

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

// Az első elem kiemelten, mindig a lista tetején jelenik meg (lásd RepeaterBox).
const repeaterLinks = [
  {
    title: 'FONTOS DOLGOK, RÖVIDEN',
    description: 'A legfontosabb tudnivalók repeater-üzemeltetőknek, egy oldalon.',
    to: '/docs/fontos-dolgok-roviden',
    pinned: true,
  },
  {
    title: 'Repeater firmware',
    description: 'Mikor érdemes repeatert telepíteni, és mik az alapbeállítások.',
    to: '/docs/firmware/repeater',
  },
  {
    title: 'Régiószűrés',
    description: 'Hogyan döntik el a repeaterek, hogy továbbküldik-e a csomagot.',
    to: '/docs/region-filtering',
  },
  {
    title: 'Magyar csatornák',
    description: 'A jelenleg aktív magyar csatornák és a hozzájuk tartozó régiók.',
    to: '/docs/magyar-csatornak',
  },
  {
    title: 'Ajánlott szoftverek',
    description: 'Általunk kipróbált és ajánlott firmwarek, appok és térképek.',
    to: '/docs/ajanlott-szoftverek',
  },
  {
    title: 'CLI-parancsok',
    description: 'A repeater adminban használható parancsok referenciája.',
    to: '/docs/referencia/cli-parancsok',
  },
];

// A főoldali „Belevágok” gombsor melletti gomb ezt a listát mutatja meg.
const radioSettings = [
  {label: 'Frekvencia', value: '869.618 MHz'},
  {label: 'SF (Spreading Factor)', value: '7'},
  {label: 'CR (Coding Rate)', value: '5'},
  {label: 'BW (Bandwidth)', value: '62.5 kHz'},
  {label: 'Path size', value: '2 byte'},
];

function RadioSettingsModal({onClose}) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="presentation">
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="radio-settings-title">
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Bezárás">
          ×
        </button>
        <h2 id="radio-settings-title" className={styles.modalTitle}>
          📻 Jelenlegi rádióbeállítások
        </h2>
        <table className={styles.modalTable}>
          <tbody>
            {radioSettings.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.modalFooter}>
          Lásd még: <Link to="/docs/region-filtering">Régióbeállítások</Link>
        </p>
      </div>
    </div>
  );
}

const socials = [
  {name: 'Telegram', href: 'https://t.me/+T_a1IA5HyKY5OWE0', icon: '/img/telegram.svg'},
  {name: 'Discord', href: 'https://discord.gg/F62aq2FTA', icon: '/img/discord.svg'},
  {name: 'Facebook', href: 'https://www.facebook.com/groups/421299027712536', icon: '/img/facebook.svg'},
  {name: 'GitHub', href: 'https://github.com/meshcore-dev', icon: '/img/github.svg'},
];

function NewsBox() {
  const {items} = usePluginData('news-feed-plugin');
  if (!items?.length) {
    return null;
  }
  return (
    <aside className={styles.newsBox}>
      <h2 className={styles.newsTitle}>📰 Hírek</h2>
      <ul className={styles.newsList}>
        {items.slice(0, 3).map((item) => (
          <li className={styles.newsItem} key={item.permalink}>
            <Link className={styles.newsLink} to={item.permalink}>
              <time className={styles.newsDate}>{item.formattedDate}</time>
              <h3 className={styles.newsItemTitle}>{item.title}</h3>
              {item.description && <p className={styles.newsText}>{item.description}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function RepeaterBox() {
  return (
    <aside className={styles.newsBox}>
      <h2 className={styles.newsTitle}>📡 Repeater üzemeltetőknek</h2>
      <ul className={styles.newsList}>
        {repeaterLinks.map((item) => (
          <li
            className={item.pinned ? styles.pinnedItem : styles.newsItem}
            key={item.to}>
            <Link className={styles.newsLink} to={item.to}>
              <h3 className={styles.newsItemTitle}>{item.title}</h3>
              <p className={styles.newsText}>{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function HomepageHeader() {
  const [showRadioSettings, setShowRadioSettings] = useState(false);
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
          <button
            type="button"
            className="button button--outline button--secondary button--lg"
            onClick={() => setShowRadioSettings(true)}>
            Rádióbeállítások 📻
          </button>
        </div>
      </div>
      {showRadioSettings && (
        <RadioSettingsModal onClose={() => setShowRadioSettings(false)} />
      )}
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
              <div className="col col--3 margin-bottom--lg">
                <NewsBox />
              </div>
              <div className="col col--6">
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
              <div className="col col--3 margin-bottom--lg">
                <RepeaterBox />
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
