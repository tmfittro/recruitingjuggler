import type { FollowUp } from '@/types/application'

interface ApplicationOverrides {
  followUps?: FollowUp[]
  notes?: string
  nextStepCompleted?: boolean
}

const store: Record<string, ApplicationOverrides> = {}

export function getOverrides(id: string): ApplicationOverrides {
  return store[id] ?? {}
}

export function setFollowUps(id: string, followUps: FollowUp[]) {
  store[id] = { ...store[id], followUps }
}

export function setNotes(id: string, notes: string) {
  store[id] = { ...store[id], notes }
}

export function setNextStepCompleted(id: string, completed: boolean) {
  store[id] = { ...store[id], nextStepCompleted: completed }
}
