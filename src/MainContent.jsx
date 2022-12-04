import classNames from 'classnames'
import styles from './styles/MainContent.module.scss'
import ReactMarkdown from 'react-markdown'
import {useEffect, useState} from 'react'


export default function MainContent(props) {
    const [pageEditMode, setPageEditMode] = useState(false)
    const [content, setContent] = useState({
        id: props.contentId,
        title: '',
        body: '',
    })

    const getContent = async () => {
        const result = await props.contentRepo.getContent(props.contentId)
        setContent(result)
    }

    useEffect(() => {
        getContent()
    }, [props])

    const onClickEditButton = () => {
        setPageEditMode(true)
    }

    const onClickCancelButton = () => {
        setPageEditMode(false)
    }

    const onClickDeleteButton = () => {
        props.didDeleteContent(props.contentId)
    }

    const onClickSaveButton = () => {
        setPageEditMode(false)
        props.didChangeContent(props.contentId, content)
    }

    const onChangeTitleText = (event) => {
        setContent({...content, title: event.target.value})
    }

    const onChangeBodyText = (event) => {
        setContent({...content, body: event.target.value})
    }

    return (
        <div className={styles.mainContents}>
            <div className={pageEditMode ? '' : styles.displayNone}>
                <div className={styles.pageHeader}>
                    <input
                        type="text"
                        className={styles.titleInput}
                        value={content.title}
                        onChange={onChangeTitleText}
                    />
                    <button className={styles.cancelButton} onClick={onClickCancelButton}>キャンセル</button>
                    <button className={styles.primaryButton} onClick={onClickSaveButton}>保存</button>
                </div>
                <div className={styles.panel}>
                    <textarea
                        name="markdown"
                        className={styles.editor}
                        onChange={onChangeBodyText}
                        value={content.body}
                    />
                </div>
            </div>

            <div className={pageEditMode ? styles.displayNone : ''}>
                <div className={styles.pageHeader}>
                    <div className={pageEditMode ? classNames(styles.pageTitle, styles.displayNone) : styles.pageTitle}>
                        {content.title}
                    </div>
                    <button className={styles.primaryButton} onClick={onClickEditButton}>編集</button>
                    <button className={styles.dangerButton} onClick={onClickDeleteButton}>削除</button>
                </div>
                <div className={styles.panel}>
                    <ReactMarkdown className={styles.view} children={content.body}/>
                </div>
            </div>
        </div>
    )
}