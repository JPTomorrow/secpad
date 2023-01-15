import { useState } from "react";
import { TiCancel } from "react-icons/ti";

type AddModalParams = {
  submit: (title: string, contents: string) => void;
  cancel: () => void;
};

const AddModal = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: AddModalParams["submit"];
  onCancel: AddModalParams["cancel"];
}) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleSubmit = () => {
    onSubmit(title, contents);
  };

  return (
    <div className="mt-5 flex flex-col gap-3">
      <h1 className="text-3xl">Add Note</h1>
      <input
        className="default-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="default-input"
        type="text"
        placeholder="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <div className="flex gap-3">
        <button className="default-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="default-button p-0" onClick={() => onCancel()}>
          <TiCancel className="m-0 p-0" size={24} />
        </button>
      </div>
    </div>
  );
};

export default AddModal;
