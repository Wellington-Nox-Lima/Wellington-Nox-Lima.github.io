type LogoMarkProps = {
  className?: string;
};

/** Monograma WL: o W em branco e o L no azul da marca, sobre o quadrado escuro. */
export function LogoMark({ className = "h-8 w-8" }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill="#0C111D" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="white" strokeOpacity="0.1" />
      <path
        d="M5 10.5 8.4 21.5 11.9 14 15.4 21.5 18.8 10.5"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.4 10.5V21.5H27.2"
        stroke="#4F7BFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
