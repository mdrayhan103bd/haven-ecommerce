const fs = require('fs');
const path = require('path');

const files = {
  'src/app/dashboard/layout.tsx': `
import React from 'react';
import { Home, ShoppingBag, Box, Users, BarChart2, Megaphone, Tag, FileText, MessageSquare, MonitorSmartphone, Settings, HelpCircle, Bell } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f6f8] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold tracking-tight">Haven</Link>
          <div className="text-xs text-gray-500">Good Things. Brighter Days.</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-orange-50 text-orange-900 font-medium">
            <Home className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="#" className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <div className="flex items-center gap-3"><ShoppingBag className="w-5 h-5" /> Orders</div>
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><Box className="w-5 h-5" /> Products</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><Users className="w-5 h-5" /> Customers</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><BarChart2 className="w-5 h-5" /> Analytics</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><Megaphone className="w-5 h-5" /> Marketing</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><Tag className="w-5 h-5" /> Discounts</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><FileText className="w-5 h-5" /> Content</Link>
          <Link href="#" className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5" /> Messages</div>
            <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
          </Link>
          
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sales Channels</div>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><Home className="w-5 h-5" /> Online Store</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><MonitorSmartphone className="w-5 h-5" /> Mobile App</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"><Box className="w-5 h-5" /> Marketplaces</Link>
        </nav>
        
        <div className="p-4">
          <div className="bg-[#fcfaf5] rounded-2xl p-4 border border-[#f0e8d5]">
            <h4 className="font-bold mb-1">Grow Your Business</h4>
            <p className="text-xs text-gray-600 mb-3">Unlock new sales channels and tools.</p>
            <button className="w-full bg-[#2c2a29] text-white text-sm py-2 rounded-full flex items-center justify-center gap-2 hover:bg-black">
              Upgrade Plan →
            </button>
          </div>
        </div>
        
        <nav className="p-4 border-t border-gray-100">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50"><Settings className="w-5 h-5" /> Settings</Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50"><HelpCircle className="w-5 h-5" /> Help & Support</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white flex items-center justify-between px-8 border-b border-gray-100 shrink-0">
          <div className="flex-1 max-w-xl bg-gray-100 rounded-full px-4 py-2 flex items-center">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Search orders, products, customers..." className="bg-transparent border-none outline-none flex-1 text-sm" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-black">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Bappy&background=random" alt="Bappy" />
              </div>
              <div className="text-sm leading-tight hidden md:block">
                <div className="font-medium">Hello, Bappy</div>
                <div className="text-gray-500 text-xs">Store Admin</div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
`,
  'src/components/dashboard/OverviewCharts.tsx': `
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
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} tickFormatter={(v) => \`\${v/1000}k\`} />
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
                <Cell key={\`cell-\${index}\`} fill={entry.color} />
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
`,
  'src/app/dashboard/page.tsx': `
import React from 'react';
import { Calendar, ShoppingBag, ShoppingCart, Users, Box, Plus, Percent, Send, Eye } from 'lucide-react';
import { SalesChart, OrderDonut } from '@/components/dashboard/OverviewCharts';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">Good morning, Bappy <span className="text-2xl">👋</span></h1>
          <p className="text-gray-500">Here's what's happening with your store today.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Calendar className="w-4 h-4 text-gray-500" /> Apr 1, 2024 - Apr 30, 2024
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$24,560', change: '+ 12.5%', icon: ShoppingBag, color: 'text-red-500', bg: 'bg-red-50' },
          { title: 'Total Orders', value: '1,248', change: '+ 8.3%', icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-50' },
          { title: 'Total Customers', value: '892', change: '+ 18.6%', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
          { title: 'Conversion Rate', value: '3.8%', change: '+ 0.7%', icon: Box, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4">
            <div className={\`w-12 h-12 rounded-xl \${s.bg} \${s.color} flex items-center justify-center shrink-0\`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm text-gray-500 font-medium mb-1">{s.title}</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">{s.value}</span>
                <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded">{s.change}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-1">vs. last month</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Sales Overview</h2>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-bold">$24,560</span>
                <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded">↑ 12.5%</span>
              </div>
              <p className="text-xs text-gray-500">Total revenue from Apr 1 - Apr 30, 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-medium hover:underline text-gray-600 flex items-center gap-1 mr-4">View Reports →</button>
              <div className="bg-gray-100 p-1 rounded-lg flex text-xs font-medium">
                <button className="px-3 py-1 bg-white shadow-sm rounded-md">Daily</button>
                <button className="px-3 py-1 text-gray-500 hover:text-black">Weekly</button>
                <button className="px-3 py-1 text-gray-500 hover:text-black">Monthly</button>
              </div>
            </div>
          </div>
          <SalesChart />
        </div>

        {/* Right Column: Order Overview & Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">Order Overview</h2>
              <button className="text-xs font-medium hover:underline text-gray-600">View All →</button>
            </div>
            <OrderDonut />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Add Product', icon: Plus, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Create Discount', icon: Percent, color: 'text-red-500', bg: 'bg-red-50' },
                { label: 'Send Campaign', icon: Send, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'View Store', icon: Eye, color: 'text-orange-500', bg: 'bg-orange-50' },
              ].map((a, i) => (
                <button key={i} className={\`\${a.bg} rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:opacity-80 transition-opacity\`}>
                  <a.icon className={\`w-5 h-5 \${a.color}\`} />
                  <span className={\`text-[10px] font-semibold \${a.color}\`}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Top Products</h2>
            <button className="text-xs font-medium hover:underline text-gray-600">View All →</button>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, name: 'UrbanEase Sneakers', cat: 'Footwear', sales: '842', rev: '$67,360', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
              { id: 2, name: 'BrewMaster Coffee', cat: 'Home & Living', sales: '620', rev: '$74,380', img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop' },
              { id: 3, name: 'Luxe Curve Handbag', cat: 'Bags & Accessories', sales: '588', rev: '$52,332', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100&h=100&fit=crop' },
            ].map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 text-center text-xs text-gray-400 font-medium">{p.id}</div>
                  <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                  <div>
                    <div className="font-semibold text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.cat}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{p.sales} <span className="text-xs font-normal text-gray-500">units sold</span></div>
                  <div className="font-bold">{p.rev}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Inventory Status</h2>
            <button className="text-xs font-medium hover:underline text-gray-600">View All →</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'UrbanEase Sneakers', sku: 'UE-SNK-001', stock: 342, status: 'In Stock', color: 'text-green-600 bg-green-50' },
              { name: 'BrewMaster Coffee', sku: 'BM-CM-001', stock: 18, status: 'Low Stock', color: 'text-orange-600 bg-orange-50' },
              { name: 'Luxe Curve Handbag', sku: 'LC-HB-001', stock: 0, status: 'Out of Stock', color: 'text-red-600 bg-red-50' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <img src={\`https://ui-avatars.com/api/?name=\${p.name.charAt(0)}&background=random\`} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                  <div>
                    <div className="font-semibold text-gray-900">{p.name}</div>
                    <div className="text-[10px] text-gray-500">SKU: {p.sku}</div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="font-medium text-gray-900">{p.stock}</div>
                    <div className="text-[10px] text-gray-500">in stock</div>
                  </div>
                  <span className={\`text-[10px] font-bold px-2 py-1 rounded \${p.color}\`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Insights Placeholder */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Customer Insights</h2>
            <button className="text-xs font-medium hover:underline text-gray-600">View All →</button>
          </div>
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-bold">892</div>
              <div className="text-xs text-gray-500 mb-1">Total Customers</div>
              <div className="text-xs font-medium text-green-500">↑ 18.6%</div>
            </div>
            <div>
              <div className="text-2xl font-bold">68%</div>
              <div className="text-xs text-gray-500 mb-1">Repeat Customers</div>
              <div className="text-xs font-medium text-green-500">↑ 6.2%</div>
            </div>
          </div>
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
             <span className="text-xs text-gray-400">Chart rendering...</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, content.trim());
}
console.log('Dashboard components generated');
