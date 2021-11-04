import MainMenu from './mainmenu'
import SubMenu from './submenu'
import styles from '../styles/menu.module.css'

export default function Menu() {
  return (
    <div className={styles.container}>
        <MainMenu></MainMenu>
        <SubMenu></SubMenu>
    </div>
  )
}




