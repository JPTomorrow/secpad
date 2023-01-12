import { useState } from "react";

const AddModal = ({ onSubmit }: { onSubmit: Function }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleSubmit = () => {
    onSubmit(title, contents);
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddModal;
