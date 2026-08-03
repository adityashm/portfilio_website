import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const PriceComparison = lazy(() => import('./pages/PriceComparison'));
const ExpenseTracker = lazy(() => import('./pages/ExpenseTracker'));
const DataDashboard = lazy(() => import('./pages/DataDashboard'));
const WebScraper = lazy(() => import('./pages/WebScraper'));
const RestApiDocs = lazy(() => import('./pages/RestApiDocs'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent text-white relative z-10" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4 p-6 glass-card-cosmic rounded-2xl border border-white/10 shadow-2xl">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(0,240,255,0.5)]"></div>
        <span className="text-sm font-mono text-cyan-300 tracking-wider uppercase">Loading experience...</span>
      </div>
    </div>
  );
}

function SpaRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle GitHub Pages 404 redirect for SPA routing
    const params = new URLSearchParams(window.location.search);
    const route = params.get('route') || params.get('p') || params.get('redirect');
    
    if (route) {
      navigate(route, { replace: true });
    }
  }, [navigate]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <SpaRedirectHandler />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/price-comparison" element={<PriceComparison />} />
              <Route path="/expense-tracker" element={<ExpenseTracker />} />
              <Route path="/data-dashboard" element={<DataDashboard />} />
              <Route path="/web-scraper" element={<WebScraper />} />
              <Route path="/rest-api" element={<RestApiDocs />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;