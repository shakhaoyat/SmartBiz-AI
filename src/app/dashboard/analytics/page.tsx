'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '@/services/analytics';
import { useAuth } from '@/providers/auth-provider';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#8b5cf6'];

export default function AnalyticsPage() {
  const [businessId, setBusinessId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['analytics', businessId, startDate, endDate],
    queryFn: () => getAnalytics(businessId, startDate || undefined, endDate || undefined),
    enabled: !!businessId,
  });

  const analytics = data as any || { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0, topProducts: [], categoryBreakdown: [], revenueOverTime: [] };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-1">Analyze your business performance</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business ID</label>
            <input type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg" placeholder="Enter business ID" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">{[1, 2].map(i => <div key={i} className="bg-slate-100 h-64 rounded-xl" />)}</div>
      ) : businessId && data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600">Total Orders</p>
              <p className="text-2xl font-bold">{analytics.totalOrders.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600">Avg Order Value</p>
              <p className="text-2xl font-bold">${analytics.avgOrderValue.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold mb-4">Revenue Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.revenueOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={analytics.categoryBreakdown} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={100} fill="#8884d8" dataKey="value">
                    {analytics.categoryBreakdown.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={analytics.topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#22c55e" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl text-center text-slate-600">
          Select a business to view analytics. Ensure you have uploaded sales data.
        </div>
      )}
    </div>
  );
}
