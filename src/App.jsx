import {useEffect, useState} from 'react'
import styles from './styles/App.module.scss'
import Header from './Header'
import SideBar from './SideBar'
import MainContent from './MainContent'
import AddNewContent from './AddNewContent'

export default function App(props) {
    const [contents, setContents] = useState([])
    const [sideBarExpand, setSideBarExpand] = useState(true)
    const [selectedContentId, setSelectedContentId] = useState(0)
    const [showAddNewContent, setShowAddNewContent] = useState(true)

    const getAllOverview = async () => {
        const result = await props.contentRepo.getAllOverview()
        if (result.length > 0) {
            setShowAddNewContent(false)
            setSelectedContentId(result[0].id)
        }
        setContents(result)
    }

    useEffect(() => {
        getAllOverview()
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
                    ? <AddNewContent contentRepo={props.contentRepo}/>
                    : <MainContent contentRepo={props.contentRepo} contentId={selectedContentId}/>
                }
            </div>
        </>
    )
}
