import { assets } from "@/assets";

const TrustedBrand = () => {
    const companyLogos = [assets.acer, assets.asus, assets.dell, assets.hp, assets.lenovo, assets.macbook, assets.msi];

    return (
        <>
            <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "15s" }}>
                    <div className="flex">
                        {[...companyLogos, ...companyLogos].map((company, index) => (
                            <img key={index} src={company}
                                alt={`Company Logo ${index + 1}`} className="w-full h-full object-cover mx-6" draggable={false} />
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </>
    );
}
export default TrustedBrand