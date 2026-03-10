import { useState, useEffect } from 'react';
import { Moon, Star, Sun } from 'lucide-react';
import { getProvinces, getPrayerTimes } from './services/api';
import LocationSelector from './components/LocationSelector';
import VakitCard from './components/VakitCard';
import Countdown from './components/Countdown';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [timings, setTimings] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTodayString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayString());

  // Current and Next Vakit Logic
  const [currentVakit, setCurrentVakit] = useState('');
  const [nextVakit, setNextVakit] = useState('');
  const [nextVakitTime, setNextVakitTime] = useState('');

  // Vakits to show
  const vakitList = ['Imsak', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  const vakitTranslations = {
    'Imsak': 'İmsak',
    'Sunrise': 'Güneş',
    'Dhuhr': 'Öğle',
    'Asr': 'İkindi',
    'Maghrib': 'Akşam (İftar)',
    'Isha': 'Yatsı'
  };

  // Initialize theme based on user preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Fetch Provinces on Load
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      const data = await getProvinces();
      setProvinces(data);

      // Try to load saved location
      const savedProvinceName = localStorage.getItem('province');
      const savedDistrictName = localStorage.getItem('district');

      if (savedProvinceName && data.length > 0) {
        const prov = data.find(p => p.name === savedProvinceName);
        if (prov) {
          setSelectedProvince(prov);
          setDistricts(prov.districts);

          if (savedDistrictName) {
            const dist = prov.districts.find(d => d.name === savedDistrictName);
            if (dist) setSelectedDistrict(dist);
          }
        }
      } else {
        // Default to Istanbul
        const istanbul = data.find(p => p.name === 'İstanbul');
        if (istanbul) {
          setSelectedProvince(istanbul);
          setDistricts(istanbul.districts);
          const kadikoy = istanbul.districts.find(d => d.name === 'Kadıköy');
          if (kadikoy) setSelectedDistrict(kadikoy);
        }
      }

      setLoading(false);
    };

    fetchProvinces();
  }, []);

  // Fetch Prayer Times when location changes
  useEffect(() => {
    const fetchTimings = async () => {
      if (selectedProvince && selectedDistrict) {
        setLoading(true);
        // Format date from YYYY-MM-DD to DD-MM-YYYY for the API
        const [year, month, day] = selectedDate.split('-');
        const formattedDate = `${day}-${month}-${year}`;

        const times = await getPrayerTimes(selectedProvince.name, selectedDistrict.name, formattedDate);
        setTimings(times);
        setLoading(false);

        // Save preferences
        localStorage.setItem('province', selectedProvince.name);
        localStorage.setItem('district', selectedDistrict.name);
      }
    };

    fetchTimings();
  }, [selectedProvince, selectedDistrict, selectedDate]);

  const isToday = selectedDate === getTodayString();

  // Calculate Next Vakit
  useEffect(() => {
    if (!timings || !isToday) return;

    const calculateVakit = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeStr = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;

      let foundNext = false;
      let prevVakit = 'Isha'; // default if before imsak

      for (let i = 0; i < vakitList.length; i++) {
        const v = vakitList[i];
        const vTime = timings[v];

        if (currentTimeStr < vTime) {
          setNextVakit(v);
          setNextVakitTime(vTime);
          setCurrentVakit(prevVakit);
          foundNext = true;
          break;
        }
        prevVakit = v;
      }

      // If no vakit is found after current time, next vakit is tomorrow's Imsak
      if (!foundNext) {
        setNextVakit('Imsak');
        setNextVakitTime(timings['Imsak']);
        setCurrentVakit('Isha');
      }
    };

    calculateVakit();

    // Listen to custom event from Countdown
    window.addEventListener('vakit-changed', calculateVakit);

    // Also recalculate every minute
    const interval = setInterval(calculateVakit, 60000);

    return () => {
      window.removeEventListener('vakit-changed', calculateVakit);
      clearInterval(interval);
    };
  }, [timings, isToday]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const nextMode = !prev;
      if (nextMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return nextMode;
    });
  };

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setDistricts(province.districts);
    setSelectedDistrict(null);
    setTimings(null);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTimings(null);
  };

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col items-center">
      {/* Background Decors */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-10 text-ramadan-green-light/30 dark:text-ramadan-green-dark/30 animate-pulse">
          <Star size={120} />
        </div>
        <div className="absolute top-40 right-20 text-ramadan-gold-light/30 dark:text-ramadan-gold-dark/30 animate-pulse delay-700">
          <Moon size={180} />
        </div>
        <div className="absolute bottom-20 left-1/4 text-ramadan-green-light/30 dark:text-ramadan-green-dark/30 animate-pulse delay-1000">
          <Star size={80} />
        </div>
      </div>

      <header className="w-full max-w-5xl flex justify-between items-center mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-ramadan-green-light/20 dark:bg-ramadan-green-light/10 p-3 rounded-xl">
            <Moon size={32} className="text-ramadan-green-dark dark:text-ramadan-green-light" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-ramadan-green-dark to-ramadan-green dark:from-ramadan-green-light dark:to-ramadan-green">
              Ramazan Vakti
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase">
              Diyanet Vakitleri
            </p>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      <main className="w-full max-w-5xl">
        <LocationSelector
          provinces={provinces}
          selectedProvince={selectedProvince}
          onProvinceChange={handleProvinceChange}
          districts={districts}
          selectedDistrict={selectedDistrict}
          onDistrictChange={handleDistrictChange}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          loading={loading}
        />

        {loading && !timings ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-slate-900/50 rounded-2xl animate-pulse">
            <div className="w-16 h-16 border-4 border-ramadan-green-light border-t-ramadan-green rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 dark:text-slate-300 font-medium">Vakitler Yükleniyor...</p>
          </div>
        ) : timings && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Countdown Banner */}
            {isToday && nextVakitTime && (
              <Countdown
                nextVakit={vakitTranslations[nextVakit] || nextVakit}
                targetTime={nextVakitTime}
                isIftar={nextVakit === 'Maghrib'}
              />
            )}

            {!isToday && (
              <div className="bg-ramadan-card-light dark:bg-ramadan-card-dark p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 w-full mb-8 text-center text-slate-600 dark:text-slate-400">
                 Seçilen tarih <strong>{selectedDate.split('-').reverse().join('.')}</strong> için vakitler gösterilmektedir.
              </div>
            )}

            {/* Vakit Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {vakitList.map((vakit) => {
                const isNext = isToday && vakit === nextVakit;
                const isIftar = vakit === 'Maghrib';

                return (
                  <VakitCard
                    key={vakit}
                    vakit={vakit}
                    time={timings[vakit]}
                    isNextVakit={isNext}
                    isIftar={isIftar}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>Veriler Diyanet İşleri Başkanlığı'na uyumlu olarak Aladhan API'den sağlanmaktadır.</p>
      </footer>
    </div>
  );
}

export default App;