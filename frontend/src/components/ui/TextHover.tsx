import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  hover_text: string;
}

export default function TextHover({ children, hover_text }: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{hover_text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
