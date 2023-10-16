"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { getDataKecimolArta } from "../../../../lib/kecimol/read/fnc";
import { ScaleLoader } from "react-spinners";
import Beranda from "./konten/beranda";
import Pengelola from "./konten/pengelola";
import Kontak from "./konten/kontak";
import Tentang from "./konten/tentang";
import Jadwalkecimol from "./konten/jadwalkecimol";
import { cekjamrequestjadwal } from "../../../../lib/fnc";

export default function Konten({ kecimol }) {
    const [datakonten, setDatakonten] = useState({
        loading: true,
        data: null,
        type: null
    })
    const apecarin = useSearchParams()
    const getdia = apecarin.get('get')
    useEffect(() => {
        const laloto = async () => {
            setDatakonten({ loading: true, data: null, type: null })
            const kontermenu = ['jadwal', 'pengelola', 'kontak', 'tentang']
            const hasil = { loading: false }
            if (!getdia) {
                const datahasil = await getDataKecimolArta('beranda', kecimol.id, cekjamrequestjadwal())
                if (datahasil.status === 200) {
                    hasil.data = datahasil.data
                    hasil.type = 'beranda'
                }
            } else {
                if (!kontermenu.includes(getdia)) {
                    const datahasil = await getDataKecimolArta('beranda', kecimol.id, new Date().setHours(0, 0, 0, 0))
                    if (datahasil.status === 200) {
                        hasil.data = datahasil.data
                        hasil.type = 'beranda'
                    }
                } else {
                    if (getdia === "pengelola") {
                        hasil.data = kecimol.pengelolakecimol
                        hasil.type = getdia
                    } else if (getdia === "kontak") {
                        hasil.data = kecimol
                        hasil.type = getdia
                    } else if (getdia === "tentang") {
                        hasil.data = kecimol
                        hasil.type = getdia
                    } else if (getdia === "jadwal") {
                        hasil.data = kecimol
                        hasil.type = getdia
                    }
                }
            }
            setDatakonten(hasil)
        }
        laloto()
    }, [getdia, kecimol])
    return (
        <div>
            {
                datakonten.loading ?
                    <div className="flex justify-center">
                        <ScaleLoader color="blue" />
                    </div>
                    :
                    <div>
                        {
                            datakonten.type === "beranda" && datakonten.data ?
                                <Beranda data={datakonten.data} kecimol={kecimol} />
                                : null
                        }
                        {
                            datakonten.type === "pengelola" && datakonten.data ?
                                <Pengelola data={datakonten.data} kecimol={kecimol} />
                                : null
                        }
                        {
                            datakonten.type === "kontak" && datakonten.data ?
                                <Kontak data={datakonten.data} />
                                : null
                        }
                        {
                            datakonten.type === "tentang" && datakonten.data ?
                                <Tentang data={datakonten.data} />
                                : null
                        }
                        {
                            datakonten.type === "jadwal" && datakonten.data ?
                                <Jadwalkecimol data={datakonten.data} />
                                : null
                        }
                    </div>
            }
        </div>
    )
}

