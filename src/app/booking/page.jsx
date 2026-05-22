import BookCard from "@/components/BookCard";

const BookingPages = async ({ searchParams }) => {
  const params = await searchParams;

  const search = params?.search || "";
  const amenities = params?.amenities || "";
  const minPrice = params?.minPrice || "";
  const maxPrice = params?.maxPrice || "";

  const query = new URLSearchParams();

  if (search) query.append("search", search);

  if (amenities) query.append("amenities", amenities);

  if (minPrice) query.append("minPrice", minPrice);
  if (maxPrice) query.append("maxPrice", maxPrice);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking?${query.toString()}`,
    {
      cache: "no-store",
    },
  );

  const nooks = await res.json();

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Study Rooms</h2>

      <form
        action="/booking"
        method="GET"
        className="mb-8 flex flex-col md:flex-row gap-4"
      >
        <input
          name="search"
          defaultValue={search}
          placeholder="Search room"
          className="border px-4 py-3 rounded-xl"
        />

        <select
          name="amenities"
          defaultValue={amenities}
          className="border px-4 py-3 rounded-xl"
        >
          <option value="">All Amenities</option>
          <option value="WiFi">WiFi</option>
          <option value="AC">AC</option>
        </select>

        <input
          type="number"
          name="minPrice"
          defaultValue={params?.minPrice || ""}
          placeholder="Min Price"
          className="border px-4 py-3 rounded-xl"
        />

        <input
          type="number"
          name="maxPrice"
          defaultValue={params?.maxPrice || ""}
          placeholder="Max Price"
          className="border px-4 py-3 rounded-xl"
        />

        <button className="bg-purple-600 text-white px-6 py-3 rounded-xl">
          Search
        </button>
      </form>

      {nooks.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-purple-600">
            No rooms found 😢
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nooks.map((nook) => (
            <BookCard key={nook._id} nook={nook} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPages;
