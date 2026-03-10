import React from 'react';
import { MapPin, Navigation, Calendar } from 'lucide-react';

const LocationSelector = ({
  provinces,
  selectedProvince,
  onProvinceChange,
  districts,
  selectedDistrict,
  onDistrictChange,
  selectedDate,
  onDateChange,
  loading
}) => {
  return (
    <div className="bg-ramadan-card-light dark:bg-ramadan-card-dark p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 w-full mb-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Date Select */}
        <div className="flex-1 space-y-2">
          <label
            htmlFor="date-select"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 ml-1"
          >
            <Calendar size={16} className="text-ramadan-green dark:text-ramadan-green-light" />
            Tarih
          </label>
          <div className="relative">
            <input
              type="date"
              id="date-select"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              disabled={loading}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ramadan-green-light dark:focus:ring-ramadan-green disabled:opacity-50 transition-colors"
            />
          </div>
        </div>

        {/* Province Select */}
        <div className="flex-1 space-y-2">
          <label
            htmlFor="province-select"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 ml-1"
          >
            <MapPin size={16} className="text-ramadan-green dark:text-ramadan-green-light" />
            İl Seçiniz
          </label>
          <div className="relative">
            <select
              id="province-select"
              value={selectedProvince?.name || ''}
              onChange={(e) => {
                const prov = provinces.find(p => p.name === e.target.value);
                onProvinceChange(prov);
              }}
              disabled={loading || provinces.length === 0}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-ramadan-green-light dark:focus:ring-ramadan-green disabled:opacity-50 transition-colors"
            >
              <option value="" disabled>İl Seçiniz...</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* District Select */}
        <div className="flex-1 space-y-2">
          <label
            htmlFor="district-select"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 ml-1"
          >
            <Navigation size={16} className="text-ramadan-green dark:text-ramadan-green-light" />
            İlçe Seçiniz
          </label>
          <div className="relative">
            <select
              id="district-select"
              value={selectedDistrict?.name || ''}
              onChange={(e) => {
                const dist = districts.find(d => d.name === e.target.value);
                onDistrictChange(dist);
              }}
              disabled={loading || !selectedProvince || districts.length === 0}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-ramadan-green-light dark:focus:ring-ramadan-green disabled:opacity-50 transition-colors"
            >
              <option value="" disabled>
                {!selectedProvince ? 'Önce il seçiniz' : 'İlçe Seçiniz...'}
              </option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LocationSelector;