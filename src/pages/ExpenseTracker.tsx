import { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, DollarSign, PieChart as PieChartIcon, Lightbulb } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#64748b'];

export default function ExpenseTracker() {
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [analytics, setAnalytics] = useState<{ category_breakdown: CategoryBreakdown[], total_spent: number } | null>(null);
  const [recommendations, setRecommendations] = useState<{ recommendations: Recommendation[] } | null>(null);
  
  // Form states
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserBudget, setNewUserBudget] = useState('');
  
  const [expenseCategory, setExpenseCategory] = useState('Food');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUser();
      fetchExpenses();
      fetchAnalytics();
      fetchRecommendations();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/expenses/${userId}?days=30`);
      const data = await response.json();
      setExpenses(data.expenses || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/analytics/${userId}?days=30`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recommendations/${userId}`);
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          monthly_budget: parseFloat(newUserBudget)
        })
      });
      const data = await response.json();
      setUserId(data.id);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserBudget('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      await fetch(`${API_BASE_URL}/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          category: expenseCategory,
          amount: parseFloat(expenseAmount),
          description: expenseDescription
        })
      });
      
      setExpenseAmount('');
      setExpenseDescription('');
      fetchExpenses();
      fetchAnalytics();
      fetchRecommendations();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
            <p className="text-gray-300 mb-6 text-center">Create an account to start tracking your expenses</p>
            
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Monthly Budget (₹)</label>
                <input
                  type="number"
                  value={newUserBudget}
                  onChange={(e) => setNewUserBudget(e.target.value)}
                  placeholder="50000"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          {user && (
            <p className="text-gray-300">
              Welcome back, {user.name}! Your monthly budget: ₹{user.monthly_budget.toLocaleString()}
            </p>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-red-400">₹{analytics?.total_spent.toLocaleString() || '0'}</p>
              </div>
              <DollarSign className="text-red-400" size={40} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Remaining Budget</p>
                <p className="text-3xl font-bold text-green-400">
                  ₹{((user?.monthly_budget || 0) - (analytics?.total_spent || 0)).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="text-green-400" size={40} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Expenses Count</p>
                <p className="text-3xl font-bold text-blue-400">{expenses.length}</p>
              </div>
              <PieChartIcon className="text-blue-400" size={40} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Add Expense Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <PlusCircle className="text-purple-400" />
                Add Expense
              </h2>
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                  <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    placeholder="500"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={expenseDescription}
                    onChange={(e) => setExpenseDescription(e.target.value)}
                    placeholder="Lunch"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="md:col-span-3 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition"
                >
                  Add Expense
                </button>
              </form>
            </div>

            {/* Category Breakdown Chart */}
            {analytics && analytics.category_breakdown.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-6">Spending by Category</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.category_breakdown}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={(entry) => `${entry.category}: ₹${entry.amount.toLocaleString()}`}
                      >
                        {analytics.category_breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Recent Expenses */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
              <div className="space-y-3">
                {expenses.slice(0, 10).map((expense) => (
                  <div key={expense.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{expense.description}</p>
                        <p className="text-sm text-gray-400">{expense.category}</p>
                      </div>
                      <p className="text-xl font-bold text-red-400">₹{expense.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - AI Recommendations */}
          <div>
            {recommendations && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="text-yellow-400" />
                  AI Recommendations
                </h2>
                <div className="space-y-4">
                  {recommendations.recommendations.map((rec, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{rec.category}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          rec.status === 'On Track' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {rec.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm mb-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Recommended:</span>
                          <span>₹{rec.recommended.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Spent:</span>
                          <span className={rec.spent > rec.recommended ? 'text-red-400' : 'text-green-400'}>
                            ₹{rec.spent.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Remaining:</span>
                          <span className={rec.remaining < 0 ? 'text-red-400' : 'text-green-400'}>
                            ₹{rec.remaining.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 italic">{rec.tips}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/adityashm/expense-tracker-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition"
            >
              View Source Code
            </a>
            <span className="text-gray-600">•</span>
            <a
              href={`${API_BASE_URL}/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition"
            >
              API Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
