import { Menu, MessageSquare, BookOpen, UploadCloud, FileText, Bot } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-full transition-all ${isActive ? 'bg-yellow-400/20 text-yellow-700' : 'text-gray-700 hover:text-yellow-700 hover:bg-yellow-400/10'}`}
  >
    <Icon size={18} />
    <span className="hidden sm:inline">{label}</span>
  </NavLink>
)

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/40 border-b border-yellow-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-300 to-amber-400 shadow-inner" />
            <span className="font-semibold text-gray-900">Legal AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavItem to="/analyze" icon={UploadCloud} label="Analyze" />
            <NavItem to="/editor" icon={FileText} label="Editor" />
            <NavItem to="/negotiations" icon={MessageSquare} label="Negotiations" />
            <NavItem to="/chat" icon={Bot} label="Policy Chat" />
            <a href="/test" className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-700 hover:text-yellow-700 hover:bg-yellow-400/10"><BookOpen size={18}/>Test</a>
          </nav>

          <button className="md:hidden p-2 rounded-full hover:bg-yellow-400/10 text-gray-700">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}
