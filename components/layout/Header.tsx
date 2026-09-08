"use client";
import React, { useState } from "react";
import Container from "../Container";
import useAuth from "@/hooks/useAuth";

const Header = () => {
  const { user, loading, handleLogout } = useAuth();
  const [error, setError] = useState("");
  const handlelogout = async () => {
    try {
      const res = await handleLogout();
      window.location.reload()
    } catch (err: any) {
      const message = err.response?.data?.message || "Logout failed";
      setError(message);
    }
  };
  return (
    <>
      <div className="navbar shadow-sm bg-[#FFFDD0] border-b-1">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">StudyAI</a>
        </div>
        <div className="flex items-center gap-2">
          <p>{user?.email}</p>
          <div className="dropdown dropdown-end">
            <button onClick={handlelogout} className="btn btn-error">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
