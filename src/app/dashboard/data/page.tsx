'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDatasets, uploadDataset, deleteDataset } from '@/services/data';
import { getBusinesses } from '@/services/business';
import { useAuth } from '@/providers/auth-provider';
import { Upload, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function DataPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [businessId, setBusinessId] = useState('');
  const [uploading, setUploading] = useState(false);

  const { data: businesses } = useQuery({ queryKey: ['businesses'], queryFn: getBusinesses });
  const { data: datasets, isLoading } = useQuery({
    queryKey: ['datasets', businessId],
    queryFn: () => getDatasets(businessId),
    enabled: !!businessId,
  });

  const uploadMutation = useMutation({
    mutationFn: ({ file, businessId }: { file: File; businessId: string }) => uploadDataset(file, businessId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['datasets'] }); setUploading(false); toast.success('Dataset uploaded successfully'); },
    onError: (err: any) => { setUploading(false); toast.error(err?.response?.data?.message || 'Upload failed'); },
  });

  const deleteMutation = useMutation({ mutationFn: deleteDataset, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['datasets'] }); toast.success('Dataset deleted'); }, onError: (err: any) => toast.error(err?.response?.data?.message || 'Delete failed') });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !businessId) return;
    setUploading(true);
    uploadMutation.mutate({ file, businessId });
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Sales Data</h1>
        <p className="text-slate-600 mt-1">Upload and manage your sales datasets</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4 mb-4">
          <select value={businessId} onChange={(e) => setBusinessId(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg">
            <option value="">Select Business</option>
            {(businesses as any[])?.filter((b) => b.owner === user?._id).map((b) => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
          <label className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV/JSON
            <input type="file" accept=".csv,.json" onChange={handleUpload} className="hidden" disabled={!businessId} />
          </label>
        </div>

        {businessId && (
          <div className="space-y-3">
            {isLoading ? (
              <div className="animate-pulse space-y-3">{[1, 2].map(i => <div key={i} className="bg-slate-100 h-16 rounded-lg" />)}</div>
            ) : datasets && (datasets as any[]).length > 0 ? (
              (datasets as any[]).map((dataset: any) => (
                <div key={dataset._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    {dataset.status === 'processing' && <Loader2 className="h-5 w-5 text-accent-600 animate-spin mr-3" />}
                    {dataset.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-600 mr-3" />}
                    {dataset.status === 'failed' && <XCircle className="h-5 w-5 text-red-600 mr-3" />}
                    <div>
                      <p className="font-medium">{dataset.originalName}</p>
                      <p className="text-sm text-slate-600">{dataset.fileType.toUpperCase()} | {dataset.recordCount} records</p>
                    </div>
                  </div>
                  <button onClick={() => { if (confirm('Delete this dataset?')) deleteMutation.mutate(dataset._id); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8">No datasets uploaded yet. Upload a CSV or JSON file to get started.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
