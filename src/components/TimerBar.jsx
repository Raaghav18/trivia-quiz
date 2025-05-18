import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TimerBar = ({ duration = 15, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [duration, onTimeout]);

  const getTimerColor = () => {
    if (timeLeft > 10) return 'bg-emerald-500';
    if (timeLeft > 5) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <span className="text-sm font-medium text-gray-600">Time Remaining</span>
        <span className={`font-bold text-lg
          ${timeLeft > 10 ? 'text-emerald-500' : timeLeft > 5 ? 'text-warning' : 'text-danger'}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getTimerColor()}`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration, ease: "linear" }}
          onAnimationComplete={() => setIsRunning(false)}
        />
      </div>
    </div>
  );
};

export default TimerBar; 