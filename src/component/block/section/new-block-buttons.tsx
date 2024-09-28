import { BlockFactory, Section } from "@/domain/block";
import { BlockType } from "@/type";
import { hasChildrenMixin } from "@/util";

interface INewBLockButtonsProps {
  parent: InstanceType<typeof Section>;
}

export const NewBlockButtons = ({ parent }: INewBLockButtonsProps) => {
  const handleClick = (type: BlockType) => {
    if (hasChildrenMixin(parent)) {
      parent.addChild(
        BlockFactory.create(
          {
            type,
            t: parent.height / 2 - 50,
            l: parent.width / 2 - 50,
            b: parent.height / 2,
            r: parent.width / 2,
            position: "absolute",
            width: 100,
            height: 100,
          },
          parent
        )
      );
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => handleClick("TEXT")}>Text</button>
      <button onClick={() => handleClick("FRAME_CANVAS")}>Frame Canvas</button>
      <button onClick={() => handleClick("FRAME_COL")}>Frame Col</button>
      <button onClick={() => handleClick("FRAME_ROW")}>Frame Row</button>
    </div>
  );
};
