
function Filter({ search, onFilter }) {
  return (
    <div>
        filter shown with <input value={search} onChange={onFilter} />
    </div>
  )
}

export default Filter