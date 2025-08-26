import React from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const { dispatch } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          onClick={() => onViewDetails(product)}
          src={import.meta.env.VITE_BACKEND_URL + product.image[0].slice(1)}
          alt={product.name}
          className={cn(
            "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer",
            !product.inStock && "grayscale"
          )}
        />
        {!product.inStock && (
          <div
            className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer"
            onClick={() => onViewDetails(product)}
          >
            <h2 className="text-2xl font-bold uppercase bg-red-600 text-white p-1 rounded-md">
              Sold out
            </h2>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              -{discountPercent}%
            </span>
          )}
          {product.featured && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Nổi bật
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Brand & Name */}
        <div className="mb-2">
          <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
          <h3
            className="font-semibold text-gray-900 line-clamp-2 hover:text-primary cursor-pointer"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Key Specs */}
        <div className="mb-3 space-y-1">
          <p className="text-xs text-gray-600">{product.specs.processor}</p>
          <p className="text-xs text-gray-600">
            {product.specs.ram} | {product.specs.storage}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              Thêm vào giỏ
            </button>
          ) : (
            <a
              href="https://zalo.me/0777770941"
              target="_blank"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
            >
              Liên hệ ngay
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
