import { X } from "lucide-react";
import React, { useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  open: boolean;
  isClose: VoidFunction;
}

const ImageView: React.FC<Props> = ({ src, alt = "", open, isClose }) => {
  useEffect(() => {
    function onKey(e: any) {
      if (e.key === "Escape") isClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    open && (
      <div
        onClick={(e) => e.preventDefault()}
        className="h-screen w-screen bg-black/85 absolute z-50"
      >
        <div className="flex items-center justify-center size-full">
          <img src={src} alt={alt} className="h-[50vh] w-full object-contain" />
        </div>
        <X
          className="absolute top-4 right-4 size-12 bg-white rounded-full cursor-pointer"
          onClick={isClose}
        />
      </div>
    )
  );
};

export default ImageView;
