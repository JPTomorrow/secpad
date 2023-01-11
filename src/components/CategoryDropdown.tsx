import { NoteCategory, useLocalStorage } from "@/utils/LocalNoteStorage";
import { useEffect, useState } from "react";

const CategoryDropdown = ({
  onCategoryChange,
}: {
  onCategoryChange?: Function;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [cats, setCats] = useLocalStorage<NoteCategory>("categories", []);
  const [selected, setSelected] = useState<NoteCategory>(cats[0]!);

  useEffect(() => {
    if (cats.length > 0) {
      handleCategoryChange(cats[0]!);
    }
  }, []);

  const handleCategoryChange = (category: NoteCategory) => {
    setSelected(category);
    if (onCategoryChange) onCategoryChange(category);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-start">
      {isOpen ? (
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
        <button className="dd-selected-item" onClick={() => setOpen(!isOpen)}>
          {selected ? selected.name : "Create a new category"}
        </button>
      )}
    </div>
  );
};

export default CategoryDropdown;
