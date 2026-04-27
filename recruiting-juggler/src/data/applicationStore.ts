import type { Application, FollowUp } from '@/types/application'
import type { ApplicationStatus } from '@/components/ui/Badge'
import type { AppGroupStatus } from '@/types/application'
import { sampleApplications } from '@/data/sampleApplications'

interface ApplicationOverrides {
  followUps?: FollowUp[]
  notes?: string
  nextStepCompleted?: boolean
}

interface PersistedState {
  schemaVersion: number
  customApplications: Application[]
  applicationEdits: Record<string, Partial<Application>>
  deletedIds: string[]
  interactiveOverrides: Record<string, ApplicationOverrides>
}

const STORAGE_KEY = 'recruiting-juggler-state'
const SCHEMA_VERSION = 1

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as PersistedState
    if (parsed.schemaVersion !== SCHEMA_VERSION) {
      localStorage.removeItem(STORAGE_KEY)
      return defaultState()
    }
    return parsed
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return defaultState()
  }
}

function defaultState(): PersistedState {
  return {
    schemaVersion: SCHEMA_VERSION,
    customApplications: [],
    applicationEdits: {},
    deletedIds: [],
    interactiveOverrides: {},
  }
}

function saveState() {
  try {
    const state: PersistedState = {
      schemaVersion: SCHEMA_VERSION,
      customApplications,
      applicationEdits,
      deletedIds: Array.from(deletedIds),
      interactiveOverrides,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
  }
}

const initial = loadState()

let customApplications: Application[] = initial.customApplications
let applicationEdits: Record<string, Partial<Application>> = initial.applicationEdits
let interactiveOverrides: Record<string, ApplicationOverrides> = initial.interactiveOverrides
const deletedIds: Set<string> = new Set(initial.deletedIds)

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
  saveState()
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
  saveState()
}

export function deleteApplication(id: string) {
  deletedIds.add(id)
  const customIdx = customApplications.findIndex((a) => a.id === id)
  if (customIdx !== -1) customApplications.splice(customIdx, 1)
  saveState()
}

export function getOverrides(id: string): ApplicationOverrides {
  return interactiveOverrides[id] ?? {}
}

export function setFollowUps(id: string, followUps: FollowUp[]) {
  interactiveOverrides[id] = { ...interactiveOverrides[id], followUps }
  saveState()
}

export function setNotes(id: string, notes: string) {
  interactiveOverrides[id] = { ...interactiveOverrides[id], notes }
  saveState()
}

export function setNextStepCompleted(id: string, completed: boolean) {
  interactiveOverrides[id] = { ...interactiveOverrides[id], nextStepCompleted: completed }
  saveState()
}
