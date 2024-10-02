import  { jwtTokenStr } from "@/constants";
import  { useSelector } from "react-redux";

export const useJWTToken = () => {
    const jwt = useSelector(store => store.auth.jwt);
    return jwt ? jwt :  localStorage.getItem(jwtTokenStr);
}