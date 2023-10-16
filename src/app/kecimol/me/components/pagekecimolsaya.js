"use client"

import { useEffect, useState } from "react"
import Belumaktiv from "./belumaktiv"
import Aktiv from "./aktiv"

export default function Pagekecimolsaya({ kecimol }) {
    const [daftarkecimol, setdaftarkecimol] = useState({
        loading: true,
        aktiv: [],
        belumaktiv: []
    })
    useEffect(() => {
        if (kecimol?.length) {
            const jarin = { loading: false, aktiv: [], belumaktiv: [] }
            kecimol.map(dt => {
                if (dt.statusKecimol) {
                    jarin.aktiv.push(dt)
                } else {
                    jarin.belumaktiv.push(dt)
                }
            })
            setdaftarkecimol(jarin)
        }
    }, [kecimol])
    return (
        <div>
            <div className="text-sm font-semibold uppercase">
                <div className="bg-white rounded-sm px-5 py-7 m-5">
                    daftar kecimol yang sudah anda daftarkan di <span className="text-blue-600">kecimol.com</span>
                </div>
            </div>
            {
                daftarkecimol.belumaktiv.length ?
                    <Belumaktiv data={daftarkecimol.belumaktiv} />
                    : null
            }
            {
                daftarkecimol.aktiv.length ?
                    <Aktiv kecimol={daftarkecimol.aktiv} />
                    : null
            }
        </div>
    )
}
