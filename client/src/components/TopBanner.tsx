import { X } from "lucide-react"
interface Props {
    showTopBanner: boolean
    setShowTopBanner: React.Dispatch<React.SetStateAction<boolean>>
}
const TopBanner = ({ showTopBanner, setShowTopBanner }: Props) => {
    if (!showTopBanner) return null;
    return (
        <div className="w-full py-2.5 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] relative md:block hidden">
            <p>Chốt deal laptop cực hời – Giảm đến 30%, số lượng có hạn!</p>
            <button
                onClick={() => setShowTopBanner(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 text-black hover:text-red-500"
            >
                <X className="size-4" />
            </button>
        </div>
    )
}
export default TopBanner