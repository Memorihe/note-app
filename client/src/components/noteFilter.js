export const NoteFilter = ({filter, handleFilter}) => {
  return (
    <header>
      <label>
        Filtrar:{''}
        <input
          name='content'
          value={filter.content}
          onChange={handleFilter}
        />
      </label>
      <label>
        <input
          name='important'
          type='checkbox'
          checked={filter.important}
          onChange={handleFilter}
        />
        Mostrar solo importantes
      </label>
    </header>
  )
}
