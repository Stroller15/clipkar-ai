import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#eef3fe] text-[#01040c]">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-lg mb-6">Could not find the requested resource</p>
      <Link href="/">
        <h1 className="px-6 py-3 text-white font-bold bg-[#2147ee] rounded-lg hover:bg-[#d486f6] transition-colors">
          Return Home
        </h1>
      </Link>
    </div>
  );
}
