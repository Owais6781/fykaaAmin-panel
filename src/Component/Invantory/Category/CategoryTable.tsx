
import React, { useState } from "react";
import {
    FolderTree,
    Plus,
    RefreshCw,
    Trash2,
    Edit3,
    CheckCircle2,
    XCircle,
    Copy,
} from "lucide-react";
import { toast } from "sonner";


import CategoryForm from "./CategoryForm"
import FormModal from "./FormModal";
import DeleteModal from "./DeleteModal";
import { useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from "../../../api/category"

interface Category {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: string;
}

interface CategoryTableProps {
    categories?: Category[];
    onAddCategory?: (data: { name: string; slug: string; isActive: boolean }) => Promise<void> | void;
    onEditCategory?: (id: string, data: { name: string; slug: string; isActive: boolean }) => Promise<void> | void;
    onDeleteCategory?: (id: string) => Promise<void> | void;
    onRefresh?: () => void;
    isRefreshing?: boolean;
}

export default function CategoryTable({
    // categories = [],
    onRefresh,
    isRefreshing = false,
}: CategoryTableProps) {

    const [addCategory] = useAddCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()
    const { data: categoriesData } = useGetCategoriesQuery()


    console.log("categoriesData", categoriesData)
    // Modal & Form States
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({ name: "", slug: "", isActive: true });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Delete Modal States
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Open Form for Adding New Category
    const handleOpenAddForm = () => {
        setEditingCategory(null);
        setFormData({ name: "", slug: "", isActive: true });
        setShowFormModal(true);
    };

    // Open Form for Editing Category
    const handleOpenEditForm = (category: Category) => {
        setEditingCategory(category);
        setFormData({ name: category.name, slug: category.slug, isActive: category.isActive });
        setShowFormModal(true);
    };

    // Auto Generate Slug from Category Name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const generatedSlug = name.toLowerCase().trim().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-");
        setFormData({ ...formData, name, slug: generatedSlug });
    };

    // Form Submit Handler
    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("formData", formData)
        setIsSubmitting(true);
        try {
            if (editingCategory) {
                await updateCategory({ id: editingCategory._id, ...formData }).unwrap();
            } else {
                await addCategory(formData).unwrap();
            }
            setShowFormModal(false);
        } catch (error) {
            console.error("Error saving category:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete Handlers
    const openDeleteConfirmation = (category: Category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;
        setIsDeleting(true);
        try {
            await deleteCategory(selectedCategory._id).unwrap()
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {
            setIsDeleting(false);
            setSelectedCategory(null);
        }
    };



    const handleCopy = async (id: string) => {
        try {
            await navigator.clipboard.writeText(id);
            toast.success(`Copied ID: ${id}`);
        } catch (error) {
            toast.error("Failed to copy");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* 1. Add/Edit Category Modal Form */}
            <FormModal
                open={showFormModal}
                title={editingCategory ? "Edit Category" : "Add New Category"}
                onClose={() => setShowFormModal(false)} >
                <CategoryForm
                    formData={formData}
                    setFormData={setFormData}
                    handleNameChange={handleNameChange}
                    handleSubmitForm={handleSubmitForm}
                    isSubmitting={isSubmitting}
                    editingCategory={editingCategory}
                    onClose={() => setShowFormModal(false)}
                />
            </FormModal>

            {/* 2. Delete Confirmation Modal */}
            <DeleteModal
                open={showDeleteModal}
                title="Delete Category?"
                message="This action cannot be undone. It will permanently remove"
                itemName={selectedCategory?.name}
                isDeleting={isDeleting}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />


            {/* 3. Sticky Top Navigation Bar */}
            <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
                <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <FolderTree size={20} className="text-slate-900" />
                            <h1 className="text-2xl font-semibold text-slate-900">
                                Category Management
                            </h1>
                        </div>
                        <p className="text-sm text-slate-600">
                            Manage product categories, status visibility, and route slugs
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {onRefresh && (
                            <button
                                onClick={onRefresh}
                                className={`p-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition ${isRefreshing ? "animate-spin" : ""
                                    }`}
                                title="Refresh Data"
                            >
                                <RefreshCw size={18} />
                            </button>
                        )}

                        <button
                            onClick={handleOpenAddForm}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg transition-colors shadow-xs"
                        >
                            <Plus size={18} />
                            Add Category
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. Category Table Section */}
            <div className="px-6 py-8">
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        MongoDb_id
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Category Name
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Slug
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Created
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200 bg-white">

                                {categoriesData?.data?.map((category: any, index: number) => (
                                    <tr
                                        key={category._id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-slate-400">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-400">
                                            <div className="flex items-center gap-2"
                                                onClick={() => handleCopy(category._id)}>

                                                <span>{category._id}</span>
                                                <Copy size={16} className="cursor-pointer text-slate-500 hover:text-slate-700" />
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                            {category.name}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                                            {category.slug}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${category.isActive
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    : "bg-slate-100 text-slate-600 border-slate-200"
                                                    }`}
                                            >
                                                {category.isActive ? (
                                                    <>
                                                        <CheckCircle2 size={12} className="text-emerald-600" />
                                                        Active
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle size={12} className="text-slate-400" />
                                                        Inactive
                                                    </>
                                                )}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {new Date(category.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => handleOpenEditForm(category)}
                                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                                                    title="Edit Category"
                                                >
                                                    <Edit3 size={16} />
                                                </button>

                                                <button
                                                    onClick={() => openDeleteConfirmation(category)}
                                                    className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition"
                                                    title="Delete Category"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))


                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}