export const getClosestSectionBlockEle = (element: HTMLElement) => {
  return element.parentElement?.closest("[data-block-type*='SECTION']") ?? null;
};

export const getClosestFrameBlockEle = (element: HTMLElement) => {
  return element.parentElement?.closest("[data-block-type*='FRAME']") ?? null;
};

export const getBlockEleById = (id: string) => {
  return document.getElementById(id);
};
