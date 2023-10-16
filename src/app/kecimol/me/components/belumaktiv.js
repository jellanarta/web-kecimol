"use client"

import Kecimol from "@/components/card/kecimol"

export default function Belumaktiv({ data }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5 uppercase text-sm font-semibold">
                kecimol belum aktiv dan menunggu persetujuan admin
            </div>
            {
                data && data.length ?
                    <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {
                            data.map((dt, idx) => (
                                <Kecimol kecimol={dt} nomor={idx + 1} key={idx} adminhapus={false} />
                            ))
                        }
                    </div>
                    : null
            }
        </div>
    )
}
