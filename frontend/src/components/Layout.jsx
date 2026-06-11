import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Permanent Navigation Sidebar */}
      <Sidebar />
      
      {/* Content Canvas */}
      <main className="flex-1 px-4 py-8 md:px-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}