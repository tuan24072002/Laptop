import React, { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X, Laptop, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAppContext } from '@/context/AppContext';
import { useClickAway } from '@uidotdev/usehooks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setShowUserLogin } from '@/slice/auth/Auth.slice';
import { assets } from '@/assets';
import { cn } from '@/lib/utils';
import { setLogined, setUser } from '@/slice/app/App.slice';
import { AuthService } from '@/services/Auth.service';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBanner from './TopBanner';

interface HeaderProps {
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const appState = useAppSelector(state => state.app);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const { state } = useCart();
  const { search, setSearch } = useAppContext();
  const toggleMenuDropdown = () => setOpenDropdown(prev => !prev);
  const handleLogout = () => {
    dispatch(setLogined(false));
    dispatch(setUser(null));
    AuthService.logout();
  }
  const navigationItems = [
    { id: '', label: 'Trang chủ', admin: false },
    { id: 'products', label: 'Sản phẩm', admin: false },
    { id: 'contact', label: 'Liên hệ', admin: false },
    { id: 'admin', label: 'Quản trị', admin: true }
  ];
  const ref = useClickAway<HTMLInputElement>(() => {
    setIsSearchOpen(false);
  });
  useEffect(() => {
    if (search) {
      navigate('/products');
    }
  }, [navigate, search])
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <TopBanner showTopBanner={showTopBanner} setShowTopBanner={setShowTopBanner} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <Laptop className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Laptop 93</h1>
              <p className="text-xs text-gray-500">Chuyên mua bán laptop</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
            {navigationItems.map((item) => {
              if (item.admin && (!appState.user || appState.user.role !== "ADMIN")) return null;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(`/${item.id}`)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname.slice(1) === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <div className={`relative h-10 w-fit flex items-center px-2`}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10 ml-auto"
              >
                <Search className="h-5 w-5" />
              </button>

              <input
                ref={ref}
                type="text"
                placeholder="Tìm kiếm..."
                className={`absolute right-0 h-10 pl-4 pr-14 text-sm bg-white text-black rounded transition-all duration-300 ease-in-out outline-none border border-blue-700  xl:w-64 lg:w-40 w-32
        ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {
              appState.user ?
                <div className="relative group">
                  <img
                    src={assets.profile_icon}
                    alt="Profile"
                    className="w-10"
                    onClick={toggleMenuDropdown} />
                  <ul className={cn("absolute top-10 right-0 bg-background shadow border border-gray-200 w-40 py-2.5 rounded-md text-sm z-40", openDropdown ? "block" : "hidden group-hover:block")}>
                    <li className="p-1.5 pl-3 text-sm text-accent-foreground">Xin chào, <span className="text-primary font-semibold">{appState.user.name}</span></li>
                    <hr className="border-gray-200" />
                    <li
                      className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                      onClick={handleLogout}
                    >Đăng xuất</li>
                  </ul>
                </div>
                :
                <>
                  {/* User Icon */}
                  <button onClick={() => dispatch(setShowUserLogin(true))} className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <User className="h-5 w-5" />
                  </button>
                </>
            }

            {/* Cart */}
            <button
              onClick={() => onCartOpen()}
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                if (item.admin && (!appState.user || appState.user.role !== "ADMIN")) return null;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(`/${item.id}`)
                      setIsMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${location.pathname.slice(1) === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;