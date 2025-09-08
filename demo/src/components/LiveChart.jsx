import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const LiveChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 255, 136, 0.05)');

    // Calculate bounds
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue || 1;

    // Draw area chart
    ctx.beginPath();
    ctx.moveTo(0, height);

    data.forEach((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((point.value - minValue) / range) * height;
      
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((point.value - minValue) / range) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    data.forEach((point, index) => {
      if (index % 5 === 0) { // Only draw every 5th point to avoid clutter
        const x = (index / (data.length - 1)) * width;
        const y = height - ((point.value - minValue) / range) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#00ff88';
        ctx.fill();
      }
    });

  }, [data]);

  return (
    <motion.div
      className="metric-card rounded-xl p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
          Live Performance
        </h3>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>Real-time P&L</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="w-full h-64 rounded-lg"
        />
        
        {/* Overlay stats */}
        <div className="absolute top-4 left-4 space-y-1">
          <div className="text-2xl font-bold text-green-400">
            ${data.length > 0 ? data[data.length - 1].value.toFixed(2) : '0.00'}
          </div>
          <div className="text-sm text-gray-400">Current Value</div>
        </div>
        
        <div className="absolute top-4 right-4 space-y-1 text-right">
          <div className="text-lg font-semibold text-white">
            {data.length > 0 ? (data[data.length - 1].volume / 1000).toFixed(1) : '0'}K
          </div>
          <div className="text-sm text-gray-400">Volume</div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveChart;
