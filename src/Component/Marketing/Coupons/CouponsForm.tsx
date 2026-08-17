import { useEffect, useRef, useState } from "react";

import { Loader2, ChevronDown, ChevronUp, X, Check } from "lucide-react";

export const CouponForm = ({
  handleSubmitForm,
  formData,
  handleChange,
  setFormData,
  onClose,
  isSubmitting = false,
  editingCoupon = null,
  categories,
  products,
  sellers,
}: any) => {
  const [open, setOpen] = useState(false);
  const [categoryopen, setCategoryOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [sellerOpen, setSellerOpen] = useState(false);


  const CatrgorydropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        CatrgorydropdownRef.current &&
        !CatrgorydropdownRef.current.contains(event.target as Node)
      ) {
        setCategoryOpen(false);

      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleCategoryChange = (categoryId: string) => {
    const currentCategories = formData.category || [];

    const alreadySelected = currentCategories.includes(categoryId);

    let updatedCategories;

    if (alreadySelected) {
      // Remove category
      updatedCategories = currentCategories.filter(
        (id: string) => id !== categoryId
      );
    } else {
      // Add category
      updatedCategories = [
        ...currentCategories,
        categoryId,
      ];
    }

    setFormData({
      ...formData,
      category: updatedCategories,
    });
  };


  const productDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setProductOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleProductChange = (productId: string) => {
    const currentProducts = formData.products || [];

    const alreadySelected = currentProducts.includes(productId);

    const updatedProducts = alreadySelected
      ? currentProducts.filter((id: string) => id !== productId)
      : [...currentProducts, productId];

    setFormData({
      ...formData,
      products: updatedProducts,
    });
  };




  const SellerDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        SellerDropdownRef.current &&
        !SellerDropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setSellerOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);


  const handleSellerChange = (sellerId: string) => {
    setFormData((prev: any) => {
      const currentSellers = prev.sellerId || [];

      const updatedSellers = currentSellers.includes(sellerId)
        ? currentSellers.filter((id: string) => id !== sellerId)
        : [...currentSellers, sellerId];

      return {
        ...prev,
        sellerId: updatedSellers,
      };
    });
  };





  return (
    <form onSubmit={handleSubmitForm} className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0B0F19]">
            {editingCoupon ? "Edit Coupon" : "Create Coupon"}
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            {editingCoupon
              ? "Update coupon details and settings"
              : "Create a new coupon and configure its settings"}
          </p>
        </div>
        {/* Cancel Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
      {/* 1. Coupon Code & Title */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="relative" ref={CatrgorydropdownRef}>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Categories <span className="text-rose-500">*</span>
          </label>

          {/* Dropdown Button */}
          <button
            type="button"
            onClick={() => setCategoryOpen((prev) => !prev)}
            className="w-full min-h-[42px] rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-left text-[#0B0F19] outline-none transition hover:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 flex items-center justify-between"
          >
            <div className="flex flex-wrap gap-1.5 flex-1">
              {formData.category?.length > 0 ? (
                formData.category.map((categoryId: string) => {
                  const category = categories.find(
                    (cat: any) => cat._id === categoryId
                  );

                  return (
                    <span
                      key={categoryId}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-[11px]"
                    >
                      {category?.name || categoryId}
                    </span>
                  );
                })
              ) : (
                <span className="text-slate-400">
                  Select Categories
                </span>
              )}
            </div>

            {categoryopen ? (
              <ChevronUp
                size={16}
                className="text-slate-400 shrink-0 ml-2"
              />
            ) : (
              <ChevronDown
                size={16}
                className="text-slate-400 shrink-0 ml-2"
              />
            )}
          </button>

          {/* Dropdown List */}
          {categoryopen && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">

              {/* Header */}
              <div className="px-3 py-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                Select Categories
              </div>

              {/* Category List */}
              <div className="max-h-60 overflow-y-auto p-1">
                {categories.length > 0 ? (
                  categories.map((cat: any) => {
                    const isSelected =
                      formData.category?.includes(cat._id);

                    return (
                      <button
                        type="button"
                        key={cat._id}
                        onClick={() =>
                          handleCategoryChange(cat._id)
                        }
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs transition
                  ${isSelected
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-700 hover:bg-slate-50"
                          }
                `}
                      >
                        {/* Checkbox */}
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0
                    ${isSelected
                              ? "bg-blue-600 border-blue-600"
                              : "border-slate-300 bg-white"
                            }
                  `}
                        >
                          {isSelected && (
                            <Check
                              size={12}
                              className="text-white"
                            />
                          )}
                        </div>

                        {/* Category Name */}
                        <span className="flex-1">
                          {cat.name}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-4 text-center text-xs text-slate-400">
                    No categories found
                  </div>
                )}
              </div>

              {/* Footer */}
              {formData.category?.length > 0 && (
                <div className="border-t border-slate-100 px-3 py-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {formData.category.length} selected
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category: [],
                      })
                    }
                    className="text-[11px] cursor-pointer text-red-500 hover:text-red-600"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={productDropdownRef}>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Products
          </label>

          {/* Dropdown Button */}
          <button
            type="button"
            onClick={() => setProductOpen((prev) => !prev)}
            className="w-full min-h-[42px] rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-left text-[#0B0F19] outline-none transition hover:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 flex items-center justify-between"
          >
            <div className="flex flex-wrap gap-1.5 flex-1">
              {formData.products?.length > 0 ? (
                formData.products.map((productId: string) => {
                  const product = products.find(
                    (item: any) => item._id === productId
                  );

                  return (
                    <span
                      key={productId}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-[11px]"
                    >
                      {product?.title || productId}
                    </span>
                  );
                })
              ) : (
                <span className="text-slate-400">
                  Select Products
                </span>
              )}
            </div>

            {productOpen ? (
              <ChevronUp
                size={16}
                className="text-slate-400 shrink-0 ml-2"
              />
            ) : (
              <ChevronDown
                size={16}
                className="text-slate-400 shrink-0 ml-2"
              />
            )}
          </button>

          {/* Dropdown */}
          {productOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">

              <div className="px-3 py-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                Select Products
              </div>

              <div className="max-h-60 overflow-y-auto p-1">
                {products.length > 0 ? (
                  products.map((product: any) => {
                    const isSelected =
                      formData.products?.includes(product._id);

                    return (
                      <button
                        type="button"
                        key={product._id}
                        onClick={() =>
                          handleProductChange(product._id)
                        }
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs transition
                  ${isSelected
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-700 hover:bg-slate-50"
                          }
                `}
                      >
                        {/* Checkbox */}
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0
                    ${isSelected
                              ? "bg-blue-600 border-blue-600"
                              : "border-slate-300 bg-white"
                            }
                  `}
                        >
                          {isSelected && (
                            <Check
                              size={12}
                              className="text-white"
                            />
                          )}
                        </div>

                        {/* Product Name */}
                        <span className="flex-1">
                          {product.title}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-4 text-center text-xs text-slate-400">
                    No products found
                  </div>
                )}
              </div>

              {/* Footer */}
              {formData.products?.length > 0 && (
                <div className="border-t border-slate-100 px-3 py-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {formData.products.length} selected
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        products: [],
                      })
                    }
                    className="text-[11px] text-red-500 hover:text-red-600"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>


      
        <div className="relative "  ref={SellerDropdownRef}>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Seller <span className="text-rose-500">*</span>
          </label>

          {/* Dropdown Button */}
          <button
            type="button"
            onClick={() => setSellerOpen((prev) => !prev)}
            className="w-full min-h-[42px] rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-left text-[#0B0F19] outline-none transition hover:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 flex items-center justify-between"
          >
            <div className="flex flex-wrap gap-1.5 flex-1">
              {formData.sellerId?.length > 0 ? (
                formData.sellerId.map((sellerId: string) => {
                  const seller = sellers.find(
                    (item: any) => item._id === sellerId
                  );

                  return (
                    <span
                      key={sellerId}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-[11px]"
                    >
                      {seller?.fullName || sellerId}
                    </span>
                  );
                })
              ) : (
                <span className="text-slate-400">
                  Select Sellers
                </span>
              )}
            </div>

            {sellerOpen ? (
              <ChevronUp
                size={16}
                className="text-slate-400 shrink-0 ml-2"
              />
            ) : (
              <ChevronDown
                size={16}
                className="text-slate-400 shrink-0 ml-2"
              />
            )}
          </button>

          {/* Dropdown List */}
          {sellerOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">

              <div className="px-3 py-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                Select Sellers
              </div>

              <div className="max-h-60 overflow-y-auto p-1">
                {sellers.length > 0 ? (
                  sellers.map((seller: any) => {
                    const isSelected =
                      formData.sellerId?.includes(seller._id);

                    return (
                      <button
                        type="button"
                        key={seller._id}
                        onClick={() =>
                          handleSellerChange(seller._id)
                        }
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs transition
                       ${isSelected
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-700 hover:bg-slate-50"
                          }
                `}
                      >
                        {/* Checkbox */}
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0
                    ${isSelected
                              ? "bg-blue-600 border-blue-600"
                              : "border-slate-300 bg-white"
                            }
                  `}
                        >
                          {isSelected && (
                            <Check
                              size={12}
                              className="text-white"
                            />
                          )}
                        </div>

                        {/* Seller Name */}
                        <span className="flex-1">
                          {seller.fullName}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-4 text-center text-xs text-slate-400">
                    No sellers found
                  </div>
                )}
              </div>

              {/* Footer */}
              {formData.sellerId?.length > 0 && (
                <div className="border-t border-slate-100 px-3 py-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {formData.sellerId.length} selected
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        sellerId: [],
                      })
                    }
                    className="text-[11px] text-red-500 hover:text-red-600"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>



      </div>


      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Coupon Code <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="code"
            required
            placeholder="e.g. SUMMER50"
            value={formData.code}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] placeholder:text-slate-400 font-mono font-medium outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Coupon Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Summer Special Sale"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>
      </div>

      {/* 2. Description */}
      <div>
        <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Brief details about terms or eligibility..."
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 resize-none"
        />
      </div>

      {/* 3. Discount Config */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Discount Type <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              onClick={() => setOpen(!open)}
              onBlur={() => setOpen(false)}
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 appearance-none cursor-pointer"
            >
              <option value="Flat">Flat Amount (₹)</option>
              <option value="Percentage">Percentage (%)</option>
            </select>
            {/* <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" /> */}
            {open ? (

              <ChevronUp size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />

            ) : (
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />

            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Discount Value <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            name="discountValue"
            placeholder="0"
            value={formData.discountValue}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Maximum Discount 
          </label>
          <input
            type="number"
            name="maximumDiscount"
            placeholder="No limit"
            value={formData.maximumDiscount}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>
      </div>

      {/* 4. Order Limits */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Minimum Order (₹) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            name="minimumOrder"
            placeholder="0"
            value={formData.minimumOrder}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Total Usage Limit
          </label>
          <input
            type="number"
            name="usageLimit"
            placeholder="Unlimited"
            value={formData.usageLimit}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Per User Limit
          </label>
          <input
            type="number"
            name="perUserLimit"
            placeholder="1"
            value={formData.perUserLimit}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>
      </div>

      {/* 5. Dates */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Start Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            End Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 cursor-pointer"
          />
        </div>
        {/* 6. Status */}
        <div>
          <label className="block text-xs font-semibold text-[#0B0F19] mb-1.5">
            Status <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-[#0B0F19] outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 appearance-none cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Expired">Expired</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>




      {/* 7. Toggle Switches */}
      <div className="space-y-3 pt-2">
        {[
          { key: "isPublic", label: "Public Coupon", desc: "Visible to all customers at checkout" },
          { key: "firstOrderOnly", label: "First Order Only", desc: "Valid only on customer's first purchase" },
          { key: "freeShipping", label: "Free Shipping", desc: "Waives shipping fee when applied" },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 transition-colors"
          >
            <div>
              <p className="text-xs font-semibold text-[#0B0F19]">{item.label}</p>
              <p className="text-[11px] text-slate-500">{item.desc}</p>
            </div>

            <button
              type="button"
              onClick={() =>
                setFormData((prev: any) => ({
                  ...prev,
                  [item.key]: !prev[item.key],
                }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${formData[item.key] ? "bg-[#0B0F19]" : "bg-slate-200"
                }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${formData[item.key] ? "translate-x-5" : "translate-x-0"
                  }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* 8. Action Buttons */}
      <div className="flex items-center gap-3 border-t border-slate-100 pt-5 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#0B0F19] transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0F19] hover:bg-[#182032] text-white px-4 py-2.5 text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          <span>{editingCoupon ? "Update Coupon" : "Save Coupon"}</span>
        </button>
      </div>
    </form>
  );
};