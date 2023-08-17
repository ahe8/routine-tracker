import NoteShow from "./NoteShow";

function NoteList({ notes, onDelete, onEdit }) {
  const renderedNotes = notes?.map((note) => {
    return (
      note.id ? <NoteShow key={note.id} onEdit={onEdit} onDelete={onDelete} note={note} /> : null
    );
  });

  return <div>{renderedNotes}</div>;
}

export default NoteList;
