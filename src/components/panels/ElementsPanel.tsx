"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Element } from "../entity/Element";

export const ElementsPanel = observer((_props: {}) => {
  const store = React.useContext(StoreContext);
  return (
    <div className="h-full w-[200px] bg-popover border-r border-border flex flex-col items-center p-2"> {/* Use theme variable */}
      <h3 className="text-sm px-4 py-3 font-medium">Elements</h3>
      
      <div className="flex flex-col p-2">
        {store.editorElements.map((element) => {
          return <Element key={element.id} element={element} />;
        })}
      </div>
    </div>
  );
});
