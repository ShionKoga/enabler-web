import classNames from 'classnames'
import styles from './styles/SideBar.module.scss'

export default function SideBar(props) {

    return (
        <div className={styles.sideBar}>
            {props.contents.map((content, index) => (
                <div
                    key={content.id}
                    className={props.selectedIndex === index && !props.selectAddNew
                        ? classNames(styles.title, styles.selected)
                        : styles.title
                    }
                    onClick={() => props.onSelect(index)}
                >
                    <div className={styles.titleContainer}>{content.title}</div>
                </div>
            ))}
            <div
                className={props.selectAddNew
                    ? classNames(styles.addNew, styles.selected)
                    : styles.addNew
                }
                onClick={props.onSelectShowAddNew}
            >＋新しいコンテンツを追加</div>
        </div>
    )
}


