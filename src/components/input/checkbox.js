"use client"

import Image from "next/image"
import { useState } from "react";

export default function Checkbox({ tbg, kamumemilih }) {
    const [ceked, setceked] = useState(tbg)
    const handleCek = () => {
        if (ceked) {
            kamumemilih({ path: 'tbg', data: { tbg: false } })
            setceked(false)
        } else {
            kamumemilih({ path: 'tbg', data: { tbg: true } })
            setceked(true)
        }
    }
    return (
        <div className="">
            <div className={`flex  hover:ring-blue-400 items-center px-3 ring-1 ring-gray-200 rounded-sm ${ceked ? 'bg-blue-100' : ''}`}>
                <input id="border-box" checked={ceked} onChange={handleCek} type="checkbox" className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " />
                <label htmlFor="border-box" className="w-full py-3 ml-2 text-sm cursor-pointer">
                    TBG
                </label>
            </div>

            <div className={`text-xs font-medium mt-1 flex items-center text-gray-600`}>
                <div className="w-5">
                    <div className="w-3 h-3">
                        <Image
                            src={'/icons/quote.svg'}
                            width={100}
                            height={100}
                            alt="ikon form"
                        />
                    </div>
                </div>
                <span>
                    {/* {attribute[path].message} */}
                    Centang jika TBG ( Taok Bengan )
                </span>
            </div>
        </div>
    )
}
