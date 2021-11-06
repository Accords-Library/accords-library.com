import styles from 'styles/Panels/ContentPanel.module.css'
import panelStyles from 'styles/Panels/Panels.module.css'

export default function ContentPanel({children}) {
  return (
    <div className={[panelStyles.panel, styles.panel].join(' ')}>
      <main className={styles.panelInside}>
        {children}
      </main>
    </div>
  )
}