import { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase, News as NewsType } from '../lib/supabase';

export default function News() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsType | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_date', { ascending: false });

      if (error) throw error;
      if (data) setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Updates</h1>
          <p className="text-xl text-teal-50 max-w-3xl">
            Stay informed about our latest developments, achievements, and healthcare initiatives
          </p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading news...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No news articles available at the moment</p>
            </div>
          ) : (
            <div className="space-y-8">
              {news.map((article, index) => (
                <div
                  key={article.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow ${
                    index === 0 ? 'lg:grid lg:grid-cols-2' : ''
                  }`}
                >
                  <div className={`${index === 0 ? 'h-96' : 'h-64'} bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center`}>
                    <Calendar className={`${index === 0 ? 'h-24 w-24' : 'h-16 w-16'} text-gray-500`} />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 text-teal-600 mr-2" />
                      <span className="text-teal-600 font-medium">
                        {new Date(article.published_date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className={`${index === 0 ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 mb-4`}>
                      {article.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <button
                      onClick={() => setSelectedNews(article)}
                      className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 group"
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedNews && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <Calendar className="h-32 w-32 text-gray-500" />
            </div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-teal-600 mr-2" />
                <span className="text-teal-600 font-medium">
                  {new Date(selectedNews.published_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{selectedNews.title}</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">{selectedNews.excerpt}</p>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedNews.content}
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Stay Connected</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to receive the latest news, product updates, and healthcare insights directly in your inbox.
          </p>
          <p className="text-gray-500">Newsletter subscription available in the footer</p>
        </div>
      </section>
    </div>
  );
}
