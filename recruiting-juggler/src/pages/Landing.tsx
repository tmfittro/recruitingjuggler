import { useNavigate } from 'react-router-dom'
import { Briefcase, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-6 h-14 flex items-center">
        <div className="flex items-center gap-2.5">
          <Briefcase className="h-5 w-5 text-primary-600" />
          <span className="font-semibold text-gray-900 tracking-tight">Recruiting Juggler</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 mb-8">
            <Briefcase className="h-8 w-8 text-primary-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Recruiting Juggler
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            Stay on top of every job and internship application in one place.
            Track deadlines, next steps, and follow-ups so nothing slips
            through the cracks during recruiting season.
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-lg transition-colors text-base"
          >
            Go to Dashboard
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl w-full">
          <div className="flex flex-col items-center text-center gap-2 p-4">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-primary-600" />
            </div>
            <p className="font-medium text-gray-800 text-sm">Centralized tracking</p>
            <p className="text-gray-400 text-xs leading-relaxed">All applications in one overview, grouped by status</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <p className="font-medium text-gray-800 text-sm">Deadline awareness</p>
            <p className="text-gray-400 text-xs leading-relaxed">Urgent items surface automatically so you never miss a deadline</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-500" />
            </div>
            <p className="font-medium text-gray-800 text-sm">Next steps clarity</p>
            <p className="text-gray-400 text-xs leading-relaxed">Know exactly what action each application needs from you</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-4 text-center">
        <p className="text-xs text-gray-400">Recruiting Juggler — built for students navigating recruiting season</p>
      </footer>
    </div>
  )
}
