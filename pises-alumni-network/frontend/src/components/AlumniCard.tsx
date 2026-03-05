import type { Alumni } from '../lib/types'

interface Props {
  alumni: Alumni
  onClose: () => void
}

export default function AlumniCard({ alumni: a, onClose }: Props) {
  return (
    <div className="p-5">
      <button
        onClick={onClose}
        className="mb-4 text-gray-400 hover:text-white text-sm flex items-center gap-1"
      >
        ← Close
      </button>

      <div className="flex items-center gap-3 mb-4">
        {a.photo_url ? (
          <img src={a.photo_url} alt={a.name} className="w-14 h-14 rounded-full object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center text-xl font-bold text-white">
            {a.name.charAt(0)}
          </div>
        )}
        <div>
          <h2 className="font-bold text-lg text-white">{a.name}</h2>
          <p className="text-sm text-gray-400">{a.city}, {a.country}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-300">
        <p><span className="text-gray-500">Graduation:</span> {a.graduation_year}</p>
        <p><span className="text-gray-500">University:</span> {a.university}</p>
        <p><span className="text-gray-500">Field:</span> {a.field_of_study}</p>
      </div>

      <p className="mt-4 text-sm text-gray-300 leading-relaxed">{a.bio}</p>

      <div className="mt-4 flex flex-col gap-2">
        {a.linkedin && (
          <a href={a.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-sm">
            🔗 LinkedIn
          </a>
        )}
        {a.github && (
          <a href={a.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-sm">
            💻 GitHub
          </a>
        )}
        {a.instagram && (
          <a
            href={`https://instagram.com/${a.instagram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline text-sm"
          >
            📸 Instagram
          </a>
        )}
        {a.other_link && (
          <a href={a.other_link} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-sm">
            🌐 Website
          </a>
        )}
      </div>
    </div>
  )
}
