import Navbar from "@/components/Navbar";
import CategoryDropdown from "@/components/CategoryDropdown";
import { Note, NoteCategory, useLocalStorage } from "@/utils/LocalNoteStorage";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsRecycle } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";
import AddModal from "@/components/AddModal";

const Home: NextPage = () => {
  const [cats, setCats] = useLocalStorage<NoteCategory>("categories", []);
  const [allNotes, setNotes] = useLocalStorage<Note>("notes", []);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedCat, setSelectedCat] = useState<NoteCategory>();
  const [showAddModal, setAddModal] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setFilteredNotes(allNotes.filter((x) => x.categoryId === selectedCat?.id));
  }, [selectedCat]);

  const addCategory = (name: string) => {
    const newCat: NoteCategory = {
      name: `${name} ${(cats.length + 1).toString()}`,
      id: cats.length + 1,
    };
    setCats([...cats, newCat]);
  };

  const handleCategoryChange = (category: NoteCategory) => {
    setSelectedCat(category);
  };

  const ResetLocalState = () => {
    setCats([]);
    setNotes([]);
    localStorage.clear();
  };

  const handleAddSubmit = (title: string, contents: string) => {
    if (!selectedCat) return;
    const newNote: Note = {
      title: title,
      content: contents,
      categoryId: selectedCat!.id,
      date: "",
    };
    setNotes([...allNotes, newNote]);
    setAddModal(false);
  };

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
          <button
            onClick={() => addCategory("Test")}
            className="default-button"
          >
            <AiOutlinePlus />
          </button>
          <button onClick={() => ResetLocalState()} className="default-button">
            <BsRecycle />
          </button>
        </Navbar>

        {/* <CSSTransition
          nodeRef={nodeRef}
          in={showAddModal}
          timeout={300}
          classNames={{
            enter: "scale-y-100 origin-bottom",
            enterActive: "scale-y-0 transition-all duration-300",
            exit: "scale-y-0 origin-bottom",
            exitActive: "scale-y-100 transition-all duration-300",
          }}
        > */}
        <div ref={nodeRef} className="note-clip-outer note-outer">
          <div className="note-clip-inner note-inner">
            {showAddModal ? (
              <AddModal onSubmit={handleAddSubmit} />
            ) : (
              <>
                {" "}
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
                        <div className="note-info" key={i}>
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
            )}
          </div>
        </div>
        {/* </CSSTransition> */}
      </main>
    </>
  );
};

export default Home;
