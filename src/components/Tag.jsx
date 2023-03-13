import clsx from 'clsx'

const variantStyles = {
  medium: 'rounded-lg px-1.5 ring-1 ring-inset',
}

const colorStyles = {
  emerald: {
    small: 'text-green dark:text-yellow',
    medium:
      'ring-light dark:ring-light/30 bg-light/10 text-green dark:text-yellow',
  },
  sky: {
    small: 'text-green dark:text-yellow',
    medium:
      'ring-light bg-light/10 text-green dark:ring-light/30 dark:bg-light/10 dark:text-yellow',
  },
  amber: {
    small: 'text-red',
    medium:
      'ring-light bg-light/10 text-red dark:ring-light/30 dark:bg-light/10 dark:text-light',
  },
  rose: {
    small: 'text-red dark:text-red',
    medium:
      'ring-light bg-light text-red dark:ring-red/20 dark:bg-light/10 dark:text-light',
  },
  zinc: {
    small: 'text-light dark:text-dark',
    medium:
      'ring-light bg-light text-dark dark:ring-dark/20 dark:bg-light/10 dark:text-light',
  },
}

const valueColorMap = {
  get: 'emerald',
  post: 'sky',
  put: 'amber',
  delete: 'rose',
}

export function Tag({
  children,
  variant = 'medium',
  color = valueColorMap[children.toLowerCase()] ?? 'emerald',
}) {
  return (
    <span
      className={clsx(
        'font-mono text-[0.625rem] font-semibold leading-6',
        variantStyles[variant],
        colorStyles[color][variant]
      )}
    >
      {children}
    </span>
  )
}
