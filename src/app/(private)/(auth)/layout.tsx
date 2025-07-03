"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Image src="/image/pageio.svg" width={20} height={33} alt="pageio" className="animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    signIn("google", { redirectTo: pathname });
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Image src="/image/pageio.svg" width={20} height={33} alt="pageio" className="animate-spin" />
      </div>
    );
  }

  return children;
}
