import axios from 'axios'
import {useEffect, useState} from 'react'

export default function App() {
    const [contents, setContents] = useState([])
    useEffect(() => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        axios.get(serverUrl + "/api/content")
            .then(res => {
                setContents(res.data)
            })
    }, [])

    return (
        <div>
            {contents.map(content => (
                <div key={content}>{content}</div>
            ))}
        </div>
    )
}
