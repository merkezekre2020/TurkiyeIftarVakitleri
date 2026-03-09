# Ramazan Vakti 🌙

Ramazan Vakti, Türkiye'deki tüm il ve ilçeler için Diyanet İşleri Başkanlığı'na uyumlu namaz vakitlerini gösteren modern bir React web uygulamasıdır.

## Özellikler ✨

- 📍 **Dinamik İl ve İlçe Seçimi:** Türkiye'deki 81 il ve tüm ilçeler için hızlı, birbirine bağlı (cascading) konum seçimi. (Seçtiğiniz konum cihazınızda hatırlanır).
- 🕒 **Namaz Vakitleri:** İmsak, Güneş, Öğle, İkindi, Akşam (İftar) ve Yatsı vakitlerinin özel ikonlar eşliğinde gösterimi.
- ⏳ **Canlı Geri Sayım:** Bir sonraki namaz vaktine ne kadar kaldığını saniye saniye takip edin. İftar (Akşam) vaktine özel altın rengi vurgulama!
- 🌓 **Karanlık/Aydınlık Mod:** Sistem tercihlerinize saygı duyan, istediğiniz zaman geçiş yapabileceğiniz göz yormayan, Ramazan ruhuna uygun yeşil ve altın sarısı tonlarında şık tasarım.
- ⚡ **Hızlı ve Modern:** Vite, React ve Tailwind CSS ile inşa edilmiş performanslı yapı.

## Kullanılan Teknolojiler 🛠️

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Stil:** [Tailwind CSS v4](https://tailwindcss.com/)
- **İkonlar:** [Lucide React](https://lucide.dev/)
- **Tarih Yönetimi:** [date-fns](https://date-fns.org/)
- **HTTP İstemcisi:** [Axios](https://axios-http.com/)

## API Servisleri 🌐

Bu uygulama aşağıdaki ücretsiz ve açık kaynaklı API'leri kullanmaktadır:
- **Konum Verisi:** [Türkiye API](https://turkiyeapi.dev/) (İl ve ilçe listesi için)
- **Namaz Vakitleri:** [Aladhan API](https://aladhan.com/) (Diyanet İşleri Başkanlığı hesaplama metodu `method=13` kullanılarak)

## Kurulum ve Çalıştırma 🚀

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
- Node.js (v18 veya üzeri önerilir)

### Adımlar

1. Depoyu klonlayın:
   ```bash
   git clone <repo-url>
   cd <repo-klasoru>
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Tarayıcınızda uygulamayı görüntüleyin:
   Genellikle `http://localhost:5173` adresinde çalışacaktır.

### Üretime Hazırlama (Build)

Uygulamayı canlı ortama hazırlamak için:
```bash
npm run build
```
Oluşturulan optimize edilmiş dosyalar `dist` klasörü içerisinde yer alacaktır.

---
*Geliştirme aşamasındadır.*
