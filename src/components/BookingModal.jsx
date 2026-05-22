"use client";

import React, { useMemo, useState } from "react";
import { CalendarDays, Clock3, DollarSign, X, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const formatDate = (date) => {
  const pad = (value) => String(value).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
};

const formatTime = (date) => {
  const pad = (value) => String(value).padStart(2, "0");
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${hours}:${minutes}`;
};

export default function BookingModal({ price = 0, book, session }) {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  const [open, setOpen] = useState(false);

  // Separate date and time states
  const [bookingDate, setBookingDate] = useState(formatDate(now));
  const [startTime, setStartTime] = useState(formatTime(now));
  const [endTime, setEndTime] = useState(formatTime(oneHourLater));

  // Calculate duration
  const durationHours = useMemo(() => {
    if (!startTime || !endTime) return 0;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    if (endMinutes <= startMinutes) return 0;

    const totalMinutes = endMinutes - startMinutes;
    return Number((totalMinutes / 60).toFixed(2));
  }, [startTime, endTime]);

  // Calculate total cost
  const totalCost = useMemo(() => {
    if (durationHours <= 0) return 0;
    return Number((price * durationHours).toFixed(2));
  }, [price, durationHours]);

  const handleConfirmBooking = async () => {
    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (durationHours <= 0) {
      toast.error("End time must be later than start time.");
      return;
    }

    const bookingInfo = {
      roomId: book?._id,
      roomName: book?.roomName,
      roomImage: book?.roomImage,
      bookingDate,
      startTime,
      endTime,
      durationHours,
      totalCost,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bookingInfo),
        },
      );

      const data = await res.json();

      // ❌ backend error handle
      if (!res.ok) {
        toast.error(data.message || "Booking failed");
        return;
      }

      // ✅ success
      if (data.insertedId) {
        toast.success("Booking Confirmed Successfully! 🎉");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const today = formatDate(new Date());

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-gray-800"
      >
        Book Now
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
          <div className="w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl sm:rounded-[2rem] bg-white shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-5 sm:px-8 sm:py-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Book This Room
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-purple-100">
                    Select your booking date and time.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-shrink-0 rounded-full bg-white/20 p-2 transition hover:bg-white/30"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
              {/* Booking Date */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarDays size={18} />
                  Booking Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm sm:text-base outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* Start and End Time */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Start Time */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Clock3 size={18} />
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm sm:text-base outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Clock3 size={18} />
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm sm:text-base outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Price */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Price / Hour
                  </p>
                  <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
                    ${price}
                  </p>
                </div>

                {/* Duration */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Duration
                  </p>
                  <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
                    {durationHours > 0 ? `${durationHours} hr` : "Invalid"}
                  </p>
                </div>

                {/* Total Cost */}
                <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 p-4 sm:p-5 text-white sm:col-span-2 lg:col-span-1">
                  <p className="text-xs uppercase tracking-wide text-purple-100">
                    Total Cost
                  </p>
                  <p className="mt-2 flex items-center gap-1 text-2xl sm:text-3xl font-extrabold">
                    <DollarSign size={22} />
                    {totalCost.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 border-t border-slate-200 bg-slate-50 p-4 sm:p-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full rounded-2xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={durationHours <= 0}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 py-3 font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle size={18} />
                  Confirm Booking
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
