import React, { useEffect, useState } from 'react';
import { X, Star, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { useClickAway } from "@uidotdev/usehooks";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { dispatch } = useCart();
  const ref = useClickAway<HTMLDivElement>(() => {
    onClose();
  });
  const [thumbnail, setThumbnail] = useState(product?.image?.[0]);
  useEffect(() => {
    if (product) {
      setThumbnail(product.image[0]);
    }
  }, [product])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };
  if (!isOpen || !product) return null;
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div ref={ref} className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden overflow-y-auto hidden-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">Chi tiết sản phẩm</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <div className="flex gap-3">
                <div className="flex flex-col gap-3 h-[265px] overflow-x-hidden overflow-y-auto hidden-scrollbar">
                  {product.image.map((image, index) => (
                    <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 min-h-14 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                      <img src={import.meta.env.VITE_BACKEND_URL + image.slice(1)} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>

                <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden flex-1">
                  <img src={import.meta.env.VITE_BACKEND_URL + thumbnail?.slice(1)} alt="Selected product" className="w-full h-full object-cover" />
                </div>
              </div>


              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                {!product.inStock && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Hết hàng
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -{discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Name */}
              <div>
                <p className="text-lg text-blue-600 font-medium">{product.brand}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h3>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviewCount} đánh giá)
                </span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <p className="text-sm text-green-600 mt-1">
                    Tiết kiệm {formatPrice(product.originalPrice! - product.price)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h4>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Add to Cart */}
              {product.inStock ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-lg cursor-not-allowed font-medium"
                >
                  Hết hàng
                </button>
              )}

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex flex-col justify-center items-center gap-2 text-gray-600">
                  <Truck className="size-5 text-green-600" />
                  <span className='text-center text-xs'>Miễn phí vận chuyển</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 text-gray-600">
                  <Shield className="size-5 text-blue-600" />
                  <span className='text-center text-xs'>Bảo hành chính hãng</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 text-gray-600">
                  <RotateCcw className="size-5 text-purple-600" />
                  <span className='text-center text-xs'>Đổi trả 7 ngày</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-8 pt-8 border-t">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-3">Hiệu năng</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bộ xử lý:</span>
                    <span className="font-medium">{product.specs.processor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RAM:</span>
                    <span className="font-medium">{product.specs.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ổ cứng:</span>
                    <span className="font-medium">{product.specs.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card đồ họa:</span>
                    <span className="font-medium">{product.specs.graphics}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-3">Hiển thị & Pin</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Màn hình:</span>
                    <span className="font-medium">{product.specs.display}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pin:</span>
                    <span className="font-medium">{product.specs.battery}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;