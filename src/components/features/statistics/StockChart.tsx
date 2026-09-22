'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface StockPoint { label: string; stock: number }

export function StockChart({ data }: { data: StockPoint[] }) {
  return <div role="img" aria-label="Stock by product" className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" /><YAxis /><Tooltip /><Bar dataKey="stock" fill="#16a34a" /></BarChart></ResponsiveContainer></div>;
}
