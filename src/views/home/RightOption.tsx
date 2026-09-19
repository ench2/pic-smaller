import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Check, RotateCcw, X } from "lucide-react";
import style from "./RightOption.module.scss";
import { CompressOption } from "@/components/CompressOption";
import { gstate } from "@/global";
import { DefaultCompressOption, homeState } from "@/states/home";
import { useEffect, useRef, useState } from "react";
import { normalizeCompressOption } from "@/options";
import { getHomeCopy } from "./copy";

export const RightOption = observer(() => {
  const disabled = homeState.hasTaskRunning();
  const showOption = homeState.showOption;
  const panelRef = useRef<HTMLElement>(null);
  const [mobile, setMobile] = useState(false);
  const text = getHomeCopy(gstate.lang);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 980px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!showOption || !mobile) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex="0"]',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
    focusable()[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      // Radix owns focus and Escape while its select popup is open.
      if (document.querySelector('[role="listbox"]')) return;
      if (event.key === "Escape") homeState.showOption = false;
      if (event.key !== "Tab") return;
      const elements = focusable();
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
      document.removeEventListener("keydown", keydown);
      previous?.focus();
    };
  }, [showOption, mobile]);

  useEffect(() => {
    if (!showOption) return;

    const root = document.documentElement;
    const body = document.body;
    const media = window.matchMedia("(max-width: 980px)");
    const previousOverflow = root.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    const updateScrollLock = () => {
      if (media.matches) {
        const scrollbarWidth = window.innerWidth - root.clientWidth;
        root.style.overflow = "hidden";
        body.style.paddingRight =
          scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";
      } else {
        root.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
      }
    };

    updateScrollLock();
    media.addEventListener("change", updateScrollLock);

    return () => {
      media.removeEventListener("change", updateScrollLock);
      root.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [showOption]);

  const reset = () => {
    homeState.showOption = false;
    homeState.tempOption = structuredClone(DefaultCompressOption);
    homeState.option = structuredClone(DefaultCompressOption);
    if (homeState.list.size > 0) homeState.reCompress();
  };

  const apply = () => {
    homeState.showOption = false;
    const option = normalizeCompressOption(toJS(homeState.tempOption));
    homeState.tempOption = structuredClone(option);
    homeState.option = option;
    if (homeState.list.size > 0) homeState.reCompress();
  };

  return (
    <>
      {showOption && (
        <button
          type="button"
          tabIndex={-1}
          className={style.backdrop}
          aria-label={text.closeSettings}
          onClick={() => {
            homeState.showOption = false;
          }}
        />
      )}
      <aside
        ref={panelRef}
        id="image-settings"
        role={mobile ? "dialog" : undefined}
        aria-modal={mobile && showOption ? true : undefined}
        aria-hidden={mobile && !showOption ? true : undefined}
        className={`${style.side} ${showOption ? style.open : ""}`}
        aria-label={text.settings}
      >
        <button
          type="button"
          className={style.close}
          aria-label={text.closeSettings}
          onClick={() => {
            homeState.showOption = false;
          }}
        >
          <X size={20} />
        </button>
        <div className={style.scroll}>
          <CompressOption />
        </div>
        <footer>
          <button
            type="button"
            className="button"
            disabled={disabled}
            onClick={reset}
          >
            <RotateCcw size={17} />
            {gstate.locale?.optionPannel.resetBtn}
          </button>
          <button
            type="button"
            className="button buttonPrimary"
            disabled={disabled}
            onClick={apply}
          >
            <Check size={17} />
            {gstate.locale?.optionPannel.confirmBtn}
          </button>
        </footer>
      </aside>
    </>
  );
});
