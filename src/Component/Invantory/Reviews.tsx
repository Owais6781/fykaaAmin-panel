


import { User, Star, Package, Calendar, RefreshCw } from "lucide-react";
import { useGetAllReviewsQuery } from "../../api/review"
export default function Reviews() {
  const { data: reviews, isError, isLoading, refetch } = useGetAllReviewsQuery();

  console.log("review get", reviews);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[300px]">
        <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
          <RefreshCw size={18} className="animate-spin text-gray-400" />
          Loading reviews...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm font-medium flex justify-between items-center">
          <span>Failed to load reviews. Please try again.</span>
          <button 
            onClick={() => refetch()}
            className="px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const reviewList = reviews?.reviews || [];

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0B0F19] tracking-tight">
            Product Reviews
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track customer feedback, ratings, and order details
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 bg-green-50 text-green-500 rounded-full border border-green-100 uppercase tracking-wider">
            {reviewList.length} Total Reviews
          </span>
          <button 
            onClick={() => refetch?.()}
            className="p-2 text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm transition"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Reviews Main Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {reviewList.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            No reviews found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reviewList.map((review: any) => (
              <div
                key={review.id}
                className="p-6 hover:bg-slate-50/60 transition duration-150"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  {/* Left: Avatar & Feedback */}
                  <div className="flex gap-4 items-start flex-1">
                    {/* Light gray icon container with light blue badge feel */}
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                      <User size={20} className="text-slate-600" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#0B0F19] text-base">
                          {review.userName || "Customer"}
                        </h3>
                        {review.product && (
                          <span className="text-xs text-gray-400 font-normal">
                            • {review.product}
                          </span>
                        )}
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={`${
                              star <= (review.rating || 0)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-semibold text-gray-600 ml-1">
                          {review.rating ? `${review.rating}.0` : "0.0"}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed pt-1">
                        {review.review}
                      </p>
                    </div>
                  </div>

                  {/* Right: Product Name, Order ID & Date */}
                  <div className="flex flex-col md:items-end justify-between text-left md:text-right gap-2 shrink-0 border-t md:border-t-0 border-gray-100 pt-3 md:pt-0 w-full md:w-auto">
                    {review.productId?.title && (
                      <h4 className="text-sm font-semibold text-[#0B0F19]">
                        {review.productId.title}
                      </h4>
                    )}

                    <div className="flex flex-wrap md:flex-col items-start md:items-end gap-1.5 text-xs text-gray-500">
                      {review.orderId && (
                        <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-mono border border-slate-200">
                          <Package size={12} className="text-slate-400" />
                          #{review.orderId}
                        </span>
                      )}

                      {review.createdAt && (
                        <span className="inline-flex items-center gap-1 text-gray-400 pt-1">
                          <Calendar size={12} />
                          {new Date(review.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


