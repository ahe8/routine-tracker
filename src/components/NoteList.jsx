import NoteShow from "./NoteShow";

function NoteList({ notes, onDelete }) {
  const renderedNotes = notes?.map((note) => {
    return <NoteShow onDelete={onDelete} key={note.id} note={note} />;
  });

  return <div>{renderedNotes}</div>;
}

export default NoteList;
