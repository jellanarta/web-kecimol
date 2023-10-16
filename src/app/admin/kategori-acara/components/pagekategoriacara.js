"use client"

import { useEffect, useState } from "react"
import Membuatkategoribaru from "./membuatkategoribaru"
import { adminAmbilSemuaKategoriAcara } from "../../../../../lib/kategori-acara/fnc"
import Daftarkategoriacara from "./daftarkategoriacara"

export default function Pagekategoriacara() {
    const [datakategori, setDatakategori] = useState({
        loading: true,
        data: []
    })
    useEffect(() => {
        const laloto = async () => {
            const hasil = await adminAmbilSemuaKategoriAcara()
            if (hasil.status === 200) {
                setDatakategori({ loading: false, data: hasil.data })
            } else {
                setDatakategori({ loading: false, data: [] })
            }
        }
        laloto()
    }, [])
    const [vlkategori, setvlkategori] = useState({
        nama: '',
    })
    const diahapusni = data => {
        setDatakategori({ ...datakategori, data })
    }

    // husus edit
    const [idedit, setIdedit] = useState(null)
    const editini = data => {
        setvlkategori({ ...vlkategori, nama: data.nama })
        setIdedit(data.id)
    }
    return (
        <div>
            <div className="text-sm uppercase font-semibold">
                kelola daftar acara untuk di gunakan oleh para kecimol membuat jadwal
            </div>
            <div className="mt-7 grid grid-cols-1 gap-8">
                {
                    !datakategori.loading ?
                        <>
                            <Membuatkategoribaru kontervl={vlkategori} datasebelumnya={datakategori.data} kembalikan={diahapusni} idedit={idedit} />
                            <Daftarkategoriacara datakategori={datakategori.data} diahapusni={diahapusni} editini={editini} />
                        </>
                        : null
                }
            </div>
        </div>
    )
}
