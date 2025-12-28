import React, { useState } from "react";
import { reviewsApi } from "../../services/reviews.service";
import { useAppContext } from "../../contexts/AppContext";

interface Props {
  bookId: string;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<Props> = ({ bookId, onSuccess }) => {
  const { isLoggedIn, showToast } = useAppContext();

  const [form, setForm] = useState({
    rating: 5,
    comment: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      showToast({
        message: "Vui lòng đăng nhập để viết đánh giá",
        type: "ERROR",
      });
      return;
    }

    // ❌ Chưa nhập nội dung
    if (!form.comment.trim()) {
      showToast({
        message: "Vui lòng nhập nội dung đánh giá",
        type: "ERROR",
      });
      return;
    }

    try {
      setLoading(true);

      // ⚠️ customer_id KHÔNG gửi ở đây
      // 👉 customer_id được backend lấy từ JWT token
      await reviewsApi.create({
        book_id: bookId,
        rating: form.rating,
        comment: form.comment.trim(),
      });

      setForm({
        rating: 5,
        comment: "",
      });

      onSuccess?.();

      showToast({
        message: "Đã gửi đánh giá thành công",
        type: "SUCCESS",
      });
    } catch (error) {
      showToast({
        message: "Gửi đánh giá thất bại",
        type: "ERROR",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ===== UI KHI CHƯA LOGIN ===== */
  if (!isLoggedIn) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-black">
        Bạn cần <span className="text-orange-600 font-medium">đăng nhập</span>{" "}
        để viết đánh giá.
      </div>
    );
  }

  /* ===== FORM ===== */
  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-black mb-4">
        Viết đánh giá của bạn
      </h3>

      <div className="space-y-4">
        {/* Rating */}
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          className="w-full border border-orange-200 rounded-lg px-4 py-2 text-sm"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} sao
            </option>
          ))}
        </select>

        {/* Comment */}
        <textarea
          placeholder="Nhận xét của bạn..."
          rows={4}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full border border-orange-200 rounded-lg px-4 py-2 text-sm resize-none"
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-sm font-medium text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
