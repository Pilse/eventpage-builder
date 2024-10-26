import { BlockFactory, Section } from "@/domain/block";
import { useBlockHistory, useGlobalContext } from "@/hooks";
import { BlockType } from "@/type";
import { hasChildrenMixin } from "@/util";
import { MouseEvent } from "react";

interface INewBLockButtonsProps {
  parent: InstanceType<typeof Section>;
}

export const NewBlockButtons = ({ parent }: INewBLockButtonsProps) => {
  const { setCurrentBlock } = useGlobalContext();
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const handleClick = (e: MouseEvent, type: BlockType) => {
    e.stopPropagation();
    if (hasChildrenMixin(parent)) {
      startCaptureSnapshot(`add-${parent.id}`);
      const newBlock = BlockFactory.create(
        {
          type,
          t: parent.height / 2 - 50,
          l: parent.width / 2 - 50,
          b: parent.height / 2,
          r: parent.width / 2,
          position: "absolute",
          width: 100,
          height: 100,
          widthType: "fixed",
          heightType: "fixed",
        },
        parent
      );
      parent.addChild(newBlock);
      setCurrentBlock(newBlock);
      endCaptureSnapshot(`add-${parent.id}`);
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={(e) => handleClick(e, "TEXT")}>Text</button>
      <button onClick={(e) => handleClick(e, "FRAME_CANVAS")}>Frame Canvas</button>
      <button onClick={(e) => handleClick(e, "FRAME_COL")}>Frame Col</button>
      <button onClick={(e) => handleClick(e, "FRAME_ROW")}>Frame Row</button>
    </div>
  );
};
