import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export function H1({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn('text-2xl font-semibold tracking-tight text-gray-900', className)}
      {...props}
    />
  )
}

export function H2({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn('text-xl font-semibold tracking-tight text-gray-800', className)}
      {...props}
    />
  )
}

export function H3({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-base font-semibold text-gray-900', className)}
      {...props}
    />
  )
}

export function H4({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn('text-sm font-medium text-gray-700', className)}
      {...props}
    />
  )
}

export function Body({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-gray-600 leading-relaxed', className)}
      {...props}
    />
  )
}

export function Muted({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-xs text-gray-400 leading-relaxed', className)}
      {...props}
    />
  )
}

export function Caption({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('text-xs font-medium text-gray-500 uppercase tracking-wider', className)}
      {...props}
    />
  )
}
