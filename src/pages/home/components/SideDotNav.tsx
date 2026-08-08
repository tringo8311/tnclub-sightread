import React, { useEffect, useState } from 'react'
import styles from '../home.module.css'

interface Section {
  id: string
  label: string
}

interface SideDotNavProps {
  sections: Section[]
}

export function SideDotNav({ sections }: SideDotNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={styles.dotNav} aria-label="Page navigation">
      {sections.map((section) => {
        const isActive = activeSection === section.id
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`${styles.dotItem} ${isActive ? styles.dotActive : ''}`}
            aria-label={`Scroll to ${section.label}`}
          >
            <span className={styles.dotCircle} />
            <span className={styles.dotTooltip}>{section.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
