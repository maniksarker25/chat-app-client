"use server";
import { FieldValues } from "react-hook-form";

export const registerUser = async (values: FieldValues) => {
  const res = await fetch("http://localhost:5000/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    cache: "no-cache",
  });
  const userInfo = await res.json();
  return userInfo;
};
