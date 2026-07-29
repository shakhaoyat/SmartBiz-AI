'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-600">
              SmartBiz AI
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/features" className="text-slate-600 hover:text-primary-600">Features</Link>
            <Link href="/how-it-works" className="text-slate-600 hover:text-primary-600">How It Works</Link>
            <Link href="/about" className="text-slate-600 hover:text-primary-600">About</Link>
            <Link href="/contact" className="text-slate-600 hover:text-primary-600">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-slate-600 hover:text-primary-600">Dashboard</Link>
                <Link href="/dashboard/business" className="text-slate-600 hover:text-primary-600">Businesses</Link>
                <Link href="/dashboard/products" className="text-slate-600 hover:text-primary-600">Products</Link>
                <Link href="/dashboard/data" className="text-slate-600 hover:text-primary-600">Data</Link>
                <Link href="/dashboard/analytics" className="text-slate-600 hover:text-primary-600">Analytics</Link>
                <Link href="/dashboard/reports" className="text-slate-600 hover:text-primary-600">Reports</Link>
                <Link href="/dashboard/ai-advisor" className="text-slate-600 hover:text-primary-600">AI Advisor</Link>
                <Link href="/dashboard/recommendations" className="text-slate-600 hover:text-primary-600">Recommendations</Link>
                <button onClick={logout} className="text-slate-600 hover:text-primary-600">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-600 hover:text-primary-600">Login</Link>
                <Link href="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
