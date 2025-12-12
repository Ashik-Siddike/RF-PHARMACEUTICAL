import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const { t } = useLanguage();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setSubscribeMessage('Please enter your email');
      return;
    }

    setIsSubscribing(true);
    setSubscribeMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email, is_active: true }]);

      if (error) {
        if (error.code === '23505') {
          setSubscribeMessage('This email is already subscribed!');
        } else {
          setSubscribeMessage('Failed to subscribe. Please try again.');
        }
      } else {
        setSubscribeMessage('Thank you for subscribing!');
        setEmail('');
      }
    } catch (error) {
      setSubscribeMessage('An error occurred. Please try again.');
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setSubscribeMessage(''), 5000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RF</span>
              </div>
              <div className="ml-2">
                <h3 className="text-lg font-bold">RF PHARMACEUTICAL</h3>
                <p className="text-xs text-emerald-400">Committed to Care</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Providing high-quality, accessible, and life-saving pharmaceutical products to improve the health and well-being of the community.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 bg-teal-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-teal-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-teal-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-teal-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">{t('footer.quicklinks')}</h4>
            <ul className="space-y-2 text-sm">
              {['home', 'about', 'products', 'export', 'rd', 'careers', 'news', 'contact'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-gray-300 hover:text-emerald-400 transition"
                  >
                    {t(`nav.${page}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>Jhumjhumpur, Jashore 7400, Khulna, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-emerald-400 flex-shrink-0" />
                <a href="tel:01580796575" className="hover:text-emerald-400 transition">01580796575</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-emerald-400 flex-shrink-0" />
                <a href="mailto:contact@rfpharmaceutical.com" className="hover:text-emerald-400 transition">contact@rfpharmaceutical.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">{t('footer.newsletter')}</h4>
            <p className="text-gray-300 text-sm mb-4">
              {t('footer.newsletter.text')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.email.placeholder')}
                  className="flex-1 px-4 py-2 rounded-l-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-emerald-500"
                  disabled={isSubscribing}
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-r-md transition disabled:opacity-50"
                  title={t('footer.subscribe')}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {subscribeMessage && (
                <p className={`text-sm ${subscribeMessage.includes('Thank you') ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {subscribeMessage}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 RF PHARMACEUTICAL LTD. {t('footer.rights')} | <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-emerald-400 transition">Admin</button></p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="hover:text-emerald-400 transition">{t('footer.privacy')}</button>
              <button className="hover:text-emerald-400 transition">{t('footer.terms')}</button>
              <button className="hover:text-emerald-400 transition">{t('footer.cookies')}</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
