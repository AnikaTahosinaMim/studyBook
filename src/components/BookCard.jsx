"use client";

import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { BsClock, BsPeople } from "react-icons/bs";

const BookCard = ({ nook }) => {
  const {
    roomImage,
    roomName,
    floor,
    seatCapacity,
    amenities,
    hourlyRate,
    totalCost,
    _id,
    shortDescription,
  } = nook;
  const safeAmenities = Array.isArray(amenities)
    ? amenities
    : typeof amenities === "string"
      ? amenities.split(",")
      : [];

  return (
    <div className="group w-full max-w-sm mx-auto bg-white p-3 shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-slate-100">
      <div className="relative h-52 overflow-hidden">
        <Image
          alt="Room Image"
          src={roomImage}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        <div className="absolute top-3 right-3">
          <Chip color="primary" className="font-bold shadow-md">
            <BsPeople className="mr-1" />
            {seatCapacity}
          </Chip>
        </div>

        <div className="absolute top-3 left-3">
          <Chip variant="flat" className="bg-white/90 text-black font-semibold">
            {floor}
          </Chip>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <Link href={`/booking/${_id}`}>
          <h3 className="text-lg font-bold text-slate-900 line-clamp-2 hover:text-purple-600 transition">
            {roomName}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-purple-500">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span className="text-xs text-slate-500 ml-2">(4.0)</span>
        </div>

        <p className="text-sm text-slate-500 line-clamp-2">
          {shortDescription ||
            "A quiet and modern study room perfect for focus and productivity."}
        </p>

        <div className="flex flex-wrap gap-2">
          {safeAmenities.slice(0, 2).map((item, i) => (
            <span
              key={i}
              className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full"
            >
              {item.trim()}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500 pt-2">
          <span className="flex items-center gap-1">
            <BsClock /> Hourly
          </span>

          <span className="font-semibold text-slate-700">${hourlyRate}/hr</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-xs text-slate-400">Starting from</p>
            <p className="text-xl font-bold text-purple-600">${totalCost}</p>
          </div>

          <Link href={`/booking/${_id}`}>
            <Button className="rounded-2xl font-semibold px-5 text-white bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-600 hover:scale-105 transition-transform duration-300">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
