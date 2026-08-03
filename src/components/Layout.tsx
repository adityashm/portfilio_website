import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CommandPalette from './modals/CommandPalette';
import ResumePreviewModal from './modals/ResumePreviewModal';
import ArchitectureModal from './modals/ArchitectureModal';
import AchievementToast from './modals/AchievementToast';
import AchievementCabinetModal from './modals/AchievementCabinetModal';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 dark:bg-[#030712] dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      {/* Interactive Content Overlay */}
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
        <CommandPalette />
        <ResumePreviewModal />
        <ArchitectureModal />
        <AchievementToast />
        <AchievementCabinetModal />
      </div>
    </div>
  );
};

export default Layout;
