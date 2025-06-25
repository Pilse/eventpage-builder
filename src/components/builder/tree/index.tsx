import { Block } from "@/domain/builder";
import { useBlockHistory, useDomain, useGlobalContext } from "@/hooks";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/shared/util";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Button } from "@radix-ui/themes";

export const Tree = ({ block: blockInstance }: { block: Block }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const { setCurrentBlock } = useGlobalContext();
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [hoverPosition, setHoverPosition] = useState<"top" | "bottom" | "center" | null>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: block.type === "SECTION_CANVAS" ? "SECTION" : "TREE",
    item: block,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: block.type === "SECTION_CANVAS" ? "SECTION" : "TREE",
    hover(item: Block, monitor) {
      if (!ref.current) return;

      if (hasChildrenMixin(block) && block.hasChlidDeep(item)) {
        return;
      }

      const bounding = ref.current.getBoundingClientRect();
      const offsetY = monitor.getClientOffset()?.y ?? 0;
      const oneThirdY = bounding.top + (bounding.bottom - bounding.top) / 3;
      const twoThirdY = bounding.top + (2 * (bounding.bottom - bounding.top)) / 3;
      const middleY = (bounding.top + bounding.bottom) / 2;

      if (hasChildrenMixin(block)) {
        if (offsetY < oneThirdY) {
          setHoverPosition("top");
        } else if (offsetY > twoThirdY) {
          setHoverPosition("bottom");
        } else {
          setHoverPosition("center");
        }
      } else {
        setHoverPosition(offsetY < middleY ? "top" : "bottom");
      }
    },
    drop(item: Block, monitor) {
      if (!ref.current || !hoverPosition) return;
      startCaptureSnapshot("change position");
      if (hoverPosition === "top") {
        const prevParent = item.parent;
        const parent = block.parent;
        if (!prevParent || !parent) {
          return;
        }

        if (hasChildrenMixin(prevParent)) {
          prevParent.removeChild(item);
          if (hasDropColMixin(prevParent) || hasDropRowMixin(prevParent)) {
            prevParent.autoLayout("order");
          }
        }
        if (hasChildrenMixin(parent)) {
          parent.addChildBefore(item, block);
          if (hasDropColMixin(parent) || hasDropRowMixin(parent)) {
            parent.autoLayout("order");
          }
        }
      } else if (hoverPosition === "bottom") {
        const prevParent = item.parent;
        const parent = block.parent;
        if (!prevParent || !parent) {
          return;
        }

        if (hasChildrenMixin(prevParent)) {
          prevParent.removeChild(item);
          if (hasDropColMixin(prevParent) || hasDropRowMixin(prevParent)) {
            prevParent.autoLayout("order");
          }
        }
        if (hasChildrenMixin(parent)) {
          parent.addChildAfter(item, block);
          if (hasDropColMixin(parent) || hasDropRowMixin(parent)) {
            parent.autoLayout("order");
          }
        }
      } else if (hoverPosition === "center") {
        const prevParent = item.parent;
        const parent = block;
        if (!prevParent || !parent) {
          return;
        }

        if (hasChildrenMixin(prevParent)) {
          prevParent.removeChild(item);
          if (hasDropColMixin(prevParent) || hasDropRowMixin(prevParent)) {
            prevParent.autoLayout("order");
          }
        }
        if (hasChildrenMixin(parent)) {
          parent.addChild(item);
          if (hasDropColMixin(parent) || hasDropRowMixin(parent)) {
            parent.autoLayout("order");
          }
        }
      }
      endCaptureSnapshot("change position");

      setHoverPosition(null);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  if (!isOver && hoverPosition) {
    setHoverPosition(null);
  }

  dragRef(dropRef(ref));

  const borderStyle = {
    borderTop: hoverPosition === "top" ? "2px solid blue" : undefined,
    borderBottom: hoverPosition === "bottom" ? "2px solid blue" : undefined,
    opacity: canDrop ? "1" : "0.5",
  };

  return (
    // <DefaultTreeNode block={block} depth={0} />
    <div style={{ marginLeft: 20 }}>
      <Button
        asChild
        variant="soft"
        style={{
          padding: 4,
          background: isDragging ? "lightgray" : "transparent",
          ...borderStyle,
        }}
        onClick={() => {
          setCurrentBlock(block);
        }}
        onDragStart={() => {
          setCurrentBlock(block);
        }}
      >
        <div ref={ref}>{block.id}</div>
      </Button>
      {hasChildrenMixin(block) && block.children.map((child) => <Tree key={child.id} block={child} />)}
    </div>
  );
};

export * from "./use-default-tree-drag";
export * from "./use-default-tree-drop";
export * from "./default";
export * from "./base";
