import styles from './styles/Header.module.scss'

export default function Header(props) {
    return (
        <header className={styles.header}>
            <div className={styles.title}>{props.title}</div>
        </header>
    )
}