"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { KapitalTeks } from "../../../../../../lib/public/fnc"
import { limaBulanJadwal } from "../../../../../../lib/fnc"
import moment from "moment"
import 'moment/locale/id'
import { jadwalPerKecimol } from "../../../../../../lib/kecimol/read/fnc"
import { ScaleLoader } from "react-spinners"
import Jadwal from "@/components/card/jadwal"
moment.locale("id")

export default function Carijadwal({ data, ambilelekdalam }) {
    const cariparams = useSearchParams()
    const tipejadwal = cariparams.get("type")
    const bulanjadwal = cariparams.get('bulan')
    const statekategori = useSelector(state => state.stateKategoriacara)
    const [hasiljadwalnya, setHasiljadwalnya] = useState({
        loading: true,
        data: []
    })

    useEffect(() => {
        const gogo = async () => {
            setHasiljadwalnya({ loading: true, data: [] })
            if (statekategori.status === "success") {
                const simpanrequest = { kategori: null, bulan: { awal: null, akhir: null } }
                if (!tipejadwal) {
                    simpanrequest.kategori = null
                } else {
                    if (statekategori.kategoriacara.length) {
                        statekategori.kategoriacara.map(dt => {
                            if (dt.nama === tipejadwal.split("-").join(" ")) {
                                simpanrequest.kategori = dt.id
                            }
                        })
                    }
                }
                const simpandisini = { bulan: null }
                if (!bulanjadwal) {
                    const awaldanakhir = limaBulanJadwal('cari awal dan akhir', moment().format("MMMM YYYY"))
                    simpandisini.bulan = awaldanakhir
                } else {
                    const hakperiksa = KapitalTeks(bulanjadwal.split("-").join(" "))
                    const kontersemua = limaBulanJadwal()
                    if (kontersemua.includes(hakperiksa)) {
                        const awaldanakhir = limaBulanJadwal('cari awal dan akhir', hakperiksa)
                        simpandisini.bulan = awaldanakhir
                    } else {
                        const awaldanakhir = limaBulanJadwal('cari awal dan akhir', moment().format("MMMM YYYY"))
                        simpandisini.bulan = awaldanakhir
                    }
                }
                simpanrequest.bulan = simpandisini.bulan
                const requestakhir = { idkecimol: data.id, kategori: simpanrequest.kategori, awal: simpanrequest.bulan.awal, akhir: simpanrequest.bulan.akhir }
                const hasilrequest = await jadwalPerKecimol(requestakhir)
                const niyek = { data: [] }
                if (hasilrequest.status === 200) {
                    niyek.data = hasilrequest.data
                }
                // kembalikansajaoke(niyek.data)
                setHasiljadwalnya({ loading: false, data: niyek.data })
            }
        }
        gogo()
    }, [tipejadwal, bulanjadwal, statekategori, data.id])
    useEffect(() => {
        ambilelekdalam(hasiljadwalnya.data)
    }, [hasiljadwalnya.data, ambilelekdalam])

    // periksa tampilan
    const cekapakahada = e => {
        if (!e) {
            return null
        }
        const jadin = e.split("-").join(" ")
        const konterarak = []
        if (statekategori.kategoriacara.length) {
            statekategori.kategoriacara.map(dt => konterarak.push(dt.nama))
        }
        if (konterarak.includes(jadin)) {
            return jadin
        } else {
            return null
        }
    }
    const apakahadabulan = e => {
        if (!e) {
            return moment().format("MMMM YYYY")
        }
        const limanya = limaBulanJadwal()
        const periksani = KapitalTeks(e.split("-").join(" "))
        if (limanya.includes(periksani)) {
            return periksani
        } else {
            return moment().format("MMMM YYYY")
        }
    }
    return (
        <div className="m-5">
            {
                hasiljadwalnya.loading ?
                    <div className="flex justify-center">
                        <ScaleLoader color="blue" />
                    </div>
                    :
                    hasiljadwalnya.data.length ?
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {
                                hasiljadwalnya.data.map((dt, idx) => (
                                    <Jadwal jadwal={dt} key={idx} nomor={idx + 1} />
                                ))
                            }
                        </div>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden">
                            Tidak ada jadwal {cekapakahada(tipejadwal) ? <span className="uppercase text-xs text-orange-600">{cekapakahada(tipejadwal)}</span> : ''} kecimol <span className="uppercase text-xs text-blue-600">{data.nama}</span> pada bulan <span className="text-xs upercase">{apakahadabulan(bulanjadwal)}</span>
                        </div>
            }
        </div>
    )
}
