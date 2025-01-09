"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import axios from "axios";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    if (user) {
      axios
        .post("/api/users", {
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          imageUrl: user.imageUrl,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return <div>{children}</div>;
};

export default Provider;
