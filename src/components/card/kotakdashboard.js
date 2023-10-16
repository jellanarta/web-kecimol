import Image from "next/image";
import { formatAngkaRBJT } from "../../../lib/fnc";

export default function Kotakdashboard({ bg = 'bg-blue-600', color = 'text-gray-50', icon = 'kecimol', teks = 'total kecimol', totaldata = 0 }) {
    return (
        <div className={`${bg} relative ${color} rounded-md p-5 my-2`}>
            <div className={`${bg} w-2/5 h-[20px] absolute -top-2 left-0 `} style={{ borderRadius: '6px 15px 0 0' }} />

            <div className="grid gap-3 grid-cols1 sm:grid-cols-[auto,1fr] ">
                <div className="grid grid-cols-[1fr,auto] bgj-red-600 gap-2 items-center">
                    <div className="text-2xl  text-center font-bold">
                        {formatAngkaRBJT(totaldata ? totaldata : 0)}
                    </div>
                    <div className="bg-white flex sm:hidden justify-center items-center rounded-full w-[40px] h-[40px] mx-auto ">
                        <div className="w-[20px] h-[20px] ">
                            <Image
                                src={`/icons/${icon}.svg`}
                                width={100}
                                height={100}
                                alt="ikon"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-2 justify-center w-full items-center">
                    <div className="bg-white sm:flex justify-center items-center rounded-full w-[40px] h-[40px] mx-auto hidden">
                        <div className="w-[20px] h-[20px] ">
                            <Image
                                src={`/icons/${icon}.svg`}
                                width={100}
                                height={100}
                                alt="ikon"
                            />
                        </div>
                    </div>
                    <div className="uppercase text-sm   font-semibold text-center">
                        {teks}
                    </div>
                </div>
            </div>
        </div>
    )
}
