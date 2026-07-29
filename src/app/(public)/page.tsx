'use client';

import { ArrowRight, BarChart3, Brain, TrendingUp, Shield, Zap, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Turn Your Business Data Into <span className="text-primary-600">Smarter Decisions</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              SmartBiz AI helps small businesses understand their data, identify opportunities, detect risks, and make better decisions with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-lg font-semibold">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/features" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 text-lg font-semibold">
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Challenges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Common Business Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Data Overload', desc: 'Spreadsheets full of numbers with no clear insights', icon: BarChart3 },
              { title: 'Blind Decision Making', desc: 'Key business decisions without reliable data backing', icon: Brain },
              { title: 'Missed Opportunities', desc: 'Untapped potential hiding in your sales data', icon: TrendingUp },
            ].map((item) => (
              <div key={item.title} className="bg-slate-50 p-6 rounded-xl">
                <item.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'AI Data Analysis', desc: 'Upload CSV/JSON and get instant AI-powered insights' },
              { title: 'Business Advisor', desc: 'Chat with an AI that knows your business context' },
              { title: 'Smart Recommendations', desc: 'Personalized actions based on your data' },
              { title: 'Real-time Analytics', desc: 'Dashboards with KPIs and trend charts' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make smarter business decisions?</h2>
          <p className="text-lg mb-8 text-primary-100">Join thousands of business owners using SmartBiz AI to grow their business.</p>
          <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 text-lg font-semibold">
            Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
