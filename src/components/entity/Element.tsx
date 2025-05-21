"use client";
import React from "react";
import { EditorElement } from "@/types";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { MdOutlineTextFields, MdMovie } from "react-icons/md";

export type ElementProps = {
  element: EditorElement;
};

export const Element = observer((props: ElementProps) => {
  const store = React.useContext(StoreContext);
  const { element } = props;
  const Icon = element.type === "video" ? MdMovie : MdOutlineTextFields;
  const isSelected = store.selectedElement?.id === element.id;
  
  return (
    <div
      className={`flex my-1 p-2 flex-row justify-start items-center rounded-md cursor-pointer transition-colors ${
        isSelected 
          ? "bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700" 
          : "hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent"
      }`}
      key={element.id}
      onClick={() => {
        store.setSelectedElement(element);
      }}
    >
      <Icon 
        size="20" 
        className={isSelected ? "text-primary-600 dark:text-primary-400" : "text-zinc-500 dark:text-zinc-400"} 
      />
      <div className="truncate text-xs ml-2 flex-1 font-medium">
        {element.name}
      </div>
      <div>
        {element.type === "video" ? (
          <video
            className="opacity-0 max-w-[20px] max-h-[20px]"
            src={element.properties.src}
            onLoad={() => {
              store.refreshElements();
            }}
            onLoadedData={() => {
              store.refreshElements();
            }}
            height={20}
            width={20}
            id={element.properties.elementId}
          ></video>
        ) : null}
        {element.type === "image" ? (
          <img
            className="opacity-0 max-w-[20px] max-h-[20px]"
            src={element.properties.src}
            onLoad={() => {
              store.refreshElements();
            }}
            onLoadedData={() => {
              store.refreshElements();
            }}
            height={20}
            width={20}
            id={element.properties.elementId}
          ></img>
        ) : null}
        {element.type === "audio" ? (
          <audio
            className="opacity-0 max-w-[20px] max-h-[20px]"
            src={element.properties.src}
            onLoad={() => {
              store.refreshElements();
            }}
            onLoadedData={() => {
              store.refreshElements();
            }}
            id={element.properties.elementId}
          ></audio>
        ) : null}
      </div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white mr-2 text-xs py-0 px-1 rounded"
        onClick={(e) => {
          store.removeEditorElement(element.id);
          store.refreshElements();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        X
      </button>
    </div>
  );
});
