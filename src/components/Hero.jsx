import { motion } from 'framer-motion'
import { Sparkles, ShieldCheck, ScanText, FileCheck, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl bg-yellow-300/40" />
        <div className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl bg-amber-400/30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900"
            >
              Your Digital Legal Associate
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-lg text-gray-700"
            >
              Analyze contracts, collaborate in real-time, negotiate terms, and chat with your policies — all in one minimal, yellow-themed workspace.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/analyze" className="px-5 py-3 rounded-xl bg-gradient-to-br from-yellow-300 to-amber-400 text-gray-900 font-semibold shadow hover:shadow-md transition">Upload & Analyze</Link>
              <Link to="/chat" className="px-5 py-3 rounded-xl bg-white/70 backdrop-blur border border-yellow-200 text-gray-800 hover:bg-white/90 transition">Ask Policies</Link>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {[{icon:ScanText,label:'Clause classification'},{icon:ShieldCheck,label:'Risk assessment'},{icon:FileCheck,label:'Redlines & citations'},{icon:Workflow,label:'Real-time collaboration'}].map((f, i) => (
                <motion.div key={i} initial={{ opacity:0, y: 10 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.15 * i }} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur border border-yellow-200/60">
                  <f.icon className="text-amber-500" size={18} />
                  <span className="text-sm text-gray-700">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative p-6 rounded-2xl bg-white/60 backdrop-blur border border-yellow-200/70 shadow-lg">
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-yellow-50 to-amber-100 grid place-items-center">
              <div className="text-center">
                <Sparkles className="mx-auto text-amber-500" size={28} />
                <p className="mt-2 text-gray-700">Smooth glassmorphic panels, subtle animations, and a calm yellow palette.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
