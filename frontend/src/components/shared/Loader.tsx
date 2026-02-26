interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const sizeStyles: Record<string, string> = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
};

export default function Loader({
  size = 'md',
  text,
  fullScreen = false,
}: LoaderProps) {
  const content = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          ${sizeStyles[size]}
          rounded-full border-slate-200 border-t-blue-600
          animate-spin
        `}
      />
      {text && (
        <p className="text-sm text-slate-500 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {content}
    </div>
  );
}
