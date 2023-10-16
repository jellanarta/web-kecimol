"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import moment from "moment"
import 'moment/locale/id'
import { userHapusUndanganPengelola } from "../../../../../lib/pengelola-kecimol/fnc"
moment.locale('id')

export default function Yangdikelola({ dikelola }) {
    const [daftardikelola, setDaftardikelola] = useState([])
    useEffect(() => {
        setDaftardikelola(dikelola)
    }, [dikelola])

    // berhenti mengelola
    const [konterberhenti, setKonterberhenti] = useState({
        opendrop: false,
        data: null
    })
    const berhentini = e => {
        if (konterberhenti.opendrop) {
            setKonterberhenti({ ...konterberhenti, opendrop: false, data: null })
        } else {
            setKonterberhenti({ ...konterberhenti, opendrop: true, data: e })
        }
    }
    const lanjutkanhapus = async () => {
        const iddihapus = konterberhenti.data.id
        const lalohapus = await userHapusUndanganPengelola(iddihapus)
        if (lalohapus.status === 200) {
            const sisendikelola = []
            if (daftardikelola.length) {
                daftardikelola.map(dt => dt.id !== iddihapus ? sisendikelola.push(dt) : null)
            }
            setDaftardikelola(sisendikelola)
        }
        setKonterberhenti({ ...konterberhenti, opendrop: false, data: null })
    }
    return (
        <>
            {
                daftardikelola.length ?
                    <div>
                        <div className="text-xs font-semibold uppercase">
                            daftar kecimol yang anda kelola sejauh ini
                        </div>
                        <div className="mt-7 grid gap-6 relative">

                            {/* berhgenti mengelola */}
                            {
                                konterberhenti.opendrop ?
                                    <div className="absolute left-0 top-0 z-100 w-full h-full p-5" style={{ background: 'rgba(0,0,0,0.2)' }}>
                                        <div className="bg-white mx-auto w-full max-w-[400px] p-5">
                                            <div className="text-sm text-center">
                                                Apakah anda yakin ingin berhenti mengelola kecimol <span className="text-blue-600 capitalize">{konterberhenti.data.kecimol.nama}</span>?
                                            </div>
                                            <div className="flex justify-center gap-4 text-[11px] uppercase font-semibold mt-6">
                                                <div className="cursor-pointer text-red-600 hover:text-red-700" onClick={lanjutkanhapus}>
                                                    lanjutkan
                                                </div>
                                                <div className="cursor-pointer" onClick={() => berhentini()}>
                                                    batalkan
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }


                            {
                                daftardikelola.length ?
                                    daftardikelola.map((dt, idx) => (
                                        <div className="grid grid-cols-[auto,1fr] gap-3 border-b border-gray-200 border-dotted pb-6" key={idx}>
                                            <div className="text-xs font-semibold">
                                                {idx + 1}.
                                            </div>
                                            <div>
                                                <Link href={`/${dt.kecimol.username}`} className="text-xs block hover:text-blue-700 font-semibold uppercase">
                                                    {dt.kecimol.nama}
                                                </Link>
                                                <div className="text-xs">
                                                    @{dt.kecimol.username}
                                                </div>
                                                <div className="mt-3">
                                                    <div className="grid grid-cols-[auto,1fr] gap-2 items-center">
                                                        {/* tanggal undangan */}
                                                        <div className="w-3 h-3">
                                                            <Image
                                                                src={'/icons/date.svg'}
                                                                width={100}
                                                                height={100}
                                                                alt="ikon"
                                                            />
                                                        </div>
                                                        <div className="text-xs">
                                                            {moment(dt.createdAt).format("dddd, D MMMM YYYY")}
                                                        </div>
                                                        {/* tanggal undangan */}
                                                        {/* setujui undangan */}
                                                        <div className="w-4 h-4 -ml-[1.5px]">
                                                            <Image
                                                                src={'/icons/verifikasi.svg'}
                                                                width={100}
                                                                height={100}
                                                                alt="ikon"
                                                            />
                                                        </div>
                                                        <div className="text-xs text-green-600" >
                                                            di Setujui
                                                        </div>
                                                        {/* setujui undangan */}
                                                        {/* hapus undangan */}
                                                        <div className="w-4 h-4 -ml-[1.5px]">
                                                            <Image
                                                                src={'/icons/hapus.svg'}
                                                                width={100}
                                                                height={100}
                                                                alt="ikon"
                                                            />
                                                        </div>
                                                        <div className="text-xs text-red-600 hover:text-red-800 cursor-pointer" onClick={() => berhentini(dt)}>
                                                            Berhenti mengelola
                                                        </div>
                                                        {/* hapus undangan */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : null
                            }
                        </div>
                    </div>
                    : null
            }
        </>
    )
}
