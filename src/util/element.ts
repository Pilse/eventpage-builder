export const getClosestSectionBlockEle = (element: HTMLElement) => {
  return element.closest("[data-block-type='SECTION']");
};
