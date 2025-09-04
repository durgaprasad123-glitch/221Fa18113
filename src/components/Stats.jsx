import React, { useEffect, useState } from 'react'
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import { loadAll, loadLogs } from '../utils/storage'

export default function Stats(){
  const [data, setData] = useState({})
  const [logs, setLogs] = useState([])

  useEffect(()=>{ setData(loadAll()); setLogs(loadLogs()) }, [])

  function clearAll(){
    localStorage.removeItem('short_data_v1')
    localStorage.removeItem('short_data_v1_log')
    setData({}); setLogs([])
  }

  return (
    <Container sx={{py:3}}>
      <Typography variant="h4">Dashboard</Typography>
      <Button onClick={clearAll} sx={{mt:1}}>Clear All</Button>

      {Object.keys(data).length === 0 && <Typography sx={{mt:2}}>No links yet.</Typography>}

      {Object.entries(data).map(([id, info]) => (
        <Paper key={id} sx={{my:2, p:2}}>
          <Typography>Short: <a href={`/${id}`}>{window.location.origin}/{id}</a></Typography>
          <Typography>URL: {info.url}</Typography>
          <Typography>Expiry: {new Date(info.expiry).toLocaleString()}</Typography>
          <Typography>Visits: {info.visits?.length || 0}</Typography>

          {info.visits?.length > 0 && (
            <Table size="small" sx={{mt:1}}>
              <TableHead>
                <TableRow><TableCell>Time</TableCell><TableCell>Referrer</TableCell><TableCell>TZ</TableCell><TableCell>UA</TableCell></TableRow>
              </TableHead>
              <TableBody>
                {info.visits.map((v,i)=>(
                  <TableRow key={i}>
                    <TableCell>{new Date(v.time).toLocaleString()}</TableCell>
                    <TableCell>{v.referrer}</TableCell>
                    <TableCell>{v.tz}</TableCell>
                    <TableCell sx={{maxWidth:300, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{v.ua}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      ))}

      <Typography variant="h6" sx={{mt:3}}>Logs</Typography>
      <Paper sx={{p:2, whiteSpace:'pre-wrap', mt:1}}>{JSON.stringify(logs, null, 2)}</Paper>
    </Container>
  )
}
