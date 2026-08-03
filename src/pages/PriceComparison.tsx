import { useState, useEffect, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, TrendingDown, Bell, Tag, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';
import SectionReveal from '../components/animations/SectionReveal';
import TiltCard from '../components/animations/TiltCard';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchDeals();
  }, []);

  const fetchProducts = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products (Status: ${response.status})`);
      }
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching products';
      console.error('Error fetching products:', err);
      setError(msg);
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/deals`);
      if (!response.ok) {
        throw new Error(`Failed to fetch deals (Status: ${response.status})`);
      }
      const data = await response.json();
      setDeals(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching deals';
      console.error('Error fetching deals:', err);
      setError(msg);
    }
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a product search query.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
      if (!response.ok) {
        throw new Error(`Search failed (Status: ${response.status})`);
      }
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error searching';
      console.error('Error searching:', err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSetAlert = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) {
      setError('Please select a product to set a price alert.');
      return;
    }

    if (!alertEmail.trim() || !alertPrice.trim()) {
      setError('Please fill in both email and target price.');
      return;
    }

    const parsedPrice = parseFloat(alertPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Please enter a valid positive number for target price.');
      return;
    }

    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: selectedProductId,
          target_price: parsedPrice,
          user_email: alertEmail.trim()
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to set alert (Status: ${response.status})`);
      }

      alert('Price alert set successfully!');
      setAlertEmail('');
      setAlertPrice('');
      setSelectedProductId(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error setting alert';
      console.error('Error setting alert:', err);
      setError(msg);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Price Comparison Tool | Aditya Sharma</title>
        <meta name="description" content="Compare product prices across major e-commerce platforms in real-time and set custom price drop alerts." />
        <link rel="canonical" href="https://adityashm.tech/price-comparison" />
        <meta property="og:title" content="Price Comparison Tool | Aditya Sharma" />
        <meta property="og:description" content="Compare product prices across major e-commerce platforms in real-time and set custom price drop alerts." />
        <meta property="og:url" content="https://adityashm.tech/price-comparison" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Price Comparison Tool | Aditya Sharma" />
        <meta name="twitter:description" content="Compare product prices across major e-commerce platforms in real-time and set custom price drop alerts." />
      </Helmet>
      <div className="min-h-screen bg-transparent text-white pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <SectionReveal direction="up">
            <div className="text-center mb-12">
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
                REAL-TIME E-COMMERCE INTELLIGENCE
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 tracking-tight">
                Price Comparison Tool
              </h1>
              <p className="text-lg text-slate-300 max-w-xl mx-auto font-medium">Find the best deals across e-commerce platforms</p>
              {error && (
                <div className="mt-4 max-w-md mx-auto p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl flex items-center justify-center gap-2 text-rose-200 text-sm shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                  <AlertTriangle size={18} className="text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </SectionReveal>

          {/* Search Section */}
          <SectionReveal direction="up" delay={0.1}>
            <div className="glass-card-cosmic rounded-2xl p-6 sm:p-8 mb-10 border border-white/10 shadow-2xl">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <label htmlFor="price-search-input" className="sr-only">Search products</label>
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" size={20} />
                  <input
                    id="price-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products (e.g., laptop, phone)..."
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Search for products"
                  className="px-8 py-3.5 min-h-[44px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </form>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products List */}
            <div className="lg:col-span-2">
              <SectionReveal direction="up">
                <div className="glass-card-cosmic rounded-2xl p-6 border border-white/10 shadow-xl">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white tracking-tight">
                    <TrendingDown className="text-emerald-400" />
                    Products
                  </h2>
                  
                  {(products ?? []).length === 0 ? (
                    <p className="text-slate-400 text-center py-8">No products found. Try searching for something!</p>
                  ) : (
                    <StaggerContainer className="space-y-4">
                      {(products ?? []).map((product) => (
                        <StaggerItem key={product?.id ?? Math.random()}>
                          <TiltCard glowColor="cyan" className="p-5 border border-white/10 hover:border-cyan-400/50 shadow-md">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h3 className="font-bold text-lg text-white mb-1 tracking-tight">{product?.name ?? 'Product'}</h3>
                                <span className="inline-flex items-center gap-1 text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                                  Platform: {product?.platform ?? 'Unknown'}
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-extrabold font-mono text-emerald-400">₹{(product?.lowest_price ?? 0).toLocaleString()}</p>
                                <button
                                  onClick={() => setSelectedProductId(product.id)}
                                  aria-label={`Set price alert for ${product?.name ?? 'Product'}`}
                                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline mt-2 inline-block focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded"
                                >
                                  Set Alert →
                                </button>
                              </div>
                            </div>
                          </TiltCard>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  )}
                </div>
              </SectionReveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Best Deals */}
              <SectionReveal direction="left">
                <div className="glass-card-cosmic rounded-2xl p-6 border border-white/10 shadow-xl">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white tracking-tight">
                    <Tag className="text-amber-400" />
                    Best Deals
                  </h2>
                  <div className="space-y-3">
                    {(deals ?? []).slice(0, 5).map((deal) => (
                      <div key={deal?.id ?? Math.random()} className="glass-card-spotlight rounded-xl p-3.5 border border-white/10 hover:border-cyan-400/40 transition-all">
                        <p className="font-bold text-sm mb-1 text-white">{deal?.name ?? 'Deal'}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-mono">{deal?.platform ?? 'Unknown'}</span>
                          <span className="text-emerald-400 font-mono font-extrabold">₹{(deal?.price ?? 0).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              {/* Price Alert Form */}
              {selectedProductId && (
                <SectionReveal direction="left">
                  <TiltCard glowColor="violet" className="p-6 border border-white/10 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white tracking-tight">
                      <Bell className="text-violet-400" />
                      Set Price Alert
                    </h2>
                    <form onSubmit={handleSetAlert} className="space-y-4">
                      <div>
                        <label htmlFor="alert-email" className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Email</label>
                        <input
                          id="alert-email"
                          type="email"
                          value={alertEmail}
                          onChange={(e) => setAlertEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-2.5 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="alert-price" className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Target Price (₹)</label>
                        <input
                          id="alert-price"
                          type="number"
                          step="any"
                          min="0.01"
                          value={alertPrice}
                          onChange={(e) => setAlertPrice(e.target.value)}
                          placeholder="50000"
                          className="w-full px-4 py-2.5 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        aria-label="Submit price alert"
                        className="w-full py-2.5 min-h-[44px] bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                      >
                        Set Alert
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedProductId(null)}
                        aria-label="Cancel setting price alert"
                        className="w-full py-2.5 min-h-[44px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 rounded-xl font-medium transition focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                      >
                        Cancel
                      </button>
                    </form>
                  </TiltCard>
                </SectionReveal>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <SectionReveal direction="up" delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm mb-3">
                Data sourced from multiple e-commerce platforms. Prices update in real-time.
              </p>
              <div className="inline-flex items-center justify-center gap-4 p-3 px-6 rounded-full glass-card-cosmic border border-white/10">
                <a
                  href="https://github.com/adityashm/price-comparison-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Price Comparison Source Code on GitHub"
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-sm hover:underline focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded transition"
                >
                  View Source Code
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={`${API_BASE_URL}/docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Price Comparison API Documentation"
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-sm hover:underline focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded transition"
                >
                  API Documentation
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </Layout>
  );
}
