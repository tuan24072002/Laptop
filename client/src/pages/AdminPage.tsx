import { useAppSelector } from "@/app/hooks";
import ListProduct from "@/components/admin/ListProduct";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";

const AdminPage = () => {
    const productState = useAppSelector(state => state.product);
    const [module, setModule] = useState<number>(1);
    const sidebarLinks = [
        { id: 1, name: "Danh sách", icon: LayoutDashboard },
    ];

    return (
        <div className="flex size-full min-h-[60vh] bg-white">
            <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item) => (
                    <button onClick={() => setModule(item.id)} key={item.id}
                        className={`flex items-center py-3 px-4 gap-3 
                            ${item.id === module ? "border-r-4 md:border-r-[6px] bg-blue-500/10 border-blue-500 text-blue-500"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        <item.icon />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </button>
                ))}
            </div>
            <div className="flex-1">
                {module === 1 && <ListProduct products={productState.list} />}
            </div>
        </div>
    )
}
export default AdminPage