import { memo, useCallback, useEffect, useRef, useState } from "react";
import style from "./index.module.scss";
import { ArrowLeftRight, CircleHelp, X } from "lucide-react";
import { createPortal } from "react-dom";
import { ImageItem, homeState } from "@/states/home";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { gstate } from "@/global";
import { getHomeCopy } from "@/views/home/copy";

export interface CompareState {
  x: number;
  xrate: number;
  scale: number;
  moving: boolean;
  status: "show" | "hide";
  dividerWidth: number;
  imageWidth: number;
  imageHeight: number;
  containerWidth: number;
  containerHeight: number;
}

/**
 * Memoized image so divider dragging only re-layouts this small
 * subtree instead of re-rendering the full-size images every frame.
 */
const CompareImage = memo(function CompareImage({
  src,
  style,
  onLoad,
}: {
  src: string;
  style: React.CSSProperties;
  onLoad: () => void;
}) {
  return <img src={src} style={style} onLoad={onLoad} alt="" />;
});

export const Compare = observer(() => {
  const infoRef = useRef<Required<ImageItem>>(
    homeState.list.get(homeState.compareId!) as Required<ImageItem>,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CompareState>({
    x: 0,
    xrate: 0.5,
    scale: 0.8,
    moving: false,
    status: "show",
    dividerWidth: 2,
    containerWidth: 0,
    containerHeight: 0,
    imageWidth: 0,
    imageHeight: 0,
  });
  const [oldLoaded, setOldLoaded] = useState<boolean>(false);
  const [newLoaded, setNewLoaded] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState(false);
  const text = getHomeCopy(gstate.lang);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    barRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") homeState.compareId = null;
      if (event.key !== "Tab") return;
      const elements = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(
          'button, [tabindex="0"]',
        ) ?? [],
      );
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.documentElement.style.overflow = overflow;
      document.removeEventListener("keydown", keydown);
      previous?.focus();
    };
  }, []);

  const update = useCallback(
    (newState: Partial<CompareState>) => {
      setState({
        ...state,
        ...newState,
      });
    },
    [state],
  );

  const getState = useCallback(() => {
    return state;
  }, [state]);

  const updateRef = useRef<(newState: Partial<CompareState>) => void>(update);
  const stateRef = useRef<() => CompareState>(getState);
  useEffect(() => {
    updateRef.current = update;
    stateRef.current = getState;
  }, [update, getState]);

  useEffect(() => {
    gstate.loading = true;
    return () => {
      // Restore loading state on unmount (e.g. user closes comparison
      // before both images finish loading), otherwise the global
      // loading overlay would stay forever.
      gstate.loading = false;
    };
  }, []);

  useEffect(() => {
    if (oldLoaded && newLoaded) {
      gstate.loading = false;
    }
  }, [oldLoaded, newLoaded]);

  useEffect(() => {
    const doc = document.documentElement;
    const bar = barRef.current!;

    let isControl = false;
    let cursorX = 0;

    const resize = () => {
      const states = stateRef.current();
      const rect = containerRef.current!.getBoundingClientRect();
      let imageWidth: number;
      let imageHeight: number;
      if (
        infoRef.current.width / infoRef.current.height >
        rect.width / rect.height
      ) {
        imageWidth = rect.width * states.scale;
        imageHeight =
          (imageWidth * infoRef.current.height) / infoRef.current.width;
      } else {
        imageHeight = rect.height * states.scale;
        imageWidth =
          (imageHeight * infoRef.current.width) / infoRef.current.height;
      }
      updateRef.current({
        x: rect.width * states.xrate,
        imageWidth,
        imageHeight,
        containerWidth: rect.width,
        containerHeight: rect.height,
      });
    };

    const mousedown = (event: PointerEvent) => {
      event.preventDefault();
      bar.setPointerCapture(event.pointerId);
      isControl = true;
      cursorX = event.clientX;
      updateRef.current({ moving: true });
    };

    const mouseup = () => {
      isControl = false;
      cursorX = 0;
      updateRef.current({ moving: false });
    };

    const mousemove = (event: PointerEvent) => {
      if (isControl) {
        const states = stateRef.current();
        let x = states.x + event.clientX - cursorX;
        const min = (states.containerWidth - states.imageWidth) / 2;
        const max = (states.containerWidth + states.imageWidth) / 2;
        if (x < min) {
          x = min;
        }
        if (x > max) {
          x = max;
        }
        cursorX = event.clientX;
        updateRef.current({ x, xrate: x / states.containerWidth });
      }
    };

    const wheel = (event: WheelEvent) => {
      const states = stateRef.current();
      let scale = -0.001 * event.deltaY + states.scale;
      if (scale > 1) {
        scale = 1;
      }
      if (scale < 0.1) {
        scale = 0.1;
      }

      let imageWidth: number;
      let imageHeight: number;
      if (
        infoRef.current.width / infoRef.current.height >
        states.containerWidth / states.containerHeight
      ) {
        imageWidth = states.containerWidth * scale;
        imageHeight =
          (imageWidth * infoRef.current.height) / infoRef.current.width;
      } else {
        imageHeight = states.containerHeight * scale;
        imageWidth =
          (imageHeight * infoRef.current.width) / infoRef.current.height;
      }

      const innerRate =
        (states.x - (states.containerWidth - states.imageWidth) / 2) /
        states.imageWidth;
      const x =
        innerRate * imageWidth + (states.containerWidth - imageWidth) / 2;

      updateRef.current({ scale, imageWidth, imageHeight, x });
    };

    window.addEventListener("resize", resize);
    window.addEventListener("wheel", wheel);
    bar.addEventListener("pointerdown", mousedown);
    doc.addEventListener("pointermove", mousemove);
    doc.addEventListener("pointerup", mouseup);
    doc.addEventListener("pointercancel", mouseup);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", wheel);
      bar.removeEventListener("pointerdown", mousedown);
      doc.removeEventListener("pointermove", mousemove);
      doc.removeEventListener("pointerup", mouseup);
      doc.removeEventListener("pointercancel", mouseup);
    };
  }, []);

  const leftStyle: React.CSSProperties = {
    width: `${state.x}px`,
  };
  const rightStyle: React.CSSProperties = {
    width: `${state.containerWidth - state.x}px`,
  };
  const barStyle: React.CSSProperties = {
    width: `${state.dividerWidth}px`,
    left: `${state.x - state.dividerWidth / 2}px`,
    opacity: state.x === 0 ? 0 : 1,
  };
  const imageStyle: React.CSSProperties = {
    opacity: newLoaded && oldLoaded ? 1 : 0,
  };
  const leftImageStyle: React.CSSProperties = {
    width: state.imageWidth,
    height: state.imageHeight,
    left: (state.containerWidth - state.imageWidth) / 2 + "px",
    ...imageStyle,
  };
  const rightImageStyle: React.CSSProperties = {
    width: state.imageWidth,
    height: state.imageHeight,
    right: (state.containerWidth - state.imageWidth) / 2 + "px",
    ...imageStyle,
  };

  let statusClass: string | undefined = undefined;
  if (state.status === "show") {
    statusClass = style.show;
  }
  if (state.status === "hide") {
    statusClass = style.hide;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={gstate.locale?.previewHelp}
      className={classNames(
        style.container,
        state.moving && style.moving,
        statusClass,
      )}
      ref={containerRef}
      onAnimationEnd={(event) => {
        if (event.animationName === style.BoxHide) {
          homeState.compareId = null;
        }
      }}
    >
      <div style={leftStyle}>
        <CompareImage
          src={infoRef.current.src}
          style={leftImageStyle}
          onLoad={() => {
            setOldLoaded(true);
          }}
        />
      </div>
      <div style={rightStyle}>
        <CompareImage
          src={infoRef.current.compress.src}
          style={rightImageStyle}
          onLoad={() => {
            setNewLoaded(true);
          }}
        />
      </div>
      <div style={barStyle}>
        <div
          ref={barRef}
          role="slider"
          tabIndex={0}
          aria-label={gstate.locale?.previewHelp}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(state.xrate * 100)}
          onKeyDown={(event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
              return;
            event.preventDefault();
            const xrate =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? 1
                  : Math.max(
                      0,
                      Math.min(
                        1,
                        state.xrate +
                          (event.key === "ArrowRight" ? 0.05 : -0.05),
                      ),
                    );
            update({ xrate, x: xrate * state.containerWidth });
          }}
        >
          <ArrowLeftRight size={20} />
        </div>
      </div>
      <div className={style.action}>
        {showHelp && (
          <div className={style.help}>{gstate.locale?.previewHelp}</div>
        )}
        <button
          type="button"
          aria-label={text.compareHelp}
          onClick={() => setShowHelp(!showHelp)}
        >
          <CircleHelp size={20} />
        </button>
        <button
          type="button"
          aria-label={text.compareClose}
          onClick={() => {
            updateRef.current?.({ status: "hide" });
          }}
        >
          <X size={20} />
        </button>
      </div>
    </div>,
    document.body,
  );
});
