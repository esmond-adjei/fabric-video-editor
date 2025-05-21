"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { 
  Video, 
  Music, 
  Image, 
  Type, 
  Magnet, 
  Palette, 
  PaintBucket, 
  Download,
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Store } from "@/store/Store";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { Resources } from "./Resources";
import { cn } from "@/utils";

export const Menu = observer(() => {
  const store = React.useContext(StoreContext);

  return (
    <div className="group relative h-full flex-shrink-0 flex">
      {/* tools buttons */}
      <ul className="h-full w-fit bg-background border-r border-border flex flex-col items-center p-2">
        {MENU_OPTIONS.map((option) => {
          const isSelected = store.selectedMenuOption === option.name;
          return (
            <li
              key={option.name}
              className={cn(
                "h-[72px] w-[72px] rounded-lg flex flex-col items-center justify-center transition-colors",
                isSelected 
                  ? "bg-primary-600 text-white" 
                  : "hover:bg-primary-50 dark:hover:bg-primary-900/30"
              )}
            >
              <button
                onClick={() => option.action(store)}
                className="flex flex-col items-center w-full h-full justify-center"
                title={option.name}
              >
                <option.icon
                  size="24"
                  className={cn(
                    isSelected 
                      ? "text-white" 
                      : "text-zinc-600 dark:text-zinc-300"
                  )}
                />
                <div
                  className={cn(
                    "mt-1 text-xs font-medium",
                    isSelected 
                      ? "text-white" 
                      : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {option.name}
                </div>
              </button>
            </li>
          );
        })}
        <ThemeSwitcher />
      </ul>

      {/* tools panel */}
      <div
        className={cn(
          "h-full border-r border-border overflow-hidden transition-all duration-300 ease-in-out",
          store.sidebarExpanded ? "w-64 opacity-100" : "w-0 opacity-0"
        )}
      >
        <div className="h-full bg-background/90">
          <Resources />
          </div>
      </div>  

      {/* collapse button */}
      <button
        onClick={store.toggleSidebar}
        className={cn(
          "absolute top-1/2 -right-2 -translate-y-1/2 z-10 p-1 opacity-0 group-hover:opacity-100 rounded-full bg-zinc-800 border border-border cursor-pointer hover:shadow-lg hover:bg-zinc-700 text-zinc-400 transition-all duration-300",
        )}
        title={store.sidebarExpanded ? "Collapse panel" : "Expand panel"}
      >
        {store.sidebarExpanded ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
      </button>
    </div>
  );
});

const MENU_OPTIONS = [
  {
    name: "Video",
    icon: Video,
    action: (store: Store) => {
      store.setSelectedMenuOption("Video");
    },
  },
  {
    name: "Audio",
    icon: Music,
    action: (store: Store) => {
      store.setSelectedMenuOption("Audio");
    },
  },
  {
    name: "Image",
    icon: Image,
    action: (store: Store) => {
      store.setSelectedMenuOption("Image");
    },
  },
  {
    name: "Text",
    icon: Type,
    action: (store: Store) => {
      store.setSelectedMenuOption("Text");
    },
  },
  {
    name: "Animation",
    icon: Magnet,
    action: (store: Store) => {
      store.setSelectedMenuOption("Animation");
    },
  },
  {
    name: "Effect",
    icon: Palette,
    action: (store: Store) => {
      store.setSelectedMenuOption("Effect");
    },
  },
  {
    name: "Fill",
    icon: PaintBucket,
    action: (store: Store) => {
      store.setSelectedMenuOption("Fill");
    },
  },
  {
    name: "Export",
    icon: Download,
    action: (store: Store) => {
      store.setSelectedMenuOption("Export");
    },
  },
];
