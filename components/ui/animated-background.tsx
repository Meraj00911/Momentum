"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  CSSProperties,
  MouseEvent,
  ReactElement,
  ReactNode,
} from "react";

type AnimatedChildProps = {
  "data-id"?: string;
  "data-checked"?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

type AnimatedBackgroundProps = {
  children: ReactNode;
  defaultValue?: string;
  className?: string;
  transition?: {
    type?: string;
    bounce?: number;
    duration?: number;
  };
};

export function AnimatedBackground({
  children,
  defaultValue,
  className = "",
  transition,
}: AnimatedBackgroundProps) {
  const items = useMemo(() => Children.toArray(children), [children]);

  const [active, setActive] = useState(
    defaultValue ?? ""
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  /*
   * Find the currently active tab.
   */
  const validIds = useMemo(
    () =>
      items
        .filter(
          (child): child is ReactElement<AnimatedChildProps> =>
            isValidElement(child),
        )
        .map((child) => child.props["data-id"])
        .filter((id): id is string => Boolean(id)),
    [items],
  );
  const selectedActive = validIds.includes(active) ? active : validIds[0] ?? "";

  const updateHighlight = useCallback(() => {
    const container = containerRef.current;
    const highlight = activeRef.current;

    if (!container || !highlight) return;

    const activeElement = container.querySelector(
      `[data-id="${CSS.escape(selectedActive)}"]`
    ) as HTMLElement | null;

    if (!activeElement) return;

    const containerRect =
      container.getBoundingClientRect();

    const itemRect =
      activeElement.getBoundingClientRect();

    highlight.style.transform = `translateX(${
      itemRect.left - containerRect.left
    }px)`;

    highlight.style.width = `${itemRect.width}px`;
    highlight.style.height = `${itemRect.height}px`;
  }, [selectedActive]);


  /*
   * Position the animated highlight.
   */
  useLayoutEffect(() => {
    updateHighlight();

    const handleResize = () => {
      updateHighlight();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [updateHighlight]);


  /*
   * Animation duration.
   */
  const style = {
    "--animated-duration": `${
      transition?.duration ?? 0.3
    }s`,
  } as CSSProperties;


  return (
    <div
      ref={containerRef}
      className="animated-background-root"
      style={style}
    >

      {/* Active sliding background */}

      <div
        ref={activeRef}
        className={`animated-background-highlight ${className}`}
        aria-hidden="true"
      />


      {/* Navigation items */}

      {items.map((child, index) => {

        if (
          !isValidElement<AnimatedChildProps>(
            child
          )
        ) {
          return child;
        }

        const id =
          child.props["data-id"];

        const isActive = id === selectedActive;


        return cloneElement(
          child,
          {
            key:
              child.key ??
              index,

            "data-checked":
              isActive,

            onClick: (
              event: MouseEvent<HTMLElement>
            ) => {

              if (id) {
                setActive(id);
              }

              child.props.onClick?.(
                event
              );
            },
          }
        );
      })}

    </div>
  );
}
