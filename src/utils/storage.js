const KEY = 'short_data_v1';
const LOG = KEY + '_log';

export function loadAll(){ return JSON.parse(localStorage.getItem(KEY) || '{}'); }
export function saveAll(obj){ localStorage.setItem(KEY, JSON.stringify(obj)); }

export function loadLogs(){ return JSON.parse(localStorage.getItem(LOG) || '[]'); }
export function saveLogs(arr){ localStorage.setItem(LOG, JSON.stringify(arr)); }
