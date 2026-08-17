import { useState } from "react";
import { CouponsManagement } from "./CouponsManagement"; // Aapka redesigned component
import  ViewCouponModal from "./ViewCouponsModal";
import { CouponForm } from "./CouponsForm";
import { useAddCouponMutation, useGetCouponsQuery, useUpdateCouponMutation, useDeleteCouponMutation, } from "../../../api/coupon"; // Aapki RTK Query file
import { useGetCategoriesQuery } from "../../../api/category"
import { useGetProductsQuery } from "../../../api/product"
import { useGetSuperAdminProfileQuery } from "../../../api/adminAuthApi"




interface CouponFormData {
  code: string;
  title: string;
  description: string;
  discountType: "Flat" | "Percentage";
  discountValue: number;
  maximumDiscount: number;
  minimumOrder: number;
  usageLimit: number;
  perUserLimit: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive" | "Expired";
  isPublic: boolean;
  firstOrderOnly: boolean;
  freeShipping: boolean;
  category: string[];
  products: string[];
  sellerId: string[];
}




export default function CouponsPage() {


  const { data: categoryData } = useGetCategoriesQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: sellerData } = useGetSuperAdminProfileQuery();
  const [addCoupon] = useAddCouponMutation()
  const [updateCoupons] = useUpdateCouponMutation()
  const [deleteCoupons] = useDeleteCouponMutation();


  const categories = categoryData?.data || [];
  const products = productData || [];
  const sellers = sellerData?.data || [];
  const { data, isLoading, isError } = useGetCouponsQuery();

  const getCoupons = data?.coupons || [];

  console.log("sellerData", sellerData)
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [formData, setFormData] = useState<CouponFormData>({
    code: "",
    title: "",
    description: "",
    discountType: "Flat",
    discountValue: 0,
    maximumDiscount: 0,
    minimumOrder: 0,
    usageLimit: 0,
    perUserLimit: 0,
    startDate: "",
    endDate: "",
    status: "Active",
    isPublic: true,
    firstOrderOnly: false,
    freeShipping: false,
    category: [],
    products: [],
    sellerId: [],
  });



  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  // const [isEditOpen, setIsEditOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [couponType, setCouponType] = useState("");
  const [status, setStatus] = useState("");

  const [publicFilter, setPublicFilter] = useState("");
  const [firstOrderFilter, setFirstOrderFilter] = useState("");
  const [freeShippingFilter, setFreeShippingFilter] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [sellerFilter, setSellerFilter] = useState("");


  // Search & Filter States



  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<any>(null);
  // Raw API Array



  // const match = (filter: any, value: any) =>
  //   !filter || String(value) === String(filter);

  const includesMatch = (filter: any, arr: any[]) =>
    !filter || arr?.includes(filter);

  
