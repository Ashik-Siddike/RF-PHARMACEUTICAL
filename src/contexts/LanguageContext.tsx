import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.careers': 'Careers',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.export': 'Export Market',
    'header.tagline': 'Committed to Care',

    // Home Page
    'home.hero.title': 'Committed to Care,\nDedicated to Health',
    'home.hero.subtitle': 'RF PHARMACEUTICAL LTD. provides high-quality, accessible, and life-saving pharmaceutical products to improve the health and well-being of communities worldwide.',
    'home.hero.explore': 'Explore Products',
    'home.hero.about': 'About Us',
    'home.stats.quality': 'Quality Excellence',
    'home.stats.quality.desc': 'WHO-GMP certified manufacturing',
    'home.stats.products': '100+ Products',
    'home.stats.products.desc': 'Comprehensive pharmaceutical range',
    'home.stats.patients': '5M+ Patients',
    'home.stats.patients.desc': 'Served across multiple countries',
    'home.stats.years': '25+ Years',
    'home.stats.years.desc': 'Of trusted healthcare solutions',
    'home.featured.title': 'Featured Products',
    'home.featured.subtitle': 'Discover our range of high-quality pharmaceutical products designed to improve health outcomes',
    'home.featured.viewall': 'View All Products',
    'home.news.title': 'Latest News & Updates',
    'home.news.subtitle': 'Stay informed about our latest developments, achievements, and healthcare initiatives',
    'home.news.viewall': 'View All News',
    'home.careers.title': 'Join Our Team',
    'home.careers.subtitle': 'Be part of a company that\'s committed to making a difference in healthcare. Explore exciting career opportunities.',
    'home.careers.button': 'View Career Opportunities',

    // Products Page
    'products.title': 'Our Product Portfolio',
    'products.subtitle': 'Comprehensive range of high-quality pharmaceutical products meeting international WHO-GMP standards',
    'products.search': 'Search Products',
    'products.search.placeholder': 'Search by trade name, generic name, or indication...',
    'products.filter': 'Filter by Category',
    'products.alphabet': 'Browse by Alphabet',
    'products.showing': 'Showing',
    'products.of': 'of',
    'products.products': 'products',
    'products.clear': 'Clear All Filters',
    'products.notfound': 'No products found',
    'products.notfound.subtitle': 'Try adjusting your search criteria or filters',
    'products.viewall': 'View All Products',
    'products.generic': 'Generic',
    'products.findmore': 'Find More →',
    'products.description': 'Description',
    'products.composition': 'Composition',
    'products.indications': 'Indications',
    'products.genericname': 'Generic Name:',
    'products.close': 'Close',

    // About Page
    'about.title': 'About RF PHARMACEUTICAL',
    'about.subtitle': 'A trusted name in pharmaceutical excellence, dedicated to improving lives through quality healthcare solutions.',
    'about.story.title': 'Our Story',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'Committed to Care: Our mission is to provide high-quality, accessible, and life-saving pharmaceutical products to improve the health and well-being of the community.',
    'about.vision.title': 'Our Vision',
    'about.values.title': 'Our Core Values',
    'about.governance.title': 'Corporate Governance',

    // Footer
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.text': 'Subscribe to receive updates about new products and company news.',
    'footer.email.placeholder': 'Your email',
    'footer.subscribe': 'Subscribe',
    'footer.quicklinks': 'Quick Links',
    'footer.contact': 'Contact Info',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.cookies': 'Cookie Policy',
  },
  bn: {
    // Header
    'nav.home': 'হোম',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.products': 'পণ্যসমূহ',
    'nav.careers': 'ক্যারিয়ার',
    'nav.news': 'সংবাদ',
    'nav.contact': 'যোগাযোগ',
    'nav.export': 'রপ্তানি বাজার',
    'header.tagline': 'যত্নে প্রতিশ্রুতিবদ্ধ',

    // Home Page
    'home.hero.title': 'যত্নে প্রতিশ্রুতিবদ্ধ,\nস্বাস্থ্যে নিবেদিত',
    'home.hero.subtitle': 'আরএফ ফার্মাসিউটিক্যাল লিমিটেড বিশ্বব্যাপী সম্প্রদায়ের স্বাস্থ্য ও সুস্থতা উন্নত করতে উচ্চমানের, সহজলভ্য এবং জীবন রক্ষাকারী ওষুধ সরবরাহ করে।',
    'home.hero.explore': 'পণ্য দেখুন',
    'home.hero.about': 'আমাদের সম্পর্কে',
    'home.stats.quality': 'মান উৎকর্ষতা',
    'home.stats.quality.desc': 'WHO-GMP সার্টিফাইড উৎপাদন',
    'home.stats.products': '১০০+ পণ্য',
    'home.stats.products.desc': 'ব্যাপক ফার্মাসিউটিক্যাল পরিসর',
    'home.stats.patients': '৫০ লক্ষ+ রোগী',
    'home.stats.patients.desc': 'একাধিক দেশে সেবা প্রদান',
    'home.stats.years': '২৫+ বছর',
    'home.stats.years.desc': 'বিশ্বস্ত স্বাস্থ্যসেবা সমাধান',
    'home.featured.title': 'বৈশিষ্ট্যযুক্ত পণ্য',
    'home.featured.subtitle': 'স্বাস্থ্যের ফলাফল উন্নত করার জন্য ডিজাইন করা আমাদের উচ্চমানের ফার্মাসিউটিক্যাল পণ্যের পরিসর আবিষ্কার করুন',
    'home.featured.viewall': 'সব পণ্য দেখুন',
    'home.news.title': 'সর্বশেষ সংবাদ ও আপডেট',
    'home.news.subtitle': 'আমাদের সর্বশেষ উন্নয়ন, অর্জন এবং স্বাস্থ্যসেবা উদ্যোগ সম্পর্কে জানুন',
    'home.news.viewall': 'সব সংবাদ দেখুন',
    'home.careers.title': 'আমাদের দলে যোগ দিন',
    'home.careers.subtitle': 'একটি কোম্পানির অংশ হন যা স্বাস্থ্যসেবায় পরিবর্তন আনতে প্রতিশ্রুতিবদ্ধ। উত্তেজনাপূর্ণ ক্যারিয়ার সুযোগ অন্বেষণ করুন।',
    'home.careers.button': 'ক্যারিয়ার সুযোগ দেখুন',

    // Products Page
    'products.title': 'আমাদের পণ্য পোর্টফোলিও',
    'products.subtitle': 'আন্তর্জাতিক WHO-GMP মান পূরণকারী উচ্চমানের ফার্মাসিউটিক্যাল পণ্যের ব্যাপক পরিসর',
    'products.search': 'পণ্য খুঁজুন',
    'products.search.placeholder': 'ট্রেড নাম, জেনেরিক নাম, বা নির্দেশনা দ্বারা খুঁজুন...',
    'products.filter': 'শ্রেণী দ্বারা ফিল্টার',
    'products.alphabet': 'বর্ণমালা দ্বারা ব্রাউজ করুন',
    'products.showing': 'দেখানো হচ্ছে',
    'products.of': 'এর মধ্যে',
    'products.products': 'পণ্য',
    'products.clear': 'সব ফিল্টার মুছুন',
    'products.notfound': 'কোন পণ্য পাওয়া যায়নি',
    'products.notfound.subtitle': 'আপনার অনুসন্ধান মানদণ্ড বা ফিল্টার সামঞ্জস্য করার চেষ্টা করুন',
    'products.viewall': 'সব পণ্য দেখুন',
    'products.generic': 'জেনেরিক',
    'products.findmore': 'আরও জানুন →',
    'products.description': 'বিবরণ',
    'products.composition': 'সংমিশ্রণ',
    'products.indications': 'নির্দেশনা',
    'products.genericname': 'জেনেরিক নাম:',
    'products.close': 'বন্ধ করুন',

    // About Page
    'about.title': 'আরএফ ফার্মাসিউটিক্যাল সম্পর্কে',
    'about.subtitle': 'ফার্মাসিউটিক্যাল উৎকর্ষতায় একটি বিশ্বস্ত নাম, মানসম্পন্ন স্বাস্থ্যসেবা সমাধানের মাধ্যমে জীবন উন্নত করতে নিবেদিত।',
    'about.story.title': 'আমাদের গল্প',
    'about.mission.title': 'আমাদের লক্ষ্য',
    'about.mission.text': 'যত্নে প্রতিশ্রুতিবদ্ধ: আমাদের লক্ষ্য হল সম্প্রদায়ের স্বাস্থ্য ও সুস্থতা উন্নত করতে উচ্চমানের, সহজলভ্য এবং জীবন রক্ষাকারী ফার্মাসিউটিক্যাল পণ্য সরবরাহ করা।',
    'about.vision.title': 'আমাদের দৃষ্টিভঙ্গি',
    'about.values.title': 'আমাদের মূল মূল্যবোধ',
    'about.governance.title': 'কর্পোরেট গভর্নেন্স',

    // Footer
    'footer.newsletter': 'নিউজলেটার',
    'footer.newsletter.text': 'নতুন পণ্য এবং কোম্পানির সংবাদ সম্পর্কে আপডেট পেতে সাবস্ক্রাইব করুন।',
    'footer.email.placeholder': 'আপনার ইমেইল',
    'footer.subscribe': 'সাবস্ক্রাইব',
    'footer.quicklinks': 'দ্রুত লিংক',
    'footer.contact': 'যোগাযোগের তথ্য',
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.terms': 'ব্যবহারের শর্তাবলী',
    'footer.cookies': 'কুকি নীতি',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'bn' ? 'bn' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
