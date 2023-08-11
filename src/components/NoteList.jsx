import NoteShow from "./NoteShow";

function NoteList({ notes, onDelete, onEdit }) {
  const renderedNotes = notes?.map((note) => {
    return (
      <NoteShow onEdit={onEdit} onDelete={onDelete} note={note} key={note.id} />
    );
  });

  return <div>{renderedNotes}</div>;
}

export default NoteList;
