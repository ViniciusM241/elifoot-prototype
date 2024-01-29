"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import api from "@/helpers/api";
import { removeToken } from "@/helpers/token";

export default function RemoveToken() {
  const router = useRouter();
  removeToken();

  useEffect(() => {
    async function get() {
      await api.get("/logout");
      router.replace("/");
    }
    get();
  });
  return <></>;
}
