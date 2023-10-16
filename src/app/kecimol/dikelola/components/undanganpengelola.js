"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import moment from "moment"
import 'moment/locale/id'
import Link from "next/link"
import { userHapusUndanganPengelola, userSetujuiUndangan } from "../../../../../lib/pengelola-kecimol/fnc"
moment.locale('id')

export default function Undanganpengelola({ undangan, undangandisetujui }) {
    const [daftarundangan, setDaftarundangan] = useState([])
    useEffect(() => {
        setDaftarundangan(undangan)
    }, [undangan])
    // selanjutnya kita akan membuat fungsi untuk menghandle hapus dan setuju
    // menghapus
    const [konterhapusundangan, setKonterhapusundangan] = useState({
        opendrop: false,
        data: null
    })
    const hapusundangan = e => {
        if (!konterhapusundangan.opendrop) {
            setKonterhapusundangan({ ...konterhapusundangan, opendrop: true, data: e })
        } else {
            setKonterhapusundangan({ ...konterhapusundangan, opendrop: false, data: null })
        }
    }
    // lanjutkan menghapus
    const lanjutkanhapus = async () => {
        const idundangan = konterhapusundangan.data.id
        const hasil = await userHapusUndanganPengelola(idundangan)
        if (hasil.status === 200) {
            const siseundangan = []
            if (daftarundangan.length) {
                daftarundangan.map(dt => dt.id !== idundangan ? siseundangan.push(dt) : null)
            }
            setDaftarundangan(siseundangan)
        }
        setKonterhapusundangan({ ...konterhapusundangan, opendrop: false, data: null })
    }

    // sekarang setuju
    const usersetujuiundangan = async e => {
        const idundangan = e.id
        const hasil = await userSetujuiUndangan({ idundangan })
        if (hasil.status === 200) {
            const siseundangan = []
            if (daftarundangan.length) {
                daftarundangan.map(dt => dt.id !== idundangan ? siseundangan.push(dt) : null)
            }
            undangandisetujui(hasil.data)
            setDaftarundangan(siseundangan)
        }
    }
    return (
        <>
            {
                daftarundangan.length ?
                    <div>
                        {/* notifikasi menghapus dulu */}
                        <div className="text-xs font-semibold uppercase">
                            kecimol berikut mengundang anda untuk menjadi pengelolanya
                        </div>
                        <div className="mt-7 grid gap-6 relative">

                            {/* hapus undangan pengelola */}
                            {
                                konterhapusundangan.opendrop ?
                                    <div className="absolute left-0 top-0 z-100 w-full h-full p-5" style={{ background: 'rgba(0,0,0,0.2)' }}>
                                        <div className="bg-white mx-auto w-full max-w-[400px] p-5">
                                            <div className="text-sm text-center">
                                                Apakah anda yakin ingin menghapus undangan dari kecimol <span className="text-blue-600 capitalize">{konterhapusundangan.data.kecimol.nama}</span>?
                                            </div>
                                            <div className="flex justify-center gap-4 text-[11px] uppercase font-semibold mt-6">
                                                <div className="cursor-pointer text-red-600 hover:text-red-700" onClick={lanjutkanhapus}>
                                                    lanjutkan
                                                </div>
                                                <div className="cursor-pointer" onClick={() => hapusundangan()}>
                                                    batalkan
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }

                            {
                                daftarundangan.length ?
                                    daftarundangan.map((dt, idx) => (
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
                                                        {/* hapus undangan */}
                                                        <div className="w-4 h-4 -ml-[1.5px]">
                                                            <Image
                                                                src={'/icons/hapus.svg'}
                                                                width={100}
                                                                height={100}
                                                                alt="ikon"
                                                            />
                                                        </div>
                                                        <div className="text-xs text-red-600 hover:text-red-800 cursor-pointer" onClick={() => hapusundangan(dt)}>
                                                            Hapus undangan
                                                        </div>
                                                        {/* hapus undangan */}
                                                        {/* setujui undangan */}
                                                        <div className="w-4 h-4 -ml-[1.5px]">
                                                            <Image
                                                                src={'/icons/verifikasi.svg'}
                                                                width={100}
                                                                height={100}
                                                                alt="ikon"
                                                            />
                                                        </div>
                                                        <div className="text-xs text-green-600 hover:text-green-800 cursor-pointer" onClick={() => usersetujuiundangan(dt)}>
                                                            Setujui undangan
                                                        </div>
                                                        {/* setujui undangan */}
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
