import { useEffect, useRef } from "react";
import classNames from "classnames";
import style from "./index.module.scss";

export type AdSlotPosition =
  | "workspace-bottom"
  | "result-inline"
  | "content-middle";

type AdSlotProps = {
  position: AdSlotPosition;
  slotId?: string;
  className?: string;
};

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9757609887133257";

export function AdSlot({ position, slotId = "default-slot", className }: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const isConfigured = Boolean(ADSENSE_CLIENT_ID);

  useEffect(() => {
    if (!isConfigured || !adRef.current) return;
    try {
      const win = window as unknown as { adsbygoogle?: Array<Record<string, unknown>> };
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
    } catch {
      // AdSense block or privacy opt-out handled safely
    }
  }, [isConfigured]);

  const positionClass =
    position === "workspace-bottom"
      ? style.workspaceBottom
      : position === "result-inline"
        ? style.resultInline
        : style.contentMiddle;

  return (
    <div className={classNames(style.adSlot, positionClass, className)} role="region" aria-label="Advertisement">
      {isConfigured ? (
        <ins
          ref={adRef}
          className={classNames("adsbygoogle", style.ins)}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className={style.placeholder} aria-hidden="true">
          <span>Advertisement</span>
          <small>100% On-Device · Zero Uploads · Privacy Protected</small>
        </div>
      )}
    </div>
  );
}
