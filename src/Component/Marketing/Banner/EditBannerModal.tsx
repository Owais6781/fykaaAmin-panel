import React, { useState, useEffect } from "react";
import {
    X,
    Upload,
    Save,
    Globe,
    Smartphone,
    Calendar,
    Link as LinkIcon,
    Layers,
    Hash,
    Loader2
} from "lucide-react";

interface EditBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    banner: any;
    Api: string;
    onSave: (updatedBannerData: any) => Promise<void> | void;
    isSaving?: boolean;
}

export default function EditBannerModal({
    isOpen,
    onClose,
    banner,
    Api,
    onSave,
    isSaving = false
}: EditBannerModalProps) {
    if (!isOpen || !banner) return null;

 
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        bannerType: "hero",

        buttonText: "Shop Now",
        link: "",
        // redirectUrl: "/",
        openInNewTab: false,

        priority: 1,
        isActive: true,

        slideGroup: "",

        categoryId: "",
        brandId: "",

        festivalName: "",

        startDate: "",
        endDate: "",
    });


    // File Preview States
    const [desktopImageFile, setDesktopImageFile] = useState<File | null>(null);
    const [desktopPreview, setDesktopPreview] = useState<string>("");

    const [mobileImageFile, setMobileImageFile] = useState<File | null>(null);
    const [mobilePreview, setMobilePreview] = useState<string>("");

    // Populate Existing Banner Data
    useEffect(() => {
        if (banner) {
     
            setFormData({
                title: banner.title || "",
                subtitle: banner.subtitle || "",
                description: banner.description || "",
                bannerType: banner.bannerType || "hero",

                buttonText: banner.buttonText || "Shop Now",
                link: banner.link || "",
                // redirectUrl: banner.redirectUrl || "/",
                openInNewTab: banner.openInNewTab || false,

                priority: banner.priority ?? 1,
                isActive: banner.isActive ?? true,

                slideGroup: banner.slideGroup || "home-slider",

                categoryId: banner.categoryId?._id || banner.categoryId || "",
                brandId: banner.brandId?._id || banner.brandId || "",

                festivalName: banner.festivalName || "",

                startDate: banner.startDate ? banner.startDate.split("T")[0] : "",
                endDate: banner.endDate ? banner.endDate.split("T")[0] : "",
            });



            // Existing Images Previews
            if (banner.desktopImage) {
                const url = banner.desktopImage.startsWith("http")
                    ? banner.desktopImage
                    : `${Api}/api${banner.desktopImage}`;
                setDesktopPreview(url);
            }

            if (banner.mobileImage) {
                const url = banner.mobileImage.startsWith("http")
                    ? banner.mobileImage
                    : `${Api}/api${banner.mobileImage}`;
                setMobilePreview(url);
            }
        }
    }, [banner, Api]);

    // Handle Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Image Upload Handlers
    const handleDesktopImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setDesktopImageFile(file);
            setDesktopPreview(URL.createObjectURL(file));
        }
    };

    const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMobileImageFile(file);
            setMobilePreview(URL.createObjectURL(file));
        }
    };

    // Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare FormData for Backend multipart request
        const payload = new FormData();
        payload.append("_id", banner._id);
        payload.append("title", formData.title);
        payload.append("subtitle", formData.subtitle);
        payload.append("description", formData.description);
        payload.append("bannerType", formData.bannerType);
        payload.append("buttonText", formData.buttonText);
        // payload.append("redirectUrl", formData.redirectUrl);
        payload.append("priority", String(formData.priority));
        payload.append("isActive", String(formData.isActive));
        payload.append("link", formData.link);
        payload.append("startDate", formData.startDate);
        payload.append("endDate", formData.endDate);
        payload.append("slideGroup", formData.slideGroup);
        payload.append("festivalName", formData.festivalName);
        payload.append("categoryId", formData.categoryId);
        payload.append("brandId", formData.brandId);

        payload.append("openInNewTab", String(formData.openInNewTab));

        if (desktopImageFile) {
            payload.append("desktopImage", desktopImageFile);
        }
        if (mobileImageFile) {
            payload.append("mobileImage", mobileImageFile);
        }

        await onSave(payload);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">

                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Edit Banner</h3>
                        <p className="text-xs text-gray-500">Update banner details, schedule, or replace banner graphics.</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 cursor-pointer  text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-lg transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">

                    {/* Title & Subtitle */}
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Banner Title *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Summer Festival Special Sale"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitle / Description</label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                placeholder="e.g. Get up to 50% discount on all items"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1">
                                Description
                            </label>

                            <textarea
                                rows={4}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-lg border   border-gray-300 px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Type, Priority, Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                <Layers size={14} /> Banner Type
                            </label>
                            <select
                                name="bannerType"
                                value={formData.bannerType}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="hero">Hero</option>
                                <option value="category">Category</option>
                                <option value="offer">Offer</option>
                                <option value="festival">Festival</option>
                                <option value="brand">Brand</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                <Hash size={14} /> Priority Order
                            </label>
                            <input
                                type="number"
                                name="priority"
                                min="1"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>


                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                            <div className="flex items-center mt-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                    <span className="ml-2 text-xs font-medium text-gray-700">
                                        {formData.isActive ? "Active" : "Inactive"}
                                    </span>
                                </label>
                            </div>
                        </div>


                    </div>

                    {/* Destination Link */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                            <LinkIcon size={14} /> Destination URL / Link
                        </label>
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="https://example.com/category/offers"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Schedule Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                <Calendar size={14} /> Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                <Calendar size={14} /> End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-xs font-semibold mb-1">
                                Button Text
                            </label>

                            <input
                                type="text"
                                name="buttonText"
                                value={formData.buttonText}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>


                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Slide Group</label>
                            <select
                                name="slideGroup"
                                value={formData.slideGroup}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">Select Slide Group</option>
                                <option value="home-top">Home Top Slider</option>
                                <option value="home-middle">Home Middle Slider</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Festival Name</label>
                            <input
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                placeholder="Festival Name"
                                name="festivalName"
                                value={formData.festivalName}
                                onChange={handleChange}
                            />
                        </div>

                        <input
                            type="checkbox"
                            name="openInNewTab"
                            checked={formData.openInNewTab}
                            onChange={handleChange}
                        />

                        <span className="text-sm">
                            Open in New Tab
                        </span>

                    </div>

                    {/* Image Upload Area (Desktop & Mobile) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

                        {/* Desktop Image Upload */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
                                <Globe size={14} /> Desktop Image
                            </label>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 text-center bg-gray-50/50 hover:bg-gray-50 transition relative">
                                {desktopPreview ? (
                                    <div className="relative h-28 w-full rounded-lg overflow-hidden border border-gray-200">
                                        <img src={desktopPreview} alt="Desktop Preview" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="py-4 text-gray-400">
                                        <Upload size={24} className="mx-auto mb-1" />
                                        <p className="text-xs">Click to upload desktop banner</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleDesktopImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Mobile Image Upload */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
                                <Smartphone size={14} /> Mobile Image (Optional)
                            </label>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 text-center bg-gray-50/50 hover:bg-gray-50 transition relative">
                                {mobilePreview ? (
                                    <div className="relative h-28 w-full rounded-lg overflow-hidden border border-gray-200">
                                        <img src={mobilePreview} alt="Mobile Preview" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="py-4 text-gray-400">
                                        <Upload size={24} className="mx-auto mb-1" />
                                        <p className="text-xs">Click to upload mobile banner</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleMobileImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Modal Footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="px-5 py-2.5  cursor-pointer rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center cursor-pointer  gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-500/20 transition active:scale-[0.98]"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}