import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerManagement from "./BannerManagement"; // Aapka redesigned component
import ViewBannerModal from "./ViewBannerModal";
import EditBannerModal from "./EditBannerModal";
import {useGetBannersQuery, useUpdateBannerMutation,useDeleteBannerMutation } from "../../../api/Banner"; // Aapki RTK Query file

export default function BannerPage() {
  const Api = import.meta.env.VITE_API_URL;

const navigate=useNavigate()


  // RTK Query call
  const { data, isLoading, isError } = useGetBannersQuery();
  const [updateBanner] = useUpdateBannerMutation()
  const [ deleteBanner ] = useDeleteBannerMutation();
  // Search & Filter States
  const [search, setSearch] = useState("");
  const [bannerType, setBannerType] = useState("");
  const [status, setStatus] = useState("");



  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<any>(null);
  // Raw API Array
  const rawBanners = (data?.data as any[]) || [];

  // Active Filtering (Search, Type, Status)
  const filteredBanners = rawBanners.filter((item) => {
    // 1. Search Filter (Title & Subtitle)
    const matchesSearch = search === "" ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(search.toLowerCase());

    // 2. Type Filter
    const matchesType = bannerType === "" || item.bannerType === bannerType;

    // 3. Status Filter
    const matchesStatus = status === "" || String(item.isActive) === status;



    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddBanner = () => {
    // Open modal or navigate to create page
    navigate("/dashboard/BannerForm")
    console.log("Add Banner Clicked");
  };


  const handleOpenView = (banner: any) => {
    setSelectedBanner(banner);
    setIsViewModalOpen(true);
  };

  const handleCloseView = () => {
    setIsViewModalOpen(false);
    setSelectedBanner(null);
  };



  const handleOpenEdit = (banner: any) => {
    setSelectedBanner(banner);
    setIsEditOpen(true);
  };


  const handleSaveBanner = async (updatedFormData: FormData) => {
    try {
      setIsSaving(true);

      // Call your RTK Query / Axios Mutation here:
      await updateBanner({
        id: selectedBanner._id,
        body: updatedFormData
      }).unwrap();
      console.log("Updating Banner with Data:", Object.fromEntries(updatedFormData));

      setIsEditOpen(false);
      setSelectedBanner(null);
    } catch (error) {
      console.error("Failed to update banner:", error);
    } finally {
      setIsSaving(false);
    }
  };



    
const handleDelete = async (id: string) => {
  try {
    await deleteBanner(id).unwrap();
    alert("Banner deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete banner.");
  }
};


  return (
    <>
      <BannerManagement
        banners={filteredBanners}
        Api={Api}
        isLoading={isLoading}
        isError={isError}
        search={search}
        setSearch={setSearch}
        bannerType={bannerType}
        setBannerType={setBannerType}
        status={status}
        setStatus={setStatus}
        handleAddbanner={handleAddBanner}
        onView={handleOpenView}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />


      <ViewBannerModal
        isOpen={isViewModalOpen}
        onClose={handleCloseView}
        banner={selectedBanner}
        Api={Api}
      />



      <EditBannerModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        banner={selectedBanner}
        Api={Api}
        onSave={handleSaveBanner}
        isSaving={isSaving}
      />

    </>
  );
}