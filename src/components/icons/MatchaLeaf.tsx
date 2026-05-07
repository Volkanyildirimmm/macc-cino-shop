import { cn } from "@/lib/utils";

interface MatchaLeafProps {
  className?: string;
  size?: number;
}

export function MatchaLeaf({ className, size = 24 }: MatchaLeafProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12c0 2.54.97 4.84 2.56 6.57C7.1 20.88 9.4 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M12 3c-1.5 3-1.5 6 0 8.5-1 1-3 1.5-5 1C8.5 15 11 16.5 12 18c1-1.5 3.5-3 5.5-5.5-2 .5-4 0-5-1C14 9 13.5 6 12 3z"
        fill="currentColor"
      />
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BottleIcon({ className, size = 24 }: MatchaLeafProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 2h6v3l2 2v13a2 2 0 01-2 2H9a2 2 0 01-2-2V7l2-2V2z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
      <line x1="9" y1="2" x2="15" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M7 11c1.5 1 4 1 5 0s3.5-1 5 0"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
