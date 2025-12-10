import { useEffect, useState } from 'react';
import { Globe, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface ExportMarket {
  id: string;
  country_name: string;
  country_code: string;
  region: string;
  description: string;
  year_established: number | null;
  is_active: boolean;
  display_order: number;
}

export default function ExportMarket() {
  const [markets, setMarkets] = useState<ExportMarket[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<ExportMarket | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const isBangla = language === 'bn';

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      const { data, error } = await supabase
        .from('export_markets')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      if (data) setMarkets(data);
    } catch (error) {
      console.error('Error fetching export markets:', error);
    } finally {
      setLoading(false);
    }
  };

  const regions = ['all', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];
  const regionNames: Record<string, { en: string; bn: string }> = {
    all: { en: 'All Markets', bn: 'সব বাজার' },
    Asia: { en: 'Asia', bn: 'এশিয়া' },
    Europe: { en: 'Europe', bn: 'ইউরোপ' },
    Africa: { en: 'Africa', bn: 'আফ্রিকা' },
    Americas: { en: 'Americas', bn: 'আমেরিকা' },
    Oceania: { en: 'Oceania', bn: 'ওশেনিয়া' },
  };

  const filteredMarkets = selectedRegion === 'all'
    ? markets
    : markets.filter(m => m.region === selectedRegion);

  const marketsByRegion = markets.reduce((acc, market) => {
    if (!acc[market.region]) acc[market.region] = [];
    acc[market.region].push(market);
    return acc;
  }, {} as Record<string, ExportMarket[]>);

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center mb-6">
            <Globe className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {isBangla ? 'আন্তর্জাতিক উপস্থিতি' : 'Global Presence'}
            </h1>
          </div>
          <p className="text-xl text-teal-50 max-w-3xl">
            {isBangla
              ? 'বিশ্বব্যাপী স্বাস্থ্যসেবায় আমাদের পদচিহ্ন আবিষ্কার করুন। আমরা গর্বিত যে আমরা পাঁচটি মহাদেশ জুড়ে ১৫+ দেশে রপ্তানি করছি।'
              : 'Discover our footprint in global healthcare. We proudly export to 15+ countries across five continents.'}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Globe,
                label: isBangla ? 'দেশ' : 'Countries',
                value: markets.length,
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: MapPin,
                label: isBangla ? 'অঞ্চল' : 'Regions',
                value: Object.keys(marketsByRegion).length,
                color: 'from-emerald-500 to-emerald-600',
              },
              {
                icon: Calendar,
                label: isBangla ? 'প্রতিষ্ঠার বছর' : 'Since',
                value: 1999,
                color: 'from-teal-500 to-teal-600',
              },
              {
                icon: TrendingUp,
                label: isBangla ? 'বৃদ্ধি' : 'Growth',
                value: '+25%',
                color: 'from-amber-500 to-amber-600',
              },
            ].map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg mb-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isBangla ? 'আমাদের রপ্তানি বাজার' : 'Our Export Markets'}
            </h2>
            <p className="text-lg text-gray-600">
              {isBangla
                ? 'বিশ্বব্যাপী স্বাস্থ্যসেবা সরবরাহে আমাদের অংশীদারদের দেখুন'
                : 'Explore our partners in delivering healthcare worldwide'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {regions.map((region) => {
              const count = region === 'all' ? markets.length : (marketsByRegion[region]?.length || 0);
              return (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedRegion === region
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {regionNames[region][language]} ({count})
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map((market) => (
                <div
                  key={market.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
                  onClick={() => setSelectedMarket(market)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{market.country_name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1 text-teal-600" />
                        <span>{market.region}</span>
                      </div>
                      {market.year_established && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1 text-teal-600" />
                          <span>
                            {isBangla ? 'প্রতিষ্ঠিত' : 'Est.'} {market.year_established}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-4xl">{getCountryFlag(market.country_code)}</div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{market.description}</p>
                  <button className="mt-4 text-teal-600 font-semibold hover:text-teal-700 text-sm">
                    {isBangla ? 'আরও জানুন →' : 'Learn More →'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedMarket && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedMarket(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedMarket.country_name}</h2>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                  <span className="text-lg">{selectedMarket.region}</span>
                </div>
                {selectedMarket.year_established && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2 text-teal-600" />
                    <span>
                      {isBangla ? 'প্রতিষ্ঠিত' : 'Established'} {selectedMarket.year_established}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-6xl">{getCountryFlag(selectedMarket.country_code)}</div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {isBangla ? 'বাজার তথ্য' : 'Market Information'}
              </h3>
              <p className="text-gray-700 leading-relaxed">{selectedMarket.description}</p>
            </div>

            <button
              onClick={() => setSelectedMarket(null)}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transition"
            >
              {isBangla ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
