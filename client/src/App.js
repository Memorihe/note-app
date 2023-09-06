import './App.css'
import { NoteFilter } from './components/noteFilter'
import { NoteForm } from './components/noteForm'
import { NoteList } from './components/noteList'
import { useNotes } from './hooks/note'

function App() {
  const {
    handleForm,
    form,
    saveNote,
    handleNotes,
    filter,
    handleFilter,
    handleImportant,
    handleDelete
  } = useNotes()

  
  return (
    <section className='App'>
      <section className='Align-left'>
        <h1>Lista de notas</h1>
        <NoteList
          handleNotes={handleNotes}
          handleImportant={handleImportant}
          handleDelete={handleDelete}
        />
      </section>

      <section className='Align-rigth'>
        <NoteFilter
          filter={filter}
          handleFilter={handleFilter}
        />

        <NoteForm
          handleForm={handleForm}
          form={form}
          saveNote={saveNote}
        />
      </section>
    </section>
  )
}

export default App
