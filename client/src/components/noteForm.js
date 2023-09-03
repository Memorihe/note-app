export const NoteForm = ({handleForm, form, saveNote}) => {
  return (
    <form className='Note-form' onSubmit={saveNote}>
      <h3>Nueva nota</h3>
      <textarea
        rows='5'
        name='content'
        value= {form.content}
        onChange={handleForm}
      />
      <label>
        Importante
        <input
          type='checkbox'
          name='important'
          checked= {form.important}
          onChange={handleForm}
        />
      </label>
      <button className='Add-button' type="submit">Agregar nota</button>
    </form>
  )
}
