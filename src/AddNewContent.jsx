import styles from './styles/MainContent.module.scss'
import {useState} from 'react'

export default function AddNewContent(props) {
    const [markDownText, setMarkdownText] = useState('')
    const [titleInput, setTitleInput] = useState('')

    const onClickSave = () => {
        props.contentRepo.postContent({
            title: titleInput,
            body: markDownText,
        })
    }

    return (
        <form className={styles.mainContents}>
            <div className={styles.pageHeader}>
                <input
                    type="text"
                    className={styles.titleInput}
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                />
                <button className={styles.primaryButton} onClick={onClickSave}>save</button>
            </div>

            <div className={styles.panel}>
                    <textarea
                        name="markdown"
                        className={styles.editor}
                        onChange={(e) => setMarkdownText(e.target.value)}
                        value={markDownText}
                    />
            </div>
        </form>
    )
}