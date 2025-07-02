import { Block } from "@/domain/builder/block";
import { useBlockHistory, useDebounce } from "@/hooks";

export const useDefaultLink = (block: Block) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const debouncedEndCaptureSnapshot = useDebounce(
    () => endCaptureSnapshot(`${block.id}-property-link-change`),
    300
  );

  const onLinkChange = (link: string) => {
    startCaptureSnapshot(`${block.id}-property-link-change`);
    block.link = link;
    debouncedEndCaptureSnapshot();
  };

  return { onLinkChange };
};
