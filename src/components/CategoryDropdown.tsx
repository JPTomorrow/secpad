import type { NoteCategory } from "@/utils/LocalNoteStorage";
import { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

type CDParams = {
  categoryChange: (category: NoteCategory | undefined) => void;
};

const CategoryDropdown = ({
  cats,
  onCategoryChange,
}: {
  cats: NoteCategory[];
  onCategoryChange?: CDParams["categoryChange"];
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<NoteCategory>();

  const initializeSelected = () => {
    if (cats.length > 0) {
      setSelected(cats[0]);
      handleCategoryChange(cats[0]);
    }
  };

  useEffect(() => {
    initializeSelected();
  }, []);

  useEffect(() => {
    cats.length == 0 ? setSelected(undefined) : initializeSelected();
  }, [cats]);

  const handleCategoryChange = (category: NoteCategory | undefined) => {
    if (!category) return;
    setSelected(category);
    if (onCategoryChange) onCategoryChange(category);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-start">
      {isOpen && cats.length > 0 ? (
        cats.map((c, i) => {
          return (
            <button
              onClick={() => handleCategoryChange(c)}
              className="dd-open-item"
              key={i}
            >
              {c.name}
            </button>
          );
        })
      ) : (
        <button
          className="dd-selected-item flex items-center justify-between"
          onClick={() => setOpen(!isOpen)}
        >
          {selected ? selected.name : "No categories"}
          <AiOutlineDown size={22} className="float-right" />
        </button>
      )}
    </div>
  );
};

export default CategoryDropdown;
