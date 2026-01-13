import { useState, useEffect } from 'react';
import { Search, TrendingDown, Bell, Tag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  lowest_price: number;
  platform: string;
  last_updated: string;
}

interface Deal {
  id: number;
  name: string;
  price: number;
  platform: string;
}

const API_BASE_URL = 'https://web-production-c117d.up.railway.app';

export default function PriceComparison() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertPrice, setAlertPrice] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchDeals();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/deals`);
      const data = await response.json();
      setDeals(data.deals || []);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      // Wait a bit for scraping to complete
      setTimeout(() => {
        fetchProducts();
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error searching:', error);
      setLoading(false);
    }
  };

  const handleSetAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !alertEmail || !alertPrice) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: selectedProductId,
          target_price: parseFloat(alertPrice),
          user_email: alertEmail
        })
      });
      
      if (response.ok) {
        alert('Price alert set successfully!');
        setAlertEmail('');
        setAlertPrice('');
        setSelectedProductId(null);
      }
    } catch (error) {
      console.error('Error setting alert:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Price Comparison Tool
          </h1>
          <p className="text-xl text-gray-300">Find the best deals across e-commerce platforms</p>
        </div>

        {/* Search Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products (e.g., laptop, phone)..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products List */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingDown className="text-green-400" />
                Products
              </h2>
              
              {products.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No products found. Try searching for something!</p>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-gray-400 text-sm">Platform: {product.platform}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-400">₹{product.lowest_price.toLocaleString()}</p>
                          <button
                            onClick={() => setSelectedProductId(product.id)}
                            className="text-sm text-blue-400 hover:text-blue-300 mt-1"
                          >
                            Set Alert
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Best Deals */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Tag className="text-yellow-400" />
                Best Deals
              </h2>
              <div className="space-y-3">
                {deals.slice(0, 5).map((deal) => (
                  <div key={deal.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="font-medium text-sm mb-1">{deal.name}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{deal.platform}</span>
                      <span className="text-green-400 font-bold">₹{deal.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Alert Form */}
            {selectedProductId && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Bell className="text-purple-400" />
                  Set Price Alert
                </h2>
                <form onSubmit={handleSetAlert} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Price (₹)</label>
                    <input
                      type="number"
                      value={alertPrice}
                      onChange={(e) => setAlertPrice(e.target.value)}
                      placeholder="50000"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition"
                  >
                    Set Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProductId(null)}
                    className="w-full py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Data sourced from multiple e-commerce platforms. Prices update in real-time.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://github.com/adityashm/price-comparison-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              View Source Code
            </a>
            <span className="text-gray-600">•</span>
            <a
              href={`${API_BASE_URL}/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              API Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
