import { useServerAction } from "@/hooks";
import { publishPage, unpublishPage } from "@/service/pages";
import { useState } from "react";

interface IUsePublishPageProps {
  initialIsPublished: boolean;
}

export const usePublishPage = ({ initialIsPublished }: IUsePublishPageProps) => {
  const [isPublished, setIsPublished] = useState(initialIsPublished);
  const {
    action: publishPageAction,
    loading: publishPageLoading,
    error: publishPageError,
  } = useServerAction(publishPage);
  const {
    action: unpublishPageAction,
    loading: unpublishPageLoading,
    error: unpublishPageError,
  } = useServerAction(unpublishPage);

  const onPublishPage = async (...args: Parameters<typeof publishPage>) => {
    publishPageAction(...args)
      .then(() => {
        setIsPublished(true);
      })
      .catch(() => {
        setIsPublished(initialIsPublished);
      });
  };

  const onUnpublishPage = async (...args: Parameters<typeof unpublishPage>) => {
    unpublishPageAction(...args)
      .then(() => {
        setIsPublished(false);
      })
      .catch(() => {
        setIsPublished(initialIsPublished);
      });
  };

  return {
    isPublished,
    onPublishPage,
    publishPageLoading,
    publishPageError,
    onUnpublishPage,
    unpublishPageLoading,
    unpublishPageError,
  };
};
