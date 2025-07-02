import { Block } from "@/domain/builder";

export const getUserEvents = (block: Block) => {
  const link = block.link;

  if (!link) {
    return {};
  }

  return {
    onClick: () => {
      window.open(link, "_blank");
    },
  };
};
