import { cn } from '@/lib/utils'

export type ApplicationStatus =
  | 'applied'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'withdrawn'
  | 'pending'

const statusConfig: Record<ApplicationStatus, { label: string; className: string }> = {
  applied:   { label: 'Applied',    className: 'bg-blue-50 text-blue-700 border border-blue-100' },
  interview: { label: 'Interview',  className: 'bg-amber-50 text-amber-700 border border-amber-100' },
  offer:     { label: 'Offer',      className: 'bg-green-50 text-green-700 border border-green-100' },
  rejected:  { label: 'Rejected',   className: 'bg-red-50 text-red-600 border border-red-100' },
  withdrawn: { label: 'Withdrawn',  className: 'bg-gray-100 text-gray-500 border border-gray-200' },
  pending:   { label: 'Pending',    className: 'bg-purple-50 text-purple-700 border border-purple-100' },
}

interface BadgeProps {
  status: ApplicationStatus
  className?: string
}

export function StatusBadge({ status, className }: BadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', config.className, className)}>
      {config.label}
    </span>
  )
}

interface GenericBadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: GenericBadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200', className)}>
      {children}
    </span>
  )
}
