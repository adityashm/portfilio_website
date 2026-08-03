import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 dark:bg-[#030712] dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      {/* Interactive Content Overlay */}
      <div className="relative z-10">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
