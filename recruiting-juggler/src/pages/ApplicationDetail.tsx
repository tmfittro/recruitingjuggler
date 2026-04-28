import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Pencil,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Circle,
  CheckSquare,
  Square,
  ClipboardList,
  MessageSquare,
  ListChecks,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import { H1, Body, Caption } from '@/components/ui/Typography'
import {
  getApplication,
  getOverrides,
  setFollowUps as storeSetFollowUps,
  setNotes as storeSetNotes,
  setNextStepCompleted as storeSetNextStepCompleted,
} from '@/data/applicationStore'
import type { FollowUp } from '@/types/application'
import { cn } from '@/lib/utils'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function isPastDue(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = new Date(dateStr + 'T00:00:00')
  return date < today
}

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>()
  const application = id ? getApplication(id) : undefined

  const overrides = id ? getOverrides(id) : {}

  const [followUps, setFollowUps] = useState<FollowUp[]>(
    overrides.followUps ?? application?.followUps ?? []
  )
  const [notes, setNotes] = useState<string>(
    overrides.notes ?? application?.notes ?? ''
  )
  const [nextStepCompleted, setNextStepCompleted] = useState<boolean>(
    overrides.nextStepCompleted ?? false
  )

  useEffect(() => {
    if (!id || !application) return
    const o = getOverrides(id)
    setFollowUps(o.followUps ?? application.followUps)
    setNotes(o.notes ?? application.notes)
    setNextStepCompleted(o.nextStepCompleted ?? false)
  }, [id])

  if (!application || !id) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-12 flex flex-col items-center text-center">
            <AlertCircle className="h-8 w-8 text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-700">Application not found</p>
            <p className="text-xs text-gray-400 mt-1">This application may have been removed.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  function handleToggleFollowUp(followUpId: string) {
    const updated = followUps.map((f) =>
      f.id === followUpId ? { ...f, completed: !f.completed } : f
    )
    setFollowUps(updated)
    storeSetFollowUps(id!, updated)
  }

  function handleNotesChange(value: string) {
    setNotes(value)
    storeSetNotes(id!, value)
  }

  function handleToggleNextStep() {
    const next = !nextStepCompleted
    setNextStepCompleted(next)
    storeSetNextStepCompleted(id!, next)
  }

  const pendingFollowUps = followUps.filter((f) => !f.completed)
  const completedFollowUps = followUps.filter((f) => f.completed)

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="flex-1" />
        <Button asChild variant="secondary" size="sm">
          <Link to={`/dashboard/applications/${id}/edit`}>
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-start gap-3">
        <div className="flex-1 min-w-0">
          <H1 className="text-2xl leading-tight">{application.company}</H1>
          <Body className="mt-0.5">{application.role}</Body>
        </div>
        <div className="pt-1">
          <StatusBadge status={application.stage} className="text-sm px-3 py-1" />
        </div>
      </div>

      <NextStepsCard
        nextStep={application.nextStep}
        deadline={application.deadline}
        completed={nextStepCompleted}
        onToggle={handleToggleNextStep}
      />

      <FollowUpsCard
        followUps={followUps}
        pendingFollowUps={pendingFollowUps}
        completedFollowUps={completedFollowUps}
        onToggle={handleToggleFollowUp}
      />

      <CompletedTasksCard completedTasks={application.completedTasks} />

      <NotesCard notes={notes} onChange={handleNotesChange} />
    </div>
  )
}

