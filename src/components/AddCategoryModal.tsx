import { useState } from "react";
import { TiCancel } from "react-icons/ti";

const AddCategoryModal = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: Function;
  onCancel: Function;
}) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSubmit(name);
  };

  return (
    <div className="mt-5 flex flex-col gap-3">
      <h1 className="text-3xl">Add Category</h1>
      <input
        className="default-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

export default AddCategoryModal;
