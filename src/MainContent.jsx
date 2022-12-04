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

    const onClickSaveButton = () => {
        setPageEditMode(false)
        props.contentRepo.putContent(props.contentId, content)
    }

    const onChangeTitleText = (event) => {
        setContent({...content, title: event.target.value})
    }

    const onChangeBodyText = (event) => {
        setContent({...content, body: event.target.value})
    }

    return (
        <div className={styles.mainContents}>
            <form className={pageEditMode ? '' : styles.displayNone}>
                <div className={styles.pageHeader}>
                    <input
                        type="text"
                        className={styles.titleInput}
                        value={content.title}
                        onChange={onChangeTitleText}
                    />
                    <button onClick={onClickSaveButton}>保存</button>
                </div>
                <div className={styles.panel}>
                    <textarea
                        name="markdown"
                        className={styles.editor}
                        onChange={onChangeBodyText}
                        value={content.body}
                    />
                </div>
            </form>

            <div className={pageEditMode ? styles.displayNone : ''}>
                <div className={styles.pageHeader}>
                    <h2 className={pageEditMode ? classNames(styles.pageTitle, styles.displayNone) : styles.pageTitle}>
                        {content.title}
                    </h2>
                    <button className={styles.editButton} onClick={onClickEditButton}>編集</button>
                </div>
                <div className={styles.panel}>
                    <ReactMarkdown className={styles.view} children={content.body}/>
                </div>
            </div>
        </div>
    )
}