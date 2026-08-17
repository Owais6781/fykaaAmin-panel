
import {
  X,
  Calendar,
  Eye,
  MousePointer,
  TrendingUp,
  Layers,
  Globe,
  Smartphone,
  ExternalLink
} from "lucide-react";

interface ViewBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner: any;
  Api: string;
}

export default function ViewBannerModal({
  isOpen,
  onClose,
  banner,
  Api
}: ViewBannerModalProps) {
  if (!isOpen || !banner) return null;

  // Safe Image URL Resolution
  const getImageUrl = (path: string) => {
    if (!path) return "https://via.placeholder.com/600x300?text=No+Image";
    return path.startsWith("http") ? path : `${Api}/api${path}`;
  };

  // CTR Calculation
  const ctr = banner.views
    ? ((banner.clicks / banner.views) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${banner.isActive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
                }`}
            >
              {banner.isActive ? "Active Banner" : "Inactive Banner"}
            </span>
            <span className="text-xs text-gray-400">• Priority #{banner.priority ?? 0}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 cursor-pointer  text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Banner Main Title Info */}
          <div className="grid grid-cols-2 gap-4">

            <div className="p-3 rounded-lg border border-gray-200">

              <label className="text-sm text-gray-800 mb-2">

                Title
              </label>

              <p className="text-sm text-gray-400 whitespace-pre-line">

                { banner.title}

              </p>

            </div>
            <div className="p-3 rounded-lg border border-gray-200">

              <label className="text-sm  text-gray-800 mb-2">

                Subtitle

              </label>

              <p className="text-sm text-gray-400 whitespace-pre-line">

                { banner.subtitle}

              </p>

            </div>
          </div>

          {banner.description && (
            <div className="rounded-lg border border-gray-200 p-4">
              <label className="text-sm  text-gray-800 mb-2">
                Description
              </label>

              <p className="text-sm text-gray-400 whitespace-pre-line">
                {banner.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">

            {banner.slideGroup && (
              <div className="p-3 rounded-lg border border-gray-200">

                <label className="text-sm  text-gray-800 mb-2">
                  Slide Group
                </label>

                <p className="text-sm text-gray-400 whitespace-pre-line">
                  {banner.slideGroup || "-"}
                </p>

              </div>
            )}

            {banner.festivalName && (

              <div className="p-3 rounded-lg border border-gray-200">

                <label className="text-sm  text-gray-800 mb-2">

                  Festival Name

                </label>

                <p className="text-sm text-gray-400 whitespace-pre-line">

                  {banner.festivalName}

                </p>

              </div>

            )}
          </div>


          <div className="grid grid-cols-2 gap-4">
            {banner.categoryId && (

              <div className="p-3 rounded-lg border border-gray-200">

                <label className="text-sm  text-gray-800 mb-2">

                  Category ID

                </label>

                <p className="text-sm text-gray-400 whitespace-pre-line">

                  {banner.categoryId?.name || banner.categoryId}

                </p>

              </div>

            )}

            {banner.brandId && (

              <div className="p-3 rounded-lg border border-gray-200">

                <label className="text-sm text-gray-800 mb-2">

                  Brand ID

                </label>

                <p className="text-sm text-gray-400 whitespace-pre-line">

                  {banner.brandId?.name || banner.brandId}

                </p>

              </div>

            )}

          </div>
          {/* Detail Metadata Grid */}

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
              <div className="text-gray-400">
                <Layers size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-800">Banner Type</p>
                <p className=" text-gray-400 capitalize">
                  {banner.bannerType || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
              <div className="text-gray-400">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-800">Schedule Duration</p>
                <p className="font-medium text-gray-400 text-xs">
                  {banner.startDate
                    ? new Date(banner.startDate).toLocaleDateString("en-GB")
                    : "Immediate"}{" "}
                  —{" "}
                  {banner.endDate
                    ? new Date(banner.endDate).toLocaleDateString("en-GB")
                    : "No expiration"}
                </p>
              </div>
            </div>

            {banner.link && (
              <div className="sm:col-span-2 flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-blue-50/30">
                <div className="text-blue-500">
                  <ExternalLink size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-400">Destination Link</p>
                  <a
                    href={banner.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 hover:underline truncate block text-xs"
                  >
                    {banner.link}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Image Previews Section (Desktop & Mobile) */}
          <div className="space-y-4">
            {/* Desktop Preview */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Globe size={14} /> Desktop Image View
              </label>
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 aspect-[21/9]">
                <img
                  src={getImageUrl(banner.desktopImage)}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Mobile Preview (If Available) */}
            {banner.mobileImage && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone size={14} /> Mobile Image View
                </label>
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 max-w-xs h-40">
                  <img
                    src={getImageUrl(banner.mobileImage)}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Performance Metrics Row */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-center">
              <div className="inline-flex p-2 bg-blue-100 text-blue-600 rounded-lg mb-1">
                <Eye size={18} />
              </div>
              <p className="text-xs text-gray-500">Total Views</p>
              <p className="text-lg font-bold text-gray-900">
                {(banner.views || 0).toLocaleString()}
              </p>
            </div>

            <div className="text-center border-x border-gray-200">
              <div className="inline-flex p-2 bg-purple-100 text-purple-600 rounded-lg mb-1">
                <MousePointer size={18} />
              </div>
              <p className="text-xs text-gray-500">Total Clicks</p>
              <p className="text-lg font-bold text-gray-900">
                {(banner.clicks || 0).toLocaleString()}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-2 bg-amber-100 text-amber-600 rounded-lg mb-1">
                <TrendingUp size={18} />
              </div>
              <p className="text-xs text-gray-500">CTR %</p>
              <p className="text-lg font-bold text-gray-900">{ctr}%</p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 cursor-pointer  hover:bg-gray-300 text-gray-800 font-medium text-sm rounded-xl transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}