import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const navigateToSignIn = () => {
  if (!window.location.href.endsWith("auth/signin")) window.location.href = '/auth/signin';
}
