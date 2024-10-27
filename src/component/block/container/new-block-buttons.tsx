import { useNewBlock } from "@/hooks";
import { BlockType } from "@/type";
import { MouseEvent } from "react";

export const NewBlockButtons = () => {
  const { isAddable, addNewBlock } = useNewBlock();

  const handleClick = (e: MouseEvent, type: BlockType) => {
    e.stopPropagation();
    if (!isAddable) {
      return;
    }
    addNewBlock(type, {});
  };

  return (
    isAddable && (
      <div className="flex flex-col gap-2 fixed top-0 left-0 h-fit">
        <button onClick={(e) => handleClick(e, "TEXT")}>Text</button>
        <button onClick={(e) => handleClick(e, "FRAME_CANVAS")}>Frame Canvas</button>
        <button onClick={(e) => handleClick(e, "FRAME_COL")}>Frame Col</button>
        <button onClick={(e) => handleClick(e, "FRAME_ROW")}>Frame Row</button>
      </div>
    )
  );
};
