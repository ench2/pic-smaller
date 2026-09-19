import style from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { gstate } from "@/global";
import { ImageInput } from "../ImageInput";
import { state } from "./state";
import { createImageList } from "@/engines/transform";
import {
  getFilesFromEntry,
  getFilesFromHandle,
  isSupportedType,
} from "@/functions";
import { sprintf } from "sprintf-js";
import { Mimes } from "@/mimes";
import { Images, FolderPlus, Upload, Clipboard } from "lucide-react";
import { getHomeCopy } from "@/views/home/copy";

export const UploadCard = observer(() => {
  const fileRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [folderError, setFolderError] = useState(false);
  const text = getHomeCopy(gstate.lang);

  useEffect(() => {
    folderRef.current?.setAttribute("webkitdirectory", "");
  }, []);

  const chooseFolder = async () => {
    setFolderError(false);
    if (typeof window.showDirectoryPicker !== "function") {
      folderRef.current?.click();
      return;
    }
    try {
      const handle = await window.showDirectoryPicker();
      createImageList(await getFilesFromHandle(handle));
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setFolderError(true);
    }
  };

  useEffect(() => {
    const dragLeave = () => {
      state.dragActive = false;
    };
    const dragOver = (event: DragEvent) => {
      event.preventDefault();
      state.dragActive = true;
    };
    const drop = async (event: DragEvent) => {
      event.preventDefault();
      state.dragActive = false;
      const files: Array<File> = [];
      if (event.dataTransfer?.items) {
        // https://stackoverflow.com/questions/55658851/javascript-datatransfer-items-not-persisting-through-async-calls
        const list: Array<Promise<void>> = [];
        for (const item of event.dataTransfer.items) {
          if (typeof item.getAsFileSystemHandle === "function") {
            list.push(
              (async () => {
                const handle = await item.getAsFileSystemHandle!();
                const result = await getFilesFromHandle(handle);
                files.push(...result);
              })(),
            );
            continue;
          }
          if (typeof item.webkitGetAsEntry === "function") {
            list.push(
              (async () => {
                const entry = await item.webkitGetAsEntry();
                if (entry) {
                  const result = await getFilesFromEntry(entry);
                  files.push(...result);
                }
              })(),
            );
          }
        }
        await Promise.all(list);
      } else if (event.dataTransfer?.files) {
        const list = event.dataTransfer?.files;
        for (let index = 0; index < list.length; index++) {
          const file = list.item(index);
          if (file && isSupportedType(file)) {
            files.push(file);
          }
        }
      }

      files.length > 0 && createImageList(files);
    };

    const target = dragRef.current!;
    target.addEventListener("dragover", dragOver);
    target.addEventListener("dragleave", dragLeave);
    target.addEventListener("drop", drop);

    return () => {
      target.removeEventListener("dragover", dragOver);
      target.removeEventListener("dragleave", dragLeave);
      target.removeEventListener("drop", drop);
    };
  }, []);

  return (
    <div
      className={classNames(style.container, state.dragActive && style.active)}
      ref={dragRef}
    >
      <div className={style.inner}>
        <div className={style.uploadIcon}>
          <Images aria-hidden="true" />
        </div>
        <strong>{text.drop}</strong>
        <p>
          {sprintf(
            gstate.locale?.uploadCard.subTitle ?? "",
            Object.keys(Mimes)
              .map((item) => item.toUpperCase())
              .join("/"),
          )}
        </p>
        <div className={style.actions}>
          <button
            type="button"
            className="button buttonPrimary buttonLarge"
            onClick={() => fileRef.current?.click()}
          >
            <Upload size={18} aria-hidden="true" />
            {text.choose}
          </button>
          <button type="button" className="button" onClick={chooseFolder}>
            <FolderPlus size={18} aria-hidden="true" />
            {text.folder}
          </button>
        </div>
        <div className={style.pasteHint}>
          <Clipboard size={16} aria-hidden="true" />
          <span>{gstate.locale?.uploadCard.pasteHint}</span>
        </div>
        {folderError && <p role="alert">{text.folderError}</p>}
      </div>
      <ImageInput ref={fileRef} />
      <input
        ref={folderRef}
        type="file"
        multiple
        hidden
        aria-label={text.folder}
        onChange={async (event) => {
          const input = event.currentTarget;
          const files = Array.from(input.files ?? []).filter(isSupportedType);
          if (files.length) await createImageList(files);
          input.value = "";
        }}
      />
    </div>
  );
});
