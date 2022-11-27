import axios from 'axios'
import {useEffect, useState} from 'react'
import styles from './App.module.scss'
import Header from './Header'
import SideBar from './SideBar'
import MainContent from './MainContent'
import AddNewContent from './AddNewContent'

export default function App() {
    const [contents, setContents] = useState([])
    const [sideBarExpand, setSideBarExpand] = useState(true)
    const [selectedContentId, setSelectedContentId] = useState(0)
    const [showAddNewContent, setShowAddNewContent] = useState(true)

    useEffect(() => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        axios.get(serverUrl + '/api/content')
            .then(res => {
                if (res.data.length > 0) {
                    setShowAddNewContent(false)
                }
                setContents(res.data)
            })
    }, [])

    const onClickSideBarButton = () => {
        const toggled = !sideBarExpand
        setSideBarExpand(toggled)
    }

    const onSelectContent = (id) => {
        setShowAddNewContent(false)
        setSelectedContentId(id)
    }

    const onSelectShowAddNew = () => {
        setShowAddNewContent(true)
    }

    const getLastId = () => {
        return contents.length
    }

    return (
        <>
            <Header
                title="Enabler"
                onClickSideBarButton={onClickSideBarButton}
            />

            <div className={styles.flexContainer}>
                <SideBar
                    expand={sideBarExpand}
                    contents={contents}
                    selectedId={selectedContentId}
                    onSelect={onSelectContent}
                    selectAddNew={showAddNewContent}
                    onSelectShowAddNew={onSelectShowAddNew}
                />
                {showAddNewContent
                    ? <AddNewContent lastId={getLastId()}/>
                    : <MainContent contentId={selectedContentId}/>
                }
            </div>
        </>
    )
}
