import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Users, 
  Database, 
  Shield, 
  Zap, 
  BarChart3,
  Activity,
  Cpu
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'agi-core', label: 'AGI Core', icon: Brain },
    { id: 'multi-agent', label: 'Multi-Agent', icon: Users },
    { id: 'data-ingestion', label: 'Data Ingestion', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'automation', label: 'Automation', icon: Zap },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-green-500/20 z-50">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center sans-glow">
            <Cpu className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">Sans Mercantile™</h1>
            <p className="text-xs text-gray-400">PRIV Core v2.1</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 sans-glow' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">System Status</span>
          </div>
          <div className="text-xs text-gray-400">
            <div className="flex justify-between">
              <span>AGI Core:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span>AI Core:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Agents:</span>
              <span className="text-green-400">12/12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
