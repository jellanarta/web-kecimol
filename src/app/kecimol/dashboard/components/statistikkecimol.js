"use client"
import moment from "moment"
import 'moment/locale/id'
moment.locale('id')
import { useEffect, useState } from "react"
import { limaBulanJadwal, limaBulanTerakhir } from "../../../../../lib/fnc"
import Linechartjs from "@/components/linechart"
import Image from "next/image"
import { membuatdatastatistik, statistikKecimolBulanLain } from "../../../../../lib/public-request/statistik/fnc"
import { KapitalTeks } from "../../../../../lib/public/fnc"





export default function Statistikkecimol({ datadashboard }) {
    const [pilihantampil] = useState(limaBulanTerakhir())
    const [datastatistik, setDatastatistik] = useState({ loading: true, data: null })
    useEffect(() => {
        const datanya = datadashboard.statistikkecimol
        const okesudah = membuatdatastatistik(datanya)
        setDatastatistik(okesudah)
    }, [datadashboard.statistikkecimol])
    const [kontertampil, setKontertampil] = useState(moment().format("MMMM YYYY"))
    const [bukadrop, setBukadrop] = useState(false)
    const maubukadrop = () => {
        bukadrop ? setBukadrop(false) : setBukadrop(true)
    }
    const diamauini = async e => {
        setDatastatistik({ ...datastatistik, loading: true })
        const { awal, akhir } = limaBulanJadwal('cari awal dan akhir', e)
        const ambildong = await statistikKecimolBulanLain(awal, akhir)
        if (ambildong.status === 200) {
            const bagus = membuatdatastatistik(ambildong.data, e)
            setDatastatistik(bagus)
        }
        setKontertampil(e)
        setBukadrop(false)
    }
    return (
        <div className="bg-white rounded-sm px-5 py-7 m-5 relative">

            <div className="mb-5 pb-5 border-b border-gray-200 border-dotted grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-5">
                <div>
                    <div className="text-sm font-semibold uppercase">
                        statistik profil kecimol
                    </div>
                    <div className="text-xs">
                        data statistik pengunjung profil kecimol
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
                        !datastatistik.loading && datastatistik.data ?
                            <Linechartjs teks={KapitalTeks('statistik pengunjung profil kecimol')} data={datastatistik.data} />
                            : null
                    }
                </div>
            </div>
        </div>
    )
}
