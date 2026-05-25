
import Image from "next/image";
import { cn } from "@/lib/utils";
import SpotlightCard from "@/Components/ui/SpotlightCard";
import type { SkillIcon } from "@/data/skills";

interface SkillCardProps {
  name: string;
  icon?: SkillIcon;
  image?: string;
  className?: string;
  showIcon?: boolean;
  grayscale?: boolean;
}

export default function SkillCard({
  name,
  icon: Icon,
  image,
  className = "",
  showIcon = true,
  grayscale = false,
}: SkillCardProps) {
  return (
    <SpotlightCard
      className={cn(
        "p-2 md:p-4 rounded-2xl",
        "bg-card text-foreground",
        "border-neutral-200",
        "transition-all duration-300 ease-out cursor-default",
        "aspect-square",
        className
      )}
      spotlightColor="rgba(var(--glow-color), var(--glow-opacity))"
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        {showIcon && (
          <div className="mb-4 shrink-0 h-10 w-10 md:h-14 md:w-14 flex items-center justify-center rounded-lg md:rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-600 transition-colors duration-300 group-hover:scale-110">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={56}
                height={56}
                className="md:w-12 md:h-12 w-5 h-5 object-contain filter grayscale"
              />
            ) : Icon ? (
              <Icon
                className={cn(
                  "md:w-8 md:h-8 w-5 h-5",
                  grayscale && "filter grayscale"
                )}
              />
            ) : null}
          </div>
        )}
        <span className="text-[9px] md:text-sm font-bold text-center text-foreground leading-tight">
          {name}
        </span>
      </div>
    </SpotlightCard>
  );
}
