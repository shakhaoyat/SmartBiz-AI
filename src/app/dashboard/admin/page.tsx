'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStats, getAllUsers, getAllBusinesses, deleteUser } from '@/services/admin';
import { useAuth } from '@/providers/auth-provider';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery({ queryKey: ['adminStats'], queryFn: getStats });
  const { data: users, isLoading: usersLoading } = useQuery({ queryKey: ['adminUsers'], queryFn: getAllUsers });
  const { data: businesses, isLoading: businessLoading } = useQuery({ queryKey: ['adminBusinesses'], queryFn: getAllBusinesses });

  if (user?.role !== 'admin') {
    return <div className="bg-red-50 text-red-600 p-8 rounded-xl">Access denied. Admins only.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600 mt-1">Platform management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
            <div className="space-y-2">
              <p>Total Users: {(stats as any)?.totalUsers}</p>
              <p>Total Businesses: {(stats as any)?.totalBusinesses}</p>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {usersLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {(users as any[])?.map((u: any) => (
                <div key={u._id} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-sm text-slate-600">{u.email} | {u.role}</p>
                  </div>
                  <button onClick={() => { if (confirm('Delete user?')) deleteUser(u._id); }} className="text-red-600 hover:bg-red-50 px-2 py-1 rounded">Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
