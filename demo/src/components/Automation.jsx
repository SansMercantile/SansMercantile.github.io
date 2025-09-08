import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Bot, Wrench, DollarSign, FileText, Activity, Settings, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Automation = () => {
  const [automationMetrics, setAutomationMetrics] = useState({
    totalTasks: 15847,
    completedToday: 2847,
    successRate: 99.2,
    avgExecutionTime: 0.003,
    activeProcesses: 47,
    savedHours: 1247
  });

  const [automationModules, setAutomationModules] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const modules = [
      {
        id: 1,
        name: 'Financial Automation',
        description: 'Automated accounts payable, FP&A, and tax reporting',
        status: 'active',
        tasksCompleted: 3847,
        efficiency: 98.7,
        icon: DollarSign,
        color: 'green',
        features: ['AP/AR Processing', 'FP&A Reports', 'SARS Tax Filing', 'Budget Analysis']
      },
      {
        id: 2,
        name: 'Self-Healing System',
        description: 'Autonomous updates and issue resolution',
        status: 'active',
        tasksCompleted: 1247,
        efficiency: 99.8,
        icon: Wrench,
        color: 'blue',
        features: ['Auto Updates', 'Error Recovery', 'Performance Tuning', 'Health Monitoring']
      },
      {
        id: 3,
        name: 'AI Sandbox',
        description: 'Secure testing environment for new strategies',
        status: 'active',
        tasksCompleted: 892,
        efficiency: 96.3,
        icon: Bot,
        color: 'purple',
        features: ['Strategy Testing', 'Risk Simulation', 'Backtesting', 'Model Validation']
      },
      {
        id: 4,
        name: 'Support AI',
        description: 'Intelligent user support and market insights',
        status: 'active',
        tasksCompleted: 2156,
        efficiency: 94.1,
        icon: Activity,
        color: 'yellow',
        features: ['Query Handling', 'Market Analysis', 'User Guidance', 'Report Generation']
      },
      {
        id: 5,
        name: 'Document Processing',
        description: 'Automated document generation and compliance',
        status: 'monitoring',
        tasksCompleted: 634,
        efficiency: 97.5,
        icon: FileText,
        color: 'red',
        features: ['Contract Analysis', 'Compliance Docs', 'Report Generation', 'Data Extraction']
      },
      {
        id: 6,
        name: 'System Orchestration',
        description: 'Coordinated automation across all modules',
        status: 'active',
        tasksCompleted: 1589,
        efficiency: 99.1,
        icon: Settings,
        color: 'green',
        features: ['Task Scheduling', 'Resource Management', 'Workflow Optimization', 'Load Balancing']
      }
    ];

    setAutomationModules(modules);

    // Generate recent tasks
    const generateRecentTasks = () => {
      const taskTypes = [
        'Financial report generated',
        'System update deployed',
        'Strategy backtested',
        'User query resolved',
        'Compliance check completed',
        'Performance optimization applied',
        'Risk assessment updated',
        'Market analysis completed'
      ];

      return Array.from({ length: 10 }, (_, i) => ({
        id: i,
        task: taskTypes[Math.floor(Math.random() * taskTypes.length)],
        module: modules[Math.floor(Math.random() * modules.length)].name,
        duration: Math.random() * 5 + 0.1,
        status: Math.random() > 0.1 ? 'completed' : 'failed',
        timestamp: Date.now() - i * 30000
      }));
    };

    setRecentTasks(generateRecentTasks());

    // Update metrics periodically
    const interval = setInterval(() => {
      setAutomationMetrics(prev => ({
        ...prev,
        totalTasks: prev.totalTasks + Math.floor(Math.random() * 10 + 5),
        completedToday: prev.completedToday + Math.floor(Math.random() * 5 + 1),
        successRate: Math.max(95, Math.min(100, prev.successRate + (Math.random() - 0.5) * 1)),
        avgExecutionTime: Math.max(0.001, prev.avgExecutionTime + (Math.random() - 0.5) * 0.001),
        activeProcesses: Math.max(30, Math.min(60, prev.activeProcesses + Math.floor((Math.random() - 0.5) * 5))),
        savedHours: prev.savedHours + Math.floor(Math.random() * 3 + 1)
      }));

      setAutomationModules(prev => prev.map(module => ({
        ...module,
        tasksCompleted: module.tasksCompleted + Math.floor(Math.random() * 5 + 1),
        efficiency: Math.max(90, Math.min(100, module.efficiency + (Math.random() - 0.5) * 2))
      })));

      setRecentTasks(generateRecentTasks());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleModuleClick = (module) => {
    toast({
      title: `🤖 ${module.name} Details`,
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

  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Automation & True Autonomy</h1>
          <p className="text-gray-400 mt-1">Full autonomous operation with minimal human intervention</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
            <Zap className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">{automationMetrics.activeProcesses} Active</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">{automationMetrics.successRate.toFixed(1)}% Success</span>
          </div>
        </div>
      </div>

      {/* Automation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <motion.div
          className="metric-card rounded-xl p-4 border-green-500/20 sans-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-green-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{automationMetrics.totalTasks.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Total Tasks</div>
            </div>
          </div>
          <div className="text-xs text-green-400">+{automationMetrics.completedToday} today</div>
        </motion.div>

        <motion.div
          className="metric-card rounded-xl p-4 border-blue-500/20 sans-glow-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{automationMetrics.successRate.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
          </div>
          <div className="text-xs text-blue-400">Excellent</div>
        </motion.div>

        <motion.div
          className="metric-card rounded-xl p-4 border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{automationMetrics.avgExecutionTime.toFixed(3)}s</div>
              <div className="text-xs text-gray-400">Avg Execution</div>
            </div>
          </div>
          <div className="text-xs text-purple-400">Ultra-fast</div>
        </motion.div>

        <motion.div
          className="metric-card rounded-xl p-4 border-yellow-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Settings className="w-5 h-5 text-yellow-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{automationMetrics.activeProcesses}</div>
              <div className="text-xs text-gray-400">Active Processes</div>
            </div>
          </div>
          <div className="text-xs text-yellow-400">Running</div>
        </motion.div>

        <motion.div
          className="metric-card rounded-xl p-4 border-red-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-red-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{automationMetrics.savedHours.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Hours Saved</div>
            </div>
          </div>
          <div className="text-xs text-red-400">This month</div>
        </motion.div>

        <motion.div
          className="metric-card rounded-xl p-4 border-green-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Bot className="w-5 h-5 text-green-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{automationModules.length}</div>
              <div className="text-xs text-gray-400">AI Modules</div>
            </div>
          </div>
          <div className="text-xs text-green-400">All active</div>
        </motion.div>
      </div>

      {/* Automation Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automationModules.map((module) => {
          const Icon = module.icon;
          
          return (
            <motion.div
              key={module.id}
              className={`metric-card rounded-xl p-6 cursor-pointer ${getColorClasses(module.color)}`}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModuleClick(module)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: module.id * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${module.color}-500/20`}>
                    <Icon className={`w-5 h-5 text-${module.color}-400`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{module.name}</h3>
                    <p className="text-xs text-gray-400">{module.status}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(module.status)}`}>
                  {module.status}
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-4">{module.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Tasks Completed</span>
                  <span className="text-sm font-medium text-white">{module.tasksCompleted.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Efficiency</span>
                  <span className="text-sm font-medium text-white">{module.efficiency.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r from-${module.color}-500 to-${module.color}-400 h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${module.efficiency}%` }}
                  ></div>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {module.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className={`px-2 py-1 bg-${module.color}-500/20 text-${module.color}-400 text-xs rounded`}>
                        {feature}
                      </span>
                    ))}
                    {module.features.length > 2 && (
                      <span className="text-xs text-gray-500">+{module.features.length - 2} more</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Tasks and System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Automated Tasks */}
        <motion.div
          className="metric-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-400" />
            Recent Automated Tasks
          </h3>
          
          <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
            {recentTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  task.status === 'completed' 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-red-500/10 border-red-500/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    task.status === 'completed' ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <div>
                    <div className="text-sm text-white">{task.task}</div>
                    <div className="text-xs text-gray-400">{task.module}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{task.duration.toFixed(2)}s</div>
                  <div className="text-xs text-gray-500">{formatTime(task.timestamp)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Automation Health */}
        <motion.div
          className="metric-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-blue-400" />
            System Health Monitor
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Self-Healing System</span>
              </div>
              <span className="text-green-400 text-sm">Optimal</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-blue-400" />
                <span className="text-white">Resource Utilization</span>
              </div>
              <span className="text-blue-400 text-sm">67%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center space-x-3">
                <Bot className="w-5 h-5 text-purple-400" />
                <span className="text-white">AI Sandbox</span>
              </div>
              <span className="text-purple-400 text-sm">Testing 3 strategies</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Financial Automation</span>
              </div>
              <span className="text-yellow-400 text-sm">Processing 12 reports</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-green-400" />
                <span className="text-white">System Updates</span>
              </div>
              <span className="text-green-400 text-sm">Up to date</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Overall Health</span>
              <span className="text-green-400">98.7%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-[98.7%]"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Automation Capabilities */}
      <motion.div
        className="metric-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-6">Autonomous Capabilities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Financial Operations</h4>
              <p className="text-sm text-gray-400">Complete automation of AP/AR, FP&A, and tax compliance</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Automation Level</span>
                <span className="text-green-400">98.7%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1 rounded-full w-[98.7%]"></div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto border border-blue-500/30">
              <Wrench className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Self-Healing</h4>
              <p className="text-sm text-gray-400">Autonomous updates, error recovery, and optimization</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Uptime</span>
                <span className="text-blue-400">99.8%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1 rounded-full w-[99.8%]"></div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto border border-purple-500/30">
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">AI Testing</h4>
              <p className="text-sm text-gray-400">Secure sandbox for strategy validation and testing</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Active Tests</span>
                <span className="text-purple-400">3</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full w-[75%]"></div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto border border-yellow-500/30">
              <Activity className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Support AI</h4>
              <p className="text-sm text-gray-400">Intelligent user support and market insights</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Response Time</span>
                <span className="text-yellow-400">0.3s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1 rounded-full w-[95%]"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Automation;
