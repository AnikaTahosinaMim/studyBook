import MyBookingsClient from "@/components/MyBookingsClient";
 export const metadata = {
    title: 'My Bookings',
  }

const MyBookings = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings`, {
    cache: "no-store",
  });

  const bookings = await res.json();

  return <MyBookingsClient bookings={bookings}></MyBookingsClient>;
};

export default MyBookings;
