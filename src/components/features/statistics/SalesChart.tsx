'use client';

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface SalesPoint { label: string; sales: number }

export function SalesChart({ data }: { data: SalesPoint[] }) {
  return <div role="img" aria-label="Sales over time" className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" /><YAxis /><Tooltip /><Line type="monotone" dataKey="sales" stroke="#2563eb" /></LineChart></ResponsiveContainer></div>;
}
