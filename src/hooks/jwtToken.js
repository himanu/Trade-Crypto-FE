import  { jwtTokenStr } from "@/constants";
import  { useSelector } from "react-redux";

export const useJWTToken = () => {
    return localStorage.getItem(jwtTokenStr);
}