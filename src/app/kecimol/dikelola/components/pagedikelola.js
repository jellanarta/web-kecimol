"use client"

import { useEffect, useState } from "react"
import Undanganpengelola from "./undanganpengelola"
import Yangdikelola from "./yangdikelola"

export default function Pagedikelola({ dikelola }) {
    const [pecahdikelola, setPecahdikelola] = useState({
        undangan: [],
        aktiv: []
    })
    useEffect(() => {
        const hasilnya = {
            undangan: [],
            aktiv: []
        }
        if (dikelola && dikelola.length) {
            dikelola.map(dt => {
                if (dt.status) {
                    hasilnya.aktiv.push(dt)
                } else {
                    hasilnya.undangan.push(dt)
                }
            })
        }
        setPecahdikelola(hasilnya)
    }, [dikelola])

    // undangan yang di setujui
    const undangandisetujui = e => {
        const tambah = [...pecahdikelola.aktiv]
        tambah.push(e)
        setPecahdikelola({ ...pecahdikelola, aktiv: tambah })
    }
    return (
        <div className="grid grid-cols-1 gap-7">
            <Undanganpengelola undangan={pecahdikelola.undangan} undangandisetujui={undangandisetujui} />
            <Yangdikelola dikelola={pecahdikelola.aktiv} />
        </div>
    )
}
