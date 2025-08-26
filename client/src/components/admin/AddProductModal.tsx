import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductModel } from "@/models/Product.model";
import {
  addItem,
  editItem,
  resetActionState,
} from "@/slice/product/Product.slice";
import { Product } from "@/types/Product";
import { isFormFieldInvalid } from "@/utils/validate";
import { useClickAway } from "@uidotdev/usehooks";
import { FormikErrors, useFormik } from "formik";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddProductModal = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.product);
  const [files, setFiles] = useState<File[]>([]);
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  const formikProduct = useFormik<Product>({
    initialValues: ProductModel.initialize(),
    validate: (data) => {
      const errors: FormikErrors<Product> = {};
      if (!data.name) {
        errors.name = "Trường tên bắt buộc!";
      }
      if (!data.description) {
        errors.description = "Trường mô tả bắt buộc!";
      }
      if (!data.category) {
        errors.category = "Trường loại sản phẩm bắt buộc!";
      }
      if (!data.price) {
        errors.price = "Trường giá bán bắt buộc!";
      }
      if (!data.brand) {
        errors.brand = "Trường nhãn hàng bắt buộc!";
      }
      const specsErrors: Record<string, string> = {};
      if (!data.specs.processor) {
        specsErrors.processor = "Trường CPU bắt buộc!";
      }
      if (!data.specs.ram) {
        specsErrors.ram = "Trường RAM bắt buộc!";
      }
      if (!data.specs.storage) {
        specsErrors.storage = "Trường bo trong bắt buộc!";
      }
      if (!data.specs.graphics) {
        specsErrors.graphics = "Trường card đồ họa bắt buộc!";
      }
      if (!data.specs.display) {
        specsErrors.display = "Trường màn hình bắt buộc!";
      }
      if (!data.specs.battery) {
        specsErrors.battery = "Trường màn hình bắt buộc!";
      }
      if (Object.keys(specsErrors).length > 0) {
        errors.specs = specsErrors;
      }
      return errors;
    },
    onSubmit: async (data) => {
      const productData = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        originalPrice: data.originalPrice,
        specs: data.specs,
        brand: data.brand,
        featured: data.featured,
        rating: data.rating > 5 ? 5 : data.rating < 0 ? 0 : data.rating,
        reviewCount: data.reviewCount,
        inStock: productState.action === "INS" ? true : data.inStock,
      };
      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      switch (productState.action) {
        case "INS":
          await dispatch(addItem({ data: formData }));
          break;
        case "UPD":
          await dispatch(editItem({ id: data.id, data: formData }));
          break;
      }
    },
  });
  useEffect(() => {
    if (productState.item) {
      productState.item.image.forEach(async (img) => {
        const url = import.meta.env.VITE_BACKEND_URL + img.slice(1);

        try {
          const response = await fetch(url);
          const blob = await response.blob();

          const filename = url.split("/").pop() || "image.jpg";
          const file = new File([blob], filename, { type: blob.type });

          setFiles((prev) => [...prev, file]);
        } catch (error) {
          console.error("Lỗi khi fetch file:", error);
        }
      });
      formikProduct.setValues(productState.item);
    }
  }, [productState.item]);
  useEffect(() => {
    switch (productState.statusAction) {
      case "failed":
        dispatch(resetActionState());
        break;
      case "loading":
        break;
      case "completed":
        formikProduct.resetForm();
        setFiles([]);
        dispatch(resetActionState());
        setIsOpen(false);
        break;
    }
  }, [dispatch, productState, setIsOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={ref}
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden overflow-y-auto hidden-scrollbar"
      >
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {productState.action === "INS" ? "Thêm" : "Sửa"} sản phẩm
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form
          onSubmit={formikProduct.handleSubmit}
          className="md:p-10 p-4 space-y-5 size-full grid lg:grid-cols-2 grid-cols-1 gap-4 relative"
        >
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-base font-medium">Hình ảnh *</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {files.map((file, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      className="max-w-24 max-h-14 object-cover bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        URL.revokeObjectURL(URL.createObjectURL(file)); // cleanup
                        setFiles((prev) => prev.filter((_, idx) => idx !== i));
                      }}
                      className="absolute top-0 right-0 p-1 bg-white rounded-full transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {/* nút thêm ảnh mới */}
                <label className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => {
                      const selected = Array.from(e.target.files || []);
                      setFiles((prev) => [...prev, ...selected]);
                    }}
                  />
                  <Plus />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-base font-medium" htmlFor="product-name">
                Tên *
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="Nhập thông tin"
                className={cn(
                  "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                  isFormFieldInvalid("name", formikProduct) && "border-red-600"
                )}
                value={formikProduct.values.name}
                onChange={(e) =>
                  formikProduct.setFieldValue("name", e.target.value)
                }
              />
              {isFormFieldInvalid("name", formikProduct) && (
                <span className="text-red-600 text-xs">
                  {formikProduct.errors.name}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label
                className="text-base font-medium"
                htmlFor="product-description"
              >
                Mô tả *
              </label>
              <textarea
                id="product-description"
                rows={4}
                className={cn(
                  "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none",
                  isFormFieldInvalid("description", formikProduct) &&
                    "border-red-600"
                )}
                value={formikProduct.values.description}
                onChange={(e) =>
                  formikProduct.setFieldValue("description", e.target.value)
                }
                placeholder="Nhập thông tin"
              ></textarea>
              {isFormFieldInvalid("description", formikProduct) && (
                <span className="text-red-600 text-xs">
                  {formikProduct.errors.description}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-base font-medium" htmlFor="product-name">
                  Nhãn hàng *
                </label>
                <input
                  id="product-name"
                  type="text"
                  placeholder="Nhập thông tin"
                  value={formikProduct.values.brand}
                  onChange={(e) =>
                    formikProduct.setFieldValue("brand", e.target.value)
                  }
                  className={cn(
                    "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                    isFormFieldInvalid("brand", formikProduct) &&
                      "border-red-600"
                  )}
                />
                {isFormFieldInvalid("brand", formikProduct) && (
                  <span className="text-red-600 text-xs">
                    {formikProduct.errors.brand}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <label className="text-base font-medium" htmlFor="category">
                  Loại danh mục *
                </label>
                <select
                  id="category"
                  value={formikProduct.values.category}
                  onChange={(e) =>
                    formikProduct.setFieldValue("category", e.target.value)
                  }
                  className={cn(
                    "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                    isFormFieldInvalid("category", formikProduct) &&
                      "border-red-600"
                  )}
                >
                  <option value="">Chọm...</option>
                  {categories(productState.list).map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {isFormFieldInvalid("category", formikProduct) && (
                  <span className="text-red-600 text-xs">
                    {formikProduct.errors.category}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex-1 flex flex-col gap-1 w-full">
                <label
                  className="text-base font-medium"
                  htmlFor="product-price"
                >
                  Giá bán *
                </label>
                <input
                  id="product-price"
                  type="number"
                  value={formikProduct.values.price}
                  onChange={(e) =>
                    formikProduct.setFieldValue("price", e.target.value)
                  }
                  placeholder="0"
                  className={cn(
                    "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                    isFormFieldInvalid("price", formikProduct) &&
                      "border-red-600"
                  )}
                />
                {isFormFieldInvalid("price", formikProduct) && (
                  <span className="text-red-600 text-xs">
                    {formikProduct.errors.price}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1 w-full">
                <label className="text-base font-medium" htmlFor="offer-price">
                  Giá gốc
                </label>
                <input
                  id="offer-price"
                  type="number"
                  value={formikProduct.values.originalPrice}
                  onChange={(e) =>
                    formikProduct.setFieldValue("originalPrice", e.target.value)
                  }
                  placeholder="0"
                  className={cn(
                    "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                    isFormFieldInvalid("originalPrice", formikProduct) &&
                      "border-red-600"
                  )}
                />
                {isFormFieldInvalid("originalPrice", formikProduct) && (
                  <span className="text-red-600 text-xs">
                    {formikProduct.errors.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div
                title="Trường này random"
                className="flex-1 flex flex-col gap-1 w-full"
              >
                <label className="text-base font-medium" htmlFor="rating">
                  Đánh giá
                </label>
                <input
                  id="rating"
                  type="number"
                  placeholder="0"
                  max={5}
                  value={formikProduct.values.rating}
                  onChange={(e) =>
                    formikProduct.setFieldValue("rating", e.target.value)
                  }
                  className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                  disabled={productState.action === "INS"}
                />
              </div>
              <div
                title="Trường này random"
                className="flex-1 flex flex-col gap-1 w-full"
              >
                <label className="text-base font-medium" htmlFor="reviewCount">
                  Số mắt xem
                </label>
                <input
                  id="reviewCount"
                  type="number"
                  placeholder="0"
                  value={formikProduct.values.reviewCount}
                  onChange={(e) =>
                    formikProduct.setFieldValue("reviewCount", e.target.value)
                  }
                  className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                  disabled={productState.action === "INS"}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 w-full">
              <label className="text-base font-medium" htmlFor="processor">
                Loại CPU *
              </label>
              <input
                id="processor"
                type="text"
                placeholder="Nhập thông tin"
                value={formikProduct.values.specs.processor}
                onChange={(e) =>
                  formikProduct.setFieldValue("specs.processor", e.target.value)
                }
                className={cn(
                  "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                  isFormFieldInvalid("specs.processor", formikProduct) &&
                    "border-red-600"
                )}
              />
              {isFormFieldInvalid("specs.processor", formikProduct) && (
                <span className="text-red-600 text-xs">
                  {formikProduct.errors.specs?.processor}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex-1 flex flex-col gap-1 w-full">
                <label className="text-base font-medium" htmlFor="ram">
                  RAM *
                </label>
                <input
                  id="ram"
                  type="text"
                  placeholder="Nhập thông tin"
                  value={formikProduct.values.specs.ram}
                  onChange={(e) =>
                    formikProduct.setFieldValue("specs.ram", e.target.value)
                  }
                  className={cn(
                    "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                    isFormFieldInvalid("specs.ram", formikProduct) &&
                      "border-red-600"
                  )}
                />
                {isFormFieldInvalid("specs.ram", formikProduct) && (
                  <span className="text-red-600 text-xs">
                    {formikProduct.errors.specs?.ram}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1 w-full">
                <label className="text-base font-medium" htmlFor="storage">
                  Ổ cứng *
                </label>
                <input
                  id="storage"
                  type="text"
                  placeholder="Nhập thông tin"
                  value={formikProduct.values.specs.storage}
                  onChange={(e) =>
                    formikProduct.setFieldValue("specs.storage", e.target.value)
                  }
                  className={cn(
                    "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                    isFormFieldInvalid("specs.storage", formikProduct) &&
                      "border-red-600"
                  )}
                />
                {isFormFieldInvalid("specs.storage", formikProduct) && (
                  <span className="text-red-600 text-xs">
                    {formikProduct.errors.specs?.storage}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 w-full">
              <label className="text-base font-medium" htmlFor="graphics">
                Card đồ họa *
              </label>
              <input
                id="graphics"
                type="text"
                placeholder="Nhập thông tin"
                value={formikProduct.values.specs.graphics}
                onChange={(e) =>
                  formikProduct.setFieldValue("specs.graphics", e.target.value)
                }
                className={cn(
                  "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                  isFormFieldInvalid("specs.graphics", formikProduct) &&
                    "border-red-600"
                )}
              />
              {isFormFieldInvalid("specs.graphics", formikProduct) && (
                <span className="text-red-600 text-xs">
                  {formikProduct.errors.specs?.graphics}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex-1 flex flex-col gap-1 w-full">
                <label className="text-base font-medium" htmlFor="display">
                  Màn hình *
                </label>
                <input
                  id="display"
                  type="text"
                  placeholder="Nhập thông tin"
                  value={formikProduct.values.specs.display}
                  onChange={(e) =>
                    formikProduct.setFieldValue("specs.display", e.target.value)
                  }
                  className={cn(
                    "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                    isFormFieldInvalid("specs.display", formikProduct) &&
                      "border-red-600"
                  )}
                />
                {isFormFieldInvalid("specs.display", formikProduct) && (
                  <span className="text-red-600 text-xs">
                    {formikProduct.errors.specs?.display}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1 w-full">
                <label className="text-base font-medium" htmlFor="battery">
                  Dung lượng pin *
                </label>
                <input
                  id="battery"
                  type="text"
                  placeholder="Nhập thông tin"
                  value={formikProduct.values.specs.battery}
                  onChange={(e) =>
                    formikProduct.setFieldValue("specs.battery", e.target.value)
                  }
                  className={cn(
                    "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40",
                    isFormFieldInvalid("specs.battery", formikProduct) &&
                      "border-red-600"
                  )}
                />
                {isFormFieldInvalid("specs.battery", formikProduct) && (
                  <span className="text-red-600 text-xs">
                    {formikProduct.errors.specs?.battery}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="futured"
                  id="futured"
                  checked={formikProduct.values.featured}
                  onChange={(e) =>
                    formikProduct.setFieldValue("featured", e.target.checked)
                  }
                />
                <label className="text-base font-medium" htmlFor="futured">
                  Nổi bật
                </label>
              </div>
              <label
                className="relative inline-flex cursor-pointer items-center gap-3 text-base font-medium"
                title={
                  productState.action === "INS" ? "Mặc định là còn hàng" : ""
                }
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={formikProduct.values.inStock}
                  onChange={(e) =>
                    formikProduct.setFieldValue("inStock", e.target.checked)
                  }
                  disabled={productState.action === "INS"}
                />
                <div className="peer h-7 w-12 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary"></div>
                <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                Còn hàng?
              </label>
            </div>
            <button
              type="submit"
              className="px-8 py-2.5 w-fit bg-primary hover:bg-primary-dull text-white font-medium rounded"
            >
              {productState.action === "INS" ? "Thêm" : "Sửa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProductModal;
