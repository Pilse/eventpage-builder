import { twMerge } from "tailwind-merge";

interface IHoverLayerProps {
  useProgrammaticHovered?: boolean;
  programmaticHovered?: boolean;
}

export const HoverLayer = ({ useProgrammaticHovered, programmaticHovered }: IHoverLayerProps) => {
  return (
    <div
      className={twMerge(
        "absolute -top-px -bottom-px -left-px -right-px border border-transparent",
        !useProgrammaticHovered && "group-has-[*:hover]:hover:border-black",
        useProgrammaticHovered && programmaticHovered ? "border-black" : "border-transparent"
      )}
    ></div>
  );
};
