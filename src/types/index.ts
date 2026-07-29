export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin';
  token?: string;
}

export interface Business {
  _id: string;
  name: string;
  type: string;
  industry: string;
  description: string;
  location: string;
  goals: string;
  targetCustomers: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  status: 'active' | 'inactive';
  imageUrl?: string;
  business: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesDataset {
  _id: string;
  name: string;
  business: string;
  fileType: 'csv' | 'json';
  status: 'processing' | 'completed' | 'failed';
  recordCount: number;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  topProducts: { name: string; revenue: number; quantity: number }[];
  categoryBreakdown: { name: string; value: number }[];
  revenueOverTime: { date: string; revenue: number }[];
}

export interface AnalyticsReport {
  _id: string;
  title: string;
  business: string;
  generatedBy: string;
  type: string;
  summary: string;
  createdAt: string;
}

export interface Recommendation {
  _id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  reason: string;
  impact: string;
  action: string;
  status: 'pending' | 'accepted' | 'dismissed' | 'completed';
  confidence: number;
  createdAt: string;
}

export interface AIMessage {
  _id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface AIConversation {
  _id: string;
  title: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}
