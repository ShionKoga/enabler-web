import {useEffect, useState} from 'react'
import Header from './Header'
import SideBar from './SideBar'
import MainContent from './MainContent'
import AddNewContent from './AddNewContent'

export default function App(props) {
    const [contentOverviews, setContentOverviews] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [showAddNewContent, setShowAddNewContent] = useState(true)

    const getAllOverview = async () => {
        const result = await props.contentRepo.getAllOverview()
        if (result.length > 0) {
            setShowAddNewContent(false)
            setSelectedIndex(0)
        }
        setContentOverviews(result)
    }

    useEffect(() => {
        getAllOverview()
    }, [])

    const onSelectContent = (index) => {
        setShowAddNewContent(false)
        setSelectedIndex(index)
    }

    const onSelectShowAddNew = () => {
        setShowAddNewContent(true)
    }

    const saveNewContent = (content) => {
        props.contentRepo.postContent(content)
            .then(data => {
                setContentOverviews(data)
                console.log(contentOverviews)
                setSelectedIndex(0)
                setShowAddNewContent(false)
            })
    }

    const changeContent = (id, content) => {
        props.contentRepo.putContent(id, content)
            .then(data => {
                setContentOverviews(data)
            })
    }

    const deleteContent = (id) => {
        props.contentRepo.deleteContent(id)
            .then(data => {
                setContentOverviews(data)
                setSelectedIndex(0)
            })
    }

    return (
        <>
            <Header
                title="Enabler"
            />

            <SideBar
                contents={contentOverviews}
                selectedIndex={selectedIndex}
                onSelect={onSelectContent}
                selectAddNew={showAddNewContent}
                onSelectShowAddNew={onSelectShowAddNew}
            />

            {showAddNewContent
                ? <AddNewContent didSaveContent={saveNewContent}/>
                : <MainContent
                    contentRepo={props.contentRepo}
                    contentId={contentOverviews[selectedIndex].id}
                    didChangeContent={changeContent}
                    didDeleteContent={deleteContent}
                />
            }
        </>
    )
}
