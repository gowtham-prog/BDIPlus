export default function Button ({name,click}) {
    return(
        <button className="px-5 py-2 m-2 rounded-md w-full text-white bg-[#2C2C2C]  hover:bg-black" onClick={click}>{name}</button>
    )
}