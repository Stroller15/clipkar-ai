"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    if (user) {
      // Call the API to store the user
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          imageUrl: user.imageUrl,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }, [user]);
  
  return <div>{children}</div>;
};

export default Provider;
