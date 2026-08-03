import { useState, useEffect, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { PlusCircle, TrendingUp, DollarSign, PieChart as PieChartIcon, Lightbulb, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout';
import SectionReveal from '../components/animations/SectionReveal';
import TiltCard from '../components/animations/TiltCard';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';

interface User {
  id: number;
  name: string;
  email: string;
  monthly_budget: number;
}

interface Expense {
  id: number;
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

interface Recommendation {
  category: string;
  recommended: number;
  spent: number;
  remaining: number;
  status: string;
  tips: string;
}

const API_BASE_URL = 'https://web-production-a281.up.railway.app';

const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other'];
const COLORS = ['#00f0ff', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#3b82f6', '#a855f7'];

const DEMO_USER: User = {
  id: 1,
  name: 'Aditya Sharma (Demo Profile)',
  email: 'aditya.sharma@space-lab.in',
  monthly_budget: 50000
};

const DEMO_EXPENSES: Expense[] = [
  { id: 1, category: 'Food', amount: 4200, description: 'Grocery & Supermarket supplies', date: '2026-08-01' },
  { id: 2, category: 'Transport', amount: 2150, description: 'Metro & Uber Commute', date: '2026-08-02' },
  { id: 3, category: 'Utilities', amount: 3500, description: 'Fiber Internet & Electricity bill', date: '2026-07-28' },
  { id: 4, category: 'Shopping', amount: 9500, description: '27" Monitor Desk Accessory', date: '2026-07-25' },
  { id: 5, category: 'Entertainment', amount: 3100, description: 'Movie tickets & weekend dining', date: '2026-07-20' },
  { id: 6, category: 'Other', amount: 2400, description: 'Cloud AWS hosting & domain renewal', date: '2026-07-15' },
];

const DEMO_ANALYTICS: { category_breakdown: CategoryBreakdown[]; total_spent: number } = {
  total_spent: 24850,
  category_breakdown: [
    { category: 'Shopping', amount: 9500, percentage: 38.2 },
    { category: 'Food', amount: 4200, percentage: 16.9 },
    { category: 'Utilities', amount: 3500, percentage: 14.1 },
    { category: 'Entertainment', amount: 3100, percentage: 12.5 },
    { category: 'Other', amount: 2400, percentage: 9.7 },
    { category: 'Transport', amount: 2150, percentage: 8.6 },
  ]
};

const DEMO_RECOMMENDATIONS: { recommendations: Recommendation[] } = {
  recommendations: [
    {
      category: 'Shopping',
      recommended: 7500,
      spent: 9500,
      remaining: -2000,
      status: 'Warning',
      tips: 'You have spent 38% of your budget on Shopping this month. Consider deferring non-essential tech upgrades.'
    },
    {
      category: 'Food',
      recommended: 6000,
      spent: 4200,
      remaining: 1800,
      status: 'On Track',
      tips: 'Great job keeping grocery and dining expenses well within your monthly allocation.'
    },
    {
      category: 'Utilities',
      recommended: 4000,
      spent: 3500,
      remaining: 500,
      status: 'On Track',
      tips: 'Utility bills are consistent with last month.'
    }
  ]
};

export default function ExpenseTracker() {
  const [userId, setUserId] = useState<number | null>(1);
  const [user, setUser] = useState<User | null>(DEMO_USER);
  const [expenses, setExpenses] = useState<Expense[]>(DEMO_EXPENSES);
  const [analytics, setAnalytics] = useState<{ category_breakdown: CategoryBreakdown[], total_spent: number } | null>(DEMO_ANALYTICS);
  const [recommendations, setRecommendations] = useState<{ recommendations: Recommendation[] } | null>(DEMO_RECOMMENDATIONS);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserBudget, setNewUserBudget] = useState('');
  
  const [expenseCategory, setExpenseCategory] = useState('Food');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 600);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUser();
      fetchExpenses();
      fetchAnalytics();
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchUser = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user details (Status: ${response.status})`);
      }
      const data = await response.json();
      setUser(data);
    } catch {
      setUser(DEMO_USER);
      setError(null);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/expenses/${userId}?days=30`);
      if (!response.ok) {
        throw new Error(`Failed to fetch expenses (Status: ${response.status})`);
      }
      const data = await response.json();
      setExpenses(Array.isArray(data?.expenses) && data.expenses.length > 0 ? data.expenses : DEMO_EXPENSES);
    } catch {
      setExpenses(DEMO_EXPENSES);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/analytics/${userId}?days=30`);
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics (Status: ${response.status})`);
      }
      const data = await response.json();
      setAnalytics(data && typeof data === 'object' ? data : DEMO_ANALYTICS);
    } catch {
      setAnalytics(DEMO_ANALYTICS);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recommendations/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations (Status: ${response.status})`);
      }
      const data = await response.json();
      setRecommendations(data && typeof data === 'object' ? data : DEMO_RECOMMENDATIONS);
    } catch {
      setRecommendations(DEMO_RECOMMENDATIONS);
    }
  };

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserBudget.trim()) {
      setError('Please fill in all required fields to create an account.');
      return;
    }

    const parsedBudget = parseFloat(newUserBudget);
    if (isNaN(parsedBudget) || parsedBudget <= 0) {
      setError('Please enter a valid positive number for monthly budget.');
      return;
    }

    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName.trim(),
          email: newUserEmail.trim(),
          monthly_budget: parsedBudget
        })
      });
      if (!response.ok) {
        throw new Error(`Failed to create user account (Status: ${response.status})`);
      }
      const data = await response.json();
      if (data?.id) {
        setUserId(data.id);
        setNewUserName('');
        setNewUserEmail('');
        setNewUserBudget('');
      } else {
        throw new Error('User creation response missing ID');
      }
    } catch {
      const localUser: User = {
        id: Date.now(),
        name: newUserName.trim(),
        email: newUserEmail.trim(),
        monthly_budget: parsedBudget
      };
      setUser(localUser);
      setUserId(localUser.id);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserBudget('');
      setError(null);
    }
  };

  const handleAddExpense = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    if (!expenseCategory.trim() || !expenseAmount.trim() || !expenseDescription.trim()) {
      setError('Please fill in all expense details (Category, Amount, Description).');
      return;
    }

    const parsedAmount = parseFloat(expenseAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive number for expense amount.');
      return;
    }

    const newExp: Expense = {
      id: Date.now(),
      category: expenseCategory,
      amount: parsedAmount,
      description: expenseDescription.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          category: expenseCategory,
          amount: parsedAmount,
          description: expenseDescription.trim()
        })
      });
      if (!response.ok) {
        throw new Error(`Failed to add expense (Status: ${response.status})`);
      }
      
      setExpenseAmount('');
      setExpenseDescription('');
      fetchExpenses();
      fetchAnalytics();
      fetchRecommendations();
    } catch {
      const nextExpenses = [newExp, ...expenses];
      setExpenses(nextExpenses);
      const newTotal = analytics ? analytics.total_spent + parsedAmount : parsedAmount;
      setAnalytics(prev => ({
        total_spent: newTotal,
        category_breakdown: prev ? prev.category_breakdown.map(b => 
          b.category === expenseCategory ? { ...b, amount: b.amount + parsedAmount } : b
        ) : []
      }));
      setExpenseAmount('');
      setExpenseDescription('');
      setError(null);
    }
  };

  if (!userId) {
    return (
      <Layout>
        <Helmet>
          <title>Expense Tracker | Aditya Sharma</title>
          <meta name="description" content="Personal financial management dashboard with intelligent category breakdown and AI-driven budget recommendations." />
          <link rel="canonical" href="https://adityashm.tech/expense-tracker" />
          <meta property="og:title" content="Expense Tracker | Aditya Sharma" />
          <meta property="og:description" content="Personal financial management dashboard with intelligent category breakdown and AI-driven budget recommendations." />
          <meta property="og:url" content="https://adityashm.tech/expense-tracker" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Expense Tracker | Aditya Sharma" />
          <meta name="twitter:description" content="Personal financial management dashboard with intelligent category breakdown and AI-driven budget recommendations." />
        </Helmet>
        <div className="min-h-screen bg-transparent text-white flex items-center justify-center pt-24 pb-12 relative z-10">
          <SectionReveal direction="up" className="max-w-md w-full mx-4">
            <TiltCard glowColor="violet" className="p-8 border border-white/10 shadow-2xl">
              <h1 className="text-3xl font-extrabold mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 tracking-tight">
                Expense Tracker
              </h1>
              <p className="text-slate-300 mb-6 text-center text-sm">Create an account to start tracking your expenses</p>
              
              {error && (
                <div className="mb-4 p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl flex items-center gap-2 text-rose-200 text-sm shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                  <AlertTriangle size={18} className="text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label htmlFor="exp-user-name" className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Name</label>
                  <input
                    id="exp-user-name"
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="exp-user-email" className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Email</label>
                  <input
                    id="exp-user-email"
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="exp-user-budget" className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Monthly Budget (₹)</label>
                  <input
                    id="exp-user-budget"
                    type="number"
                    step="any"
                    min="0.01"
                    value={newUserBudget}
                    onChange={(e) => setNewUserBudget(e.target.value)}
                    placeholder="50000"
                    className="w-full px-4 py-3 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Create Expense Tracker Account"
                  className="w-full py-3.5 min-h-[44px] bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                >
                  Create Account
                </button>
              </form>
            </TiltCard>
          </SectionReveal>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Expense Tracker | Aditya Sharma</title>
        <meta name="description" content="Personal financial management dashboard with intelligent category breakdown and AI-driven budget recommendations." />
        <link rel="canonical" href="https://adityashm.tech/expense-tracker" />
        <meta property="og:title" content="Expense Tracker | Aditya Sharma" />
        <meta property="og:description" content="Personal financial management dashboard with intelligent category breakdown and AI-driven budget recommendations." />
        <meta property="og:url" content="https://adityashm.tech/expense-tracker" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Expense Tracker | Aditya Sharma" />
        <meta name="twitter:description" content="Personal financial management dashboard with intelligent category breakdown and AI-driven budget recommendations." />
      </Helmet>
      <div className="min-h-screen bg-transparent text-white pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <SectionReveal direction="up">
            <div className="mb-8">
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-1">
                FINANCIAL MANAGEMENT DASHBOARD
              </span>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 tracking-tight">
                Expense Tracker
              </h1>
              {user && (
                <p className="text-slate-300 mt-2 font-medium">
                  Welcome back, <span className="text-cyan-300 font-bold">{user?.name || 'User'}</span>! Your monthly budget: <span className="text-emerald-400 font-mono font-bold">₹{(user?.monthly_budget ?? 0).toLocaleString()}</span>
                </p>
              )}
              {error && (
                <div className="mt-4 p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl flex items-center gap-2 text-rose-200 text-sm shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                  <AlertTriangle size={18} className="text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </SectionReveal>

          {/* Stats Cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StaggerItem>
              <TiltCard glowColor="cyan" className="p-6 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Total Spent</p>
                    <p className="text-3xl font-extrabold text-rose-400 font-mono mt-1">₹{(analytics?.total_spent ?? 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-rose-950/60 border border-rose-500/30 text-rose-400 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.25)]">
                    <DollarSign size={32} />
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
            
            <StaggerItem>
              <TiltCard glowColor="emerald" className="p-6 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Remaining Budget</p>
                    <p className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                      ₹{((user?.monthly_budget ?? 0) - (analytics?.total_spent ?? 0)).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                    <TrendingUp size={32} />
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
            
            <StaggerItem>
              <TiltCard glowColor="violet" className="p-6 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Expenses Count</p>
                    <p className="text-3xl font-extrabold text-cyan-400 font-mono mt-1">{(expenses ?? []).length}</p>
                  </div>
                  <div className="p-3 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                    <PieChartIcon size={32} />
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          </StaggerContainer>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Add Expense Form */}
              <SectionReveal direction="up">
                <TiltCard glowColor="cyan" className="p-6 border border-white/10 shadow-xl">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white tracking-tight">
                    <PlusCircle className="text-cyan-400" />
                    Add Expense
                  </h2>
                  <form onSubmit={handleAddExpense} className="flex flex-col sm:flex-row gap-4 flex-wrap">
                    <div className="flex-1 min-w-[150px]">
                      <label htmlFor="exp-category" className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Category</label>
                      <select
                        id="exp-category"
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-950/70 border border-white/10 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                      <label htmlFor="exp-amount" className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Amount (₹)</label>
                      <input
                        id="exp-amount"
                        type="number"
                        step="any"
                        min="0.01"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        placeholder="500"
                        className="w-full px-4 py-3 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                      <label htmlFor="exp-description" className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">Description</label>
                      <input
                        id="exp-description"
                        type="text"
                        value={expenseDescription}
                        onChange={(e) => setExpenseDescription(e.target.value)}
                        placeholder="Lunch"
                        className="w-full px-4 py-3 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      aria-label="Add Expense"
                      className="w-full py-3.5 min-h-[44px] bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none mt-2"
                    >
                      Add Expense
                    </button>
                  </form>
                </TiltCard>
              </SectionReveal>

              {/* Category Breakdown Chart */}
              {analytics && (analytics?.category_breakdown ?? []).length > 0 && (
                <SectionReveal direction="up">
                  <div className="glass-card-cosmic rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">Spending by Category</h2>
                    <div className="h-64 sm:h-80 w-full overflow-hidden">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={(analytics?.category_breakdown ?? []).map(cat => ({ ...cat, name: cat?.category ?? '' }))}
                            dataKey="amount"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={windowWidth < 480 ? 65 : 100}
                            label={({ name, value }) => `${name}: ₹${(value ?? 0).toLocaleString()}`}
                          >
                            {(analytics?.category_breakdown ?? []).map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ffffff' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </SectionReveal>
              )}

              {/* Recent Expenses */}
              <SectionReveal direction="up">
                <div className="glass-card-cosmic rounded-2xl p-6 border border-white/10 shadow-xl">
                  <h2 className="text-2xl font-bold mb-4 text-white tracking-tight">Recent Expenses</h2>
                  <div className="space-y-3">
                    {(expenses ?? []).slice(0, 10).map((expense) => (
                      <div key={expense?.id ?? Math.random()} className="glass-card-spotlight rounded-xl p-4 border border-white/10 hover:border-cyan-400/40 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-white text-base">{expense?.description ?? ''}</p>
                            <p className="text-xs font-mono text-cyan-400 mt-0.5">{expense?.category ?? ''}</p>
                          </div>
                          <p className="text-xl font-mono font-extrabold text-rose-400">₹{(expense?.amount ?? 0).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Sidebar - AI Recommendations */}
            <div>
              {recommendations && (
                <SectionReveal direction="left">
                  <div className="glass-card-cosmic rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white tracking-tight">
                      <Lightbulb className="text-amber-400" />
                      AI Recommendations
                    </h2>
                    <div className="space-y-4">
                      {(recommendations?.recommendations ?? []).map((rec, index) => (
                        <div key={index} className="glass-card-spotlight rounded-xl p-4 border border-white/10 hover:border-cyan-400/40 transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-white">{rec?.category ?? 'Category'}</h3>
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold ${
                              rec?.status === 'On Track' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                            }`}>
                              {rec?.status ?? 'N/A'}
                            </span>
                          </div>
                          <div className="space-y-1.5 text-xs font-mono mb-3">
                            <div className="flex justify-between text-slate-300">
                              <span>Recommended:</span>
                              <span className="font-semibold text-white">₹{(rec?.recommended ?? 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>Spent:</span>
                              <span className={(rec?.spent ?? 0) > (rec?.recommended ?? 0) ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                                ₹{(rec?.spent ?? 0).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>Remaining:</span>
                              <span className={(rec?.remaining ?? 0) < 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                                ₹{(rec?.remaining ?? 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 italic leading-relaxed">{rec?.tips ?? ''}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <SectionReveal direction="up" delay={0.2}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center justify-center gap-4 p-3 px-6 rounded-full glass-card-cosmic border border-white/10">
                <a
                  href="https://github.com/adityashm/expense-tracker-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Expense Tracker Source Code on GitHub"
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-sm hover:underline focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded transition"
                >
                  View Source Code
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={`${API_BASE_URL}/docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Expense Tracker API Documentation"
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
