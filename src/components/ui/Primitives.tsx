import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

// 1. Badge Component
export interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  icon?: ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  icon
}) => {
  const base = 'inline-flex items-center gap-1.5 font-medium tracking-wide whitespace-nowrap transition-colors select-none font-["Poppins",sans-serif]';
  const sizes = {
    sm: 'px-2.5 py-0.5 text-[11px] rounded-full',
    md: 'px-3 py-1 text-xs rounded-full'
  };
  const variants = {
    primary: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60',
    accent: 'bg-indigo-600 dark:bg-indigo-500 text-white font-semibold shadow-xs',
    success: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60',
    warning: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60',
    danger: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60',
    neutral: 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60',
    outline: 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

// 2. Card Component
export interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
  id
}) => {
  if (hover) {
    return (
      <motion.div
        id={id}
        onClick={onClick}
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        whileTap={onClick ? { scale: 0.99 } : undefined}
        className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 p-6 sm:p-7 text-slate-900 dark:text-slate-100 shadow-xs dark:shadow-none hover:shadow-md dark:hover:shadow-indigo-950/30 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors cursor-pointer ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 p-6 sm:p-7 text-slate-900 dark:text-slate-100 shadow-xs dark:shadow-none ${className}`}
    >
      {children}
    </div>
  );
};

// 3. Button Component with Framer Motion
export interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'ghost' | 'subtle' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
}

export const Btn: React.FC<BtnProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none font-["Poppins",sans-serif]';

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-4.5 py-2 text-sm gap-2',
    lg: 'px-6 py-2.5 text-base gap-2.5'
  };

  const variants = {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-xs',
    accent: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs shadow-indigo-600/20',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white',
    subtle: 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700',
    outline: 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-xs shadow-rose-600/20'
  };

  return (
    <motion.button
      whileHover={disabled || loading ? undefined : { scale: 1.015 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...(props as any)}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
      <span>{children}</span>
    </motion.button>
  );
};

// 4. Form Field Component
export interface FieldProps {
  label: string;
  helperText?: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}

export const Field: React.FC<FieldProps> = ({
  label,
  helperText,
  error,
  children,
  required
}) => {
  return (
    <div className="space-y-1.5 text-left font-['Poppins',sans-serif]">
      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-indigo-600 dark:text-indigo-400">*</span>}
      </label>
      {children}
      {helperText && !error && (
        <p className="text-xs text-slate-400 dark:text-slate-500">{helperText}</p>
      )}
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
};

// 5. Selectable Pill Component
export interface PillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
}

export const Pill: React.FC<PillProps> = ({ label, selected, onClick, icon }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer select-none whitespace-nowrap font-['Poppins',sans-serif] ${
        selected
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/20'
          : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
};

// 6. ScoreRing Component
export interface ScoreRingProps {
  score: number; // 0 - 100 or 0 - 10
  maxScore?: number;
  label?: string;
  size?: number; // px
  strokeWidth?: number;
  color?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  maxScore = 100,
  label,
  size = 72,
  strokeWidth = 6,
  color = '#4f46e5'
}) => {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="inline-flex flex-col items-center justify-center text-center font-['Poppins',sans-serif]">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-100 dark:text-slate-800"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
            {maxScore === 10 ? score.toFixed(1) : `${Math.round(score)}%`}
          </span>
        </div>
      </div>
      {label && <span className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{label}</span>}
    </div>
  );
};

// 7. Bar (Progress Bar) Component
export interface BarProps {
  progress: number; // 0 - 100
  label?: string;
  subLabel?: string;
  colorClass?: string;
  className?: string;
}

export const Bar: React.FC<BarProps> = ({
  progress,
  label,
  subLabel,
  colorClass = 'bg-indigo-600',
  className = ''
}) => {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <div className={`space-y-1.5 font-['Poppins',sans-serif] ${className}`}>
      {(label || subLabel) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="text-slate-700 dark:text-slate-300 font-medium">{label}</span>}
          {subLabel && <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">{subLabel}</span>}
        </div>
      )}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

// 8. Toast Component
export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        onClick={onClose}
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg cursor-pointer font-['Poppins',sans-serif] ${
          type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
            : type === 'error'
            ? 'bg-rose-50 dark:bg-rose-950/90 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800'
            : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
          {type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
          {type === 'info' && <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
        </div>
        <div className="text-xs leading-relaxed font-medium flex-1">{message}</div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose?.(); }}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
};

export interface ToastNotificationProps {
  toasts: { id: string; type: 'success' | 'error' | 'info'; message: string }[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            onClick={() => onDismiss(toast.id)}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg cursor-pointer font-['Poppins',sans-serif] ${
              toast.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
                : toast.type === 'error'
                ? 'bg-rose-50 dark:bg-rose-950/90 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800'
                : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            </div>
            <div className="text-xs leading-relaxed font-medium flex-1">{toast.message}</div>
            <button
              onClick={(e) => { e.stopPropagation(); onDismiss(toast.id); }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

