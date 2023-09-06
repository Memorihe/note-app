import { useEffect, useState } from 'react'
import { addNote, deleteNote, getNotes, setImportant } from '../services/note'

export const useNotes = () => {
  const [notes, setNotes] = useState([])
  const [filter, setFilter] = useState({
    content: '',
    important: false
  })

  const [form, setForm] = useState({
    content: '',
    important: false
  })

  useEffect(() => {
    getNotes().then((res) => setNotes(res))
  }, [])

  const importantNotes = filter.important
    ? notes.filter((n) => n.important === true)
    : notes

  const handleNotes =
    filter.content !== ''
      ? importantNotes.filter((n) =>
          n.content.toLowerCase().includes(filter.content.toLowerCase())
        )
      : importantNotes

  const handleFilter = (e) => {
    const value =
      e.target.type === 'checkbox' ? !filter.important : e.target.value
    setFilter({
      ...filter,
      [e.target.name]: value
    })
  }

  const handleForm = (e) => {
    const value =
      e.target.type === 'checkbox' ? !form.important : e.target.value
    setForm({
      ...form,
      [e.target.name]: value
    })
  }

  const saveNote = (e) => {
    e.preventDefault()
    if (form.content === '') return alert('Es necesario ingresar una nota')
    addNote(form).then((res) => setNotes(notes.concat(res)))
  }
  
  const handleImportant = e => {
    const newNotes = notes.map(n => {
      if(n.id === e.target.id) n.important = !n.important
      return n
    })
    setImportant(notes.find(n=> n.id === e.target.id))
    .then(res => setNotes(newNotes))
    .catch(err => console.log(err))
    
  }

  const handleDelete = e => {
    const newNotes = notes.filter(n => n.id !== e.target.id)
    deleteNote({id: e.target.id})
    .then(() => setNotes(newNotes))
    .catch(err => console.log(err))
  }

  return {
    filter,
    form,
    handleNotes,
    handleFilter,
    handleForm, 
    handleDelete,   
    saveNote,
    handleImportant
  }
}
