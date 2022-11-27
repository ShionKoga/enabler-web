import styles from './MainContent.module.scss'
import {useState} from 'react'
import axios from 'axios'

export default function AddNewContent(props) {
    const [markDownText, setMarkdownText] = useState('')
    const [titleInput, setTitleInput] = useState('')

    const onClickSave = () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        axios.post(serverUrl + '/api/content', {
            id: props.lastId,
            title: titleInput,
            body: markDownText,
        })
            .then(res => {
                console.log("success", res.status)
            })
            .catch(err => {
                console.log(err)
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
                <button className={styles.editButton} onClick={onClickSave}>save</button>
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