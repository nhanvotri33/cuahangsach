/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ordersApi } from "../../services/orders.service";
import { useAppContext } from "../../contexts/AppContext";

const Payment: React.FC = () => {
  useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!orderId) {
      alert("Không tìm thấy thông tin đơn hàng");
      navigate("/my-orders");
      return;
    }

    const loadOrder = async () => {
      try {
        const orderData = await ordersApi.getById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error("Error loading order:", error);
        alert("Không thể tải thông tin đơn hàng");
        navigate("/my-orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, navigate]);

  const handleConfirmPayment = async () => {
    if (!orderId || !order) return;

    if (!window.confirm("Bạn đã chuyển khoản thành công? Vui lòng xác nhận.")) {
      return;
    }

    setSubmitting(true);
    try {
      // Chỉ cập nhật status, giữ nguyên các field khác
      const updateData = {
        customer_id: order.customer_id,
        status: "paid",
        total_amount: order.total_amount,
        payment_method: order.payment_method,
      };

      await ordersApi.update(orderId, updateData);

      alert("Đã xác nhận thanh toán thành công!");
      navigate("/my-orders");
    } catch (error: any) {
      console.error("Error confirming payment:", error);
      alert("Có lỗi xảy ra: " + (error?.message || "Vui lòng thử lại"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <p className="text-black">Đang tải thông tin thanh toán...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <p className="text-black">Không tìm thấy đơn hàng.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Thanh toán đơn hàng</h1>

      <div className="bg-white p-6 rounded-lg shadow border border-orange-200 space-y-6">
        {/* Thông tin đơn hàng */}
        <div>
          <h2 className="font-semibold mb-3 text-lg text-black">Thông tin đơn hàng</h2>
          <div className="space-y-2 text-sm">
            <p className="text-black">
              <span className="font-medium">Mã đơn hàng:</span> {order.order_id}
            </p>
            <p className="text-black">
              <span className="font-medium">Tổng tiền:</span>{" "}
              <span className="text-orange-600 font-bold">
                {Number(order.total_amount || 0).toLocaleString("vi-VN")} VND
              </span>
            </p>
            <p className="text-black">
              <span className="font-medium">Trạng thái:</span>{" "}
              <span className="text-orange-600">{order.status}</span>
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div className="border-t border-orange-200 pt-6">
          <h2 className="font-semibold mb-4 text-lg text-black">
            Quét mã QR để thanh toán
          </h2>
          <div className="flex flex-col items-center space-y-4">
            {/* QR Code Image - bạn có thể thay bằng QR code thật */}
            <div className="bg-white p-4 border-2 border-orange-200 rounded-lg">
              <img
                src="/images/zalo-1.png"
                alt="QR Code thanh toán"
                className="w-64 h-64 object-contain"
                onError={(e) => {
                  // Fallback nếu không có ảnh
                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='14'%3EQR Code%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center max-w-md">
              Vui lòng quét mã QR bằng ứng dụng ngân hàng của bạn để chuyển khoản
            </p>
            <div className="bg-orange-50 p-4 rounded-lg text-sm text-black max-w-md">
              <p className="font-medium mb-2">Thông tin chuyển khoản:</p>
              <p>Số tài khoản: <span className="font-semibold">1234567890</span></p>
              <p>Chủ tài khoản: <span className="font-semibold">BOOKSTORE</span></p>
              <p>Ngân hàng: <span className="font-semibold">Vietcombank</span></p>
              <p>Nội dung: <span className="font-semibold">{order.order_id}</span></p>
            </div>
          </div>
        </div>

        {/* Nút xác nhận */}
        <div className="border-t border-orange-200 pt-6">
          <button
            onClick={handleConfirmPayment}
            disabled={submitting || order.status === "paid"}
            className={`w-full py-3 rounded-lg font-medium transition ${submitting || order.status === "paid"
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
              }`}
          >
            {submitting
              ? "Đang xử lý..."
              : order.status === "paid"
                ? "Đã xác nhận thanh toán"
                : "Tôi đã chuyển khoản"}
          </button>

          <button
            onClick={() => navigate("/my-orders")}
            className="w-full mt-3 border border-orange-200 text-black py-2 rounded-lg hover:bg-orange-50 transition"
          >
            Quay lại đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

