'use client';

import { BarChart3, Brain, TrendingUp, Shield, Zap, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const features = [
  { title: 'AI Data Analyst', desc: 'Upload CSV/JSON data and get AI-generated insights, trends, risks, and KPIs.', icon: BarChart3 },
  { title: 'Business Advisor Chat', desc: 'Ask questions about your business and get contextual answers based on your actual data.', icon: MessageSquare },
  { title: 'Smart Recommendations', desc: 'Receive personalized, data-driven recommendations to grow your revenue.', icon: TrendingUp },
  { title: 'Real-time Analytics', desc: 'Interactive dashboards with revenue, sales, and product performance charts.', icon: BarChart3 },
  { title: 'Secure Data Management', desc: 'Your business data is encrypted and scoped to your account.', icon: Shield },
  { title: 'Fast insights', desc: 'Process thousands of records in seconds and make decisions instantly.', icon: Zap },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Platform Features</h1>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">Everything you need to turn raw business data into intelligent decisions.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <f.icon className="h-10 w-10 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-primary-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <Link href="/register" className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50">Sign Up Free</Link>
        </div>
      </section>
    </div>
  );
}
