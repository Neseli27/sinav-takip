import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const DEFAULT_CURRICULUM = {
  LGS: {
    "Türkçe": {
      "Fiilimsiler": ["İsim-Fiil","Sıfat-Fiil","Zarf-Fiil"],
      "Cümlenin Ögeleri": ["Özne","Yüklem","Nesne","Dolaylı Tümleç","Zarf Tümleci"],
      "Cümle Türleri": ["İsim ve Fiil Cümlesi","Kurallı ve Devrik Cümle","Basit Cümle","Birleşik Cümle","Sıralı ve Bağlı Cümle"],
      "Sözcükte Anlam": ["Gerçek-Mecaz Anlam","Sözcükler Arası İlişkiler","Deyim ve Atasözleri"],
      "Cümlede Anlam": ["Cümle Yorumlama","Cümlede Anlam İlişkileri"],
      "Söz Sanatları": ["Benzetme","Kişileştirme","Abartma","Konuşturma","Karşıtlık"],
      "Metin Türleri": ["Hikâye","Roman","Masal-Fabl","Destan","Deneme-Makale","Biyografi-Günlük"],
      "Yazım Kuralları": [],
      "Noktalama İşaretleri": [],
      "Paragraf": ["Konu-Ana Düşünce","Yardımcı Düşünce","Paragraf Yapısı","Paragraf Tamamlama"],
      "Fiillerde Çatı": ["Etken-Edilgen","Dönüşlü-İşteş"],
      "Anlatım Bozuklukları": [],
      "Sözel Mantık": []
    },
    "Matematik": {
      "Çarpanlar ve Katlar": ["Asal Çarpanlara Ayırma","EBOB-EKOK"],
      "Üslü İfadeler": ["Üslü İfade Kuralları","Üslü İfadelerle İşlemler"],
      "Kareköklü İfadeler": ["Karekök Kavramı","Kareköklü İfadelerle İşlemler"],
      "Veri Analizi": ["Grafikler","Ortalama-Ortanca"],
      "Olasılık": ["Basit Olayların Olasılığı"],
      "Cebirsel İfadeler": ["Cebirsel İfade Kavramı","Çarpanlara Ayırma","Özdeşlikler"],
      "Doğrusal Denklemler": ["Birinci Dereceden Denklemler","Doğrusal Denklem Grafikleri"],
      "Eşitsizlikler": ["Birinci Dereceden Eşitsizlikler"],
      "Üçgenler": ["Kenar-Açı Bağıntıları","Alan Hesabı"],
      "Eşlik ve Benzerlik": ["Eş Üçgenler","Benzer Üçgenler"],
      "Dönüşüm Geometrisi": ["Yansıma","Öteleme","Döndürme"],
      "Geometrik Cisimler": ["Prizmalar","Piramitler","Silindir-Koni-Küre"]
    },
    "Fen Bilimleri": {
      "Mevsimler ve İklim": ["Mevsimlerin Oluşumu","İklim ve Hava Hareketleri"],
      "DNA ve Genetik Kod": ["DNA Yapısı","Genetik Kod","Kalıtım","Mutasyon ve Modifikasyon","Adaptasyon","Biyoteknoloji"],
      "Basınç": ["Katı Basıncı","Sıvı Basıncı","Gaz Basıncı","Açık Hava Basıncı"],
      "Madde ve Endüstri": ["Periyodik Sistem","Fiziksel ve Kimyasal Değişimler","Kimyasal Tepkimeler","Asitler ve Bazlar"],
      "Basit Makineler": ["Kaldıraçlar","Makara","Eğik Düzlem"],
      "Enerji Dönüşümleri": ["Enerji Türleri","Enerji Korunumu"],
      "Elektrik Yükleri ve Devreleri": ["Elektriklenme","Elektrik Devreleri","Elektrik Enerjisi"],
      "Besin Zinciri ve Enerji Akışı": ["Besin Zinciri","Madde Döngüleri","Sürdürülebilir Yaşam"]
    },
    "İnkılap Tarihi": {
      "Bir Kahraman Doğuyor": ["Atatürk'ün Çocukluğu","Askeri Başarıları"],
      "Ya İstiklal Ya Ölüm!": ["Mondros Ateşkesi","İşgaller","Cemiyetler","Kongreler","TBMM'nin Açılması"],
      "Milli Mücadele Cepheleri": ["Doğu Cephesi","Güney Cephesi","Batı Cephesi","Sakarya","Büyük Taarruz"],
      "Çağdaşlaşma İnkılapları": ["Siyasi İnkılaplar","Toplumsal İnkılaplar","Eğitim İnkılapları","Ekonomi İnkılapları"],
      "Atatürk İlkeleri": ["Cumhuriyetçilik","Milliyetçilik","Halkçılık","Devletçilik","Laiklik","İnkılapçılık"],
      "Dış Politika": ["Montrö","Hatay Meselesi","Balkan-Sadabat Paktları"],
      "Demokratikleşme Çabaları": [],
      "Atatürk'ün Ölümü": []
    },
    "Din Kültürü": {
      "Kader İnancı": ["Kader ve Kaza","İrade ve Sorumluluk"],
      "Zekât ve Sadaka": ["Zekâtın Önemi","Yardımlaşma"],
      "Hz. Muhammed'in Örnekliği": ["Veda Hutbesi","Evrensel Mesajlar"],
      "Peygamber Kıssaları": ["Hz. Musa","Hz. Şuayb"],
      "Din ve Hayat": ["Din-Bilim İlişkisi","Din ve Sanat"]
    },
    "İngilizce": {
      "Friendship": ["Accepting-Refusing","Making Excuses"],
      "Teen Life": ["Likes-Dislikes","Daily Routines"],
      "Cooking": ["Food Vocabulary","Recipes-Imperatives"],
      "Communication": ["Phone Conversations","Internet Terms"],
      "The Internet": ["Online Activities","Digital Literacy"],
      "Adventures": ["Past Tense","Travel Vocabulary"],
      "Tourism": ["Holiday Plans","Comparatives-Superlatives"],
      "Chores": ["Household Tasks","Responsibilities"],
      "Science": ["Scientific Terms","Inventions"],
      "Natural Forces": ["Natural Disasters","Weather Events"]
    }
  },
  TYT: {
    "Türkçe": {
      "Sözcükte Anlam": ["Gerçek Anlam","Mecaz Anlam","Sözcükler Arası Anlam İlişkileri","Söz Sanatları"],
      "Cümlede Anlam": ["Cümle Yorumlama","Cümlede Anlam İlişkileri","Atasözleri ve Deyimler"],
      "Paragraf": ["Paragrafta Konu-Ana Düşünce","Paragrafta Yardımcı Düşünce","Paragraf Tamamlama","Paragraf Oluşturma"],
      "Ses Bilgisi": [],
      "Yapı Bilgisi": ["Yapım Ekleri","Çekim Ekleri","Sözcük Türetme"],
      "Sözcük Türleri": ["İsim","Sıfat","Zamir","Zarf","Edat-Bağlaç-Ünlem","Fiil"],
      "Cümle Bilgisi": ["Cümlenin Ögeleri","Cümle Türleri","Anlatım Bozuklukları"],
      "Yazım Kuralları": ["Büyük Harfler","Sayıların Yazılışı","Birleşik Sözcükler"],
      "Noktalama İşaretleri": []
    },
    "Matematik": {
      "Temel Kavramlar": ["Sayı Basamakları","Bölme-Bölünebilme","EBOB-EKOK","Faktöriyel"],
      "Sayılar": ["Doğal Sayılar","Tam Sayılar","Rasyonel Sayılar","Ondalık Sayılar","Üslü Sayılar","Köklü Sayılar"],
      "Oran-Orantı": ["Doğru Orantı","Ters Orantı","Bileşik Orantı"],
      "Problemler": ["Sayı Problemleri","Kesir Problemleri","Yaş Problemleri","İşçi-Havuz","Yüzde","Kar-Zarar","Hız","Karışım"],
      "Kümeler": ["Küme Kavramı","Alt Küme","Kümelerde İşlemler","Venn Şemaları"],
      "Fonksiyonlar": ["Fonksiyon Kavramı","Fonksiyon Türleri","Bileşke","Ters Fonksiyon"],
      "Denklemler": ["1. Dereceden Denklemler","Eşitsizlikler","Mutlak Değer"],
      "Polinomlar": ["Polinom Kavramı","Polinomda İşlemler"],
      "2. Dereceden Denklemler": ["Diskriminant","Köklerin Toplamı ve Çarpımı","Parabol"],
      "Mantık": ["Önermeler","Bileşik Önermeler"],
      "Olasılık": ["Olasılık Kavramı","Koşullu Olasılık"],
      "İstatistik": ["Aritmetik Ortalama","Medyan-Mod","Standart Sapma"],
      "Sayma": ["Permütasyon","Kombinasyon"]
    },
    "Geometri": {
      "Temel Kavramlar": ["Nokta-Doğru-Düzlem","Açı Türleri","Komşu-Tümler-Bütünler Açılar"],
      "Üçgenler": ["Üçgenin Açı Özellikleri","Üçgende Kenar-Açı Bağıntıları","Dik Üçgen","Pisagor Bağıntısı","İkizkenar ve Eşkenar Üçgen","Özel Üçgenler"],
      "Üçgende Benzerlik": ["Benzerlik Teoremleri","Açı-Açı Benzerliği","Kenar Oranları"],
      "Üçgende Alan": ["Alan Formülleri","Üçgende Yükseklik","Açıortay-Kenarortay"],
      "Çokgenler": ["Çokgenlerin Özellikleri","İç ve Dış Açılar","Düzgün Çokgenler"],
      "Dörtgenler": ["Paralelkenar","Dikdörtgen","Kare","Eşkenar Dörtgen","Yamuk","Deltoid"],
      "Çember ve Daire": ["Çemberde Açılar","Teğet-Kiriş İlişkileri","Çevreye Dair Açılar","Dairede Alan"],
      "Koordinat Geometrisi": ["Noktanın Analitiği","İki Nokta Arası Uzaklık","Orta Nokta"],
      "Dönüşüm Geometrisi": ["Öteleme","Yansıma","Döndürme"],
      "Katı Cisimler": ["Prizmalar","Piramitler","Silindir","Koni","Küre"]
    },
    "Fizik": {
      "Fizik Bilimine Giriş": ["Fiziksel Niceliklerin Ölçülmesi","Madde ve Özellikleri"],
      "Kuvvet ve Hareket": ["Kuvvet","Newton Hareket Yasaları","Sürtünme Kuvveti"],
      "Enerji": ["İş-Güç-Enerji","Kinetik ve Potansiyel Enerji","Enerji Korunumu"],
      "Isı ve Sıcaklık": ["Isı-Sıcaklık Farkı","Isı Hesaplamaları","Hal Değişimi"],
      "Basınç": ["Katı Basıncı","Sıvı Basıncı","Gaz Basıncı","Açık Hava Basıncı"],
      "Elektrostatik": ["Elektrik Yükleri","Coulomb Yasası"],
      "Elektrik Akımı": ["Akım-Gerilim-Direnç","Ohm Yasası","Devre Elemanları"],
      "Manyetizma": ["Mıknatıs","Elektromanyetik Alan"],
      "Dalgalar": ["Dalga Kavramı","Ses Dalgaları"],
      "Optik": ["Işığın Yansıması","Işığın Kırılması","Aynalar","Mercekler"]
    },
    "Kimya": {
      "Kimya Bilimi": ["Simya'dan Kimya'ya","Kimyanın Uğraş Alanları"],
      "Atom ve Periyodik Tablo": ["Atom Modelleri","Elektron Dizilimi","Periyodik Tablo"],
      "Kimyasal Türler Arası Etkileşimler": ["Güçlü Etkileşimler","Zayıf Etkileşimler"],
      "Maddenin Halleri": ["Katı-Sıvı-Gaz","Hal Değişimleri"],
      "Doğa ve Kimya": ["Su ve Hayat","Hava ve Kimya"],
      "Karışımlar": ["Homojen Karışımlar","Heterojen Karışımlar","Ayırma Yöntemleri"],
      "Asitler ve Bazlar": ["Asit-Baz Kavramı","pH"],
      "Kimya Her Yerde": ["Temizlik Maddeleri","Polimerler","Boya ve İlaçlar"]
    },
    "Biyoloji": {
      "Canlıların Ortak Özellikleri": [],
      "Hücre": ["Hücre Yapısı","Hücre Organelleri","Hücre Zarından Madde Geçişi"],
      "Canlıların Sınıflandırılması": ["Sınıflandırma Sistemleri","Alemler"],
      "Mitoz ve Eşeysiz Üreme": ["Mitoz Bölünme","Eşeysiz Üreme Türleri"],
      "Mayoz ve Eşeyli Üreme": ["Mayoz Bölünme","Eşeyli Üreme"],
      "Kalıtımın Temel İlkeleri": ["Mendel İlkeleri","Genotip-Fenotip"],
      "Ekosistem Ekolojisi": ["Ekosistem Bileşenleri","Besin Zinciri","Madde Döngüleri"],
      "Çevre Sorunları": ["Kirlilik Türleri","Biyolojik Çeşitlilik"]
    },
    "Tarih": {
      "Tarih Bilimine Giriş": ["Yöntemleri","Zaman ve Takvim"],
      "İlk Çağ Uygarlıkları": ["Mezopotamya","Mısır","Anadolu","Çin ve Hint"],
      "İlk Türk Devletleri": ["Hunlar","Göktürkler","Uygurlar"],
      "İslam Medeniyeti": ["Hz. Muhammed Dönemi","Dört Halife Dönemi"],
      "Türk-İslam Devletleri": ["Karahanlılar","Gazneliler","Büyük Selçuklular"],
      "Osmanlı Kuruluş-Yükselme": ["Kuruluş Dönemi","Yükselme Dönemi"],
      "Osmanlı Duraklama-Gerileme": ["Duraklama","Gerileme"],
      "Osmanlı Son Dönem": ["Tanzimat","I. Meşrutiyet","II. Meşrutiyet"],
      "Kurtuluş Savaşı": ["Mondros-Sevr","Kongreler","TBMM","Savaşlar"],
      "Atatürk İlke ve İnkılapları": ["İlkeler","İnkılaplar"]
    },
    "Coğrafya": {
      "Doğa ve İnsan": ["Coğrafi Konum","Harita Bilgisi"],
      "Dünya'nın Hareketleri": ["Dünya'nın Şekli","Hareketleri"],
      "İklim Bilgisi": ["Sıcaklık","Basınç ve Rüzgarlar","Nem ve Yağış","İklim Tipleri"],
      "Yerin Şekillenmesi": ["İç Kuvvetler","Dış Kuvvetler"],
      "Nüfus": ["Nüfus Sayımları","Piramitleri","Göç"],
      "Türkiye Coğrafyası": ["Yer Şekilleri","İklim","Akarsular-Göller"],
      "Doğal Afetler": ["Deprem","Sel","Heyelan"]
    },
    "Felsefe": {
      "Felsefenin Konusu": ["Tanımı","İşlevi"],
      "Bilgi Felsefesi": ["Bilginin Kaynağı","Bilgi Türleri"],
      "Varlık Felsefesi": ["Varlığın Mahiyeti","Türleri"],
      "Ahlak Felsefesi": ["Ahlak ve Etik","Ahlak Akımları"],
      "Din Felsefesi": ["Tanrı Kavramı","İnanç Türleri"]
    },
    "Din Kültürü": {
      "İslam ve Bilim": [],
      "Hz. Muhammed'in Hayatı": ["Mekke Dönemi","Medine Dönemi"],
      "Kur'an ve Yorumu": ["Tefsir","Meal"],
      "İbadetler": ["Namaz","Oruç","Hac","Zekat"],
      "Ahlak ve Değerler": []
    }
  },
  AYT: {
    "Matematik": {
      "Trigonometri": ["Trig. Fonksiyonlar","Trig. Denklemler","Toplam-Fark Formülleri"],
      "Logaritma": ["Logaritma Kavramı","Özellikleri","Logaritmik Denklemler"],
      "Diziler": ["Aritmetik Dizi","Geometrik Dizi","Dizi Problemleri"],
      "Limit ve Süreklilik": ["Limit Kavramı","Belirsizlik","Süreklilik"],
      "Türev": ["Türev Kavramı","Türev Kuralları","Uygulamaları","Maksimum-Minimum"],
      "İntegral": ["Belirsiz İntegral","Belirli İntegral","Alan Hesaplama"],
      "Karmaşık Sayılar": ["Kavramı","İşlemler"],
      "Matris ve Determinant": ["Matris İşlemleri","Determinant","Cramer Kuralı"],
      "Özel Tanımlı Fonksiyonlar": ["Tam Değer","İşaret Fonksiyonu","Parçalı Fonksiyon"],
      "Kombinatorik": ["İleri Kombinasyon","Binom Açılımı"]
    },
    "Geometri": {
      "Üçgenler (İleri)": ["Açı-Kenar Bağıntıları","Üçgende Alan İleri","Açıortay Teoremleri","Kenarortay Teoremleri","Stewart Teoremi"],
      "Üçgende Eşlik ve Benzerlik": ["Eşlik Teoremleri","Benzerlik İleri","Oran-Orantı Uygulamaları"],
      "Çokgenler ve Dörtgenler": ["Dörtgen Özellikleri İleri","Yamuk Alan","Çokgenlerde Alan"],
      "Çember ve Daire (İleri)": ["Teğet-Kiriş İlişkileri","Çevrel Açı Teoremleri","Çemberde Uzunluk ve Alan","Ortak Teğet-Kiriş"],
      "Analitik Geometri": ["Noktanın Analitiği","Doğrunun Analitiği","Doğru Denklemleri","Nokta-Doğru Uzaklığı","İki Doğrunun Konumu"],
      "Çemberin Analitiği": ["Çember Denklemi","Doğru-Çember İlişkisi","Teğet Doğru Denklemi"],
      "Konikler": ["Parabol","Elips","Hiperbol"],
      "Dönüşüm Geometrisi": ["Öteleme","Yansıma","Döndürme"],
      "Katı Cisimler": ["Dikdörtgenler Prizması","Küp","Silindir","Piramit","Koni","Küre"],
      "Trigonometri ile Geometri": ["Sinüs-Kosinüs Teoremleri","Trigonometrik Oranlarla Alan"]
    },
    "Fizik": {
      "Vektörler": ["Vektör Kavramı","Vektörel İşlemler"],
      "Kuvvet Dengesi": ["Moment","Basit Makineler","Denge Koşulları"],
      "Düzgün Çembersel Hareket": ["Merkezcil Kuvvet","Açısal Hız"],
      "İş-Güç-Enerji": ["İş-Enerji Teoremi","Güç","Enerji Korunumu"],
      "İtme ve Momentum": ["İtme-Momentum","Çarpışmalar"],
      "Elektrik Alan": ["Elektrik Alan Kavramı","Potansiyel"],
      "Manyetik Alan": ["Telden Manyetik Alan","Manyetik Kuvvet"],
      "Elektromanyetik İndüksiyon": ["Faraday Yasası","Lenz Yasası","Alternatif Akım"],
      "Modern Fizik": ["Fotoelektrik Olay","Compton","De Broglie","Atom Modelleri"],
      "Dalgalar ve Işık": ["Dalga Mekaniği","Kırınım-Girişim"],
      "Çekirdek Fiziği": ["Radyoaktivite","Fisyon-Füzyon","Kütle Açığı"]
    },
    "Kimya": {
      "Atom Kimyası": ["Atom Modelleri","Kuantum Sayıları","Periyodik Özellikler"],
      "Kimyasal Hesaplamalar": ["Mol Kavramı","Tepkime Denklemleri"],
      "Gazlar": ["Gaz Yasaları","İdeal Gaz Denklemi"],
      "Sıvı Çözeltiler": ["Çözünürlük","Derişim","Koligatif Özellikler"],
      "Tepkimelerde Enerji": ["Entalpi","Hess Yasası"],
      "Tepkime Hızları": ["Hız İfadesi","Etkileyen Faktörler"],
      "Kimyasal Denge": ["Denge Sabiti","Le Chatelier İlkesi"],
      "Asit-Baz Dengesi": ["Kuvvetli-Zayıf Asitler","pH Hesaplamaları","Tampon"],
      "Çözünürlük Dengesi": ["Çözünürlük Çarpımı"],
      "Elektrokimya": ["Pil","Elektroliz"],
      "Organik Kimya": ["Hidrokarbonlar","Fonksiyonel Gruplar","Organik Tepkimeler"]
    },
    "Biyoloji": {
      "Nükleik Asitler": ["DNA","RNA","Replikasyon"],
      "Protein Sentezi": ["Transkripsiyon","Translasyon"],
      "Enerji Dönüşümleri": ["Fotosentez","Kemosentez","Hücresel Solunum","Fermantasyon"],
      "Bitki Biyolojisi": ["Taşıma","Büyüme ve Gelişme"],
      "Canlılarda Üreme": ["Bitkilerde","Hayvanlarda","İnsanda Üreme"],
      "Genetik Mühendisliği": ["Gen Klonlama","GDO","Biyoteknoloji"],
      "İnsan Fizyolojisi": ["Sindirim","Dolaşım","Solunum","Boşaltım","Sinir","Endokrin","Destek-Hareket"],
      "Hayvan Davranışları": ["Doğuştan","Öğrenilmiş"],
      "Komünite ve Popülasyon": ["Popülasyon Dinamikleri","Komünite Ekolojisi"]
    },
    "Türk Dili ve Edebiyatı": {
      "Güzel Sanatlar ve Edebiyat": [],
      "Şiir": ["Şiir Türleri","Şiir Bilgisi","Edebi Akımlar"],
      "Olay Çevresinde Metinler": ["Roman-Hikaye","Tiyatro"],
      "Öğretici Metinler": ["Deneme","Makale","Fıkra","Eleştiri","Gezi Yazısı","Biyografi"],
      "Divan Edebiyatı": ["Nazım Biçimleri","Temsilciler"],
      "Halk Edebiyatı": ["Anonim","Aşık","Tekke"],
      "Tanzimat Edebiyatı": ["I. Dönem","II. Dönem"],
      "Servetifünun": [],
      "Milli Edebiyat": [],
      "Cumhuriyet Dönemi": ["Garip Akımı","İkinci Yeni","Toplumcu Gerçekçiler"]
    },
    "Tarih": {
      "Beylikten Devlete Osmanlı": ["Kuruluş","Balkanlarda Fetihler"],
      "Dünya Gücü Osmanlı": ["Fatih","Kanuni","Sokullu"],
      "Osmanlı Kültür-Medeniyeti": ["Yönetim","Toplum","Ekonomi"],
      "Arayış Yılları (XVII. yy)": [],
      "Avrupa ve Osmanlı (XVIII. yy)": ["Lale Devri","Islahatlar"],
      "En Uzun Yüzyıl (XIX. yy)": ["Tanzimat","Islahat Fermanı","Meşrutiyet"],
      "XX. yy Başları": ["Trablusgarp","Balkan Savaşları","I. Dünya Savaşı"],
      "Milli Mücadele": ["Kuva-yi Milliye","TBMM","Cepheler"],
      "Atatürkçülük": ["İlkeler","Bütünleyici İlkeler"],
      "Cumhuriyet (1923-Günümüz)": ["Tek Parti","Çok Partili Hayat","Planlı Kalkınma"]
    },
    "Coğrafya": {
      "Doğal Sistemler": ["Jeomorfoloji","Hidrografya","Toprak"],
      "Beşeri Sistemler": ["Nüfus Politikaları","Yerleşme Tipleri"],
      "Mekansal Sentez: Türkiye": ["Tarım","Sanayi","Ulaşım","Ticaret"],
      "Küresel Ortam": ["Bölgeler ve Ülkeler","Küreselleşme"],
      "Çevre ve Toplum": ["Doğal Kaynaklar","Çevre Sorunları","Sürdürülebilir Kalkınma"]
    },
    "Felsefe Grubu": {
      "Bilim Felsefesi": ["Bilimsel Yöntem","Paradigma"],
      "Siyaset Felsefesi": ["Devlet Kavramı","İdeal Devlet"],
      "Sanat Felsefesi": ["Estetik","Sanat Kuramları"],
      "Psikoloji": ["Giriş","Gelişim","Öğrenme"],
      "Sosyoloji": ["Toplumsal Yapı","Değişme","Kurumlar"],
      "Mantık": ["Klasik Mantık","Modern Mantık"]
    }
  }
};

