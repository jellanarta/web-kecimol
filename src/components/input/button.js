"use client"

import { BeatLoader } from "react-spinners"

export default function Button({ teks, bg, loading = false }) {
    return (
        <>
            {
                loading ?
                    <div className={`${bg} h-[47px] flex items-center justify-center rounded-sm`}>
                        <BeatLoader size={10} color="white" />
                    </div>
                    :
                    <button className={`${bg} h-[47px] text-gray-50 flex items-center justify-center rounded-sm w-full text-sm font-medium uppercase`}>
                        {teks}
                    </button>
            }
        </>
    )
}
