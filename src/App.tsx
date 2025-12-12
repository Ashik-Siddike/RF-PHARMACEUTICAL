import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import ExportMarket from './pages/ExportMarket';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [editProductId, setEditProductId] = useState<string | undefined>(undefined);
  const { user, loading } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, productId?: string) => {
    if (productId) {
      setEditProductId(productId);
    } else {
      setEditProductId(undefined);
    }
    setCurrentPage(page);
  };

  const isAdminPage = currentPage.startsWith('admin');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-700 to-emerald-600 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
          <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAdminPage && !user) {
    return <AdminLogin onLoginSuccess={() => handleNavigate('admin-dashboard')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'products':
        return <Products />;
      case 'export':
        return <ExportMarket />;
      case 'careers':
        return <Careers />;
      case 'contact':
        return <Contact />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'admin-products':
        return <AdminProducts onNavigate={handleNavigate} />;
      case 'admin-add-product':
        return <AdminProductForm onNavigate={handleNavigate} />;
      case 'admin-edit-product':
        return <AdminProductForm productId={editProductId} onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  if (isAdminPage) {
    return <div className="min-h-screen bg-white">{renderPage()}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
