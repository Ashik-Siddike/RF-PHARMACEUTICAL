import { useEffect, useState } from 'react';
import { Search, Package, Filter, X } from 'lucide-react';
import { supabase, Product, ProductCategory } from '../lib/supabase';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, selectedLetter, products]);

  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('name', { ascending: true }),
        supabase
          .from('product_categories')
          .select('*')
          .order('display_order', { ascending: true }),
      ]);

      if (productsResponse.data) setProducts(productsResponse.data);
      if (categoriesResponse.data) setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category_id === selectedCategory);
    }

    if (selectedLetter !== 'all') {
      filtered = filtered.filter((product) =>
        product.name.charAt(0).toUpperCase() === selectedLetter
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.composition.toLowerCase().includes(query) ||
          product.indications.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLetter('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedLetter !== 'all';

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Product Portfolio</h1>
          <p className="text-xl text-teal-50 max-w-3xl">
            Comprehensive range of high-quality pharmaceutical products meeting international WHO-GMP standards
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by trade name, generic name, or indication..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">Browse by Alphabet</label>
                {selectedLetter !== 'all' && (
                  <button
                    onClick={() => setSelectedLetter('all')}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedLetter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedLetter === 'all'
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {alphabet.map((letter) => {
                  const count = products.filter(p => p.name.charAt(0).toUpperCase() === letter).length;
                  return (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      disabled={count === 0}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedLetter === letter
                          ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                          : count > 0
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {letter}
                      {count > 0 && (
                        <span className={`ml-1 text-xs ${selectedLetter === letter ? 'text-teal-100' : 'text-gray-500'}`}>
                          ({count})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <p className="text-gray-700">
                Showing <span className="font-bold text-teal-600 text-lg">{filteredProducts.length}</span> of{' '}
                <span className="font-semibold">{products.length}</span> products
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition flex items-center"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Package className="h-20 w-20 text-gray-300 mx-auto mb-4" />
              <p className="text-2xl font-bold text-gray-900 mb-2">No products found</p>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative h-52 bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="relative">
                        <Package className="h-24 w-24 text-teal-600 group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-teal-600 opacity-0 group-hover:opacity-10 rounded-full blur-xl transition-opacity"></div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                      {product.name}
                    </h3>
                    {product.composition && (
                      <p className="text-sm text-gray-600 mb-3 font-medium line-clamp-1">
                        Generic: {product.composition}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.dosage_form && (
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                          {product.dosage_form}
                        </span>
                      )}
                      {product.strength && (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                          {product.strength}
                        </span>
                      )}
                    </div>
                    <button className="w-full py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all text-sm group-hover:shadow-lg">
                      Find More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 bg-gradient-to-br from-teal-100 via-white to-emerald-100 flex items-center justify-center">
              {selectedProduct.image_url ? (
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="h-40 w-40 text-teal-600" />
              )}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
              {selectedProduct.composition && (
                <div className="mb-6">
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold text-teal-600">Generic Name:</span> {selectedProduct.composition}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-3 mb-8">
                {selectedProduct.dosage_form && (
                  <span className="px-4 py-2 bg-teal-100 text-teal-700 text-sm font-medium rounded-full">
                    {selectedProduct.dosage_form}
                  </span>
                )}
                {selectedProduct.strength && (
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                    {selectedProduct.strength}
                  </span>
                )}
                {selectedProduct.pack_size && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {selectedProduct.pack_size}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {selectedProduct.description && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <div className="w-1 h-6 bg-teal-600 mr-3 rounded"></div>
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                  </div>
                )}

                {selectedProduct.indications && (
                  <div className="bg-teal-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <div className="w-1 h-6 bg-teal-600 mr-3 rounded"></div>
                      Indications
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProduct.indications}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transition shadow-lg text-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
