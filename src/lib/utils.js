import { jwtTokenStr } from "@/constants";
import { LOGOUT } from "@/store/Auth/actionTypes";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const logout = (navigate, disaptch) => {
  localStorage.removeItem(jwtTokenStr);
  navigate("/auth/signin");
  disaptch({
    type: LOGOUT
  })
}

export const loadScript = (src) => {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}
