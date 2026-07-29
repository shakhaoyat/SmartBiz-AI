import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">SmartBiz AI</h3>
            <p className="text-sm mb-4">Turn your business data into smarter decisions with AI-powered insights.</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-white">Features</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> support@smartbizai.com</li>
              <li className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +1 (555) 123-4567</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> San Francisco, CA</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} SmartBiz AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
