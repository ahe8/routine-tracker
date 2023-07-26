function NoteShow({ note, onDelete }) {
  const handleClick = () => {
    onDelete(note.id);
  };
  return (
    <div>
      {note.contents}
      <div>
        <button onClick={handleClick}>Delete</button>
      </div>
    </div>
  );
}

export default NoteShow;