function getExamDates(){
  const now=new Date();const y=now.getFullYear();
  // Tahmini tarihler: LGS Haziran 2. cumartesi, TYT Haziran 3. cumartesi, AYT ertesi pazar
  // 2026 kesin: LGS 13 Haz, TYT 20 Haz, AYT 21 Haz
  const knownDates={
    2026:{LGS:new Date(2026,5,13,9,30),TYT:new Date(2026,5,20,10,15),AYT:new Date(2026,5,21,10,15)}
  };
  function estimateYear(yr){
    // Tahmini: LGS Haziran 2. hafta cumartesi, TYT 3. hafta cumartesi, AYT ertesi gün
    const junFirst=new Date(yr,5,1);const dayOfWeek=junFirst.getDay();
    const firstSat=(6-dayOfWeek+7)%7+1;
    const lgsSat=firstSat+7; // 2. cumartesi
    const tytSat=firstSat+14; // 3. cumartesi
    return{
      LGS:new Date(yr,5,lgsSat,9,30),
      TYT:new Date(yr,5,tytSat,10,15),
      AYT:new Date(yr,5,tytSat+1,10,15)
    };
  }
  // Önce bilinen tarihlere bak
  if(knownDates[y]&&now<knownDates[y].AYT) return knownDates[y];
  if(knownDates[y+1]) return knownDates[y+1];
  // Tahmini hesapla
  const thisYear=knownDates[y]||estimateYear(y);
  if(now<thisYear.AYT) return thisYear;
  return estimateYear(y+1);
}
function getExamInfo(dates){
  const opts={day:"numeric",month:"long",year:"numeric",weekday:"long"};
  const fmt=(d,t)=>{try{return d.toLocaleDateString("tr-TR",opts)+" • "+t;}catch{return"";}};
  return{LGS:fmt(dates.LGS,"09:30"),TYT:fmt(dates.TYT,"10:15"),AYT:fmt(dates.AYT,"10:15")};
}
const EXAM_DATES=getExamDates();
const EXAM_INFO=getExamInfo(EXAM_DATES);
const EXAM_COLORS={LGS:"#39ff14",TYT:"#00f0ff",AYT:"#ff2d75"};
const STORAGE_KEY="yks_progress_v6";const CURRICULUM_KEY="yks_curriculum_v6";
const C={bg:"#0a0a12",surface:"#12121e",surfaceAlt:"#161628",border:"#1e1e35",neonCyan:"#00f0ff",neonPink:"#ff2d75",neonGreen:"#39ff14",neonYellow:"#ffe600",neonPurple:"#b44dff",text:"#e0e0e8",textDim:"#6b6b80",completed:"#ff2d55",completedBg:"rgba(255,45,85,0.08)",danger:"#ff3b30"};
const SUBJECT_COLORS={"Türkçe":"#00f0ff","Matematik":"#ff2d75","Geometri":"#ff6b9d","Fizik":"#b44dff","Kimya":"#39ff14","Biyoloji":"#ff8c00","Tarih":"#ffe600","Coğrafya":"#00bcd4","Felsefe":"#e040fb","Din Kültürü":"#7c4dff","Türk Dili ve Edebiyatı":"#00f0ff","Felsefe Grubu":"#e040fb","Fen Bilimleri":"#39ff14","İnkılap Tarihi":"#ffe600","İngilizce":"#ff6b6b"};
const NEON_PALETTE=["#00f0ff","#ff2d75","#39ff14","#ffe600","#b44dff","#ff8c00","#00bcd4","#e040fb","#7c4dff","#ff6b6b"];

