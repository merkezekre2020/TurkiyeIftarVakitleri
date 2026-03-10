import axios from 'axios';

// Get provinces from Turkiye API
export const getProvinces = async () => {
  try {
    const response = await axios.get('https://turkiyeapi.dev/api/v1/provinces');
    // Map response data to standard format
    return response.data.data.map((province) => ({
      id: province.id,
      name: province.name,
      districts: province.districts.map(district => ({
        id: district.id,
        name: district.name
      }))
    })).sort((a, b) => a.name.localeCompare(b.name, 'tr'));
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

// Get timings by city and district using Aladhan API with method 13 (Diyanet)
export const getPrayerTimes = async (province, district, dateStr = null) => {
  try {
    // Determine the address to send. The API works well with standard city names
    // District + Province usually gives the best result
    const address = `${district}, ${province}, Turkey`;

    // Aladhan API accepts DD-MM-YYYY format for the date parameter
    const endpoint = dateStr
      ? `https://api.aladhan.com/v1/timingsByAddress/${dateStr}`
      : 'https://api.aladhan.com/v1/timingsByAddress';

    const response = await axios.get(endpoint, {
      params: {
        address: address,
        method: 13, // Diyanet İşleri Başkanlığı
        school: 1 // Hanafi (Default in Turkey)
      }
    });

    if (response.data && response.data.data) {
      return response.data.data.timings;
    }

    return null;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
};
