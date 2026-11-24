"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import axios from "axios";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    axios.post("/api/users").catch((error) => {
        console.error("Failed to sync user", error);
      });
  }, [user]);

  return <>{children}</>;
};

export default Provider;
