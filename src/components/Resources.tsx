"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { ExportVideoPanel } from "./panels/ExportVideoPanel";
import { AnimationsPanel } from "./panels/AnimationsPanel";
import { AudioResourcesPanel } from "./panels/AudioResourcesPanel";
import { FillPanel } from "./panels/FillPanel";
import { ImageResourcesPanel } from "./panels/ImageResourcesPanel";
import { TextResourcesPanel } from "./panels/TextResourcesPanel";
import { VideoResourcesPanel } from "./panels/VideoResourcesPanel";
import { EffectsPanel } from "./panels/EffectsPanel";

export const Resources = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedMenuOption = store.selectedMenuOption;
  
  const renderPanel = () => {
    switch(selectedMenuOption) {
      case "Video": return <VideoResourcesPanel />;
      case "Audio": return <AudioResourcesPanel />;
      case "Image": return <ImageResourcesPanel />;
      case "Text": return <TextResourcesPanel />;
      case "Animation": return <AnimationsPanel />;
      case "Effect": return <EffectsPanel />;
      case "Export": return <ExportVideoPanel />;
      case "Fill": return <FillPanel />;
      default: return null;
    }
  };
  
  return (
    <div className="w-64 h-full p-4 overflow-y-auto relative">
      <div className="p-4">
        <h2 className="font-medium text-lg mb-4 text-zinc-800 dark:text-zinc-200">{selectedMenuOption}</h2>
        {renderPanel()}
      </div>
    </div>
  );
});
