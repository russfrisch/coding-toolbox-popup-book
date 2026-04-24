import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card'
import { Button } from './components/ui/Button'
import { Input } from './components/ui/Input'
import { Badge } from './components/ui/Badge'
import structureData from './data/structureData'

function App() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('all')
  const [openId, setOpenId] = useState(null)
  
  const filtered = structureData.filter(item => {
    const matchesQuery = !query || 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    const matchesMode = mode === 'all' || item.type === mode
    return matchesQuery && matchesMode
  })
  
  const openItem = structureData.find(i => i.id === openId)
  
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="text-center">
          <h1 className="text-4xl font-black text-slate-900">Coding Toolbox</h1>
          <p className="mt-2 text-lg text-slate-600">Visual mental models for data structures</p>
        </header>
        
        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <Card className="xl:sticky xl:top-4">
            <CardHeader>
              <CardTitle>Choose a page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="Search..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex gap-2">
                <Button size="sm" variant={mode === 'all' ? 'default' : 'outline'} onClick={() => setMode('all')}>All</Button>
                <Button size="sm" variant={mode === 'structure' ? 'default' : 'outline'} onClick={() => setMode('structure')}>Structures</Button>
                <Button size="sm" variant={mode === 'pattern' ? 'default' : 'outline'} onClick={() => setMode('pattern')}>Patterns</Button>
              </div>
              <div className="space-y-2 max-h-96 overflow-auto">
                {filtered.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setOpenId(item.id)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${
                      openItem?.id === item.id 
                        ? `${item.color} border-transparent` 
                        : 'border-slate-200 bg-white text-slate-700 hover:shadow'
                    }`}
                  >
                    <div className="font-bold">{item.name}</div>
                    <div className="text-xs opacity-75">{item.type}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {openItem && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className={`inline-flex items-center gap-3 rounded-3xl border px-4 py-3 ${openItem.color}`}>
                    <div>
                      <div className="text-sm uppercase tracking-wide opacity-75">{openItem.type}</div>
                      <div className="text-2xl font-black">{openItem.name}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Mental model</div>
                    <p className="mt-1 text-lg font-semibold">{openItem.mentalModel}</p>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Use it when</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {openItem.useWhen?.map((use, i) => (
                        <Badge key={i} variant="secondary">{use}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Python</div>
                    <pre className="mt-2 rounded-xl bg-slate-900 p-4 text-sm text-slate-100 overflow-x-auto">
                      {openItem.python}
                    </pre>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Real systems</div>
                    <p className="mt-1 text-slate-700">{openItem.realSystems}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default App