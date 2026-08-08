import { AppBar, MarketingFooter } from '@/components'
import { BookOpen, ChevronRight, Layers, Music, Sparkles, Zap } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { FeatureCard, FeaturedSongsPreview } from './components'
import styles from './home.module.css'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <AppBar />

        {/* HERO SECTION */}
        <div className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroLeft}>
                <div className={styles.badge}>
                  <Sparkles size={16} />
                  <span>{t('home.hero.standard_badge')}</span>
                </div>
                <h1 className={styles.heroTitle}>
                  {t('home.hero.title')}
                </h1>
                <h3 className={styles.heroSubtitle}>
                  {t('home.hero.subtitle')}
                </h3>
                <div className={styles.ctaButtons}>
                  <Link to="/songs" className={styles.btnPrimary}>
                    <span>{t('home.learn_song')}</span>
                    <Music size={18} />
                  </Link>
                  <Link to="/freeplay" className={styles.btnSecondary}>
                    <span>{t('home.free_play')}</span>
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
              <div className={styles.heroRight}>
                <div className={styles.glowBackground} />
                <div className={`${styles.glassCard} ${styles.previewContainer}`}>
                  <FeaturedSongsPreview className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className={styles.featuresSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {t('home.why.title')}
              </h2>
              <p className={styles.sectionSubtitle}>{t('home.why.subtitle')}</p>
            </div>

            <div className={styles.featuresGrid}>
              <FeatureCard
                icon={Zap}
                title={t('home.why.feature1_title')}
                description={t('home.why.feature1_desc')}
              />
              <FeatureCard
                icon={Layers}
                title={t('home.why.feature2_title')}
                description={t('home.why.feature2_desc')}
              />
              <FeatureCard
                icon={Music}
                title={t('home.why.feature3_title')}
                description={t('home.why.feature3_desc')}
              />
            </div>
          </div>
        </div>

        {/* THEORY SECTION */}
        <div className={styles.theorySection}>
          <div className={styles.container}>
            <div className={styles.theoryGrid}>
              <div className={`${styles.glassCard} ${styles.theoryCard}`}>
                <div className={styles.theoryGlow} />
                <div className={styles.cardInner}>
                  <div className={styles.noteContainer}>
                    <div className={`${styles.noteBox} ${styles.noteCyan}`}>
                      <span className={styles.noteCyanText}>C</span>
                    </div>
                    <div className={`${styles.noteBox} ${styles.notePink}`}>
                      <span className={styles.notePinkText}>D</span>
                    </div>
                    <div className={`${styles.noteBox} ${styles.noteGreen}`}>
                      <span className={styles.noteGreenText}>E</span>
                    </div>
                  </div>
                  <div className={styles.dividerBar} />
                  <p className={styles.codeSnippet}>
                    import {'{ Note }'} from 'music-theory'
                  </p>
                </div>
              </div>
              <div className={styles.theoryTextContent}>
                <h2 className={styles.sectionTitle}>
                  {t('home.theory.title')}
                </h2>
                <p className={styles.heroSubtitle}>
                  {t('home.theory.desc')}
                </p>
                <div>
                  <Link to="/theory" className={styles.theoryLink}>
                    <BookOpen size={20} />
                    <span>{t('home.theory.button')}</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaGradientOverlay} />
          <div className={`${styles.container} ${styles.ctaContent}`}>
            <h2 className={styles.ctaTitle}>
              {t('home.cta.title')}
            </h2>
            <p className={styles.ctaDescription}>
              {t('home.cta.desc')}
            </p>
            <Link to="/freeplay" className={styles.btnPrimary}>
              {t('home.cta.button')}
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footerWrapper}>
        <MarketingFooter />
      </div>
    </div>
  )
}
