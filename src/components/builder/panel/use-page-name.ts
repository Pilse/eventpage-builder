import { useDebounce } from "@/hooks";
import { updatePageName } from "@/service/pages";
import { useState } from "react";

export const usePageName = (name: string, { pageId, userId }: { pageId: string; userId: string }) => {
  const [optimisticPageName, setOptimisticPageName] = useState(name);
  const updatePageNameDebounced = useDebounce((newName: string) => {
    updatePageName(pageId, userId, newName).catch(() => {
      updatePageName(pageId, userId, newName);
    });
  }, 250);

  const onPageNameChange = (newName: string) => {
    if (!newName) {
      return null;
    }

    setOptimisticPageName(newName);
    updatePageNameDebounced(newName);
  };

  return {
    pageName: optimisticPageName,
    onPageNameChange,
  };
};
