"use client"

import Kecimol from "@/components/card/kecimol"

export default function Aktiv({ kecimol }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5 uppercase text-sm font-semibold">
                kecimol anda yang sudah aktiv dan ditampilkan publik
            </div>
            {
                kecimol && kecimol.length ?
                    <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {
                            kecimol.map((dt, idx) => (
                                <Kecimol kecimol={dt} key={idx} nomor={idx + 1} adminhapus={false} />
                            ))
                        }
                    </div>
                    : null
            }
        </div>
    )
}
