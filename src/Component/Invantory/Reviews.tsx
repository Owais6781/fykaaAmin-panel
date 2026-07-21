import { Star, User } from "lucide-react";
import { useGetAllReviewsQuery } from "../../api/review"

// const reviews = [
//   {
//     id: 1,
//     user: "John Doe",
//     product: "Wireless Headphones",
//     rating: 5,
//     comment: "Amazing quality! Highly recommended.",
//     date: "08 Jul 2026",
//   },
//   {
//     id: 2,
//     user: "Sarah",
//     product: "Gaming Mouse",
//     rating: 4,
//     comment: "Very comfortable and responsive.",
//     date: "07 Jul 2026",
//   },
//   {
//     id: 3,
//     user: "Michael",
//     product: "Smart Watch",
//     rating: 3,
//     comment: "Battery could be better.",
//     date: "06 Jul 2026",
//   },
// ];

export default function Reviews() {
    const { data: reviews, isError, isLoading } = useGetAllReviewsQuery();
    console.log(" review get", reviews)

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Something went wrong.</p>;
    return (
        <div className="p-6">
            <div className="bg-[#1E293B] rounded-xl border border-gray-700">
                <div className="border-b border-gray-700 p-5">
                    <h2 className="text-xl font-semibold text-white">
                        Product Reviews
                    </h2>
                </div>

                <div className="divide-y divide-gray-700">
                    {reviews?.reviews?.map((review: any) => (
                        <div
                            key={review.id}
                            className="p-5 hover:bg-[#273449] transition"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                                        <User size={20} className="text-white" />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-white">
                                            {review.userName}
                                        </h3>
                                    

                                        <p className="text-sm text-gray-400">
                                            {review.product}
                                        </p>

                                        <div className="flex mt-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={16}
                                                    className={`${star <= review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-500"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-300 mt-3">
                                            {review.review}
                                        </p>

                                    </div>
                                </div>


                                <div className="flex justify-between items-start">

                                    <div className="flex flex-col items-end text-right gap-4">
                                            <h3 className="text-gray-300 mt-3">
                                            {review.productId.title}
                                        </h3>

                                        <span className="text-xs text-gray-400">
                                            {review.orderId}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString("en-GB")}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}