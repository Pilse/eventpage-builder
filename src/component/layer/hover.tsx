import { twMerge } from "tailwind-merge";

interface IHoverLayerProps {
  useProgrammaticHovered?: boolean;
  programmaticHovered?: boolean;
}

export const HoverLayer = ({ useProgrammaticHovered, programmaticHovered }: IHoverLayerProps) => {
  return (
    <div
      className={twMerge(
        "absolute top-0 bottom-0 left-0 right-0 border select-none border-transparent",
        !useProgrammaticHovered && "group-has-[*:hover]:hover:border-black",
        useProgrammaticHovered && programmaticHovered ? "border-black" : "border-transparent"
      )}
    ></div>
  );
};
