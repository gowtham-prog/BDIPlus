import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderButton from "./headerButton";
import { useAuthentication } from "../Authentication";

export default function Header() {
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuthentication();
    const [authenticated, setAuthenticated] = useState(isAuthenticated);

    useEffect(() => {
        setAuthenticated(isAuthenticated);
        console.log("authenticated changed:", isAuthenticated);
    }, [isAuthenticated]);

    const logoutUser = async () => {
        logout();
        localStorage.clear();
        sessionStorage.clear();
        setAuthenticated(false); 
        navigate("/login");
    };
    return (
        <div className="flex items-center justify-center h-16 w-full z-30 backdrop-blur backdrop-opacity-30 backdrop-filter shadow-lg">
            <div className="flex items-center justify-center max-w-7xl h-full w-full">
                <div className="flex flex-row w-full h-full items-center justify-between">
                    <div className="w-full md:w-1/3 h-full flex items-center font-fira text-3xl justify-start font-bold text-pretty text-[#2C2C2C] shadow-b-xl">
                        <a href="/">Task Manager</a>
                    </div>

                    {authenticated ? (
                        <div className="w-2/3 h-full hidden md:flex flex-row items-center text-xl justify-end font-semibold">
                            <button
                                className="px-5 py-2 rounded-md text-red-600 hover:text-red-800 hover:underline hover:underline-offset-1"
                                onClick={() => logoutUser()}
                            >
                                Logout
                            </button>
                            
                        </div>
                    ) : (
                        <div className="w-2/3 h-full hidden md:flex flex-row items-center text-xl justify-end font-semibold">
                            <HeaderButton name="login" route="/login" />
                            <HeaderButton name="signup" route="/signup" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