function getAllTopics(c,e,s){const d=c[e]?.[s];if(!d)return[];const t=[];Object.entries(d).forEach(([k,v])=>{t.push(k);if(Array.isArray(v))v.forEach(x=>t.push(`${k}::${x}`));});return t;}
function gk(e,s,p){return`${e}|${s}|${p}`;}
function daysUntil(t){return Math.max(0,Math.ceil((t-new Date())/864e5));}

function NeonInput({value,onChange,onSubmit,placeholder,color=C.neonCyan,autoFocus=false}){
  const ref=useRef(null);useEffect(()=>{if(autoFocus&&ref.current)ref.current.focus();},[autoFocus]);
  return(<div style={{display:"flex",gap:6}}><input ref={ref} value={value} onChange={e=>onChange(e.target.value)} onKeyDown={e=>e.key==="Enter"&&value.trim()&&onSubmit()} placeholder={placeholder} style={{flex:1,padding:"10px 12px",fontSize:13,fontFamily:"inherit",background:`${color}08`,border:`1.5px solid ${color}40`,borderRadius:8,color:C.text,outline:"none"}}/><button onClick={()=>value.trim()&&onSubmit()} style={{padding:"0 16px",background:`${color}15`,border:`1.5px solid ${color}50`,borderRadius:8,color:color,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Ekle</button></div>);
}

function SettingsPage({exam,curriculum,setCurriculum,completed,setCompleted,onClose}){
  const[tab,setTab]=useState("subjects");const[selectedSubj,setSelectedSubj]=useState(null);const[selectedTopic,setSelectedTopic]=useState(null);
  const[newSubjInput,setNewSubjInput]=useState("");const[newTopicInput,setNewTopicInput]=useState("");const[newSubInput,setNewSubInput]=useState("");
  const[confirmDelete,setConfirmDelete]=useState(null);const[showResetConfirm,setShowResetConfirm]=useState(false);
  const subjects=Object.keys(curriculum[exam]||{});
  const addSubject=()=>{if(!newSubjInput.trim())return;const v=newSubjInput.trim();setCurriculum(p=>{const n=JSON.parse(JSON.stringify(p));if(!n[exam][v])n[exam][v]={};return n;});if(!SUBJECT_COLORS[v])SUBJECT_COLORS[v]=NEON_PALETTE[subjects.length%NEON_PALETTE.length];setNewSubjInput("");};
  const removeSubject=(s)=>{setCurriculum(p=>{const n=JSON.parse(JSON.stringify(p));delete n[exam][s];return n;});setCompleted(p=>{const n={...p};Object.keys(n).forEach(k=>{if(k.startsWith(`${exam}|${s}|`))delete n[k];});return n;});if(selectedSubj===s)setSelectedSubj(null);setConfirmDelete(null);};
  const addTopic=()=>{if(!newTopicInput.trim()||!selectedSubj)return;const v=newTopicInput.trim();setCurriculum(p=>{const n=JSON.parse(JSON.stringify(p));if(!n[exam][selectedSubj][v])n[exam][selectedSubj][v]=[];return n;});setNewTopicInput("");};
  const removeTopic=(t)=>{setCurriculum(p=>{const n=JSON.parse(JSON.stringify(p));delete n[exam][selectedSubj][t];return n;});setCompleted(p=>{const n={...p};Object.keys(n).forEach(k=>{if(k.startsWith(`${exam}|${selectedSubj}|${t}`))delete n[k];});return n;});if(selectedTopic===t)setSelectedTopic(null);setConfirmDelete(null);};
  const addSub=()=>{if(!newSubInput.trim()||!selectedSubj||!selectedTopic)return;const v=newSubInput.trim();setCurriculum(p=>{const n=JSON.parse(JSON.stringify(p));const s=n[exam][selectedSubj][selectedTopic];if(!s.includes(v))s.push(v);return n;});setNewSubInput("");};
  const removeSub=(sub)=>{setCurriculum(p=>{const n=JSON.parse(JSON.stringify(p));n[exam][selectedSubj][selectedTopic]=n[exam][selectedSubj][selectedTopic].filter(s=>s!==sub);return n;});setCompleted(p=>{const n={...p};delete n[gk(exam,selectedSubj,`${selectedTopic}::${sub}`)];return n;});setConfirmDelete(null);};
  const resetProgress=()=>{setCompleted(p=>{const n={...p};Object.keys(n).forEach(k=>{if(k.startsWith(`${exam}|`))delete n[k];});return n;});setShowResetConfirm(false);};
  const resetAll=()=>{setCompleted({});setCurriculum(JSON.parse(JSON.stringify(DEFAULT_CURRICULUM)));setShowResetConfirm(false);setSelectedSubj(null);setSelectedTopic(null);};
  const topics=selectedSubj?Object.keys(curriculum[exam][selectedSubj]||{}):[];
  const subs=(selectedSubj&&selectedTopic)?curriculum[exam][selectedSubj]?.[selectedTopic]||[]:[];
  const eCol=EXAM_COLORS[exam];
  return(<div style={{position:"fixed",inset:0,background:C.bg,zIndex:200,display:"flex",flexDirection:"column",maxWidth:520,margin:"0 auto",fontFamily:"inherit"}}>
    <div style={{display:"flex",alignItems:"center",padding:"16px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}><button onClick={onClose} style={{background:"transparent",border:"none",color:eCol,fontSize:20,cursor:"pointer",fontFamily:"inherit",padding:"0 8px 0 0"}}>←</button><span style={{flex:1,fontSize:16,fontWeight:800,color:C.text,letterSpacing:1}}>AYARLAR</span><span style={{fontSize:11,color:eCol,fontWeight:700}}>{exam}</span></div>
    <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>{[{id:"subjects",label:"Dersler & Konular"},{id:"tips",label:"Tavsiyeler"},{id:"about",label:"Hakkında"}].map(t=>(<button key={t.id} onClick={()=>{setTab(t.id);setSelectedSubj(null);setSelectedTopic(null);}} style={{flex:1,padding:"10px 4px",fontSize:10,fontWeight:700,fontFamily:"inherit",border:"none",borderBottom:`2px solid ${tab===t.id?eCol:"transparent"}`,background:"transparent",color:tab===t.id?eCol:C.textDim,cursor:"pointer",letterSpacing:0.5,transition:"all 0.2s"}}>{t.label}</button>))}</div>
    <div style={{flex:1,overflowY:"auto",padding:16}}>
      {tab==="subjects"&&(<div>
        <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}><button onClick={()=>{setSelectedSubj(null);setSelectedTopic(null);}} style={{background:!selectedSubj?`${eCol}15`:"transparent",border:`1px solid ${!selectedSubj?eCol:C.border}`,borderRadius:6,padding:"4px 10px",fontSize:10,fontWeight:700,color:!selectedSubj?eCol:C.textDim,cursor:"pointer",fontFamily:"inherit"}}>Dersler</button>{selectedSubj&&(<><span style={{color:C.textDim,fontSize:10}}>›</span><button onClick={()=>setSelectedTopic(null)} style={{background:!selectedTopic?`${(SUBJECT_COLORS[selectedSubj]||eCol)}15`:"transparent",border:`1px solid ${!selectedTopic?(SUBJECT_COLORS[selectedSubj]||eCol):C.border}`,borderRadius:6,padding:"4px 10px",fontSize:10,fontWeight:700,color:SUBJECT_COLORS[selectedSubj]||eCol,cursor:"pointer",fontFamily:"inherit",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selectedSubj}</button></>)}{selectedTopic&&(<><span style={{color:C.textDim,fontSize:10}}>›</span><span style={{fontSize:10,fontWeight:700,color:C.text,padding:"4px 10px",background:`${C.text}08`,borderRadius:6,border:`1px solid ${C.border}`,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selectedTopic}</span></>)}</div>
        {!selectedSubj&&(<div>{subjects.map(s=>{const col=SUBJECT_COLORS[s]||eCol;const all=getAllTopics(curriculum,exam,s);const done=all.filter(t=>completed[gk(exam,s,t)]).length;return(<div key={s} style={{display:"flex",alignItems:"center",gap:8,padding:"12px",marginBottom:4,background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer"}} onClick={()=>setSelectedSubj(s)}><div style={{width:4,height:28,borderRadius:2,background:col,boxShadow:`0 0 6px ${col}60`}}/><span style={{flex:1,fontSize:13,fontWeight:600,color:C.text}}>{s}</span><span style={{fontSize:10,color:C.textDim}}>{Object.keys(curriculum[exam][s]).length} konu</span><span style={{fontSize:10,color:col,fontWeight:700}}>{all.length>0?Math.round(done/all.length*100):0}%</span><button onClick={e=>{e.stopPropagation();setConfirmDelete({label:s,action:()=>removeSubject(s)});}} style={{background:`${C.danger}10`,border:`1px solid ${C.danger}30`,borderRadius:4,color:C.danger,fontSize:10,padding:"3px 8px",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>✕</button></div>);})}<div style={{marginTop:12}}><NeonInput value={newSubjInput} onChange={setNewSubjInput} onSubmit={addSubject} placeholder="Yeni ders ekle..." color={C.neonGreen}/></div><div style={{marginTop:24,padding:"16px",background:C.surfaceAlt,borderRadius:10,border:`1px solid ${C.border}`}}><div style={{fontSize:12,fontWeight:700,color:C.neonYellow,marginBottom:10,letterSpacing:1}}>⚠ SIFIRLAMA</div><div style={{display:"flex",gap:8}}><button onClick={()=>setShowResetConfirm("exam")} style={{flex:1,padding:"10px",fontSize:11,fontFamily:"inherit",fontWeight:700,background:`${C.danger}08`,border:`1px solid ${C.danger}30`,borderRadius:8,color:C.danger,cursor:"pointer"}}>{exam} Sıfırla</button><button onClick={()=>setShowResetConfirm("all")} style={{flex:1,padding:"10px",fontSize:11,fontFamily:"inherit",fontWeight:700,background:`${C.danger}08`,border:`1px solid ${C.danger}30`,borderRadius:8,color:C.danger,cursor:"pointer"}}>Herşeyi Sıfırla</button></div></div></div>)}
        {selectedSubj&&!selectedTopic&&(<div>{topics.map(t=>{const subs=curriculum[exam][selectedSubj][t]||[];return(<div key={t} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",marginBottom:3,background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer"}} onClick={()=>setSelectedTopic(t)}><span style={{flex:1,fontSize:12,fontWeight:600,color:C.text}}>{t}</span><span style={{fontSize:10,color:C.textDim}}>{subs.length} alt konu</span><button onClick={e=>{e.stopPropagation();setConfirmDelete({label:t,action:()=>removeTopic(t)});}} style={{background:`${C.danger}10`,border:`1px solid ${C.danger}30`,borderRadius:4,color:C.danger,fontSize:10,padding:"2px 8px",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>✕</button></div>);})}<div style={{marginTop:10}}><NeonInput value={newTopicInput} onChange={setNewTopicInput} onSubmit={addTopic} placeholder="Yeni konu ekle..." color={SUBJECT_COLORS[selectedSubj]||eCol}/></div></div>)}
        {selectedSubj&&selectedTopic&&(<div>{subs.length===0&&<div style={{padding:16,textAlign:"center",color:C.textDim,fontSize:12}}>Henüz alt konu yok.</div>}{subs.map(s=>(<div key={s} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",marginBottom:3,background:C.surface,border:`1px solid ${C.border}`,borderRadius:8}}><div style={{width:6,height:6,borderRadius:3,background:SUBJECT_COLORS[selectedSubj]||eCol,opacity:0.5}}/><span style={{flex:1,fontSize:12,color:C.text}}>{s}</span><button onClick={()=>setConfirmDelete({label:s,action:()=>removeSub(s)})} style={{background:`${C.danger}10`,border:`1px solid ${C.danger}30`,borderRadius:4,color:C.danger,fontSize:10,padding:"2px 8px",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>✕</button></div>))}<div style={{marginTop:10}}><NeonInput value={newSubInput} onChange={setNewSubInput} onSubmit={addSub} placeholder="Yeni alt konu ekle..." color={SUBJECT_COLORS[selectedSubj]||eCol}/></div></div>)}
      </div>)}
      {tab==="tips"&&(<div><div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:28,marginBottom:8}}>📚</div><div style={{fontSize:16,fontWeight:800,color:eCol,letterSpacing:1,textShadow:`0 0 12px ${eCol}40`}}>SINAV TAVSİYELERİ</div><div style={{fontSize:11,color:C.textDim,marginTop:4}}>Başarıya giden yolda rehberiniz</div></div>{[{icon:"🎯",title:"Hedef Belirle",text:"Gerçekçi bir hedef koy. Hayalindeki okulu belirle, puan hedefini yaz. Hedefsiz çalışmak pusulasız yol yürümek gibidir."},{icon:"📅",title:"Plan Yap, Sadık Kal",text:"Günlük ve haftalık çalışma planı oluştur. Her güne hangi dersi, hangi konuyu çalışacağını yaz. Bu uygulama ile ilerlemeni takip et."},{icon:"⏰",title:"Düzenli Çalış",text:"Her gün aynı saatlerde çalış. 45 dk çalış, 10 dk mola ver. Pomodoro tekniği uygula. Düzen, motivasyondan güvenilirdir."},{icon:"📝",title:"Bol Deneme Çöz",text:"Haftada en az 1 deneme çöz. Sonuçları analiz et, yanlışlarını mutlaka tekrar çöz. Her deneme seni sınava bir adım yaklaştırır."},{icon:"🔄",title:"Tekrar Tekrar Tekrar",text:"Öğrendiğin konuyu 1 gün, 1 hafta ve 1 ay sonra tekrar et. Tekrarsız öğrenme, suya yazı yazmak gibidir."},{icon:"💪",title:"Zor Konulardan Kaçma",text:"En zorlandığın konuyu en enerjik saatinde çalış. Zor konu = çok puan. Kolaydan değil, zordan başla."},{icon:"😴",title:"Uyku ve Beslenme",text:"Günde en az 7-8 saat uyu. Dengeli beslen, bol su iç. Beynin yakıt olmadan çalışmaz."},{icon:"📵",title:"Dikkat Dağıtıcılardan Uzak Dur",text:"Çalışırken telefonu başka odaya koy. Sosyal medya 'sadece 5 dakika' değildir."},{icon:"🧠",title:"Anlayarak Çalış",text:"Ezberlemek yerine mantığını kavra. 'Neden?' sorusunu sürekli sor. Anladığın bilgi unutulmaz."},{icon:"🌟",title:"Kendine Güven",text:"Hazırlandıysan yaparsın. Kendine 'Ben yapabilirim' de ve inan. Binlerce öğrenci başardı, sen de başaracaksın!"}].map((tip,i)=>(<div key={i} style={{padding:"14px",marginBottom:8,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}><span style={{fontSize:18}}>{tip.icon}</span><span style={{fontSize:13,fontWeight:800,color:eCol}}>{tip.title}</span></div><p style={{fontSize:12,color:`${C.text}cc`,lineHeight:1.7,margin:0}}>{tip.text}</p></div>))}</div>)}
      {tab==="about"&&(<div style={{textAlign:"center"}}><div style={{marginBottom:24,paddingTop:10}}><div style={{width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg,${C.neonCyan}20,${C.neonPink}20)`,border:`2px solid ${eCol}40`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:36}}>🎓</div><div style={{fontSize:22,fontWeight:900,color:C.text,letterSpacing:2}}>SINAV TAKİP</div><div style={{fontSize:11,color:eCol,marginTop:4,letterSpacing:3,textShadow:`0 0 8px ${eCol}40`}}>LGS • TYT • AYT</div><div style={{fontSize:10,color:C.textDim,marginTop:8}}>v2.0</div></div><div style={{padding:20,background:C.surface,borderRadius:12,border:`1px solid ${C.border}`,textAlign:"left",marginBottom:16}}><div style={{fontSize:13,fontWeight:700,color:C.neonPink,marginBottom:10}}>Geliştirici</div><div style={{fontSize:14,fontWeight:800,color:C.text,marginBottom:8}}>Murat AYDIN</div><div style={{fontSize:11,color:C.textDim,lineHeight:1.6,marginBottom:4}}>Türk Dili ve Edebiyatı Öğretmeni</div><p style={{fontSize:11,color:`${C.text}bb`,lineHeight:1.7,margin:"10px 0"}}>Bu uygulama Türk Dili ve Edebiyatı öğretmeni Murat AYDIN tarafından tasarlanmıştır. Tüm öğretmen ve öğrencilere ücretsiz olarak sunulmuştur. Öğretmenlerimize teşekkür eder, öğrencilerimize başarılar dileriz.</p><div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}><a href="mailto:murat.aydin@msn.com" style={{fontSize:11,color:C.neonCyan,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>✉ murat.aydin@msn.com</a><a href="https://instagram.com/murat27aydin27" target="_blank" rel="noopener" style={{fontSize:11,color:C.neonPink,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>📸 @murat27aydin27</a></div></div><div style={{padding:20,background:C.surface,borderRadius:12,border:`1px solid ${C.border}`,textAlign:"left",marginBottom:16}}><div style={{fontSize:13,fontWeight:700,color:C.neonGreen,marginBottom:10}}>Bu Uygulama Hakkında</div><p style={{fontSize:12,color:`${C.text}bb`,lineHeight:1.8,margin:0}}>LGS, TYT ve AYT sınavlarına hazırlanan öğrencilerin ders ve konu takibini kolaylaştırmak için geliştirilmiştir. Kayıt gerektirmez, verileriniz cihazınızda saklanır. Tüm müfredatlar hazır yüklenmiştir. Ayarlardan özelleştirebilirsiniz.</p></div><div style={{padding:20,background:C.surface,borderRadius:12,border:`1px solid ${C.border}`,textAlign:"left"}}><div style={{fontSize:13,fontWeight:700,color:C.neonYellow,marginBottom:10}}>Nasıl Kullanılır?</div><div style={{fontSize:12,color:`${C.text}bb`,lineHeight:1.8}}><div style={{marginBottom:8}}>✅ Çalıştığın konuya tıklayarak işaretle</div><div style={{marginBottom:8}}>📊 Alt çubuktan ilerlemeyi takip et</div><div style={{marginBottom:8}}>⚙ Çark ikonundan ders/konu ekle veya sil</div><div style={{marginBottom:8}}>📱 Ana ekrana ekle, internet olmadan kullan</div><div>🔄 LGS, TYT ve AYT arasında kolayca geçiş yap</div></div></div><div style={{marginTop:24,padding:16,borderTop:`1px solid ${C.border}`}}><div style={{fontSize:10,color:C.textDim,letterSpacing:1}}>Gaziantep'ten sevgilerle ❤️</div><div style={{fontSize:9,color:`${C.textDim}80`,marginTop:4}}>© 2026</div></div></div>)}
    </div>
    {confirmDelete&&(<div onClick={()=>setConfirmDelete(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.surface,borderRadius:12,padding:20,maxWidth:320,width:"100%",border:`1px solid ${C.danger}30`}}><div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:8}}>Silmek istediğinize emin misiniz?</div><div style={{fontSize:12,color:C.danger,marginBottom:16,fontWeight:600}}>"{confirmDelete.label}"</div><div style={{display:"flex",gap:8}}><button onClick={()=>setConfirmDelete(null)} style={{flex:1,padding:10,fontSize:12,fontFamily:"inherit",background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:8,color:C.textDim,cursor:"pointer"}}>İptal</button><button onClick={confirmDelete.action} style={{flex:1,padding:10,fontSize:12,fontFamily:"inherit",fontWeight:700,background:`${C.danger}15`,border:`1px solid ${C.danger}50`,borderRadius:8,color:C.danger,cursor:"pointer"}}>Sil</button></div></div></div>)}
    {showResetConfirm&&(<div onClick={()=>setShowResetConfirm(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.surface,borderRadius:12,padding:20,maxWidth:320,width:"100%",border:`1px solid ${C.danger}30`}}><div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:8}}>{showResetConfirm==="all"?"Tüm Verileri Sıfırla":`${exam} Sıfırla`}</div><div style={{fontSize:12,color:C.textDim,marginBottom:16,lineHeight:1.6}}>{showResetConfirm==="all"?"Tüm ilerleme ve müfredat sıfırlanacak.":`${exam} işaretlemeleri temizlenecek.`}</div><div style={{display:"flex",gap:8}}><button onClick={()=>setShowResetConfirm(false)} style={{flex:1,padding:10,fontSize:12,fontFamily:"inherit",background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:8,color:C.textDim,cursor:"pointer"}}>İptal</button><button onClick={showResetConfirm==="all"?resetAll:resetProgress} style={{flex:1,padding:10,fontSize:12,fontFamily:"inherit",fontWeight:700,background:`${C.danger}15`,border:`1px solid ${C.danger}50`,borderRadius:8,color:C.danger,cursor:"pointer"}}>Sıfırla</button></div></div></div>)}
  </div>);
}

export default function App(){
  const[exam,setExam]=useState("LGS");const[activeSubject,setActiveSubject]=useState(null);const[expanded,setExpanded]=useState({});
  const[completed,setCompleted]=useState({});const[curriculum,setCurriculum]=useState(null);const[time,setTime]=useState(new Date());
  const[loaded,setLoaded]=useState(false);const[showSettings,setShowSettings]=useState(false);
  useEffect(()=>{async function load(){try{const r=localStorage.getItem(STORAGE_KEY);if(r)setCompleted(JSON.parse(r));}catch{}try{const r=localStorage.getItem(CURRICULUM_KEY);if(r)setCurriculum(JSON.parse(r));else setCurriculum(JSON.parse(JSON.stringify(DEFAULT_CURRICULUM)));}catch{setCurriculum(JSON.parse(JSON.stringify(DEFAULT_CURRICULUM)));}setLoaded(true);}load();},[]);
  useEffect(()=>{if(!loaded)return;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(completed));}catch{}},[completed,loaded]);
  useEffect(()=>{if(!loaded||!curriculum)return;try{localStorage.setItem(CURRICULUM_KEY,JSON.stringify(curriculum));}catch{}},[curriculum,loaded]);
  useEffect(()=>{const i=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(i);},[]);
  useEffect(()=>{if(!curriculum)return;const s=Object.keys(curriculum[exam]||{});setActiveSubject(s[0]||null);setExpanded({});},[exam,curriculum]);
  const toggleComplete=useCallback(key=>{setCompleted(p=>{const n={...p};n[key]?delete n[key]:n[key]=true;return n;});},[]);
  const toggleExpand=useCallback(topic=>{setExpanded(p=>({...p,[topic]:!p[topic]}));},[]);
  const stats=useMemo(()=>{if(!activeSubject||!curriculum)return{total:0,done:0};const all=getAllTopics(curriculum,exam,activeSubject);let done=0;all.forEach(t=>{if(completed[gk(exam,activeSubject,t)])done++;});return{total:all.length,done,remaining:all.length-done};},[exam,activeSubject,completed,curriculum]);
  const totalStats=useMemo(()=>{if(!curriculum)return{total:0,done:0,remaining:0};let total=0,done=0;Object.keys(curriculum[exam]||{}).forEach(su=>{const all=getAllTopics(curriculum,exam,su);total+=all.length;all.forEach(t=>{if(completed[gk(exam,su,t)])done++;});});return{total,done,remaining:total-done};},[exam,completed,curriculum]);
  if(!curriculum)return(<div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'JetBrains Mono',monospace",color:C.neonCyan}}><div style={{textAlign:"center"}}><div style={{fontSize:28,animation:"pulse 1.5s infinite",textShadow:`0 0 20px ${C.neonCyan}`}}>⟳</div><div style={{marginTop:8,fontSize:12,letterSpacing:2}}>YÜKLENİYOR...</div></div></div>);
  if(showSettings) return (<SettingsPage exam={exam} curriculum={curriculum} setCurriculum={setCurriculum} completed={completed} setCompleted={setCompleted} onClose={()=>setShowSettings(false)}/>);
  const eCol=EXAM_COLORS[exam];const daysLeft=daysUntil(EXAM_DATES[exam]);const subjects=Object.keys(curriculum[exam]||{});const subjectColor=SUBJECT_COLORS[activeSubject]||eCol;const progressPct=totalStats.total>0?Math.round((totalStats.done/totalStats.total)*100):0;
  const trDays=["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];const trMonths=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  const timeStr=time.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit",second:"2-digit"});const dateStr=`${time.getDate()} ${trMonths[time.getMonth()]} ${time.getFullYear()}, ${trDays[time.getDay()]}`;
  return(<div style={{fontFamily:"'JetBrains Mono','Fira Code','Courier New',monospace",background:C.bg,color:C.text,minHeight:"100vh",display:"flex",flexDirection:"column",maxWidth:520,margin:"0 auto",position:"relative"}}>
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:`linear-gradient(rgba(0,240,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.03) 1px,transparent 1px)`,backgroundSize:"40px 40px"}}/>
    <div style={{textAlign:"center",padding:"18px 16px 10px",position:"relative",zIndex:1}}><div style={{fontSize:38,fontWeight:800,letterSpacing:4,color:eCol,lineHeight:1,textShadow:`0 0 10px ${eCol},0 0 20px ${eCol},0 0 40px ${eCol}40`,transition:"color 0.3s"}}>{timeStr}</div><div style={{fontSize:12,color:C.neonPink,marginTop:4,letterSpacing:2,textShadow:`0 0 8px ${C.neonPink}80`}}>{dateStr}</div></div>
    <div style={{display:"flex",gap:6,padding:"0 16px 8px",position:"relative",zIndex:1}}>{["LGS","TYT","AYT"].map(e=>{const active=exam===e;const col=EXAM_COLORS[e];return(<button key={e} onClick={()=>setExam(e)} style={{flex:1,padding:"11px 0",fontSize:16,fontWeight:900,fontFamily:"inherit",letterSpacing:3,border:`2px solid ${active?col:C.border}`,borderRadius:10,background:active?`${col}12`:"transparent",color:active?col:C.textDim,cursor:"pointer",transition:"all 0.2s",textShadow:active?`0 0 12px ${col}80`:"none",boxShadow:active?`0 0 20px ${col}20,inset 0 0 20px ${col}08`:"none"}}>{e}</button>);})}</div>
    <div style={{textAlign:"center",fontSize:11,color:C.textDim,padding:"0 16px 6px",zIndex:1,position:"relative"}}>{EXAM_INFO[exam]}</div>
    <div style={{display:"flex",gap:4,padding:"0 8px 6px",overflowX:"auto",zIndex:1,position:"relative",WebkitOverflowScrolling:"touch",alignItems:"center"}}>{subjects.map(subj=>{const active=activeSubject===subj;const col=SUBJECT_COLORS[subj]||eCol;const all=getAllTopics(curriculum,exam,subj);const doneCnt=all.filter(t=>completed[gk(exam,subj,t)]).length;const pct=all.length>0?Math.round((doneCnt/all.length)*100):0;return(<button key={subj} onClick={()=>{setActiveSubject(subj);setExpanded({});}} style={{padding:"8px 12px 6px",fontSize:10,fontWeight:700,fontFamily:"inherit",whiteSpace:"nowrap",border:`1.5px solid ${active?col:C.border}`,borderRadius:8,background:active?`${col}15`:C.surface,color:active?col:C.textDim,cursor:"pointer",transition:"all 0.2s",flexShrink:0,position:"relative",overflow:"hidden",textShadow:active?`0 0 8px ${col}60`:"none"}}>{subj}{pct>0&&<div style={{position:"absolute",bottom:0,left:0,height:2,width:`${pct}%`,background:col,borderRadius:"0 2px 2px 0",boxShadow:`0 0 6px ${col}`}}/>}</button>);})}<button onClick={()=>setShowSettings(true)} style={{padding:"7px 12px",fontSize:16,fontFamily:"inherit",border:`1.5px solid ${C.neonPurple}50`,borderRadius:8,background:`${C.neonPurple}10`,color:C.neonPurple,cursor:"pointer",flexShrink:0,transition:"all 0.2s",textShadow:`0 0 8px ${C.neonPurple}60`,boxShadow:`0 0 12px ${C.neonPurple}15`}}>⚙</button></div>
    {activeSubject&&(<div style={{padding:"0 16px 8px",zIndex:1,position:"relative"}}><div style={{height:3,background:C.border,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${stats.total>0?(stats.done/stats.total*100):0}%`,background:`linear-gradient(90deg,${subjectColor},${subjectColor}cc)`,borderRadius:2,boxShadow:`0 0 8px ${subjectColor}60`,transition:"width 0.4s ease"}}/></div><div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.textDim,marginTop:3}}><span>{activeSubject}</span><span style={{color:subjectColor}}>{stats.total>0?Math.round(stats.done/stats.total*100):0}%</span></div></div>)}
    <div style={{flex:1,overflowY:"auto",padding:"0 10px 130px",zIndex:1,position:"relative"}}>{activeSubject&&curriculum[exam][activeSubject]&&Object.entries(curriculum[exam][activeSubject]).map(([topic,subs])=>{const hasSubs=Array.isArray(subs)&&subs.length>0;const isExpanded=expanded[topic];const topicKey=gk(exam,activeSubject,topic);const isDone=completed[topicKey];let allSubsDone=hasSubs&&subs.every(s=>completed[gk(exam,activeSubject,`${topic}::${s}`)]);return(<div key={topic} style={{marginBottom:3}}><div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",background:isDone||allSubsDone?C.completedBg:C.surface,border:`1px solid ${isDone||allSubsDone?`${C.completed}40`:C.border}`,borderRadius:8,cursor:"pointer",transition:"all 0.2s"}} onClick={()=>hasSubs?toggleExpand(topic):toggleComplete(topicKey)}>{!hasSubs?(<div style={{width:20,height:20,borderRadius:5,border:`2px solid ${isDone?C.completed:C.textDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:isDone?`${C.completed}20`:"transparent",boxShadow:isDone?`0 0 8px ${C.completed}40`:"none",transition:"all 0.2s"}}>{isDone&&<span style={{color:C.completed,fontSize:13,fontWeight:900}}>✓</span>}</div>):(<div style={{width:20,height:20,borderRadius:5,border:`2px solid ${allSubsDone?C.completed:subjectColor}50`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:allSubsDone?`${C.completed}20`:`${subjectColor}10`,fontSize:14,fontWeight:900,color:allSubsDone?C.completed:subjectColor,transition:"all 0.3s",transform:isExpanded?"rotate(45deg)":"rotate(0deg)"}}>+</div>)}<span style={{flex:1,fontSize:13,fontWeight:600,color:isDone||allSubsDone?C.completed:C.text,textDecoration:(isDone||allSubsDone)?"line-through":"none",textDecorationColor:C.completed,textDecorationThickness:"1.5px",opacity:(isDone||allSubsDone)?0.7:1,transition:"all 0.2s"}}>{topic}</span>{hasSubs&&(<span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:10,color:allSubsDone?C.completed:C.textDim,background:allSubsDone?`${C.completed}15`:`${C.textDim}15`}}>{subs.filter(s=>completed[gk(exam,activeSubject,`${topic}::${s}`)]).length}/{subs.length}</span>)}</div>{hasSubs&&isExpanded&&(<div style={{marginLeft:16,borderLeft:`2px solid ${subjectColor}30`,paddingLeft:8,marginTop:2}}>{subs.map(sub=>{const subKey=gk(exam,activeSubject,`${topic}::${sub}`);const subDone=completed[subKey];return(<div key={sub} onClick={()=>toggleComplete(subKey)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:2,background:subDone?C.completedBg:`${C.surface}cc`,border:`1px solid ${subDone?`${C.completed}30`:C.border}`,borderRadius:6,cursor:"pointer",transition:"all 0.2s"}}><div style={{width:18,height:18,borderRadius:4,border:`2px solid ${subDone?C.completed:C.textDim}60`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:subDone?`${C.completed}20`:"transparent",boxShadow:subDone?`0 0 6px ${C.completed}30`:"none",transition:"all 0.2s"}}>{subDone&&<span style={{color:C.completed,fontSize:11,fontWeight:900}}>✓</span>}</div><span style={{flex:1,fontSize:12,color:subDone?C.completed:`${C.text}cc`,textDecoration:subDone?"line-through":"none",textDecorationColor:C.completed,textDecorationThickness:"1.5px",opacity:subDone?0.65:0.9,transition:"all 0.2s"}}>{sub}</span></div>);})}</div>)}</div>);})}</div>
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:520,zIndex:10,background:`linear-gradient(to top,${C.bg} 70%,transparent)`,padding:"24px 12px 16px"}}><div style={{height:4,background:C.border,borderRadius:2,overflow:"hidden",marginBottom:10}}><div style={{height:"100%",width:`${progressPct}%`,background:`linear-gradient(90deg,${eCol},${C.neonPink})`,borderRadius:2,boxShadow:`0 0 10px ${eCol}60`,transition:"width 0.5s ease"}}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>{[{label:"TOPLAM",value:totalStats.total,color:C.neonCyan},{label:"BİTEN",value:totalStats.done,color:C.neonGreen},{label:"KALAN",value:totalStats.remaining,color:C.neonYellow},{label:exam+"'YE",value:`${daysLeft} GÜN`,color:C.neonPink}].map(item=>(<div key={item.label} style={{textAlign:"center",padding:"8px 4px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:8}}><div style={{fontSize:18,fontWeight:900,color:item.color,lineHeight:1.1,textShadow:`0 0 10px ${item.color}50`}}>{item.value}</div><div style={{fontSize:8,color:C.textDim,marginTop:3,letterSpacing:1.5,fontWeight:700}}>{item.label}</div></div>))}</div></div>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800;900&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px;}::-webkit-scrollbar-track{background:transparent;}button{outline:none;}button:active{transform:scale(0.97);}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}input::placeholder{color:${C.textDim};}`}</style>
  </div>);
}
