import { useState } from "react";

function NoteEdit({ note, onSubmit }) {
  const [contents, setContents] = useState(note.contents);

  const handleChange = (event) => {
    setContents(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(note.id, contents);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={contents} />
      <button>Save</button>
    </form>
  );
}

export default NoteEdit;
