import { useEffect, useState } from 'react';
import { Package, TrendingUp, AlertCircle, Plus, LogOut, List } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        supabase.from('products').select('id, is_active', { count: 'exact' }),
        supabase.from('product_categories').select('id', { count: 'exact' }),
      ]);

      if (productsResponse.data) {
        const total = productsResponse.data.length;
        const active = productsResponse.data.filter(p => p.is_active).length;
        setStats({
          totalProducts: total,
          activeProducts: active,
          inactiveProducts: total - active,
          categories: categoriesResponse.data?.length || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RF</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-teal-800">Admin Portal</h1>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-gray-700 hover:text-teal-600 transition"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome to the Product Management System</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: Package,
                  label: 'Total Products',
                  value: stats.totalProducts,
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  icon: TrendingUp,
                  label: 'Active Products',
                  value: stats.activeProducts,
                  color: 'from-emerald-500 to-emerald-600',
                },
                {
                  icon: AlertCircle,
                  label: 'Inactive Products',
                  value: stats.inactiveProducts,
                  color: 'from-amber-500 to-amber-600',
                },
                {
                  icon: List,
                  label: 'Categories',
                  value: stats.categories,
                  color: 'from-teal-500 to-teal-600',
                },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg mb-4`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => onNavigate('admin-products')}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl group-hover:scale-110 transition-transform">
                    <List className="h-8 w-8 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Manage Products</h3>
                <p className="text-gray-600">View, edit, and delete existing products</p>
              </button>

              <button
                onClick={() => onNavigate('admin-add-product')}
                className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow text-left text-white group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl group-hover:scale-110 transition-transform">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Add New Product</h3>
                <p className="text-teal-50">Create a new product entry in the catalog</p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
