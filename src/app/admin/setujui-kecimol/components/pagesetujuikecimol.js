"use client"

import { useEffect, useState } from "react"
import { setujuiPendaftaranKecimol } from "../../../../../lib/admin/fnc"
import { ScaleLoader } from "react-spinners"
import Setujui from "./setujui"

export default function Pagesetujuikecimol() {
    const [menungguni, setMenungguni] = useState({
        loading: true,
        data: []
    })
    useEffect(() => {
        const lolo = async () => {
            const jarin = { loading: false, data: [] }
            const hasil = await setujuiPendaftaranKecimol()
            if (hasil.status === 200) {
                jarin.data = hasil.data
            }
            setMenungguni(jarin)
        }
        lolo()
    }, [])
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm uppercase font-semibold">
                    kecimol berikut memerlukan persetujuan untuk mulai membuat jadwal dan di tampilkan ke publik
                </div>
            </div>
            {
                menungguni.loading ?
                    <div className="m-5 flex justify-center">
                        <ScaleLoader color="blue" />
                    </div>
                    :
                    menungguni.data.length ?
                        <Setujui semuakecimol={menungguni.data} />
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5  md:py-8 text-center text-sm overflow-hidden m-5">
                            Belum ada kecimol yang memerlukan persetujuan
                        </div>
            }
        </div>
    )
}
