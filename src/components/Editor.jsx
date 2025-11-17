import { useState } from 'react'

export default function Editor() {
  const [content, setContent] = useState('Start collaborating on your contract here…')
  const [comments, setComments] = useState([])

  const addComment = () => {
    setComments((c) => [...c, { text: 'Sample comment', at: new Date().toISOString() }])
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/60 backdrop-blur border border-yellow-200/70 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Collaborative Editor (Preview)</h2>
            <button onClick={addComment} className="px-3 py-1.5 rounded-lg bg-yellow-400/80 text-gray-900">Add Comment</button>
          </div>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} className="mt-4 w-full h-80 p-4 rounded-xl border border-yellow-200/80 bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300" />
        </div>
        <div className="space-y-3">
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border border-yellow-200/70 shadow">
            <h3 className="font-semibold text-gray-900">Comments</h3>
            <div className="mt-3 space-y-2">
              {comments.length === 0 && <p className="text-gray-600 text-sm">No comments yet.</p>}
              {comments.map((c, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/70 border border-yellow-200 text-gray-800 text-sm">
                  <div>{c.text}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(c.at).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
