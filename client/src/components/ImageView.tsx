import React, { useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
  thumbnailClass: string;
  imageClass?: string;
  hideThumbnail?: boolean;
  initialOpen?: boolean;
}

const ImageView: React.FC<Props> = ({
  src,
  alt = "",
  thumbnailClass = "w-40 h-40 object-cover rounded-md",
  imageClass = "",
  hideThumbnail = false,
  initialOpen = false,
}) => {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    function onKey(e: any) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {!hideThumbnail && (
        <img
          src={src}
          alt={alt}
          className={`cursor-pointer transition-transform duration-150 hover:scale-105 ${thumbnailClass}`}
          onClick={() => setOpen(true)}
        />
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* content (stop propagation so clicking image won't close) */}
          <div
            className="relative max-w-[95vw] max-h-[95vh] rounded-lg p-1 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close image"
              className="absolute -top-3 -right-3 z-20 inline-flex items-center justify-center rounded-full bg-white/90 p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* the enlarged image */}
            <img
              src={src}
              alt={alt}
              className={`block max-w-full max-h-[85vh] rounded-md shadow-2xl transform-gpu transition-all duration-200 ease-out ${imageClass}`}
            />

            {/* caption (optional) */}
            {alt && (
              <p className="mt-2 text-center text-sm text-white/90">{alt}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageView;
