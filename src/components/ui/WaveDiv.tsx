import { cn } from "@/lib/utils";

interface WaveDivProps {
  fill?: string;
  className?: string;
  flip?: boolean;
}

export function WaveDiv({ fill = "currentColor", className, flip = false }: WaveDivProps) {
  return (
    <div className={cn("w-full overflow-hidden leading-none", className)}>
      <svg
        viewBox="0 0 1440 80"
        className={cn("w-full block", flip && "scale-y-[-1]")}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
