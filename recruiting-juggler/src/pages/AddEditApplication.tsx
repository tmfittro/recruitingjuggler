import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import {
  getApplication,
  addApplication,
  updateApplication,
  deleteApplication,
  stageToGroupStatus,
} from '@/data/applicationStore'
import type { ApplicationStatus } from '@/components/ui/Badge'
import type { AppGroupStatus } from '@/types/application'

const STAGE_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: 'applied', label: 'Applied' },
  { value: 'pending', label: 'Pending' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'withdrawn', label: 'Withdrawn' },
]

const STATUS_OPTIONS: { value: AppGroupStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'inactive', label: 'Inactive' },
]

interface FormData {
  company: string
  role: string
  stage: ApplicationStatus
  status: AppGroupStatus
  nextStep: string
  deadline: string
  notes: string
}

interface FormErrors {
  company?: string
  role?: string
  stage?: string
}

const INITIAL_FORM: FormData = {
  company: '',
  role: '',
  stage: 'applied',
  status: 'active',
  nextStep: '',
  deadline: '',
  notes: '',
}

export default function AddEditApplication() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (isEditing && id) {
      const app = getApplication(id)
      if (!app) {
        setNotFound(true)
        return
      }
      setForm({
        company: app.company,
        role: app.role,
        stage: app.stage,
        status: app.status,
        nextStep: app.nextStep ?? '',
        deadline: app.deadline ?? '',
        notes: app.notes ?? '',
      })
    }
  }, [id, isEditing])

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'stage') {
        next.status = stageToGroupStatus(value as ApplicationStatus)
      }
      return next
    })
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!form.company.trim()) newErrors.company = 'Company name is required.'
    if (!form.role.trim()) newErrors.role = 'Role is required.'
    if (!form.stage) newErrors.stage = 'Stage is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      company: form.company.trim(),
      role: form.role.trim(),
      stage: form.stage,
      status: form.status,
      nextStep: form.nextStep.trim() || null,
      deadline: form.deadline || null,
      notes: form.notes.trim(),
    }

    if (isEditing && id) {
      updateApplication(id, payload)
      navigate(`/applications/${id}`)
    } else {
      addApplication(payload)
      navigate('/')
    }
  }

  function handleDelete() {
    if (id) {
      deleteApplication(id)
      navigate('/')
    }
  }

  if (notFound) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
        <Card className="max-w-2xl">
          <CardContent className="py-12 text-center">
            <p className="text-sm text-gray-500">Application not found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link to={isEditing ? `/applications/${id}` : '/'}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Application' : 'Add New Application'}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Company"
                required
                error={errors.company}
              >
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="e.g. Google"
                  className={inputClass(!!errors.company)}
                />
              </Field>

              <Field
                label="Role"
                required
                error={errors.role}
              >
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  placeholder="e.g. Software Engineering Intern"
                  className={inputClass(!!errors.role)}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Stage"
                required
                error={errors.stage}
              >
                <select
                  value={form.stage}
                  onChange={(e) => handleChange('stage', e.target.value)}
                  className={inputClass(!!errors.stage)}
                >
                  {STAGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className={inputClass(false)}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Next Step">
              <input
                type="text"
                value={form.nextStep}
                onChange={(e) => handleChange('nextStep', e.target.value)}
                placeholder="e.g. Prepare for technical interview"
                className={inputClass(false)}
              />
            </Field>

            <Field label="Deadline">
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                className={inputClass(false)}
              />
            </Field>

            <Field label="Notes">
              <textarea
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Add any notes or observations about this application…"
                rows={4}
                className={`${inputClass(false)} resize-none`}
              />
            </Field>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-2">
            <div>
              {isEditing && !showDeleteConfirm && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              )}
              {isEditing && showDeleteConfirm && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Remove this application?</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    Yes, remove
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link to={isEditing ? `/applications/${id}` : '/'}>Cancel</Link>
              </Button>
              <Button type="submit" variant="primary" size="sm">
                {isEditing ? 'Save Changes' : 'Add Application'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-md border px-3 py-2 text-sm text-gray-800 bg-white',
    'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent',
    hasError ? 'border-red-300 bg-red-50' : 'border-gray-200',
  ].join(' ')
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
