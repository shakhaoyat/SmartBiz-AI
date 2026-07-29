'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReports, generateAIReport, deleteReport } from '@/services/reports';
import { useAuth } from '@/providers/auth-provider';
import { FileText, Trash2, Download, Loader2 } from 'lucide-react';

export default function ReportsPage() {
  const queryClient = useQueryClient();
  const [businessId, setBusinessId] = useState('');

  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports', businessId],
    queryFn: () => getReports(businessId),
    enabled: !!businessId,
  });

  const generateMutation = useMutation({ mutationFn: generateAIReport, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] }) });
  const deleteMutation = useMutation({ mutationFn: deleteReport, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] }) });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 mt-1">Generate and view business reports</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Business ID</label>
            <input type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="Enter business ID" />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => businessId && generateMutation.mutate(businessId)}
              disabled={!businessId || generateMutation.isPending}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {generateMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <></>}
              Generate AI Report
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">{[1, 2, 3].map(i => <div key={i} className="bg-slate-100 h-24 rounded-xl" />)}</div>
      ) : reports && (reports as any[]).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(reports as any[]).map((report: any) => (
            <div key={report._id} className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-primary-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-sm text-slate-600">{report.type} | {new Date(report.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => alert('Download feature coming soon')} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"><Download className="h-4 w-4" /></button>
                  <button onClick={() => { if (confirm('Delete this report?')) deleteMutation.mutate(report._id); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mt-3 text-sm text-slate-700">
                <p className="line-clamp-3">{report.summary}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl text-center text-slate-600">
          Enter a business ID and generate your first AI report.
        </div>
      )}
    </div>
  );
}
