import React from 'react'
import styles from '../home.module.css'

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className = '',
}: {
  icon: React.ElementType
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={`${styles.glassCard} ${styles.featureCard} ${className}`}>
      <div className={styles.cardGlowOverlay} />
      <div className={styles.cardInner}>
        <div className={styles.iconWrapper}>
          <Icon size={24} />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  )
}
