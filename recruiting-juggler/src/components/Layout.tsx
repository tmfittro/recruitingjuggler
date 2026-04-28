import { Outlet, NavLink } from 'react-router-dom'
import { Briefcase, LayoutDashboard, PlusCircle, Clock, CheckCircle, XCircle } from 'lucide-react'

const navItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    end: true,
    icon: LayoutDashboard,
  },
  {
    label: 'Add Application',
    to: '/dashboard/applications/new',
    end: true,
    icon: PlusCircle,
  },
]

const statusLinks = [
  { label: 'Applied',    to: '/dashboard?status=applied',   icon: Clock,         color: 'text-primary-400' },
  { label: 'Interview',  to: '/dashboard?status=interview',  icon: Clock,         color: 'text-amber-500' },
  { label: 'Offer',      to: '/dashboard?status=offer',      icon: CheckCircle,   color: 'text-green-500' },
  { label: 'Rejected',   to: '/dashboard?status=rejected',   icon: XCircle,       color: 'text-red-400' },
]

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0 z-10">
        <div className="px-4 h-14 flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-primary flex-shrink-0" />
          <span className="font-semibold text-gray-900 text-base tracking-tight">
            Recruiting Juggler
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          <nav className="p-3 space-y-0.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pt-2 pb-1">
              Navigation
            </p>
            {navItems.map(({ label, to, end, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
              </NavLink>
            ))}

            <div className="pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pb-1">
                Filter by Status
              </p>
              {statusLinks.map(({ label, to, icon: Icon, color }) => (
                <NavLink
                  key={label}
                  to={to}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors w-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Icon className={`h-4 w-4 flex-shrink-0 ${color}`} />
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
