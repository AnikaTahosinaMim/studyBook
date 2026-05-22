import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MapPin, Star } from "lucide-react";

const HomeCard = ({ nook }) => {
  return (
    <div className="group my-8 relative overflow-hidden p-3 bg-white shadow-md hover:shadow-2xl w-full transition-all duration-300 border border-gray-100">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={
            nook?.roomImage?.startsWith("http") ||
            nook?.roomImage?.startsWith("/")
          }
          alt={nook?.roomName}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

        <div className="absolute top-3 right-3 bg-white/90 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full shadow">
          ${nook.pricePerHour}/hr
        </div>
      </div>

      <div className="p-4">
        <Link
          href={`/booking/${nook._id}`}
          className="text-lg font-bold text-gray-800 hover:text-purple-600 transition"
        >
          {nook.roomName}
        </Link>

        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <MapPin size={14} />
          <span>Study Room</span>
        </div>

        <div className="flex items-center gap-1 mt-2 text-purple-500 text-sm">
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} className="text-gray-300" />
          <span className="text-gray-500 ml-1">(4.0)</span>
        </div>

        <Link
          href={`/booking/${nook._id}`}
          className="mt-4 inline-block w-full text-center bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
