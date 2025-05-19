"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  // Optional: Automatically redirect after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex min-h-screen pt-24 pb-14 flex-col items-center justify-center gap-4 bg-custom-background text-white">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-7xl font-bold text-sky-500">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-gray-400 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to home page in 5 seconds...
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-sky-500 hover:bg-sky-600 transition-colors rounded-lg text-white"
      >
        Go to Home Page
      </Link>
    </div>
  );
}
