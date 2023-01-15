import type { Note } from "@/utils/LocalNoteStorage";
import { AiOutlineLeft } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

type NoteInfoFunctionParams = {
  close: () => void;
  deleteNote: () => void;
};

const NoteInfoModal = ({
  note,
  onClose,
  onDeleteNote,
}: {
  note: Note | undefined;
  onClose: NoteInfoFunctionParams["close"];
  onDeleteNote: NoteInfoFunctionParams["deleteNote"];
}) => {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <h1 className="text-3xl">{note?.title}</h1>
      <p>{note?.content}</p>
      <div className="flex gap-3">
        <button className="default-button p-2" onClick={() => onClose()}>
          <AiOutlineLeft />
        </button>
        <button className="default-button p-2" onClick={() => onDeleteNote()}>
          <BiTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteInfoModal;
