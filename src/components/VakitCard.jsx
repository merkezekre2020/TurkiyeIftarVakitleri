import React from 'react';
import { Sunrise, Sun, Sunset, Moon, CloudMoon, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const getVakitDetails = (vakitName) => {
  switch (vakitName) {
    case 'Imsak':
      return { icon: CloudMoon, label: 'İmsak', color: 'from-blue-600 to-indigo-800' };
    case 'Sunrise':
      return { icon: Sunrise, label: 'Güneş', color: 'from-orange-400 to-amber-600' };
    case 'Dhuhr':
      return { icon: Sun, label: 'Öğle', color: 'from-yellow-400 to-orange-500' };
    case 'Asr':
      return { icon: Clock, label: 'İkindi', color: 'from-orange-500 to-red-500' };
    case 'Maghrib':
      return { icon: Sunset, label: 'Akşam (İftar)', color: 'from-purple-600 to-indigo-700' };
    case 'Isha':
      return { icon: Moon, label: 'Yatsı', color: 'from-indigo-800 to-slate-900' };
    default:
      return { icon: Clock, label: vakitName, color: 'from-gray-500 to-gray-700' };
  }
};

const VakitCard = ({ vakit, time, isNextVakit, isIftar }) => {
  const details = getVakitDetails(vakit);
  const Icon = details.icon;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-500",
        isNextVakit
          ? "transform scale-105 shadow-xl border-2 border-ramadan-green-light dark:border-ramadan-green z-10"
          : "hover:scale-105 shadow-md border border-slate-200 dark:border-slate-800",
        isIftar && isNextVakit ? "border-ramadan-gold-light dark:border-ramadan-gold" : "",
        "bg-white dark:bg-ramadan-card-dark"
      )}
    >
      {/* Background Gradient for current/next vakit */}
      {isNextVakit && (
        <div className={cn(
          "absolute inset-0 opacity-10 dark:opacity-20 bg-gradient-to-br",
          details.color
        )} />
      )}

      {/* Icon */}
      <div className={cn(
        "mb-4 p-4 rounded-full transition-colors duration-300",
        isNextVakit
          ? "bg-ramadan-green-light/20 text-ramadan-green dark:text-ramadan-green-light"
          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
        isIftar && isNextVakit ? "bg-ramadan-gold-light/20 text-ramadan-gold-dark dark:text-ramadan-gold" : ""
      )}>
        <Icon size={32} />
      </div>

      {/* Label */}
      <h3 className={cn(
        "text-lg font-medium mb-1 z-10",
        isNextVakit
          ? "text-ramadan-green-dark dark:text-ramadan-green-light"
          : "text-slate-600 dark:text-slate-400",
        isIftar && isNextVakit ? "text-ramadan-gold-dark dark:text-ramadan-gold-light font-bold" : ""
      )}>
        {details.label}
      </h3>

      {/* Time */}
      <div className={cn(
        "text-3xl font-bold tracking-tight z-10",
        isNextVakit
          ? "text-slate-900 dark:text-white"
          : "text-slate-700 dark:text-slate-300"
      )}>
        {time}
      </div>

      {/* Indicator badge */}
      {isNextVakit && (
        <div className={cn(
          "absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full",
          isIftar
            ? "bg-ramadan-gold text-white"
            : "bg-ramadan-green text-white"
        )}>
          {isIftar ? "İftara Doğru" : "Sıradaki"}
        </div>
      )}
    </div>
  );
};

export default VakitCard;