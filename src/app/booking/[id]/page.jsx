import BookingModal from "@/components/BookingModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

const fetchDetails = async (id, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}` || "",
      },
    },
  );
  const data = await res.json();
  return data;
};

const BookDetails = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const book = await fetchDetails(id, token);

  const {
    roomImage,
    roomName,
    roomId,
    _id,
    pricePerHour,
    hourlyRate,
    durationHour,
    totalCost,
    specialNote,
    amenities,
  } = book || {};

  const displayRoomId = roomId || _id || "N/A";
  const displayPrice = pricePerHour ?? hourlyRate ?? null;
  const displayTotalCost =
    totalCost ??
    (displayPrice !== null && durationHour
      ? displayPrice * durationHour
      : null);

  const amenitiesList = Array.isArray(amenities)
    ? amenities
    : typeof amenities === "string" && amenities.trim().length
      ? [amenities]
      : [];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
        {/* LEFT - IMAGE + INFO */}
        <div className="rounded-3xl overflow-hidden border bg-white shadow-xl">
          <Image
            src={roomImage}
            alt={roomName || "Study room"}
            height={500}
            width={900}
            className="w-full object-cover h-[320px]"
          />

          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-900">
              {roomName || "Study Room"}
            </h1>

            <p className="mt-3 text-slate-600">
              {specialNote ||
                "A peaceful and modern study environment for focused learning."}
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50">
                <p className="text-xs uppercase text-slate-500">Room ID</p>
                <p className="text-lg font-semibold">{displayRoomId}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50">
                <p className="text-xs uppercase text-slate-500">Duration</p>
                <p className="text-lg font-semibold">
                  {durationHour ? `${durationHour} hr` : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - PRICE + ACTION */}
        <div className="space-y-6">
          {/* PRICE CARD */}
          <div className="rounded-3xl border bg-white shadow-xl p-6">
            <h2 className="text-xl font-semibold">Pricing</h2>

            <div className="mt-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Price / hour</span>
                <span className="text-xl font-bold">
                  {displayPrice ? `$${displayPrice}` : "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white p-4 rounded-2xl">
                <span>Total Cost</span>
                <span className="text-2xl font-bold">
                  {displayTotalCost ? `$${displayTotalCost}` : "N/A"}
                </span>
              </div>
            </div>

            {/* BOOK BUTTON */}
            <BookingModal price={displayPrice} book={book} />
          </div>

          {/* AMENITIES */}
          <div className="rounded-3xl border bg-white shadow-xl p-6">
            <h2 className="text-xl font-semibold">Amenities</h2>

            {amenitiesList.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {amenitiesList.map((item, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border rounded-xl px-3 py-2 text-sm text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 mt-3">No amenities listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
