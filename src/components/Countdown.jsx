import React, { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { Moon, Sun } from 'lucide-react';
import { cn } from './VakitCard';

const Countdown = ({ nextVakit, targetTime, isIftar }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!targetTime) return;

    // Calculate immediately
    const calculateTimeLeft = () => {
      const now = new Date();

      // Parse target time (HH:MM)
      const [hours, minutes] = targetTime.split(':').map(Number);

      let targetDate = new Date();
      targetDate.setHours(hours, minutes, 0, 0);

      // If target time is earlier today, it means it's for tomorrow
      // E.g. currently 22:00, next vakit is Imsak at 05:00
      if (targetDate < now) {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      const diffInSeconds = differenceInSeconds(targetDate, now);

      if (diffInSeconds <= 0) {
        return { h: 0, m: 0, s: 0, total: 0 };
      }

      const h = Math.floor(diffInSeconds / 3600);
      const m = Math.floor((diffInSeconds % 3600) / 60);
      const s = diffInSeconds % 60;

      return { h, m, s, total: diffInSeconds };
    };

    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      // Stop or trigger refresh if time is up
      if (remaining && remaining.total <= 0) {
        clearInterval(interval);
        // Dispatch an event to parent to refresh times/next vakit
        window.dispatchEvent(new Event('vakit-changed'));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, nextVakit]);

  if (!timeLeft || !nextVakit) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-ramadan-card-light dark:bg-ramadan-card-dark rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 animate-pulse h-48">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="h-16 w-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
    );
  }

  // Format to 2 digits
  const pad = (num) => String(num).padStart(2, '0');

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 mb-8 transition-colors duration-300 relative overflow-hidden",
      isIftar
        ? "bg-gradient-to-br from-ramadan-gold-light/20 to-ramadan-gold/10 border-ramadan-gold-light"
        : "bg-ramadan-card-light dark:bg-ramadan-card-dark border-ramadan-green-light"
    )}>

      {/* Background Decor */}
      <div className="absolute -right-10 -top-10 opacity-10 dark:opacity-5">
        {isIftar ? <Moon size={160} /> : <Sun size={160} />}
      </div>

      <div className="z-10 flex flex-col items-center">
        <h2 className={cn(
          "text-xl font-medium mb-4 flex items-center gap-2",
          isIftar ? "text-ramadan-gold-dark dark:text-ramadan-gold" : "text-ramadan-green-dark dark:text-ramadan-green-light"
        )}>
          {isIftar ? (
            <><Moon size={24} /> İftar Vaktine Kalan Süre</>
          ) : (
            <>Sıradaki Vakit: {nextVakit}</>
          )}
        </h2>

        <div className="flex items-center gap-2 sm:gap-4">
          <TimeBox value={pad(timeLeft.h)} label="Saat" isIftar={isIftar} />
          <span className="text-4xl font-bold text-slate-400 pb-6">:</span>
          <TimeBox value={pad(timeLeft.m)} label="Dakika" isIftar={isIftar} />
          <span className="text-4xl font-bold text-slate-400 pb-6">:</span>
          <TimeBox value={pad(timeLeft.s)} label="Saniye" isIftar={isIftar} />
        </div>
      </div>
    </div>
  );
};

const TimeBox = ({ value, label, isIftar }) => (
  <div className="flex flex-col items-center">
    <div className={cn(
      "w-16 h-20 sm:w-20 sm:h-24 rounded-xl flex items-center justify-center text-3xl sm:text-5xl font-bold shadow-inner",
      isIftar
        ? "bg-white dark:bg-slate-800 text-ramadan-gold-dark dark:text-ramadan-gold border-2 border-ramadan-gold-light/50"
        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-slate-100 dark:border-slate-700"
    )}>
      {value}
    </div>
    <span className="mt-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

export default Countdown;