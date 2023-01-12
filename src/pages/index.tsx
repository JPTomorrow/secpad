import Navbar from "@/components/Navbar";
import CategoryDropdown from "@/components/CategoryDropdown";
import { Note, NoteCategory, useLocalStorage } from "@/utils/LocalNoteStorage";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsRecycle } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";
import AddModal from "@/components/AddModal";
import NoteInfoModal from "@/components/NoteInfoModal";

const Home: NextPage = () => {
  const [cats, setCats] = useLocalStorage<NoteCategory>("categories", []);
  const [allNotes, setNotes] = useLocalStorage<Note>("notes", []);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedCat, setSelectedCat] = useState<NoteCategory>();
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [showAddModal, setAddModal] = useState(false);
  const [showInfoModal, setInfoModal] = useState(false);
  const nodeRef = useRef(null);

  const updateFilteredNotes = () => {
    setFilteredNotes(allNotes.filter((x) => x.categoryId === selectedCat?.id));
  };

  useEffect(() => {
    updateFilteredNotes();
  }, [selectedCat, allNotes]);

  const addCategory = () => {
    const newCat: NoteCategory = {
      name: `${name} ${(cats.length + 1).toString()}`,
      id: cats.length + 1,
    };
    setCats([...cats, newCat]);
  };

  const deleteCategory = () => {
    if (!selectedCat) return;
    setCats(cats.filter((x) => x.id != selectedCat.id));
    setSelectedCat(cats.length > 0 ? cats[0] : undefined);
    setNotes(allNotes.filter((x) => x.categoryId != selectedCat.id));
  };

  const handleCategoryChange = (category: NoteCategory) => {
    setSelectedCat(category);
  };

  const ResetLocalState = () => {
    setCats([]);
    setNotes([]);
    localStorage.clear();
  };

  const addNote = (title: string, contents: string) => {
    setAddModal(false);
    if (!selectedCat) return;

    const newNote: Note = {
      title: title,
      content: contents,
      categoryId: selectedCat!.id,
      date: "",
    };
    setNotes([...allNotes, newNote]);
  };

  const deleteNote = () => {
    setInfoModal(false);
    setNotes(allNotes.filter((x) => x !== selectedNote));
  };

  const cancelAddModal = () => {
    setAddModal(false);
  };

  const closeNoteInfoModal = () => {
    setInfoModal(false);
  };

  let page;
  if (showAddModal) {
    page = <AddModal onSubmit={addNote} onCancel={cancelAddModal} />;
  } else if (showInfoModal) {
    page = (
      <NoteInfoModal
        note={selectedNote!}
        onClose={closeNoteInfoModal}
        onDeleteNote={deleteNote}
      />
    );
  } else {
    page = (
      <>
        <h1 className="mt-[50px] w-3/4 text-[32pt]">
          <CategoryDropdown
            cats={cats}
            onCategoryChange={handleCategoryChange}
          />
        </h1>
        <div className="mt-3">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((n, i) => {
              return (
                <div
                  onClick={() => {
                    setSelectedNote(n);
                    setInfoModal(true);
                  }}
                  className="note-info"
                  key={i}
                >
                  {n.title}
                  {i == filteredNotes.length - 1 ? (
                    <button onClick={() => setAddModal(!showAddModal)}>
                      <AiOutlinePlus />
                    </button>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div className="note-info">
              <p>No notes in this category</p>
              <button onClick={() => setAddModal(!showAddModal)}>
                <AiOutlinePlus />
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>SecPad</title>
        <meta
          name="description"
          content="A personal todo app that uses your cookies for storage"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Navbar>
          <button onClick={() => addCategory()} className="nav-button">
            <AiOutlinePlus />
          </button>
          <button onClick={() => deleteCategory()} className="nav-button">
            <AiOutlineMinus />
          </button>
          <button onClick={() => ResetLocalState()} className="nav-button">
            <BsRecycle />
          </button>
        </Navbar>

        <div ref={nodeRef} className="note-clip-outer note-outer">
          <div className="note-clip-inner note-inner">{page}</div>
        </div>
      </main>
    </>
  );
};

export default Home;
