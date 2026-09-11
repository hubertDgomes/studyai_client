"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const Header = () => {
  const { user, handleLogout } = useAuth();
  const pathname = usePathname();
  const [error, setError] = useState("");
  const userName = user?.name?.trim() || "Student";
  const userInitial = userName.charAt(0).toUpperCase();
  const handlelogout = async () => {
    try {
      await handleLogout();
      window.location.reload();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setError(message);
    }
  };

  const navigation = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Documents", href: "/documents" },
    { label: "Quiz", href: "/quiz" },
  ];

  return (
    <header className="border-b border-[#d8cfbd] bg-[#FFFDD0] shadow-sm">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex-1">
          <Link href="/dashboard" className="btn btn-ghost text-xl">
            StudyAI
          </Link>
        </div>

        <nav aria-label="Main navigation" className="flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#3d4938] text-[#fbf8f1]"
                    : "text-[#5c584e] hover:bg-[#e9e5d4] hover:text-[#28251f]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div aria-hidden="true" className="mx-3 hidden h-8 w-px bg-[#d8cfbd] sm:block" />

        <div className="ml-3 flex items-center gap-3">
          <div className="hidden items-center gap-2.5 sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d4938] text-sm font-semibold text-[#fbf8f1] shadow-sm">
              {userInitial}
            </span>
            <p className="max-w-32 truncate text-sm font-semibold text-[#28251f]" title={userName}>
              {userName}
            </p>
          </div>
          <div className="dropdown dropdown-end">
            <button onClick={handlelogout} className="btn btn-error btn-sm">
              Log Out
            </button>
          </div>
        </div>
      </div>
      {error && <p className="px-4 pb-2 text-right text-sm text-red-700 sm:px-6 lg:px-8">{error}</p>}
    </header>
  );
};

export default Header;
