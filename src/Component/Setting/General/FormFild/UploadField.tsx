



import { ImagePlus } from "lucide-react";
import { useState } from "react";

export default function UploadField() {
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div  className="">
      {/* <label className="block text-sm  text-center font-semibold text-gray-800 mb-3">
        Store Logo
      </label> */}

      <label className="block cursor-pointer">
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleLogo}
        />

<div className="w-full max-w-xs h-58 mx-auto border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 flex flex-col items-center justify-center">
          {logo ? (
            <img
              src={logo}
              alt="Store Logo"
              className="w-full h-full rounded-xl object-contain p-4"
            />
          ) : (
            <>  Store Logo
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
               
                <ImagePlus
                  size={28}
                  className="text-indigo-600"
                />
              </div>

              <h3 className="mt-6 text-gray-700 font-medium">
                Drag & drop your logo here
              </h3>

              <p className="text-sm text-gray-500">
                or click to browse
              </p>

              <p className="mt-5 text-xs text-gray-400">
                PNG, JPG or SVG (Max. 2MB)
              </p>
            </>
          )}

        </div>
      </label>
    </div>
  );
}