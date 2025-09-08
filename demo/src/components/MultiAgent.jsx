import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Brain, TrendingUp, Shield, Globe, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const MultiAgent = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const initialAgents = [
      {
        id: 1,
        name: 'Quant-Alpha-7',
        type: 'Quantitative',
        status: 'active',
        performance: 94.2,
        reputation: 0.97,
        icon: TrendingUp,
        color: 'green',
        specialty: 'Statistical Arbitrage',
        decisions: 1247,
        accuracy: 89.3,
        lastAction: 'Identified mean reversion opportunity in EURUSD'
      },
      {
        id: 2,
        name: 'Risk-Guardian',
        type: 'Risk Management',
        status: 'active',
        performance: 91.8,
        reputation: 0.95,
        icon: Shield,
        color: 'yellow',
        specialty: 'Portfolio Risk Assessment',
        decisions: 892,
        accuracy: 94.7,
        lastAction: 'Reduced position size due to volatility spike'
      },
      {
        id: 3,
        name: 'Sentiment-Oracle',
        type: 'Sentiment Analysis',
        status: 'active',
        performance: 87.5,
        reputation: 0.89,
        icon: Brain,
        color: 'purple',
        specialty: 'Social Media & News Analysis',
        decisions: 2156,
        accuracy: 82.1,
        lastAction: 'Detected bearish sentiment shift in crypto markets'
      },
      {
        id: 4,
        name: 'Macro-Strategist',
        type: 'Economic Analysis',
        status: 'active',
        performance: 96.1,
        reputation: 0.98,
        icon: Globe,
        color: 'blue',
        specialty: 'Macroeconomic Forecasting',
        decisions: 634,
        accuracy: 91.8,
        lastAction: 'Updated inflation expectations model'
      },
      {
        id: 5,
        name: 'Execution-Lightning',
        type: 'Trade Execution',
        status: 'active',
        performance: 99.2,
        reputation: 0.99,
        icon: Zap,
        color: 'red',
        specialty: 'High-Frequency Execution',
        decisions: 15847,
        accuracy: 99.1,
        lastAction: 'Executed 247 trades with 0.002s avg latency'
      },
      {
        id: 6,
        name: 'Arbitrage-Hunter',
        type: 'Arbitrage',
        status: 'monitoring',
        performance: 88.9,
        reputation: 0.92,
        icon: TrendingUp,
        color: 'green',
        specialty: 'Cross-Market Arbitrage',
        decisions: 1089,
        accuracy: 95.4,
        lastAction: 'Monitoring price discrepancies across 12 exchanges'
      }
    ];

    setAgents(initialAgents);

    // Update agent metrics periodically
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        performance: Math.max(0, Math.min(100, agent.performance + (Math.random() - 0.5) * 2)),
        reputation: Math.max(0, Math.min(1, agent.reputation + (Math.random() - 0.5) * 0.02))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    toast({
      title: `🤖 ${agent.name} Details`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'monitoring': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'idle': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      green: 'border-green-500/20 sans-glow',
      blue: 'border-blue-500/20 sans-glow-blue',
      purple: 'border-purple-500/20',
      yellow: 'border-yellow-500/20',
      red: 'border-red-500/20'
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Multi-Agent Ecosystem</h1>
          <p className="text-gray-400 mt-1">Decentralized fleet of specialized AI agents</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">{agents.filter(a => a.status === 'active').length} Active</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">{agents.length} Total Agents</span>
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const Icon = agent.icon;
          
          return (
            <motion.div
              key={agent.id}
              className={`metric-card rounded-xl p-6 cursor-pointer ${getColorClasses(agent.color)}`}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAgentClick(agent)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: agent.id * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${agent.color}-500/20`}>
                    <Icon className={`w-5 h-5 text-${agent.color}-400`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{agent.name}</h3>
                    <p className="text-xs text-gray-400">{agent.type}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(agent.status)}`}>
                  {agent.status}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Performance</span>
                  <span className="text-sm font-medium text-white">{agent.performance.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r from-${agent.color}-500 to-${agent.color}-400 h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${agent.performance}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Reputation</span>
                  <span className="text-sm font-medium text-white">{agent.reputation.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">Specialty:</p>
                  <p className="text-sm text-white">{agent.specialty}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Decisions:</span>
                    <div className="text-white font-medium">{agent.decisions.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Accuracy:</span>
                    <div className="text-white font-medium">{agent.accuracy}%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Agent Communication Network */}
      <motion.div
        className="metric-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-400" />
          Agent Communication Network
        </h3>
        
        <div className="relative h-64 bg-black/50 rounded-lg overflow-hidden">
          <svg className="w-full h-full">
            {/* Network nodes */}
            {agents.slice(0, 6).map((agent, i) => {
              const angle = (i / 6) * 2 * Math.PI;
              const radius = 80;
              const centerX = 50;
              const centerY = 50;
              const x = centerX + (radius * Math.cos(angle)) / 100 * 100;
              const y = centerY + (radius * Math.sin(angle)) / 100 * 100;
              
              return (
                <g key={agent.id}>
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="8"
                    fill={agent.status === 'active' ? '#00ff88' : '#666'}
                    className="animate-pulse"
                  />
                  <text
                    x={`${x}%`}
                    y={`${y + 15}%`}
                    textAnchor="middle"
                    className="text-xs fill-white"
                  >
                    {agent.name.split('-')[0]}
                  </text>
                </g>
              );
            })}
            
            {/* Network connections */}
            {agents.slice(0, 6).map((agent, i) => {
              const angle1 = (i / 6) * 2 * Math.PI;
              const angle2 = ((i + 1) / 6) * 2 * Math.PI;
              const radius = 80;
              const centerX = 50;
              const centerY = 50;
              const x1 = centerX + (radius * Math.cos(angle1)) / 100 * 100;
              const y1 = centerY + (radius * Math.sin(angle1)) / 100 * 100;
              const x2 = centerX + (radius * Math.cos(angle2)) / 100 * 100;
              const y2 = centerY + (radius * Math.sin(angle2)) / 100 * 100;
              
              return (
                <line
                  key={`connection-${i}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="rgba(0, 255, 136, 0.3)"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Central arbitration node */}
            <circle
              cx="50%"
              cy="50%"
              r="12"
              fill="#0066ff"
              className="animate-pulse"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy="0.3em"
              className="text-xs fill-white font-bold"
            >
              ARB
            </text>
          </svg>
          
          <div className="absolute bottom-4 left-4 text-white">
            <div className="text-sm font-medium">Network Status: Optimal</div>
            <div className="text-xs text-gray-400">Real-time agent communication</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Agent Activities */}
      <motion.div
        className="metric-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Agent Activities</h3>
        
        <div className="space-y-4">
          {agents.slice(0, 4).map((agent) => {
            const Icon = agent.icon;
            return (
              <div key={agent.id} className={`flex items-start space-x-4 p-4 bg-${agent.color}-500/10 rounded-lg border border-${agent.color}-500/20`}>
                <Icon className={`w-5 h-5 text-${agent.color}-400 mt-0.5`} />
                <div className="flex-1">
                  <div className="text-white font-medium">{agent.name}</div>
                  <div className="text-gray-400 text-sm mt-1">{agent.lastAction}</div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Performance: {agent.performance.toFixed(1)}%</span>
                    <span>Reputation: {agent.reputation.toFixed(2)}</span>
                    <span>Status: {agent.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default MultiAgent;
