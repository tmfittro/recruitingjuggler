import { Link } from 'react-router-dom'
import { AlertCircle, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { Application } from '@/types/application'

interface ApplicationCardProps {
  application: Application
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function getUrgency(deadline: string | null): 'overdue' | 'soon' | 'normal' {
  if (!deadline) return 'normal'
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const due = parseLocalDate(deadline)
  const diffMs = due.getTime() - now.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  if (diffMs < 0) return 'overdue'
  if (diffHours <= 48) return 'soon'
  return 'normal'
}

function formatDeadline(deadline: string): string {
  const date = parseLocalDate(deadline)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const { id, company, role, stage, nextStep, deadline } = application
  const urgency = getUrgency(deadline)

  return (
    <Link to={`/dashboard/applications/${id}`} className="block group focus:outline-none">
      <Card
        className={cn(
          'transition-shadow hover:shadow-md group-focus:ring-2 group-focus:ring-primary-300',
          urgency === 'overdue' && 'border-l-4 border-l-red-400',
          urgency === 'soon' && 'border-l-4 border-l-amber-400',
        )}
      >
        <CardContent className="py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-base font-semibold text-gray-900 truncate">{company}</span>
                <StatusBadge status={stage} />
                {urgency === 'overdue' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                    <AlertCircle className="h-3 w-3" />
                    Overdue
                  </span>
                )}
                {urgency === 'soon' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                    <Clock className="h-3 w-3" />
                    Due soon
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-3">{role}</p>

              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                {nextStep && (
                  <div className="flex items-start gap-1.5 min-w-0">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-600 truncate">{nextStep}</span>
                  </div>
                )}

                {deadline && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Clock
                      className={cn(
                        'h-3.5 w-3.5',
                        urgency === 'overdue' ? 'text-red-400' : urgency === 'soon' ? 'text-amber-500' : 'text-gray-400',
                      )}
                    />
                    <span
                      className={cn(
                        'text-xs font-medium',
                        urgency === 'overdue' ? 'text-red-500' : urgency === 'soon' ? 'text-amber-600' : 'text-gray-500',
                      )}
                    >
                      {urgency === 'overdue' ? 'Was due' : 'Due'} {formatDeadline(deadline)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-1 transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
