/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { booksApi } from "../services/books.service";
import { reviewsApi } from "../services/reviews.service";

import {
  AiOutlineArrowLeft,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";

import ProductCard from "../components/home/ProductCard";
import ReviewList from "../components/review/ReviewList";
import ReviewForm from "../components/review/ReviewForm";

/* ================= INTERFACES ================= */

interface Book {
  book_id: string;
  title: string;
  isbn?: string;
  description?: string;
  price: number;
  stock_quantity?: number;
  publisher_id?: string;
  published_date?: string;
  language?: string;
  cover_image?: string;
}

interface Review {
  review_id: string;
  customer_id: string;
  user_name: string | null;
  rating: number;
  comment: string;
  created_at: string;
}

/* ================= COMPONENT ================= */

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [inCart, setInCart] = useState(false);
  const [favorited, setFavorited] = useState(false);

  /* ===== BOOK ===== */
  const {
    data: book,
    isLoading,
    isError,
  } = useQuery<Book>(["book", id], () => booksApi.getByID(id as string), {
    enabled: !!id,
  });

  /* ===== RELATED BOOKS ===== */
  const { data: relatedBooks = [] } = useQuery<Book[]>(
    ["relatedBooks", id],
    () => booksApi.getRelated(id as string, 4),
    { enabled: !!id && !!book }
  );

  /* ===== REVIEWS ===== */
  const { data: reviews = [], refetch: refetchReviews } = useQuery<Review[]>(
    ["reviews", id],
    () => reviewsApi.getByBook(id as string),
    { enabled: !!id }
  );

  /* ===== SYNC CART & FAVORITES ===== */
  useEffect(() => {
    if (!book) return;

    const cartLS = JSON.parse(localStorage.getItem("cart") || "[]") as Book[];
    const favLS = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as Book[];

    setInCart(cartLS.some((b) => b.book_id === book.book_id));
    setFavorited(favLS.some((b) => b.book_id === book.book_id));
  }, [book]);

  /* ===== HANDLERS ===== */
  const handleAddToCart = () => {
    if (!book) return;
    const cartLS = JSON.parse(localStorage.getItem("cart") || "[]") as Book[];

    if (!cartLS.some((b) => b.book_id === book.book_id)) {
      localStorage.setItem("cart", JSON.stringify([...cartLS, book]));
      setInCart(true);
      alert("Đã thêm vào giỏ hàng!");
    }
  };

  const handleToggleFavorite = () => {
    if (!book) return;
    const favLS = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as Book[];

    if (favLS.some((b) => b.book_id === book.book_id)) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favLS.filter((b) => b.book_id !== book.book_id))
      );
      setFavorited(false);
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favLS, book]));
      setFavorited(true);
    }
  };

  /* ===== STATES ===== */
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-sm text-black">Đang tải chi tiết sách...</p>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500">Không tìm thấy sách.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-orange-600 hover:underline"
        >
          Quay lại
        </button>
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <main className="bg-transparent min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-black hover:text-orange-600"
        >
          <AiOutlineArrowLeft />
          Quay lại
        </button>

        {/* ================= BOOK DETAIL CARD ================= */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-200">
          <div className="flex flex-col lg:flex-row">
            {/* IMAGE */}
            <div className="lg:w-2/5 bg-gray-50 flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-orange-200">
              {book.cover_image ? (
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full max-w-xs rounded-xl object-cover shadow-lg"
                />
              ) : (
                <div className="w-full max-w-xs aspect-[3/4] rounded-xl bg-gray-200 flex items-center justify-center">
                  Không có ảnh bìa
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col gap-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-black">
                {book.title}
              </h1>

              <p className="text-3xl font-bold text-orange-600">
                {book.price.toLocaleString("vi-VN")} VND
              </p>

              {book.description && (
                <p className="text-sm text-black leading-relaxed">
                  {book.description}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={inCart}
                  className={`px-6 py-3 rounded-lg text-sm font-medium ${
                    inCart
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  <AiOutlineShoppingCart className="inline mr-1" />
                  {inCart ? "Đã trong giỏ" : "Thêm vào giỏ"}
                </button>

                <button
                  onClick={handleToggleFavorite}
                  className="px-6 py-3 rounded-lg border-2"
                >
                  {favorited ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RELATED BOOKS ================= */}
        {relatedBooks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Sách liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((rb) => (
                <ProductCard
                  key={rb.book_id}
                  book={rb}
                  onViewDetail={() => navigate(`/books/${rb.book_id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ================= REVIEWS ================= */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Đánh giá từ người đọc</h2>

          <ReviewList reviews={reviews} />

          <div className="mt-10">
            <ReviewForm bookId={book.book_id} onSuccess={refetchReviews} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetail;
