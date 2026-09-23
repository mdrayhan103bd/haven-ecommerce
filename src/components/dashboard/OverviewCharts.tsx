'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Apr 1', uv: 1000 },
  { name: 'Apr 5', uv: 2000 },
  { name: 'Apr 10', uv: 1500 },
  { name: 'Apr 15', uv: 3000 },
  { name: 'Apr 18', uv: 3420 },
  { name: 'Apr 20', uv: 2500 },
  { name: 'Apr 25', uv: 4000 },
  { name: 'Apr 30', uv: 3500 },
];

const pieData = [
  { name: 'Delivered', value: 68, color: '#10b981' },
  { name: 'Processing', value: 18, color: '#f59e0b' },
  { name: 'Shipped', value: 9, color: '#3b82f6' },
  { name: 'Cancelled', value: 5, color: '#ef4444' },
];

export function SalesChart() {
  return (
    <div className="h-64 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} tickFormatter={(v) => `${v/1000}k`} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#333' }}
          />
          <Area type="monotone" dataKey="uv" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OrderDonut() {
  return (
    <div className="flex items-center h-48 w-full mt-4">
      <div className="w-1/2 h-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold">1,248</span>
          <span className="text-[10px] text-gray-500">Total Orders</span>
        </div>
      </div>
      <div className="w-1/2">
        {pieData.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></span>
              <span className="text-gray-600">{d.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">{d.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}