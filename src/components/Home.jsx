import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Typography, Box } from '@mui/material'
import { ensureProtocol, genId, isValidId } from '../utils/urlHelpers'
import { loadAll, saveAll, loadLogs, saveLogs } from '../utils/storage'

export default function Home(){
  const [rows, setRows] = useState([{ linkText:'', shortKey:'', lifeMins:'' }])
  const nav = useNavigate()

  const addRow = ()=> { if (rows.length < 5) setRows([...rows, {linkText:'', shortKey:'', lifeMins:''}]) }
  const update = (i, field, val) => { const c=[...rows]; c[i][field]=val; setRows(c) }

  const createLinks = ()=>{
    const store = loadAll()
    const logs = loadLogs()
    rows.forEach(r=>{
      if(!r.linkText.trim()) return
      let url = ensureProtocol(r.linkText.trim())
      let id = r.shortKey.trim() || genId()
      if(!isValidId(id)) id = genId()
      while(store[id]) id = genId()
      const minutes = parseInt(r.lifeMins) || 30
      const expiry = Date.now() + minutes*60000
      store[id] = { url, expiry, visits: [] }
      logs.push({ action:'create', id, ts:new Date().toISOString() })
      console.log('created', id, url)
    })
    saveAll(store); saveLogs(logs)
    nav('/stats')
  }

  return (
    <Container sx={{py:3}}>
      <Typography variant="h4" gutterBottom>Make Short Link</Typography>
      {rows.map((r,i)=>(
        <Box key={i} sx={{display:'flex', gap:1, my:1}}>
          <TextField label="Long URL" value={r.linkText} onChange={e=>update(i,'linkText',e.target.value)} fullWidth />
          <TextField label="Short ID (optional)" value={r.shortKey} onChange={e=>update(i,'shortKey',e.target.value)} />
          <TextField label="Lifetime (min)" value={r.lifeMins} onChange={e=>update(i,'lifeMins',e.target.value)} />
        </Box>
      ))}
      <Box sx={{mt:2, display:'flex', gap:1}}>
        <Button onClick={addRow}>Add</Button>
        <Button variant="contained" onClick={createLinks}>Create</Button>
        <Button onClick={()=>nav('/stats')}>Dashboard</Button>
      </Box>
    </Container>
  )
}
