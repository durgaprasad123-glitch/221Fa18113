import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material'
import { loadAll, saveAll, loadLogs, saveLogs } from '../utils/storage'
import { getLocation } from '../utils/urlHelpers'

export default function Redirector(){
  const { shortId } = useParams()
  const nav = useNavigate()
  const [msg, setMsg] = useState('Redirecting...')

  useEffect(()=>{
    const store = loadAll()
    const entry = store[shortId]
    if(!entry){ setMsg('Link not found'); return }
    if(Date.now() > entry.expiry){ setMsg('Link expired'); return }
    const hit = { time:new Date().toISOString(), referrer: document.referrer || 'direct', tz: getLocation(), ua: navigator.userAgent }
    entry.visits = [...(entry.visits||[]), hit]
    store[shortId] = entry
    saveAll(store)
    const logs = loadLogs(); logs.push({ action:'redirect', id: shortId, ts:new Date().toISOString() }); saveLogs(logs)
    console.log('redirect', shortId, entry.url)
    setTimeout(()=> window.location.replace(entry.url), 300)
  }, [shortId])

  return (
    <Container sx={{py:3}}>
      <Typography>{msg}</Typography>
      <Button onClick={()=>nav('/')}>Home</Button>
    </Container>
  )
}
