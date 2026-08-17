





import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ArrowLeft, } from "lucide-react";
import { useCreateBannerMutation } from "../../../api/Banner";


const BannerForm = () => {
    const navigate = useNavigate()
    const [addBanner, { isLoading, }] = useCreateBannerMutation()

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        bannerType: "hero",
        buttonText: "Shop Now",
        redirectUrl: "/",
        openInNewTab: false,
        startDate: "",
        endDate: "",
        isActive: true,
        priority: 1,
        slideGroup: "home-slider",
        festivalName: "",
       
        preview: false,
        categoryId: "",
        brandId: "",
    });

    const [desktopImage, setDesktopImage] = useState<File | null>(null);
    const [mobileImage, setMobileImage] = useState<File | null>(null);

    // Previews for current/selected images
    const [desktopPreview, setDesktopPreview] = useState<string>("");
    const [mobilePreview, setMobilePreview] = useState<string>("");



    // const handleChange = (
    //     e: React.ChangeEvent<
    //         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    //     >
    // ) => {
    //     const { name, value, type } = e.target;

    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]:
    //             type === "checkbox"
    //                 ? (e.target as HTMLInputElement).checked
    //                 : value,
    //     }));
    // };


const handleChange = (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
) => {
    const { name, value, type } = e.target;

    setFormData((prev) => {
        const newValue =
            type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : value;

        return {
            ...prev,
            [name]: newValue,

            // Category ID change hote hi Redirect URL automatically generate hoga
            ...(name === "categoryId"
                ? {
                    redirectUrl: value
                        ? `/product_List/${value}`
                        : "/",
                }
                : {}),
        };
    });
};

    const handleDesktopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setDesktopImage(file);
        if (file) {
            setDesktopPreview(URL.createObjectURL(file));
        }
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setMobileImage(file);
        if (file) {
            setMobilePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const FD = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            FD.append(key, String(value));
        });

        if (desktopImage) {
            FD.append("desktopImage", desktopImage);
        }

        if (mobileImage) {
            FD.append("mobileImage", mobileImage);
        }

        try {
            console.log("Calling Update API");
            const result = await addBanner(FD).unwrap();
            alert(result.message || "Banner updated successfully!");
            navigate(-1)

        } catch (err: any) {
            console.error("Update error:", err);
            alert(err?.data?.message || "Failed to update banner");
        }
    };

    const onBack = () => {
        navigate(-1)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Package size={28} className="text-purple-600" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 font-medium">Loading Banner Details...</p>
                    <p className="text-sm text-gray-400 mt-1">Please wait while we fetch the banner data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-100">
            {/* Header Section with Back Button */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create Banner</h1>
                        <p className="text-xs text-gray-500">Create  banner configurations, images, and schedule</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitle</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        placeholder="Subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        placeholder="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Banner Type</label>
                    <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        name="bannerType"
                        value={formData.bannerType}
                        onChange={handleChange}
                    >
                        <option value="hero">Hero</option>
                        <option value="category">Category</option>
                        <option value="offer">Offer</option>
                        <option value="festival">Festival</option>
                        <option value="brand">Brand</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Button Text</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        placeholder="Button Text"
                        name="buttonText"
                        value={formData.buttonText}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Redirect URL</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        placeholder="Redirect URL"
                        name="redirectUrl"
                        value={formData.redirectUrl}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Priority</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        type="number"
                        placeholder="Priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Slide Group</label>
                    <select
                        name="slideGroup"
                        value={formData.slideGroup}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "                 >
                        <option value="">Select Slide Group</option>
                        <option value="home-top">Home Top Slider</option>
                        <option value="home-middle">Home Middle Slider</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Festival Name</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        placeholder="Festival Name"
                        name="festivalName"
                        value={formData.festivalName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Category Id</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        placeholder="Category Id"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Brand Id</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm "
                        placeholder="Brand Id"
                        name="brandId"
                        value={formData.brandId}
                        onChange={handleChange}
                    />
                </div>

                {/* Desktop Image Upload & Preview */}



                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                        Desktop Image
                    </label>

                    {desktopPreview ? (
                        <div className="relative w-full h-64 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100">
                            <img
                                src={desktopPreview}
                                alt="Desktop Preview"
                                className="w-full h-full object-contain"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    setDesktopPreview("");
                                    setFormData((prev) => ({
                                        ...prev,
                                        desktopImage: null,
                                    }));
                                }}
                                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow"
                            >
                                ✕
                            </button>

                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-2">
                                Recommended Size: <strong>1920 × 560 px</strong>
                            </div>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-gray-400 mb-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 16l4-4a3 3 0 014.243 0L16 17m-2-2l1-1a3 3 0 014.243 0L21 16m-9-9h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>

                            <p className="text-sm font-medium text-gray-700">
                                Click to upload Desktop Banner
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                JPG, JPEG, WEBP,PNG • Recommended 1920 × 560 px
                            </p>

                            <input
                                type="file"
                                accept="image/jpeg,image/webp,image/png"
                                onChange={handleDesktopChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* Mobile Image Upload & Preview */}
           


                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                        Mobile Image
                    </label>

                    {mobilePreview ? (
                        <div className="flex justify-center">
                            <div className="relative w-44 h-80 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100">
                                <img
                                    src={mobilePreview}
                                    alt="Mobile Preview"
                                    className="w-full h-full object-contain"
                                />

                                <button
                                    type="button"
                                    onClick={() => {
                                        setMobilePreview("");
                                        setFormData((prev) => ({
                                            ...prev,
                                            mobileImage: null,
                                        }));
                                    }}
                                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 flex items-center justify-center"
                                >
                                    ✕
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1">
                                    Recommended: <strong>800 × 1000 px</strong>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-44 h-80 mx-auto border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-gray-400 mb-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 16l4-4a3 3 0 014.243 0L16 17m-2-2l1-1a3 3 0 014.243 0L21 16m-9-9h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>

                            <p className="text-sm font-medium text-gray-700">
                                Upload Mobile Banner
                            </p>

                            <p className="text-xs text-gray-500 mt-1 text-center px-2">
                                JPG, JPEG, WEBP,png<br />
                                Recommended: 800 × 1000 px
                            </p>

                            <input
                                type="file"
                                accept=".jpg,.jpeg,.webp,image/jpeg,image/webp,image/png"
                                onChange={handleMobileChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* Checkboxes */}
                <div className="col-span-2 flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isActive"
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            checked={formData.isActive}
                            onChange={handleChange}
                        />
                        Active
                    </label>

                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                        <input
                            type="checkbox"
                            name="preview"
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            checked={formData.preview}
                            onChange={handleChange}
                        />
                        Preview
                    </label>

                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                        <input
                            type="checkbox"
                            name="openInNewTab"
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            checked={formData.openInNewTab}
                            onChange={handleChange}
                        />
                        Open In New Tab
                    </label>
                </div>

                {/* Submit Buttons */}
                <div className="col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-5 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button

                        className="col-span-2 bg-blue-600 text-white py-3 px-5 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>


                </div>
            </form>
        </div>
    );
};

export default BannerForm;