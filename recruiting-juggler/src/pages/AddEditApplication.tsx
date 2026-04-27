import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'

export default function AddEditApplication() {
  const { id } = useParams()
  const isEditing = Boolean(id)

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

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Application' : 'Add New Application'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            {isEditing
              ? `Edit form for application ID: ${id} — coming soon.`
              : 'New application form — coming soon.'}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button asChild variant="secondary" size="sm">
            <Link to={isEditing ? `/applications/${id}` : '/'}>Cancel</Link>
          </Button>
          <Button variant="primary" size="sm" disabled>
            {isEditing ? 'Save Changes' : 'Add Application'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
