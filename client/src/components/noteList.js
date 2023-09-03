


export const NoteList = ({handleNotes, handleImportant, handleDelete}) => {
 return (
    <section  className='Note-list'>      
      <section>
        <ul>
          {handleNotes.map((note) => {
            return (
              <li key={note.id} className='Note'>
                <p className='Note-content'>{note.content}</p>
                <label className='Note-important'><input type="checkbox" id={note.id} checked={note.important} onChange={handleImportant}/>Importante</label>
                <button id={note.id} onClick={handleDelete}>Eliminar</button>
              </li>
            )
          })}
        </ul>
      </section>
    </section>
  )
}
