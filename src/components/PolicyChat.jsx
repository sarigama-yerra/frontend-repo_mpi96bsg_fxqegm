import { useState } from 'react'

export default function PolicyChat(){
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const ask = async () => {
    if (!query) return
    const res = await fetch(`${baseUrl}/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ query }) })
    const data = await res.json()
    setAnswer(data.answer || '')
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border border-yellow-200/70 shadow">
        <h2 className="text-2xl font-bold text-gray-900">Policy Chatbot</h2>
        <p className="text-gray-700 mt-2">Ask questions about your policies. Voice support can be added here with TTS/STT.</p>
        <div className="mt-6 flex gap-2">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Ask a policy question…" className="flex-1 p-3 rounded-lg border border-yellow-200 bg-white/70" />
          <button onClick={ask} className="px-4 py-2 rounded-lg bg-gradient-to-br from-yellow-300 to-amber-400 text-gray-900 font-semibold">Ask</button>
        </div>
        {answer && (
          <div className="mt-4 p-4 rounded-lg bg-white/70 border border-yellow-200 text-gray-800">
            {answer}
          </div>
        )}
      </div>
    </section>
  )
}
