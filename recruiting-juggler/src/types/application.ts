import type { ApplicationStatus } from '@/components/ui/Badge'

export type AppGroupStatus = 'active' | 'completed' | 'inactive'

export interface FollowUp {
  id: string
  description: string
  completed: boolean
  dueDate: string | null
}

export interface Application {
  id: string
  company: string
  role: string
  stage: ApplicationStatus
  status: AppGroupStatus
  nextStep: string | null
  deadline: string | null
  followUps: FollowUp[]
  completedTasks: string[]
  notes: string
}
