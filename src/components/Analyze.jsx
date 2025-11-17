import { useState } from 'react'

export default function Analyze() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setResult(null)

    try {
      const form = new FormData()
      form.append('file', file)
      form.append('uploader_email', 'user@example.com')

      const res = await fetch(`${baseUrl}/documents`, { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Upload failed')

      const analyzeRes = await fetch(`${baseUrl}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document_id: data.document_id })
      })
      const analyzeData = await analyzeRes.json()
      setResult(analyzeData)
    } catch (err) {
      setResult({ error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border border-yellow-200/70 shadow">
        <h2 className="text-2xl font-bold text-gray-900">Contract Analysis</h2>
        <p className="text-gray-700 mt-2">Upload a Word document to classify clauses, assess risks, and view suggested redlines.</p>

        <form onSubmit={onUpload} className="mt-6 flex flex-col sm:flex-row gap-4">
          <input type="file" accept=".doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="flex-1 file:mr-4 file:rounded-lg file:border file:px-4 file:py-2 file:bg-white/80 file:border-yellow-300 file:text-gray-800 rounded-lg border border-yellow-200/80 p-2 bg-white/60" />
          <button disabled={loading || !file} className="px-5 py-2 rounded-lg bg-gradient-to-br from-yellow-300 to-amber-400 text-gray-900 font-semibold disabled:opacity-50">
            {loading ? 'Analyzing…' : 'Upload & Analyze'}
          </button>
        </form>

        {result && (
          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-semibold text-gray-900">Clauses</h3>
              {result.error && <p className="text-red-600">{result.error}</p>}
              {result.clauses?.map((c, i) => (
                <div key={i} className={`p-4 rounded-xl border ${c.risk==='critical'?'border-red-400 bg-red-50':c.risk==='high'?'border-orange-400 bg-orange-50':c.risk==='medium'?'border-yellow-300 bg-yellow-50':'border-emerald-300 bg-emerald-50'}`}>
                  <div className="text-sm text-gray-600">{c.clause_type.toUpperCase()} • Risk: <span className="font-semibold">{c.risk}</span></div>
                  <p className="mt-1 text-gray-800">{c.text}</p>
                  {c.policy_refs?.length ? (
                    <div className="mt-2 text-xs text-gray-600">Policies: {c.policy_refs.join(', ')}</div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Suggested Redlines</h3>
              {result.redlines?.map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/70 border border-yellow-200 text-gray-800">
                  <div className="text-sm">{r.suggestion}</div>
                  <div className="text-xs text-gray-600 mt-1">Policy: {r.policy}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
