"use client"

import { useEffect, useRef } from "react"
import Menudankonten from "./menudankonten"
import Profilandname from "./profilandname"
import { addStatistikKecimol } from "../../../../lib/public-request/statistik/fnc"

export default function Pageprofil({ kecimol }) {
    // proses menambahkan statistik untuk kecimol
    const timeoutref = useRef(null)
    useEffect(() => {
        timeoutref.current = setTimeout(async () => {
            await addStatistikKecimol({ tanggal: new Date().setHours(0, 0, 0, 0), idkecimol: kecimol.id })
        }, 10000)
        return () => {
            clearTimeout(timeoutref.current)
        }
    }, [kecimol.id])
    return (
        <div>
            {/* profil dan namanya */}
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <Profilandname kecimol={kecimol} />
            </div>
            {/* profil dan namanya */}
            {/* menu dan kontennya */}
            <Menudankonten kecimol={kecimol} />
            {/* menu dan kontennya */}
        </div>
    )
}
