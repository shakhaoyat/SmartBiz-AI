'use client';

import { Upload, BarChart3, MessageSquare, Zap } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { title: 'Create Account', desc: 'Sign up and set up your business profile in seconds.', icon: Zap },
  { title: 'Upload Data', desc: 'Import your sales data from CSV or JSON files.', icon: Upload },
  { title: 'Get Insights', desc: 'AI analyzes your data and generates actionable insights.', icon: BarChart3 },
  { title: 'Chat & Decide', desc: 'Ask the AI advisor questions and implement recommendations.', icon: MessageSquare },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">How It Works</h1>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">Four simple steps to transform your business decision-making.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <s.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-sm font-bold text-primary-600 mb-2">Step {i + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start making smarter decisions today.</h2>
          <Link href="/register" className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700">Get Started</Link>
        </div>
      </section>
    </div>
  );
}
