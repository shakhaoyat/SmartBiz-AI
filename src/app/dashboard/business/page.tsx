'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBusinesses, createBusiness, updateBusiness, deleteBusiness } from '@/services/business';
import { useAuth } from '@/providers/auth-provider';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Business } from '@/types';

export default function BusinessPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Business | null>(null);
  const [formData, setFormData] = useState({ name: '', type: '', industry: '', description: '', location: '', goals: '', targetCustomers: '' });
  const [error, setError] = useState('');

  const { data: businesses, isLoading } = useQuery({ queryKey: ['businesses'], queryFn: getBusinesses });
  const createMutation = useMutation({ mutationFn: createBusiness, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['businesses'] }) });
  const updateMutation = useMutation({ mutationFn: ({ id, data }: any) => updateBusiness(id, data), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['businesses'] }) });
  const deleteMutation = useMutation({ mutationFn: deleteBusiness, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['businesses'] }) });

  const userBusinesses = (businesses as Business[])?.filter((b) => b.owner === user?._id) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.name) { setError('Business name is required'); return; }
    if (editing) {
      updateMutation.mutate({ id: editing._id, data: formData });
      setEditing(null);
    } else {
      createMutation.mutate(formData);
    }
    setFormData({ name: '', type: '', industry: '', description: '', location: '', goals: '', targetCustomers: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Businesses</h1>
          <p className="text-slate-600 mt-1">Create and manage your businesses</p>
        </div>
        <button onClick={() => setEditing(null)} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          <Plus className="h-4 w-4 mr-2" /> Add Business
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
            <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="e.g. Retail, SaaS" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
            <input type="text" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg" rows={3} />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">
              {editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">{[1, 2].map(i => <div key={i} className="bg-slate-100 h-24 rounded-xl" />)}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userBusinesses.map((business) => (
            <div key={business._id} className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold">{business.name}</h3>
              <p className="text-sm text-slate-600">{business.type} | {business.industry}</p>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2">{business.description}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => { setEditing(business); setFormData(business); }} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => { if (confirm('Delete this business?')) deleteMutation.mutate(business._id); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
