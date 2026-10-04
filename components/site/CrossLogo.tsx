import { Cross } from 'lucide-react';

export function CrossLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M21 6H19V15H10V17H19V34H21V17H30V15H21V6Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function SchoolLogo({
  className = '',
  iconColor = 'text-gold',
}: {
  className?: string;
  iconColor?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy flex items-center justify-center">
        <Cross className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
      </div>
      <div className="leading-tight">
        <div className="font-bold text-navy text-base sm:text-lg tracking-tight">
          SDK BUIKOUN
        </div>
        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">
          Sekolah Dasar Katolik Buikoun
        </div>
      </div>
    </div>
  );
}
