'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRecommendations, updateRecommendationStatus, generateRecommendations } from '@/services/recommendations';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';

export default function RecommendationsPage() {
  const [businessId, setBusinessId] = useState('');
  const queryClient = useQueryClient();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['recommendations', businessId],
    queryFn: () => getRecommendations(businessId),
    enabled: !!businessId,
  });

  const generateMutation = useMutation({ mutationFn: generateRecommendations, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recommendations'] }) });
  const updateMutation = useMutation({
    mutationFn: ({ id, status, feedback }: any) => updateRecommendationStatus(id, status, feedback),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recommendations'] }),
  });

  const handleStatusUpdate = (id: string, status: string) => {
    updateMutation.mutate({ id, status });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Recommendations</h1>
          <p className="text-slate-600 mt-1">AI-powered suggestions for your business</p>
        </div>
        <div className="flex gap-2">
          <input type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg" placeholder="Enter business ID" />
          <button onClick={() => generateMutation.mutate(businessId)} disabled={!businessId || generateMutation.isPending} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50">
            <RefreshCw className="h-4 w-4 mr-2" /> Generate
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">{[1, 2].map(i => <div key={i} className="bg-slate-100 h-32 rounded-xl" />)}</div>
      ) : recommendations && (recommendations as any[]).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(recommendations as any[]).map((rec: any) => (
            <div key={rec._id} className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{rec.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-slate-100 text-slate-700'
                }`}>{rec.priority}</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">{rec.reason}</p>
              <p className="text-sm text-slate-500 mb-1"><strong>Impact:</strong> {rec.impact}</p>
              <p className="text-sm text-slate-500 mb-4"><strong>Action:</strong> {rec.action}</p>
              <div className="flex gap-2">
                {rec.status === 'pending' && (
                  <>
                    <button onClick={() => handleStatusUpdate(rec._id, 'accepted')} className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" /> Accept
                    </button>
                    <button onClick={() => handleStatusUpdate(rec._id, 'dismissed')} className="flex items-center px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-300">
                      <XCircle className="h-4 w-4 mr-1" /> Dismiss
                    </button>
                  </>
                )}
                {rec.status === 'accepted' && (
                  <button onClick={() => handleStatusUpdate(rec._id, 'completed')} className="flex items-center px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl text-center text-slate-600">
          Enter a business ID and generate recommendations to get started.
        </div>
      )}
    </div>
  );
}