function NextStepsCard({
  nextStep,
  deadline,
  completed,
  onToggle,
}: {
  nextStep: string | null
  deadline: string | null
  completed: boolean
  onToggle: () => void
}) {
  const overdue = !completed && deadline ? isPastDue(deadline) : false

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-gray-400" />
          <CardTitle>Next Steps</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {nextStep ? (
          <button
            type="button"
            onClick={onToggle}
            className="w-full flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-gray-50 transition-colors text-left group"
            aria-label={`${completed ? 'Mark incomplete' : 'Mark complete'}: ${nextStep}`}
          >
            <span className="mt-0.5 flex-shrink-0 transition-colors">
              {completed ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Circle className="h-4 w-4 text-primary-400 group-hover:text-primary-500" />
              )}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-sm leading-snug',
                  completed ? 'line-through text-gray-400' : 'text-gray-800'
                )}
              >
                {nextStep}
              </p>
              {deadline && (
                <div
                  className={cn(
                    'inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded text-xs font-medium',
                    completed
                      ? 'bg-gray-50 text-gray-300 border border-gray-100'
                      : overdue
                      ? 'bg-red-50 text-red-600 border border-red-100'
                      : 'bg-gray-50 text-gray-500 border border-gray-100'
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {!completed && overdue ? 'Past due · ' : 'Due '}
                  {formatDate(deadline)}
                </div>
              )}
            </div>
          </button>
        ) : (
          <p className="text-sm text-gray-400 italic">No next steps defined.</p>
        )}
      </CardContent>
    </Card>
  )
}

function FollowUpsCard({
  followUps,
  pendingFollowUps,
  completedFollowUps,
  onToggle,
}: {
  followUps: FollowUp[]
  pendingFollowUps: FollowUp[]
  completedFollowUps: FollowUp[]
  onToggle: (id: string) => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-gray-400" />
          <CardTitle>Follow-ups</CardTitle>
          {followUps.length > 0 && (
            <span className="ml-auto text-xs text-gray-400">
              {completedFollowUps.length}/{followUps.length} done
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {followUps.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No follow-ups tracked.</p>
        ) : (
          <div className="space-y-1">
            {pendingFollowUps.length > 0 && (
              <div className="space-y-2">
                {pendingFollowUps.map((f) => (
                  <FollowUpRow key={f.id} followUp={f} onToggle={onToggle} />
                ))}
              </div>
            )}

            {completedFollowUps.length > 0 && (
              <div
                className={cn(
                  'space-y-2',
                  pendingFollowUps.length > 0 && 'mt-3 pt-3 border-t border-gray-100'
                )}
              >
                <Caption>Completed</Caption>
                <div className="space-y-2 mt-1">
                  {completedFollowUps.map((f) => (
                    <FollowUpRow key={f.id} followUp={f} onToggle={onToggle} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function FollowUpRow({
  followUp,
  onToggle,
}: {
  followUp: FollowUp
  onToggle: (id: string) => void
}) {
  const overdue =
    !followUp.completed && followUp.dueDate ? isPastDue(followUp.dueDate) : false

  return (
    <button
      type="button"
      onClick={() => onToggle(followUp.id)}
      className="w-full flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors text-left group"
      aria-label={`${followUp.completed ? 'Mark incomplete' : 'Mark complete'}: ${followUp.description}`}
    >
      <span className="mt-0.5 flex-shrink-0 text-gray-300 group-hover:text-primary-400 transition-colors">
        {followUp.completed ? (
          <CheckSquare className="h-4 w-4 text-green-500" />
        ) : (
          <Square className="h-4 w-4" />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm leading-snug',
            followUp.completed ? 'line-through text-gray-400' : 'text-gray-800'
          )}
        >
          {followUp.description}
        </p>
        {followUp.dueDate && (
          <p
            className={cn(
              'text-xs mt-0.5',
              followUp.completed
                ? 'text-gray-300'
                : overdue
                ? 'text-red-500 font-medium'
                : 'text-gray-400'
            )}
          >
            {overdue && !followUp.completed ? 'Past due · ' : 'Due '}
            {formatDate(followUp.dueDate)}
          </p>
        )}
      </div>
    </button>
  )
}

function CompletedTasksCard({ completedTasks }: { completedTasks: string[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-gray-400" />
          <CardTitle>Completed Tasks</CardTitle>
          {completedTasks.length > 0 && (
            <span className="ml-auto text-xs text-gray-400">{completedTasks.length} tasks</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {completedTasks.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No completed tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {completedTasks.map((task, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-400 line-through">{task}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

function NotesCard({
  notes,
  onChange,
}: {
  notes: string
  onChange: (v: string) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add any notes or observations about this application…"
          rows={4}
          className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent leading-relaxed"
        />
      </CardContent>
    </Card>
  )
}
