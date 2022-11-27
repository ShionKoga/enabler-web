import classNames from 'classnames'
import styles from './MainContent.module.scss'
import ReactMarkdown from 'react-markdown'
import {useEffect, useState} from 'react'
import axios from 'axios'


export default function MainContent(props) {
    const [pageEditMode, setPageEditMode] = useState(false)
    const [content, setContent] = useState(undefined)
    const [markDownText, setMarkdownText] = useState('')
    const [titleInput, setTitleInput] = useState('')

    useEffect(() => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        axios.get(serverUrl + '/api/content/' + props.contentId)
            .then(res => {
                setContent(res.data)
                setMarkdownText(res.data.body)
                setTitleInput(res.data.title)
            })
    }, [props])

    const onClickEditButton = () => {
        setPageEditMode(!pageEditMode)
    }

    const onChangeTitleText = (event) => {
        setTitleInput(event.target.value)
    }

    const onChangeBodyText = (event) => {
        setMarkdownText(event.target.value)
    }

    return (
        <div className={styles.mainContents}>
            <div className={styles.pageHeader}>
                <h2 className={pageEditMode ? classNames(styles.pageTitle, styles.displayNone) : styles.pageTitle}>
                    {titleInput}
                </h2>
                <input
                    type="text"
                    className={pageEditMode ? styles.titleInput : classNames(styles.titleInput, styles.displayNone)}
                    value={titleInput}
                    onChange={onChangeTitleText}
                />
                <button className={styles.editButton} onClick={onClickEditButton}>
                    {pageEditMode ? 'save' : 'edit'}
                </button>
            </div>

            <div className={styles.panel}>
                    <textarea
                        name="markdown"
                        className={pageEditMode ? styles.editor : classNames(styles.editor, styles.displayNone)}
                        onChange={onChangeBodyText}
                        value={markDownText}
                    />
                <ReactMarkdown
                    className={pageEditMode ? classNames(styles.view, styles.displayNone) : styles.view}
                    children={markDownText}/>
            </div>
        </div>
    )
}