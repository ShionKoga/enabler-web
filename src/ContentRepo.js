import axios from 'axios'


export default class ContentRepo {
    serverUrl = process.env.REACT_APP_SERVER_URL

    async getAllOverview() {
        const response = await axios.get(this.serverUrl + "/api/content")
        return response.data
    }

    async getContent(id) {
        const response = await axios.get(this.serverUrl + "/api/content/" + id)
        return response.data
    }

    async postContent(content) {
        const response = await axios.post(this.serverUrl + "/api/content", content)
        return response.data
    }

    async putContent(id, content) {
        const response = await axios.put(this.serverUrl + "/api/content/" + id, content)
        return response.data
    }

    async deleteContent(id) {
        const response = await axios.delete(this.serverUrl + "/api/content/" + id)
        return response.data
    }
}