"use client"
import { useEffect, useRef, useState } from "react"
import Tampilkankecimol from "./tampilkankecimol"
import { addStatistikPerHalaman } from "../../../../lib/public-request/statistik/fnc"

export default function Pagekecimol({ datakecimol }) {
    const [semuakecimol, setSemuakecimol] = useState({
        loading: true,
        semuakecimol: [],
    })
    useEffect(() => {
        const datajarin = { loading: false, semuakecimol: [] }
        if (datakecimol.status === 200) {
            datajarin.semuakecimol = datakecimol.kecimol
        }
        setSemuakecimol(datajarin)
    }, [datakecimol])
    // menambahkan statistik perhalaman
    const timeoutRef = useRef(null)
    useEffect(() => {
        timeoutRef.current = setTimeout(async () => {
            await addStatistikPerHalaman({ tanggal: new Date().setHours(0, 0, 0, 0), type: 'kecimol' })
        }, 10000)
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    daftar semua kecimol lombok nusa tenggara barat yang sudah bergabung di <span className="text-blue-600">kecimol.com</span>
                </div>
            </div>
            {
                !semuakecimol.loading ?
                    <Tampilkankecimol semuakecimol={semuakecimol.semuakecimol} />
                    : null
            }
        </div>
    )
}
