import React from "react";

interface Review {
  review_id: string;
  customer_id: string;
  user_name: string | null;
  rating: number;
  comment: string;
  created_at: string;
}

interface Props {
  reviews: Review[];
}

const ReviewList: React.FC<Props> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-sm text-black/60">
        Chưa có đánh giá nào cho sách này.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div
          key={r.review_id}
          className="bg-white border border-orange-200 rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-black">{r.user_name}</p>
            <span className="text-sm text-orange-500">
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </span>
          </div>

          <p className="text-sm text-black leading-relaxed">{r.comment}</p>

          <p className="text-xs text-black/50 mt-2">
            {new Date(r.created_at).toLocaleDateString("vi-VN")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
