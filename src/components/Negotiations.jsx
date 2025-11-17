import { useEffect, useState } from 'react'

export default function Negotiations() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [threads, setThreads] = useState([])
  const [message, setMessage] = useState('')
  const [activeThread, setActiveThread] = useState(null)

  const loadThreads = async () => {
    const res = await fetch(`${baseUrl}/threads`)
    const data = await res.json()
    setThreads(data.items || [])
  }

  const createThread = async () => {
    const res = await fetch(`${baseUrl}/threads`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ participants:["you@acme.com","them@vendor.com"], last_message: 'New thread' })})
    const data = await res.json()
    setActiveThread(data.thread_id)
    loadThreads()
  }

  const sendMessage = async () => {
    if (!activeThread || !message) return
    await fetch(`${baseUrl}/messages`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ thread_id: activeThread, sender_email:'you@acme.com', receiver_email:'them@vendor.com', content: message })})
    setMessage('')
    loadMessages(activeThread)
  }

  const [messages, setMessages] = useState([])
  const loadMessages = async (tid) => {
    const res = await fetch(`${baseUrl}/messages?thread_id=${tid}`)
    const data = await res.json()
    setMessages(data.items || [])
  }

  useEffect(()=>{ loadThreads() },[])

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-6">
      <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border border-yellow-200/70 shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-900">Negotiations</h2>
          <button onClick={createThread} className="px-3 py-1.5 rounded-lg bg-yellow-400/80 text-gray-900">New Thread</button>
        </div>
        <div className="space-y-2 max-h-80 overflow-auto">
          {threads.map(t => (
            <button key={t._id} onClick={()=>{ setActiveThread(t._id); loadMessages(t._id) }} className={`w-full text-left p-3 rounded-lg border ${activeThread===t._id ? 'border-amber-400 bg-amber-50' : 'border-yellow-200 bg-white/70'} hover:border-amber-300`}>
              <div className="text-sm text-gray-700">{t.participants?.join(' • ')}</div>
              <div className="text-xs text-gray-500">{t.last_message || 'No messages yet'}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 p-6 rounded-2xl bg-white/60 backdrop-blur border border-yellow-200/70 shadow flex flex-col">
        <div className="flex-1 space-y-2 overflow-auto">
          {messages.map(m => (
            <div key={m._id} className={`max-w-[80%] p-3 rounded-lg ${m.sender_email==='you@acme.com' ? 'ml-auto bg-yellow-300/70' : 'bg-white/80 border border-yellow-200'}`}>
              <div className="text-sm text-gray-800">{m.content}</div>
              <div className="text-[10px] text-gray-500 mt-1">{m.sender_email}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type a message" className="flex-1 p-2 rounded-lg border border-yellow-200 bg-white/70" />
          <button onClick={sendMessage} className="px-4 py-2 rounded-lg bg-gradient-to-br from-yellow-300 to-amber-400 text-gray-900 font-semibold">Send</button>
        </div>
      </div>
    </section>
  )
}
