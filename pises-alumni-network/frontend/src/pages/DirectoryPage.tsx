import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Alumni } from '../lib/types'

export default function DirectoryPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAlumni() {
      const { data, error } = await supabase
        .from('alumni')
        .select('*')
        .eq('status', 'approved')
        .order('graduation_year', { ascending: false })
      if (!error && data) setAlumni(data as Alumni[])
      setLoading(false)
    }
    fetchAlumni()
  }, [])

  const filtered = alumni.filter((a) => {
    const q = search.toLowerCase()
    return (
      a.name.toLowerCase().includes(q) ||
      a.university.toLowerCase().includes(q) ||
      a.field_of_study.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Alumni Directory</h1>
        <p className="text-gray-400 mb-6">Search and discover PISES alumni around the world.</p>

        <input
          type="text"
          placeholder="Search by name, university, field, city, or country…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
        />

        {loading ? (
          <p className="text-gray-400">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No alumni found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <div key={a.id} className="bg-gray-900 rounded-xl border border-gray-800 p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  {a.photo_url ? (
                    <img src={a.photo_url} alt={a.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-lg font-bold">
                      {a.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-sm text-gray-400">{a.graduation_year} · {a.field_of_study}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{a.university}</p>
                <p className="text-sm text-gray-400">{a.city}, {a.country}</p>
                <p className="text-sm text-gray-400 line-clamp-3">{a.bio}</p>
                <div className="flex gap-3 text-sm mt-auto flex-wrap">
                  {a.linkedin && <a href={a.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>}
                  {a.github && <a href={a.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">GitHub</a>}
                  {a.instagram && <a href={`https://instagram.com/${a.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Instagram</a>}
                  {a.other_link && <a href={a.other_link} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Website</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
