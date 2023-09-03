import axios from "axios"

export const getNotes = () => {
    return axios.get('http://localhost:3001/api/notes')
      .then((response) => response.data)
      .catch(error => console.log(error))
  }

  export const addNote = (note) => {
    return axios.post('http://localhost:3001/api/notes', note)
      .then((response) => response.data)
      .catch(error => console.log(error))
  }

  export const setImportant = ({id, content, important}) => {
    return axios.put(`http://localhost:3001/api/notes/${id}`, {content, important})
      .then((response) => response.data)
      .catch(error => console.log(error))
  }

  export const deleteNote = ({id}) => {
    return axios.delete(`http://localhost:3001/api/notes/${id}`)
      .then((response) => response.data)
      .catch(error => console.log(error))
  }