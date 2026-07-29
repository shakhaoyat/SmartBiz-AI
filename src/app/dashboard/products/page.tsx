'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/products';
import { getBusinesses } from '@/services/business';
import { useAuth } from '@/providers/auth-provider';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  status: z.enum(['active', 'inactive']),
  imageUrl: z.string().optional(),
  business: z.string().min(1, 'Business is required'),
});

type ProductForm = z.infer<typeof productSchema>;

export default function ProductsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState('');

  const { data: businesses } = useQuery({ queryKey: ['businesses'], queryFn: getBusinesses });
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedBusiness],
    queryFn: () => getProducts(selectedBusiness || undefined),
  });

  const createMutation = useMutation({ mutationFn: createProduct, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }) });
  const updateMutation = useMutation({ mutationFn: ({ id, data }: any) => updateProduct(id, data), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }) });
  const deleteMutation = useMutation({ mutationFn: deleteProduct, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }) });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductForm>({ resolver: zodResolver(productSchema) });

  const onSubmit = (data: ProductForm) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, data });
      setEditingProduct(null);
    } else {
      createMutation.mutate(data);
    }
    reset();
    setShowForm(false);
  };

  const filteredProducts = (products as any[])?.filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-1">Manage your products and services</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingProduct(null); reset(); }} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg" />
            </div>
          </div>
          <select value={selectedBusiness} onChange={(e) => setSelectedBusiness(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg">
            <option value="">All Businesses</option>
            {(businesses as any[])?.filter((b) => b.owner === user?._id).map((b) => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
              <input {...register('name')} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <input {...register('category')} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
              {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
              <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
              {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select {...register('status')} className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Business</label>
              <select {...register('business')} className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                {(businesses as any[])?.filter((b) => b.owner === user?._id).map((b) => (
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea {...register('description')} className="w-full px-3 py-2 border border-slate-300 rounded-lg" rows={2} />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                {editingProduct ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingProduct(null); }} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
            </div>
          </form>
        )}
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">{[1, 2, 3].map(i => <div key={i} className="bg-slate-100 h-20 rounded-xl" />)}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product: any) => (
            <div key={product._id} className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-slate-600">{product.category}</p>
                <p className="text-lg font-bold text-primary-600">${product.price}</p>
                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{product.status}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditingProduct(product); setShowForm(true); }} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => { if (confirm('Delete this product?')) deleteMutation.mutate(product._id); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
