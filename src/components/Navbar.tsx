import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, GraduationCap, BookOpen, Database, FolderGit2, Mail, Home, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { path: '/', labelKey: 'nav.home', icon: Home },
  { path: '/publications', labelKey: 'nav.publications', icon: BookOpen },
  { path: '/students', labelKey: 'nav.students', icon: GraduationCap },
  { path: '/data-products', labelKey: 'nav.dataProducts', icon: Database },
  { path: '/projects', labelKey: 'nav.projects', icon: FolderGit2 },
  { path: '/contact', labelKey: 'nav.contact', icon: Mail },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">卢</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-white">卢文芳</span>
              <span className="text-xs text-white/60 ml-2">Wenfang Lu</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-white text-black'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{t('lang.switch')}</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-black/95 border-white/10">
                <div className="flex flex-col space-y-2 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-4 rounded-lg text-base font-medium transition-colors ${
                          isActive(item.path)
                            ? 'bg-white text-black'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{t(item.labelKey)}</span>
                      </Link>
                    );
                  })}
                  <div className="pt-4 border-t border-white/10">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        toggleLanguage();
                        setIsOpen(false);
                      }}
                      className="w-full text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center gap-2"
                    >
                      <Globe className="w-5 h-5" />
                      <span>{t('lang.current')} → {t('lang.switch')}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
