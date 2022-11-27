import classNames from 'classnames'
import styles from './SideBar.module.scss'

export default function SideBar(props) {

    return (
        <div className={props.expand
            ? classNames(styles.sideBar, styles.expand)
            : styles.sideBar}
        >
            {props.contents.map(content => (
                <div
                    key={content.id}
                    className={props.selectedId === content.id && !props.selectAddNew
                        ? classNames(styles.title, styles.selected)
                        : styles.title
                    }
                    onClick={() => props.onSelect(content.id)}
                >{content.title}</div>
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