const filteredCoupons = getCoupons.filter((item: any) => {
  const searchValue = search.trim().toLowerCase();

  const matchesSearch =
    !searchValue ||
    item.code?.toString().toLowerCase().includes(searchValue) ||
    item.title?.toString().toLowerCase().includes(searchValue) ||
    item.description?.toString().toLowerCase().includes(searchValue);

  // Coupon Type
  const matchesCouponType =
    !couponType ||
    String(item.discountType ?? "")
      .trim()
      .toLowerCase() ===
      String(couponType)
        .trim()
        .toLowerCase();

  // Status
  const matchesStatus =
    !status ||
    String(item.status ?? "")
      .trim()
      .toLowerCase() ===
      String(status)
        .trim()
        .toLowerCase();

 
  // Public
  const matchesPublic =
    !publicFilter ||
    String(item.isPublic) === String(publicFilter);

  // First Order
  const matchesFirstOrder =
    !firstOrderFilter ||
    String(item.firstOrderOnly) === String(firstOrderFilter);

  // Free Shipping
  const matchesFreeShipping =
    !freeShippingFilter ||
    String(item.freeShipping) === String(freeShippingFilter);

  // Category
  const categoryArray =
    item.category ||
    item.categories ||
    [];

  const matchesCategory = includesMatch(
    categoryFilter,
    categoryArray
  );

  // Product
  const productArray = item.products || [];

  const matchesProduct = includesMatch(
    productFilter,
    productArray
  );

  // Seller
  const sellerArray =
    item.sellerId ||
    item.sellers ||
    [];

  const matchesSeller = includesMatch(
    sellerFilter,
    sellerArray
  );

  return (
    matchesSearch &&
    matchesCouponType &&
    matchesStatus &&
    matchesPublic &&
    matchesFirstOrder &&
    matchesFreeShipping &&
    matchesCategory &&
    matchesProduct &&
    matchesSeller
  );
});


  const handleAddCoupons = () => {
    setEditingCoupon(null);
    setFormData({
      code: "",
      title: "",
      description: "",
      discountType: "Flat",
      discountValue: 0,
      maximumDiscount: 0,
      minimumOrder: 0,
      usageLimit: 0,
      perUserLimit: 0,
      startDate: "",
      endDate: "",
      status: "Active",
      isPublic: true,
      firstOrderOnly: false,
      freeShipping: false,
      category: [],
      products: [],
      sellerId: [],
    });

    setIsCouponModalOpen(true);
  };



  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    const key = name as keyof CouponFormData;

    setFormData((prev: any) => ({
      ...prev,
      [key]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number" ? Number(value)
            : value,

    }));
  };




  const handleSubmitForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("SubmitForm", formData)
    try {
      if (editingCoupon) {
        await updateCoupons({
          id: editingCoupon._id,
          ...formData,
        }).unwrap();
      } else {

        console.log(formData);

        await addCoupon(formData).unwrap();
      }
      setIsSubmitting(true);



      setIsCouponModalOpen(false);
    } finally {
      setIsSubmitting(false);
      setEditingCoupon(null);
    }
  };




  const handleOpenEdit = (coupon: any) => {
    setEditingCoupon(coupon);

    setFormData({
      code: coupon.code || "",
      title: coupon.title || "",
      description: coupon.description || "",

      discountType: coupon.discountType || "Flat",
      discountValue: coupon.discountValue || 0,
      maximumDiscount: coupon.maximumDiscount || 0,
      minimumOrder: coupon.minimumOrder || 0,

      usageLimit: coupon.usageLimit || 0,
      perUserLimit: coupon.perUserLimit || 0,

      startDate: coupon.startDate
        ? new Date(coupon.startDate).toISOString().split("T")[0]
        : "",

      endDate: coupon.endDate
        ? new Date(coupon.endDate).toISOString().split("T")[0]
        : "",

      status: coupon.status || "Active",

      isPublic: coupon.isPublic ?? true,
      firstOrderOnly: coupon.firstOrderOnly ?? false,
      freeShipping: coupon.freeShipping ?? false,

      category: (coupon.category || coupon.categories || []).map(
        (item: any) =>
          typeof item === "object" ? item._id : item
      ),

      products: (coupon.products || []).map(
        (item: any) =>
          typeof item === "object" ? item._id : item
      ),

      sellerId: (coupon.sellerId  || []).map(
        (item: any) =>
          typeof item === "object" ? item._id : item
      ),
    });

    setIsCouponModalOpen(true);
  };




  const handleOpenView = (banner: any) => {
    setSelectedBanner(banner);
    setIsViewModalOpen(true);
  };


  const handleCloseView = () => {
    setSelectedBanner(null);
    setIsViewModalOpen(false);

  };



  const handleDelete = async (id: string) => {
    try {
      await deleteCoupons(id).unwrap();
      alert("Coupons deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete banner.");
    }
  };


  return (
    <>

      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
            <CouponForm
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              handleSubmitForm={handleSubmitForm}
              isSubmitting={isSubmitting}
              editingCoupon={editingCoupon}
              onClose={() => setIsCouponModalOpen(false)}
              categories={categories}
              products={products}
              sellers={sellers}
            />
          </div>
        </div>
      )}





      <CouponsManagement
        coupons={filteredCoupons}
        isLoading={isLoading}
        isError={isError}
        search={search}
        setSearch={setSearch}
        statusFilter={status}
         setStatusFilter={setStatus}

        totalCoupons={filteredCoupons.length}
        activeCoupons={
          filteredCoupons.filter((c: any) => c.status === "Active").length
        }
        expiredCoupons={
          filteredCoupons.filter((c: any) => c.status === "Expired").length
        }
        totalUsage={
          filteredCoupons.reduce(
            (sum: number, c: any) => sum + (c.usedCount || 0),
            0
          )
        }
        couponType={couponType}
        setCouponType={setCouponType}

        publicFilter={publicFilter}
        setPublicFilter={setPublicFilter}

        firstOrderFilter={firstOrderFilter}
        setFirstOrderFilter={setFirstOrderFilter}

        freeShippingFilter={freeShippingFilter}
        setFreeShippingFilter={setFreeShippingFilter}

        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}

        productFilter={productFilter}
        setProductFilter={setProductFilter}

        sellerFilter={sellerFilter}
        setSellerFilter={setSellerFilter}

        categories={categories}
        products={products}
        sellers={sellers}

        handleAddCoupon={handleAddCoupons}
        onView={handleOpenView}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      <ViewCouponModal
        isOpen={isViewModalOpen}
        onClose={handleCloseView}
        coupon={selectedBanner}

      />



    </>
  );
}