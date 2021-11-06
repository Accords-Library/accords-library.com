import styles from 'styles/Panels/SubPanel.module.css'
import panelStyles from 'styles/Panels/Panels.module.css'

export default function SubPanel({children}) {
  return (
    <div className={[panelStyles.panel, styles.panel].join(' ')}>
      {children}
    </div>
  )
}