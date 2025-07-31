import { Product } from "@/types/Product"
import { Eye, Plus, SquarePen, Trash2 } from "lucide-react"
import { useEffect, useState } from "react";
import AddProductModal from "./AddProductModal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeAction, deleteItem, fetchAll, resetActionState, selectItem } from "@/slice/product/Product.slice";
import ProductModal from "../ProductModal";
import toast from "react-hot-toast";

interface Props {
  products: Product[]
}

const ListProduct = ({ products }: Props) => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector(state => state.product);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleAddProduct = () => {
    dispatch(changeAction("INS"));
    dispatch(selectItem(null));
    setIsOpen(true);
  }
  const handleEditProduct = (item: Product) => {
    dispatch(changeAction("UPD"));
    dispatch(selectItem(item));
    setIsOpen(true);
  }
  const handleDeleteProduct = (id: string) => {
    const confirm = window.confirm("Bạn có chắc xóa sản phẩm này?");
    if (confirm) {
      dispatch(deleteItem({ id }));
    }
  }
  useEffect(() => {
    switch (productState.statusAction) {
      case "failed":
        toast.error(productState.error ?? "");
        dispatch(resetActionState());
        break;
      case "loading":
        break;
      case "completed":
        toast.success(productState.success ?? "");
        dispatch(resetActionState());
        dispatch(fetchAll());
        setIsOpen(false);
        break;
    }
  }, [dispatch, productState, setIsOpen])
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch])
  return (
    <>
      <div className="grid grid-cols-1 size-full pb-24">
        <div className="md:px-10 px-4 py-2 flex justify-end items-center">
          <button onClick={handleAddProduct} className="bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200 flex items-center gap-2">
            <Plus />
            <span>Thêm</span>
          </button>
        </div>
        <div className="w-full md:px-10 px-4">
          <div className="flex flex-col items-center w-full overflow-hidden rounded-md border border-gray-500/20">
            <table className="md:table-auto table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold truncate">Sản phẩm</th>
                  <th className="px-4 py-3 font-semibold truncate">Loại</th>
                  <th className="px-4 py-3 font-semibold truncate max-sm:hidden">Giá bán</th>
                  <th className="px-4 py-3 font-semibold truncate max-sm:hidden">Giá giảm</th>
                  <th className="px-4 py-3 font-semibold truncate">Trạng thái</th>
                  <th className="px-4 py-3 font-semibold truncate">Hành động</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {products.map((product, index) => (
                  <tr key={index} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded overflow-hidden">
                        <img src={import.meta.env.VITE_BACKEND_URL + product.image[0].slice(1)} alt="Product" className="w-16" />
                      </div>
                      <span className="truncate max-sm:hidden w-full">{product.name}</span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 max-sm:hidden">{Number(product.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                    <td className="px-4 py-3 max-sm:hidden">{product.originalPrice && Number(product.originalPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                        <input type="checkbox" disabled className="sr-only peer" defaultChecked={product.inStock} />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">
                      <div className="size-full flex items-center gap-2">
                        <button onClick={() => {
                          setSelectedProduct(product);
                          setIsProductModalOpen(true);
                        }} className="bg-gray-600 text-white p-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200 flex items-center gap-2">
                          <Eye className="size-5" />
                        </button>
                        <button onClick={() => handleEditProduct(product)} className="bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200 flex items-center gap-2">
                          <SquarePen className="size-5" />
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-600 text-white p-2 rounded-lg font-semibold hover:bg-red-500 transition-colors duration-200 flex items-center gap-2">
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        isOpen && <AddProductModal setIsOpen={setIsOpen} />
      }
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </>
  )
}
export default ListProduct