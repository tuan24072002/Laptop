import React, { useEffect } from 'react';
import { ChevronRight, Star, Truck, Shield, RotateCcw, Phone } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/Product';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchAll } from '@/slice/product/Product.slice';
import TrustedBrand from '@/components/TrustedBrand';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  onProductView: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onProductView }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productState = useAppSelector(state => state.product);
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch])
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Laptop Chất Lượng
                <span className="block text-yellow-400">Giá Tốt Nhất</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Thu mua laptop nhanh chóng, giá cao – kiểm tra tận nơi, thanh toán liền tay. Hỗ trợ mọi dòng máy, đảm bảo minh bạch, uy tín tuyệt đối.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/products')}
                  className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Xem sản phẩm</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Liên hệ tư vấn</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Laptop showcase"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
                <p className="text-2xl font-bold text-blue-600 text-center">36+</p>
                <p className="text-sm">Khách hàng hài lòng</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-20 flex items-center justify-center bg-white">
        <TrustedBrand />
      </div>


      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-lg text-gray-600">
              Những mẫu laptop được khách hàng yêu thích nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {
              productState.list.filter(p => p.inStock && p.featured).slice(0, 3)?.length > 0 && productState.list.filter(p => p.inStock && p.featured).slice(0, 3)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={onProductView}
                  />
                ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/products')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại sao chọn Laptop 93?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Giao hàng nhanh</h3>
              <p className="text-gray-600">Miễn phí vận chuyển toàn quốc. Giao hàng trong 24h tại TP.HCM và Hà Nội.</p>
            </div>

            <div className="text-center group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bảo hành chính hãng</h3>
              <p className="text-gray-600">Tất cả sản phẩm đều có bảo hành chính hãng từ nhà sản xuất.</p>
            </div>

            <div className="text-center group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <RotateCcw className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Đổi trả dễ dàng</h3>
              <p className="text-gray-600">Chính sách đổi trả linh hoạt trong vòng 7 ngày nếu không hài lòng.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-yellow-400 mb-2">36+</p>
              <p className="text-blue-200">Khách hàng</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-yellow-400 mb-2">50+</p>
              <p className="text-blue-200">Mẫu laptop</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-yellow-400 mb-2">5</p>
              <p className="text-blue-200">Năm kinh nghiệm</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-yellow-400 mb-2">24/7</p>
              <p className="text-blue-200">Hỗ trợ khách hàng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Khách hàng nói gì về chúng tôi?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Laptop MacBook mua ở đây chất lượng tuyệt vời, giá cả hợp lý.
                Nhân viên tư vấn rất nhiệt tình và chuyên nghiệp."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Anh Minh</p>
                  <p className="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Mua laptop gaming ở đây, cấu hình mạnh, chơi game mượt mà.
                Dịch vụ hậu mãi chu đáo, rất hài lòng."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  T
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Chị Thảo</p>
                  <p className="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Giao hàng nhanh, đóng gói cẩn thận. Laptop Dell XPS hoạt động
                ổn định, phù hợp cho công việc văn phòng."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  H
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Anh Hải</p>
                  <p className="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;