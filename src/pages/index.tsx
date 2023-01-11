import Navbar from "@/components/Navbar";
import CategoryDropdown from "@/components/CategoryDropdown";
import { Note, NoteCategory, useLocalStorage } from "@/utils/LocalNoteStorage";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsRecycle } from "react-icons/bs";

const Home: NextPage = () => {
  const [cats, setCats] = useLocalStorage<NoteCategory>("categories", []);
  const [allNotes, setNotes] = useLocalStorage<Note>("notes", []);
  const [selectedCat, setSelectedCat] = useState<NoteCategory>();

  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

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

        <div className="note-clip-outer note-outer">
          <div className="note-clip-inner note-inner">
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
                    </div>
                  );
                })
              ) : (
                <div className="note-info">No notes in this category</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
