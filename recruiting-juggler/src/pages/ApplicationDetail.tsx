import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export default function ApplicationDetail() {
  const { id } = useParams()

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="flex-1" />
        <Button asChild variant="secondary" size="sm">
          <Link to={`/applications/${id}/edit`}>
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Application details for ID: <span className="font-mono text-gray-700">{id}</span> will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
