import { HashLoader } from "react-spinners";

export default function Loadingpage() {
    return (
        <div className="w-full h-full fixed flex justify-center top-0 left-0 z-[19999] bg-gray-50 items-center">
            <HashLoader color="blue" size={50} />
        </div>
    )
}
