import Header from "./header";
import React from "react";

export default function Layout({ children }) {


    return (
        <div className="flex flex-col font-fira min-h-[100vh] h-full overflow-y-auto w-full bg-gradient-to-r from-[#649173] to-[#DBD5A4]">
            <Header />
            <div className=" flex items-center justify-center w-full h-full ">
                <div className="flex items-center justify-center h-full w-full">
                    <div className="flex w-full min-h-[calc(100vh-4rem)] h-full backdrop-blur-lg rounded-xl items-center justify-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}