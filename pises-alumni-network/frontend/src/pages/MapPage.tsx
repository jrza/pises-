import { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { supabase } from '../lib/supabase'
import type { Alumni } from '../lib/types'
import AlumniCard from '../components/AlumniCard'

export default function MapPage() {
  const globeRef = useRef<any>(null)
  const [alumni, setAlumni] = useState<Alumni[]>([])
  const [selected, setSelected] = useState<Alumni | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAlumni() {
      const { data, error } = await supabase
        .from('alumni')
        .select('*')
        .eq('status', 'approved')
      if (!error && data) {
        setAlumni(data as Alumni[])
      }
      setLoading(false)
    }
    fetchAlumni()
  }, [])

  const points = alumni.map((a) => ({
    lat: a.lat,
    lng: a.lng,
    label: a.name,
    alumni: a,
  }))

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <div className="flex-1 relative">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Loading alumni…
          </div>
        ) : (
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={points}
            pointAltitude={0.05}
            pointRadius={0.4}
            pointColor={() => '#60a5fa'}
            pointLabel={(d: any) => d.label}
            onPointClick={(point: any) => setSelected(point.alumni)}
          />
        )}
      </div>

      {selected && (
        <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
          <AlumniCard alumni={selected} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  )
}
