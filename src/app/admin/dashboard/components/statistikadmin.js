"use client"

import { useEffect, useState } from "react"
import { membuatdatastatistik } from "../../../../../lib/public-request/statistik/fnc"
import Linechartjs from "@/components/linechart"
import { KapitalTeks } from "../../../../../lib/public/fnc"
import Image from "next/image"
import moment from "moment"
import 'moment/locale/id'
import { limaBulanJadwal, limaBulanTerakhir } from "../../../../../lib/fnc"
import { statistikBulanTertentuAdmin } from "../../../../../lib/admin/fnc"
moment.locale('id')
export default function Statistikadmin({ datadashboard }) {
    const [datastatistiknya, setDatastatistiknya] = useState({ loading: true, data: null })
    useEffect(() => {
        const { kategori, halaman } = datadashboard.statistik
        const selapukn = { loading: false, data: [] }
        const anhni = { data: [] }

        if (kategori && kategori.length) {
            anhni.data = [...anhni.data, ...kategori]
        }
        if (halaman && halaman.length) {
            anhni.data = [...anhni.data, ...halaman]
        }
        const acg = membuatdatastatistik(anhni.data)
        selapukn.data = acg.data
        setDatastatistiknya(selapukn)
    }, [datadashboard])
    const [pilihantampil] = useState(limaBulanTerakhir())
    const [kontertampil, setKontertampil] = useState(moment().format("MMMM YYYY"))
    const [bukadrop, setBukadrop] = useState(false)
    const maubukadrop = () => {
        bukadrop ? setBukadrop(false) : setBukadrop(true)
    }
    const diamauini = async e => {
        setDatastatistiknya({ ...datastatistiknya, loading: true })
        const jarin = limaBulanJadwal('cari awal dan akhir', e)
        const ambildong = await statistikBulanTertentuAdmin(jarin)
        if (ambildong.status === 200) {
            const { kategori, halaman } = ambildong.data
            const taokni = { data: [] }
            if (kategori && kategori.length) {
                taokni.data = [...taokni.data, ...kategori]
            }
            if (halaman && halaman.length) {
                taokni.data = [...taokni.data, ...halaman]
            }
            const jarin = membuatdatastatistik(taokni.data, e)
            setDatastatistiknya({ ...datastatistiknya, ...jarin })
        }
        setKontertampil(e)
        setBukadrop(false)
    }
    return (
        <div className="bg-white rounded-sm px-5 py-7 m-5 relative">

            <div className="mb-5 pb-5 border-b border-gray-200 border-dotted grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-5">

                <div>
                    <div className="text-sm font-semibold uppercase">
                        statistik halaman dan kategori acara
                    </div>
                    <div className="text-xs">
                        data statistik pengunjung halaman dan kategori acara
                    </div>
                </div>
                <div className="relative sm:w-[200px]">
                    {
                        bukadrop ?
                            <div className="absolute left-0 top-7 sm:right-0 bg-white ring-1 ring-gray-200 rounded-sm p-3 grid grid-cols-1 gap-3 ">
                                {
                                    pilihantampil.map((dt, idx) => (
                                        <div className="uppercase cursor-pointer hover:text-blue-600 text-xs" key={idx} onClick={() => diamauini(dt)}>
                                            <span className={kontertampil === dt ? 'text-blue-600' : ''}>
                                                {dt}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                            : null
                    }
                    <div className="flex sm:justify-end">
                        <div className="flex pb-2 cursor-pointer hover:text-blue-600 hover:ring-blue-200 border-b border-gray-200 border-dotted items-center gap-2" onClick={maubukadrop}>
                            <div className=" text-xs uppercase">
                                {kontertampil}
                            </div>
                            <div className="w-3 h-3">
                                <Image
                                    src={'/icons/arrows.svg'}
                                    width={100}
                                    height={100}
                                    alt="ikon"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="md:flex justify-center">
                <div className="w-full max-w-[900px] mx-auto">
                    {
                        !datastatistiknya.loading && datastatistiknya.data ?
                            <Linechartjs teks={KapitalTeks('statistik halaman dan kategori acara')} data={datastatistiknya.data} />
                            : null
                    }
                </div>
            </div>

        </div>
    )
}
