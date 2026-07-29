'use client';

import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-white">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-xl text-slate-600 text-center mb-12">Have questions? We would love to hear from you.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" required className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea rows={4} required className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                </div>
                <button type="submit" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </button>
                {sent && <p className="text-green-600 text-sm">Message sent successfully!</p>}
              </form>
            </div>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-primary-600 mr-4" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-slate-600">support@smartbizai.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-primary-600 mr-4" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-primary-600 mr-4" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-slate-600">123 Market Street, Suite 400<br />San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
