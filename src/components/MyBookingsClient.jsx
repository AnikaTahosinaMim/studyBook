"use client";

import { useState } from "react";
import { FaDashcube } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function MyBookingsClient({ bookings }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-purple-600">
          You have no bookings yet.
        </h2>
        <p className="text-slate-500 mt-2">
          Book a room to see your reservations here.
        </p>
      </div>
    );
  }

  const handleCancel = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      },
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success("Booking cancelled successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to cancel booking");
    }
  };

  const canCancelBooking = (bookingDate, status) => {
    const currentStatus = status || "confirmed";

    if (currentStatus !== "confirmed") return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const booking = new Date(bookingDate);
    booking.setHours(0, 0, 0, 0);

    return booking >= today;
  };

  return (
    <div>
      <h2 className="my-6 text-2xl font-bold">My Bookings</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-purple-500 text-white">
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Start</th>
              <th className="p-3 text-left">End</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Total Cost</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="p-3">{booking.roomName}</td>
                <td className="p-3">{booking.bookingDate}</td>
                <td className="p-3">{booking.startTime}</td>
                <td className="p-3">{booking.endTime}</td>
                <td className="p-3">{booking.durationHours} hr</td>
                <td className="p-3">${booking.totalCost}</td>

                {/* Status Badge */}
                <td className="p-3">
                  <div
                    className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold capitalize min-w-[110px] ${
                      (booking.status || "confirmed") === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status || "confirmed"}
                  </div>
                </td>

                <td className="p-3">
                  {canCancelBooking(booking.bookingDate, booking.status) ? (
                    <button
                      onClick={() => {
                        setSelectedId(booking._id);
                        setShowModal(true);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-slate-400 text-sm">
                      <FaDashcube></FaDashcube>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center">
              <h2 className="text-lg font-bold mb-3">Confirm Cancellation</h2>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to cancel this booking?
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    handleCancel(selectedId);
                    setShowModal(false);
                  }}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Yes
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-1 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
