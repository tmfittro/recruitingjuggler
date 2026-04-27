import { Link } from 'react-router-dom'
import { PlusCircle, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { H1, Body } from '@/components/ui/Typography'

export default function Dashboard() {
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

      <Card>
        <CardContent className="py-16 flex flex-col items-center text-center">
          <div className="rounded-full bg-primary-50 p-4 mb-4">
            <Briefcase className="h-8 w-8 text-primary-300" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">No applications yet</h3>
          <Body className="mb-4 max-w-xs">
            Start tracking your job search by adding your first application.
          </Body>
          <Button asChild variant="primary" size="sm">
            <Link to="/applications/new">
              <PlusCircle className="h-4 w-4" />
              Add your first application
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
