import type { Application, FollowUp } from '@/types/application'
import type { ApplicationStatus } from '@/components/ui/Badge'
import type { AppGroupStatus } from '@/types/application'
import { sampleApplications } from '@/data/sampleApplications'

interface ApplicationOverrides {
  followUps?: FollowUp[]
  notes?: string
  nextStepCompleted?: boolean
}

const interactiveOverrides: Record<string, ApplicationOverrides> = {}
const applicationEdits: Record<string, Partial<Application>> = {}
const customApplications: Application[] = []
const deletedIds: Set<string> = new Set()

export function stageToGroupStatus(stage: ApplicationStatus): AppGroupStatus {
  if (stage === 'rejected' || stage === 'offer') return 'completed'
  if (stage === 'withdrawn') return 'inactive'
  return 'active'
}

export function getApplications(): Application[] {
  const base = sampleApplications
    .filter((a) => !deletedIds.has(a.id))
    .map((a) => {
      const edits = applicationEdits[a.id]
      if (edits) return { ...a, ...edits }
      return a
    })
  const custom = customApplications.filter((a) => !deletedIds.has(a.id))
  return [...base, ...custom]
}

export function getApplication(id: string): Application | undefined {
  return getApplications().find((a) => a.id === id)
}

export function addApplication(app: Omit<Application, 'id' | 'followUps' | 'completedTasks'>): Application {
  const newApp: Application = {
    ...app,
    id: `custom-${Date.now()}`,
    followUps: [],
    completedTasks: [],
  }
  customApplications.push(newApp)
  return newApp
}

export function updateApplication(id: string, updates: Partial<Omit<Application, 'id' | 'followUps' | 'completedTasks'>>) {
  const isCustom = customApplications.findIndex((a) => a.id === id)
  if (isCustom !== -1) {
    customApplications[isCustom] = { ...customApplications[isCustom], ...updates }
  } else {
    applicationEdits[id] = { ...applicationEdits[id], ...updates }
  }
  if (updates.notes !== undefined && interactiveOverrides[id]) {
    delete interactiveOverrides[id].notes
  }
}

export function deleteApplication(id: string) {
  deletedIds.add(id)
  const customIdx = customApplications.findIndex((a) => a.id === id)
  if (customIdx !== -1) customApplications.splice(customIdx, 1)
}

export function getOverrides(id: string): ApplicationOverrides {
  return interactiveOverrides[id] ?? {}
}

export function setFollowUps(id: string, followUps: FollowUp[]) {
  interactiveOverrides[id] = { ...interactiveOverrides[id], followUps }
}

export function setNotes(id: string, notes: string) {
  interactiveOverrides[id] = { ...interactiveOverrides[id], notes }
}

export function setNextStepCompleted(id: string, completed: boolean) {
  interactiveOverrides[id] = { ...interactiveOverrides[id], nextStepCompleted: completed }
}
