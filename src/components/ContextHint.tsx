
import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

interface ContextHintProps {
  content: string;
}

export function ContextHint({ content }: ContextHintProps) {
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full ml-2 text-primary/70 transition-all hover:text-primary hover:scale-110 focus:outline-none"
            aria-label="More information"
          >
            <Info className="size-4" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-[200] overflow-hidden rounded-xl bg-background border border-border px-3 py-2 text-xs text-foreground shadow-[var(--shadow-card)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            sideOffset={5}
          >
            {content}
            <Tooltip.Arrow className="fill-border" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
