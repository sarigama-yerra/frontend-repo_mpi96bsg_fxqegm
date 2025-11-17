import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Analyze from './components/Analyze'
import Editor from './components/Editor'
import Negotiations from './components/Negotiations'
import PolicyChat from './components/PolicyChat'

function Home(){
  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Contract Analysis', desc: 'Upload Word docs for automated review with clause classification, risk scoring, redlines, and citations.', href: '/analyze' },
            { title: 'Collaborative Editing', desc: 'Real-time multi-user editing with comments and versioning (preview).', href: '/editor' },
            { title: 'Negotiations', desc: 'Run back-and-forth negotiations with messaging and document sharing.', href: '/negotiations' },
            { title: 'Policy Chatbot', desc: 'Query your policy knowledge base using RAG. Voice features coming soon.', href: '/chat' },
          ].map((c,i)=> (
            <a key={i} href={c.href} className="p-6 rounded-2xl bg-white/60 backdrop-blur border border-yellow-200/70 shadow hover:shadow-md transition">
              <div className="text-lg font-semibold text-gray-900">{c.title}</div>
              <p className="text-gray-700 mt-2 text-sm">{c.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/negotiations" element={<Negotiations />} />
        <Route path="/chat" element={<PolicyChat />} />
      </Routes>
    </div>
  )
}

export default App
