import styles from './Header.module.scss'
import sideBarLeft from './sidebarLeft.png'

export default function Header(props) {
    return (
        <header className={styles.header}>
            <button className={styles.sideBarButton} onClick={props.onClickSideBarButton}>
                <img src={sideBarLeft} alt="sideBarLeft" className={styles.sideBarImage}/>
            </button>
            <div className={styles.title}>{props.title}</div>
        </header>
    )
}