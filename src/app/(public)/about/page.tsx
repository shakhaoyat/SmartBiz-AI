'use client';

import { Users, Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">About SmartBiz AI</h1>
          <p className="text-xl text-slate-600 text-center max-w-3xl mx-auto mb-12">
            We believe every small business deserves access to enterprise-grade data analytics and AI-powered insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Target className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-slate-600">Democratize data-driven decision making for businesses of all sizes.</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Team</h3>
              <p className="text-slate-600">A team of engineers, data scientists, and business strategists.</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-slate-600">Security, accuracy, and actionable insights at the core of everything we build.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
