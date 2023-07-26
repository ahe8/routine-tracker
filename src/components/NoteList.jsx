import NoteShow from "./NoteShow";

function NoteList({ notes }) {
  const renderedNotes = notes?.map((note) => {
    return <NoteShow key={note.id} note={note} />;
  });

  return <div>{renderedNotes}</div>;
}

export default NoteList;
