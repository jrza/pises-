import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Globe' },
  { to: '/directory', label: 'Directory' },
  { to: '/submit', label: 'Join' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-white text-lg tracking-tight">
          🌍 PISES Alumni
        </Link>
        <div className="flex gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                pathname === l.to ? 'text-blue-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
