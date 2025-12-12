import { useEffect, useState } from 'react';
import { ArrowRight, Award, Users, Package, TrendingUp } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsResponse = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(3);

      if (productsResponse.data) setFeaturedProducts(productsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/herosection.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-teal-800/60 to-emerald-900/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Committed to Care,<br />
              Dedicated to Health
            </h1>
            <p className="text-lg md:text-xl mb-8 text-teal-50 leading-relaxed">
              RF PHARMACEUTICAL LTD. provides high-quality, accessible, and life-saving pharmaceutical products to improve the health and well-being of communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="px-8 py-4 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition transform hover:scale-105 flex items-center justify-center group"
              >
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-8 py-4 bg-teal-800 bg-opacity-50 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-opacity-70 transition border-2 border-white border-opacity-30"
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Quality Excellence', desc: 'WHO-GMP certified manufacturing' },
              { icon: Package, title: '100+ Products', desc: 'Comprehensive pharmaceutical range' },
              { icon: Users, title: '5M+ Patients', desc: 'Served across multiple countries' },
              { icon: TrendingUp, title: '25+ Years', desc: 'Of trusted healthcare solutions' },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.title}</h3>
                <p className="text-gray-600">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our range of high-quality pharmaceutical products designed to improve health outcomes
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="h-48 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                    <Package className="h-20 w-20 text-teal-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-teal-600 font-medium mb-2">{product.strength} | {product.dosage_form}</p>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <button
                      onClick={() => onNavigate('products')}
                      className="text-teal-600 font-semibold hover:text-teal-700 flex items-center group"
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => onNavigate('products')}
              className="px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-teal-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-lg text-teal-50 mb-8 max-w-2xl mx-auto">
            Be part of a company that's committed to making a difference in healthcare. Explore exciting career opportunities.
          </p>
          <button
            onClick={() => onNavigate('careers')}
            className="px-8 py-4 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition transform hover:scale-105"
          >
            View Career Opportunities
          </button>
        </div>
      </section>
    </div>
  );
}
