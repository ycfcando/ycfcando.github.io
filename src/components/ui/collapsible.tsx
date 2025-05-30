"use client";
import { ReactElement, isValidElement, useRef, useLayoutEffect } from "react";

export interface IProps {
  "data-slot": string;
}

export interface ICollapsibleProps {
  children: ReactElement<IProps> | ReactElement<IProps>[];
  isOpen: boolean;
}

function Collapsible({ children, isOpen, ...props }: ICollapsibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const currentHeight = useRef<string>("0px");

  const getSlot = (name: string) => {
    if (Array.isArray(children)) {
      return children?.find(
        (child: ReactElement<IProps>) =>
          isValidElement(child) && child.props["data-slot"] === name
      );
    } else {
      return isValidElement(children) && children.props["data-slot"] === name;
    }
  };

  useLayoutEffect(() => {
    const dom = ref.current;

    if (!dom) {
      return;
    }

    const scrollHeight = isOpen ? `${dom?.scrollHeight}px` : "0px";
    if (dom && currentHeight.current !== scrollHeight) {
      currentHeight.current = scrollHeight;
      dom.style.height = currentHeight.current;
    }
  }, [ref, isOpen, currentHeight]);

  return (
    <div
      data-state={isOpen ? "open" : "close"}
      className="group leading-none"
      {...props}
    >
      {getSlot("collapsible-trigger")}
      <div
        className="h-0 pl-4 transition-[height] duration-300 overflow-hidden"
        ref={ref}
      >
        {getSlot("collapsible-content")}
      </div>
    </div>
  );
}

export { Collapsible };
