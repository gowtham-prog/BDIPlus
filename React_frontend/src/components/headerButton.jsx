import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderButton({name, route, styler}) {
    const navigate = useNavigate();
    return(
        <button className={`px-5 py-2 rounded-md font-fira text-[#2C2C2C] hover:underline hover:text-black hover:underline-offset-1`} onClick={() => navigate(route)}>{name}</button>  
    )

}