
import { Loader2 } from "lucide-react";

interface CategoryFormProps {
    formData: {
        name: string;
        slug: string;
        isActive: boolean;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    editingCategory: any;
    onClose: () => void;
}

const CategoryForm = ({
    formData,
    setFormData,
    handleNameChange,
    handleSubmitForm,
    isSubmitting,
    editingCategory,
    onClose,
}: CategoryFormProps) => {
    return (
        <form onSubmit={handleSubmitForm} className="space-y-4">
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Category Name
                </label>

                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Slug
                </label>

                <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            slug: e.target.value,
                        })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <span className="font-semibold">Status</span>
                    <p className="text-xs text-slate-500">
                        Make this category active
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() =>
                        setFormData((prev: any) => ({
                            ...prev,
                            isActive: !prev.isActive,
                        }))
                    }
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${formData.isActive ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                >
                    <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${formData.isActive ? "translate-x-6" : "translate-x-1"
                            }`}
                    />
                </button>

            </div>

            <div className="flex gap-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 border rounded-xl"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white flex items-center justify-center gap-2"
                >
                    {isSubmitting && (
                        <Loader2 className="animate-spin" size={18} />
                    )}

                    {editingCategory
                        ? "Update Category"
                        : "Save Category"}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;