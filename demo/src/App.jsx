import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import AGICore from '@/components/AGICore';
import MultiAgent from '@/components/MultiAgent';
import DataIngestion from '@/components/DataIngestion';
import Security from '@/components/Security';
import Automation from '@/components/Automation';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'agi-core':
        return <AGICore />;
      case 'multi-agent':
        return <MultiAgent />;
      case 'data-ingestion':
        return <DataIngestion />;
      case 'security':
        return <Security />;
      case 'automation':
        return <Automation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Sans Mercantile™ PRIV Core - AI-Driven Execution Engine</title>
        <meta name="description" content="Next-generation AI-driven execution engine featuring AGI & AI cores, multi-agent systems, and advanced market analysis capabilities." />
        <meta property="og:title" content="Sans Mercantile™ PRIV Core - AI-Driven Execution Engine" />
        <meta property="og:description" content="Revolutionary dual-core AGI system with emotional intelligence and deep market analysis capabilities." />
      </Helmet>
      
      <div className="min-h-screen bg-black neural-grid matrix-bg">
        <div className="flex">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <main className="flex-1 ml-64">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;
