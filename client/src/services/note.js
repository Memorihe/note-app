import axios from "axios"

const NOTES_URL = 'http://localhost:3001/api/notes'

export const getNotes = () => {
    return axios.get(NOTES_URL)
      .then((response) => response.data)
      .catch(error => console.log(error))
  }

  export const addNote = (note) => {
    return axios.post(NOTES_URL, note)
      .then((response) => response.data)
      .catch(error => console.log(error))
  }

  export const setImportant = ({id, content, important}) => {
    return axios.put(`${NOTES_URL}/${id}`, {content, important})
      .then((response) => response.data)
      .catch(error => console.log(error))
  }

  export const deleteNote = ({id}) => {
    return axios.delete(`${NOTES_URL}/${id}`)
      .then((response) => response.data)
      .catch(error => console.log(error))
  }