import { AppBar, MarketingFooter } from '@/components'
import { BookOpen, ChevronRight, Layers, Music, Sparkles, Zap } from 'lucide-react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { FeatureCard, FeaturedSongsPreview, SideDotNav } from './components'
import styles from './home.module.css'

export default function Home() {
  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealActive)
          }
        })
      },
      { threshold: 0.12 },
    )

    const selectors = [
      `.${styles.revealOnScroll}`,
      `.${styles.revealLeft}`,
      `.${styles.revealRight}`,
      `.${styles.revealZoom}`,
    ].join(',')

    const elements = document.querySelectorAll(selectors)
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const navSections = [
    { id: 'hero-section', label: 'Hero' },
    { id: 'features-section', label: 'Features' },
    { id: 'theory-section', label: 'Theory' },
    { id: 'cta-section', label: 'Play' },
  ]

  return (
    <div className={styles.pageContainer}>
      <SideDotNav sections={navSections} />

      <div className={styles.contentWrapper}>
        <AppBar />

        {/* HERO SECTION */}
        <div id="hero-section" className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={`${styles.heroLeft} ${styles.revealLeft}`}>
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
              <div className={`${styles.heroRight} ${styles.revealRight} ${styles.delay2}`}>
                <div className={styles.glowBackground} />
                <div className={`${styles.glassCard} ${styles.previewContainer}`}>
                  <FeaturedSongsPreview className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div id="features-section" className={styles.featuresSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealOnScroll}`}>
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
                className={`${styles.revealOnScroll} ${styles.delay1}`}
              />
              <FeatureCard
                icon={Layers}
                title={t('home.why.feature2_title')}
                description={t('home.why.feature2_desc')}
                className={`${styles.revealOnScroll} ${styles.delay2}`}
              />
              <FeatureCard
                icon={Music}
                title={t('home.why.feature3_title')}
                description={t('home.why.feature3_desc')}
                className={`${styles.revealOnScroll} ${styles.delay3}`}
              />
            </div>
          </div>
        </div>

        {/* THEORY SECTION */}
        <div id="theory-section" className={styles.theorySection}>
          <div className={styles.container}>
            <div className={styles.theoryGrid}>
              <div className={`${styles.glassCard} ${styles.theoryCard} ${styles.revealLeft}`}>
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
              <div className={`${styles.theoryTextContent} ${styles.revealRight} ${styles.delay2}`}>
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
        <div id="cta-section" className={styles.ctaSection}>
          <div className={styles.ctaGradientOverlay} />
          <div className={`${styles.container} ${styles.ctaContent} ${styles.revealZoom}`}>
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
