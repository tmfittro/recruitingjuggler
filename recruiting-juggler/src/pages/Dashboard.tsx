import { Link } from 'react-router-dom'
import { PlusCircle, Briefcase, CheckCircle, XCircle, Activity } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { H1, Body, Caption } from '@/components/ui/Typography'
import { ApplicationCard } from '@/components/ApplicationCard'
import { sampleApplications } from '@/data/sampleApplications'
import type { AppGroupStatus } from '@/types/application'
import type { Application } from '@/types/application'

const GROUP_CONFIG: {
  status: AppGroupStatus
  label: string
  icon: React.ElementType
  iconClass: string
  emptyMessage: string
}[] = [
  {
    status: 'active',
    label: 'Active',
    icon: Activity,
    iconClass: 'text-primary-500',
    emptyMessage: 'No active applications.',
  },
  {
    status: 'completed',
    label: 'Completed',
    icon: CheckCircle,
    iconClass: 'text-green-500',
    emptyMessage: 'No completed applications yet.',
  },
  {
    status: 'inactive',
    label: 'Inactive',
    icon: XCircle,
    iconClass: 'text-gray-400',
    emptyMessage: 'No inactive applications.',
  },
]

function groupApplications(apps: Application[]) {
  return {
    active: apps.filter((a) => a.status === 'active'),
    completed: apps.filter((a) => a.status === 'completed'),
    inactive: apps.filter((a) => a.status === 'inactive'),
  }
}

export default function Dashboard() {
  const applications = sampleApplications
  const grouped = groupApplications(applications)
  const hasAny = applications.length > 0

  const totalActive = grouped.active.length
  const totalCompleted = grouped.completed.length
  const totalInactive = grouped.inactive.length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <H1 className="text-xl">My Applications</H1>
          <Body className="mt-0.5">Track and manage all your job applications</Body>
        </div>
        <Button asChild variant="primary" size="md">
          <Link to="/applications/new">
            <PlusCircle className="h-4 w-4" />
            Add Application
          </Link>
        </Button>
      </div>

      {!hasAny ? (
        <EmptyState />
      ) : (
        <>
          <div className="flex items-center gap-1.5 mb-6 text-sm text-gray-500">
            <span className="font-medium text-gray-900">{totalActive} Active</span>
            <span className="text-gray-300">·</span>
            <span className="font-medium text-gray-900">{totalCompleted} Completed</span>
            <span className="text-gray-300">·</span>
            <span className="font-medium text-gray-900">{totalInactive} Inactive</span>
          </div>

          <div className="space-y-8">
            {GROUP_CONFIG.map(({ status, label, icon: Icon, iconClass, emptyMessage }) => {
              const group = grouped[status]
              return (
                <section key={status}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`h-4 w-4 ${iconClass}`} />
                    <Caption>{label}</Caption>
                    <span className="ml-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
                      {group.length}
                    </span>
                  </div>

                  {group.length === 0 ? (
                    <p className="text-sm text-gray-400 italic px-1">{emptyMessage}</p>
                  ) : (
                    <div className="space-y-3">
                      {group.map((app) => (
                        <ApplicationCard key={app.id} application={app} />
                      ))}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="py-16 flex flex-col items-center text-center">
        <div className="rounded-full bg-primary-50 p-4 mb-4">
          <Briefcase className="h-8 w-8 text-primary-300" />
        </div>
        <h3 className="text-base font-medium text-gray-900 mb-1">No applications yet</h3>
        <Body className="mb-4 max-w-xs">
          Start tracking your job search by adding your first application. Stay organized and never miss a deadline.
        </Body>
        <Button asChild variant="primary" size="sm">
          <Link to="/applications/new">
            <PlusCircle className="h-4 w-4" />
            Add your first application
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
