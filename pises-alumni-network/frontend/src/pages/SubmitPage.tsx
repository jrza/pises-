import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { AlumniFormData } from '../lib/types'

const EMPTY_FORM: AlumniFormData = {
  name: '',
  graduation_year: new Date().getFullYear(),
  university: '',
  city: '',
  country: '',
  lat: 0,
  lng: 0,
  field_of_study: '',
  bio: '',
  photo_url: '',
  linkedin: '',
  instagram: '',
  github: '',
  other_link: '',
}

export default function SubmitPage() {
  const [form, setForm] = useState<AlumniFormData>(EMPTY_FORM)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    const numericFields = ['graduation_year', 'lat', 'lng']
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const { error } = await supabase.from('alumni').insert([{ ...form, status: 'pending' }])

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('success')
      setForm(EMPTY_FORM)
    }
  }

  const inputClass =
    'w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
  const labelClass = 'block text-sm font-medium text-gray-300 mb-1'

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Join the Alumni Network</h1>
        <p className="text-gray-400 mb-8">
          Submit your details to be featured on the globe. Your entry will be reviewed before going live.
        </p>

        {status === 'success' && (
          <div className="bg-green-900 border border-green-700 rounded-md p-4 mb-6 text-green-200">
            ✅ Submission received! Your profile is pending review.
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-900 border border-red-700 rounded-md p-4 mb-6 text-red-200">
            ❌ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Required fields */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input className={inputClass} name="name" value={form.name} onChange={handleChange} required placeholder="Ahmad Al-Harbi" />
            </div>
            <div>
              <label className={labelClass}>Graduation Year *</label>
              <input className={inputClass} name="graduation_year" type="number" min={1980} max={2030} value={form.graduation_year} onChange={handleChange} required />
            </div>
            <div>
              <label className={labelClass}>University *</label>
              <input className={inputClass} name="university" value={form.university} onChange={handleChange} required placeholder="King Fahd University of Petroleum and Minerals" />
            </div>
            <div>
              <label className={labelClass}>Field of Study *</label>
              <input className={inputClass} name="field_of_study" value={form.field_of_study} onChange={handleChange} required placeholder="Computer Science" />
            </div>
            <div>
              <label className={labelClass}>City *</label>
              <input className={inputClass} name="city" value={form.city} onChange={handleChange} required placeholder="Riyadh" />
            </div>
            <div>
              <label className={labelClass}>Country *</label>
              <input className={inputClass} name="country" value={form.country} onChange={handleChange} required placeholder="Saudi Arabia" />
            </div>
            <div>
              <label className={labelClass}>Latitude *</label>
              <input className={inputClass} name="lat" type="number" step="any" value={form.lat} onChange={handleChange} required placeholder="24.7136" />
            </div>
            <div>
              <label className={labelClass}>Longitude *</label>
              <input className={inputClass} name="lng" type="number" step="any" value={form.lng} onChange={handleChange} required placeholder="46.6753" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Bio *</label>
            <textarea className={inputClass} name="bio" rows={4} value={form.bio} onChange={handleChange} required placeholder="Tell us about yourself, your career, and what you've been up to since graduation…" />
          </div>

          {/* Optional fields */}
          <hr className="border-gray-800" />
          <p className="text-sm text-gray-500">Optional — but encouraged!</p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Photo URL</label>
              <input className={inputClass} name="photo_url" value={form.photo_url} onChange={handleChange} placeholder="https://…" />
            </div>
            <div>
              <label className={labelClass}>LinkedIn</label>
              <input className={inputClass} name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/…" />
            </div>
            <div>
              <label className={labelClass}>Instagram</label>
              <input className={inputClass} name="instagram" value={form.instagram} onChange={handleChange} placeholder="@username" />
            </div>
            <div>
              <label className={labelClass}>GitHub</label>
              <input className={inputClass} name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/…" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Other Link</label>
            <input className={inputClass} name="other_link" value={form.other_link} onChange={handleChange} placeholder="Personal website, portfolio, etc." />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-md transition-colors"
          >
            {status === 'loading' ? 'Submitting…' : 'Submit Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
