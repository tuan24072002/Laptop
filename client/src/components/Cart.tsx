import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, HandCoins } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { confirm } from '@/utils/alert';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const handleBuyNow = () => {
    const messageLines = state.items.map((item, index) => {
      return `${index + 1}. ${item.product.name} - ${item.quantity} x ${formatPrice(item.product.price)} = ${formatPrice(item.product.price * item.quantity)}`;
    });

    const message = `🛒 Đơn hàng mới:\n\n${messageLines.join('\n')}\n\nTổng cộng: ${formatPrice(state.total)}`;

    confirm(`Sao chép tin nhắn sau và gửi qua Zalo:\n\n${message}`, () => {
      navigator.clipboard.writeText(message);

      window.open("https://zalo.me/0777770941", "_blank");
      clearCart();
    });

  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Giỏ hàng ({state.itemCount})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {state.items.length === 0 ? (
          // Empty Cart
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <ShoppingBag className="h-16 w-16 mb-4" />
            <p className="text-lg font-medium">Giỏ hàng trống</p>
            <p className="text-sm">Thêm sản phẩm để bắt đầu mua sắm</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 p-4 space-y-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex space-x-4">
                    <img
                      src={import.meta.env.VITE_BACKEND_URL + item.product.image[0].slice(1)}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.product.brand}</p>
                      <p className="text-sm font-semibold text-blue-600">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 bg-white rounded border">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">{formatPrice(state.total)}</span>
              </div>

              <div className="space-y-2">
                <button onClick={handleBuyNow} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                  <HandCoins />Mua ngay
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border border-red-300 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 />Xóa tất cả
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;