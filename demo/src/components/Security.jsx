import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, AlertTriangle, CheckCircle, Eye, Zap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import SecurityArchitecture from '@/components/security/SecurityArchitecture'; // New import for refactored component

const Security = () => {
  const [securityMetrics, setSecurityMetrics] = useState({
    zkpVerifications: 15847,
    blockchainLogs: 2847,
    encryptionStrength: 256,
    threatLevel: 'Low',
    complianceScore: 98.7
  });

  const [securityEvents, setSecurityEvents] = useState([]);
  const [threatMap, setThreatMap] = useState([]);

  useEffect(() => {
    const events = [
      {
        id: 1,
        type: 'zkp_verification',
        message: 'Zero-knowledge proof verified for trade execution',
        severity: 'info',
        timestamp: Date.now() - 120000,
        icon: Key,
        color: 'green'
      },
      {
        id: 2,
        type: 'blockchain_log',
        message: 'Transaction logged to immutable blockchain',
        severity: 'info',
        timestamp: Date.now() - 180000,
        icon: Lock,
        color: 'blue'
      },
      {
        id: 3,
        type: 'compliance_check',
        message: 'Regulatory compliance validation passed',
        severity: 'success',
        timestamp: Date.now() - 240000,
        icon: CheckCircle,
        color: 'green'
      },
      {
        id: 4,
        type: 'threat_detected',
        message: 'Potential anomaly detected and mitigated',
        severity: 'warning',
        timestamp: Date.now() - 300000,
        icon: AlertTriangle,
        color: 'yellow'
      },
      {
        id: 5,
        type: 'encryption_update',
        message: 'Post-quantum cryptography keys rotated',
        severity: 'info',
        timestamp: Date.now() - 360000,
        icon: Shield,
        color: 'purple'
      }
    ];

    setSecurityEvents(events);

    // Generate threat map data
    const generateThreatMap = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        severity: Math.random(),
        type: ['intrusion', 'anomaly', 'compliance', 'fraud'][Math.floor(Math.random() * 4)]
      }));
    };

    setThreatMap(generateThreatMap());

    // Update metrics periodically
    const interval = setInterval(() => {
      setSecurityMetrics(prev => ({
        ...prev,
        zkpVerifications: prev.zkpVerifications + Math.floor(Math.random() * 10 + 5),
        blockchainLogs: prev.blockchainLogs + Math.floor(Math.random() * 5 + 1),
        complianceScore: Math.max(95, Math.min(100, prev.complianceScore + (Math.random() - 0.5) * 2))
      }));

      setThreatMap(generateThreatMap());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSecurityFeatureClick = (feature) => {
    toast({
      title: `🔒 ${feature} Details`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'info': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'error': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Security & Governance</h1>
          <p className="text-gray-400 mt-1">Unbreakable vault with quantum-resistant protection</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Secure</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">{securityMetrics.complianceScore.toFixed(1)}% Compliant</span>
          </div>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          className="metric-card rounded-xl p-6 border-green-500/20 sans-glow cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleSecurityFeatureClick('Zero-Knowledge Proofs')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Key className="w-6 h-6 text-green-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{securityMetrics.zkpVerifications.toLocaleString()}</div>
              <div className="text-xs text-gray-400">ZKP Verifications</div>
            </div>
          </div>
          <div className="text-xs text-green-400">+47 today</div>
        </motion.div>

        <motion.div
          className="metric-card rounded-xl p-6 border-blue-500/20 sans-glow-blue cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleSecurityFeatureClick('Blockchain Logger')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Lock className="w-6 h-6 text-blue-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{securityMetrics.blockchainLogs.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Blockchain Logs</div>
            </div>
          </div>
          <div className="text-xs text-blue-400">Immutable</div>
        </motion.div>

        <motion.div
          className="metric-card rounded-xl p-6 border-purple-500/20 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleSecurityFeatureClick('Post-Quantum Cryptography')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-6 h-6 text-purple-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{securityMetrics.encryptionStrength}-bit</div>
              <div className="text-xs text-gray-400">PQC Encryption</div>
            </div>
          </div>
          <div className="text-xs text-purple-400">Quantum-safe</div>
        </motion.div>

        <motion.div
          className="metric-card rounded-xl p-6 border-yellow-500/20 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleSecurityFeatureClick('Threat Detection')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{securityMetrics.threatLevel}</div>
              <div className="text-xs text-gray-400">Threat Level</div>
            </div>
          </div>
          <div className="text-xs text-yellow-400">Monitoring</div>
        </motion.div>

        <motion.div
          className="metric-card rounded-xl p-6 border-green-500/20 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleSecurityFeatureClick('Compliance Engine')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div className="text-right">
              <div className="text-xl font-bold text-white">{securityMetrics.complianceScore.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Compliance</div>
            </div>
          </div>
          <div className="text-xs text-green-400">Excellent</div>
        </motion.div>
      </div>

      {/* Security Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Map */}
        <motion.div
          className="metric-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-red-400" />
            Real-time Threat Map
          </h3>
          
          <div className="relative h-64 bg-black/50 rounded-lg overflow-hidden">
            <svg className="w-full h-full">
              {threatMap.map((threat) => (
                <circle
                  key={threat.id}
                  cx={`${threat.x}%`}
                  cy={`${threat.y}%`}
                  r={threat.severity * 5 + 2}
                  fill={
                    threat.severity > 0.7 ? '#ef4444' :
                    threat.severity > 0.4 ? '#f59e0b' : '#10b981'
                  }
                  opacity={threat.severity * 0.8 + 0.2}
                  className="animate-pulse"
                />
              ))}
            </svg>
            
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-sm font-medium">Active Monitoring</div>
              <div className="text-xs text-gray-400">{threatMap.length} data points</div>
            </div>
            
            <div className="absolute top-4 right-4 space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-xs text-gray-400">High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-xs text-gray-400">Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-400">Low Risk</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Events */}
        <motion.div
          className="metric-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            Security Events
          </h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
            {securityEvents.map((event) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-lg border ${getSeverityColor(event.severity)}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-4 h-4 mt-0.5 text-${event.color}-400`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{event.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">{event.type.replace('_', ' ')}</span>
                        <span className="text-xs text-gray-500">{formatTime(event.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Security Features now rendered by SecurityArchitecture component */}
      <SecurityArchitecture securityMetrics={securityMetrics} />
    </div>
  );
};

export default Security;
