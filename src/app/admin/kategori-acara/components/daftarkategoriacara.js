"use client"

import Notifikasikosong from "@/components/notifikasikosong"
import Image from "next/image";
import { useEffect, useState } from "react"
import moment from "moment";
import 'moment/locale/id'
import { adminDeleteKategori } from "../../../../../lib/kategori-acara/fnc";
moment.locale('id')
export default function Daftarkategoriacara({ datakategori, diahapusni, editini }) {
    const [datasudahada, setDatasudahada] = useState(null)
    useEffect(() => {
        setDatasudahada(datakategori)
    }, [datakategori])
    const hapusinioke = async data => {
        const idkategori = data.id
        const hasil = await adminDeleteKategori(idkategori)
        if (hasil?.status === 200) {
            const sisencobak = []
            if (datasudahada && datasudahada.length) {
                datasudahada.map(dt => dt.id !== idkategori ? sisencobak.push(dt) : null)
            }
            diahapusni(sisencobak)
        }
        return true
    }
    return (
        <div className="border-t border-dotted border-gray-200 pt-7">
            <div className="text-xs font-semibold uppercase">
                daftar kategori acara yang sudah di tambahkan sebelumnya
            </div>
            <div className="mt-7 relative">
                {
                    datasudahada ?
                        datasudahada.length ?
                            <Cardkategoriacara datakategori={datasudahada} hapusinioke={hapusinioke} editini={editini} />
                            :
                            <Notifikasikosong>
                                Belum ada kategori acara yang di tambahkan
                            </Notifikasikosong>
                        : null
                }
            </div>
        </div>
    )
}

function Cardkategoriacara({ datakategori, hapusinioke, editini }) {
    const [yakinhapus, setYakinhapus] = useState({
        opendrop: false,
        data: null
    })

    // loadinghapus
    const [loadinghapus, setLoadinghapus] = useState(false)
    const clickhapus = e => {
        if (!loadinghapus) {
            if (!yakinhapus.opendrop) {
                setYakinhapus({ ...yakinhapus, opendrop: true, data: e })
            } else {
                setYakinhapus({ ...yakinhapus, opendrop: false, data: null })
            }
        }
    }
    const lanjutkanmenghapus = async () => {
        setLoadinghapus(true)
        const hasil = await hapusinioke(yakinhapus.data)
        if (hasil) {
            setLoadinghapus(false)
            setYakinhapus({ ...yakinhapus, data: null, opendrop: false })
        }
    }
    return (
        <>

            {
                yakinhapus.opendrop ?
                    <div className="absolute  top-0 left-0 w-full h-full p-5" style={{ background: 'rgba(0,0,0,0.3)' }}>
                        <div className="bg-white max-w-[400px] mx-auto p-5 rounded-sm">
                            <div className="text-sm text-center">
                                Apakah anda yakin ingin menghapus kategori <span className="text-blue-600 capitalize">{yakinhapus.data.nama}</span>?
                            </div>
                            <div className="mt-4 flex justify-center gap-4">
                                <div className="text-[11px] font-semibold uppercase text-red-600 hover:text-red-700 cursor-pointer" onClick={lanjutkanmenghapus}>
                                    lanjutkan
                                </div>
                                <div className="text-[11px] font-semibold cursor-pointer uppercase" onClick={() => clickhapus()}>
                                    batalkan
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }


            <div className="grid grid-cols-1 gap-2">
                {
                    datakategori && datakategori.length ?
                        datakategori.map((dt, idx) => (
                            <div className="border-b border-dotted border-gray-200 pb-4 rounded-sm p-5" key={idx}>
                                <div className="grid grid-cols-[auto,1fr] gap-3">
                                    <div className="text-xs font-semibold">
                                        {idx + 1}.
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold uppercase">
                                            {dt.nama}
                                        </div>
                                        <div className="mt-3 grid grid-cols-[auto,1fr] items-center gap-3">
                                            {/* user yang membuatnya */}
                                            <div className="w-3 h-3">
                                                <Image
                                                    src={'/icons/userperson.svg'}
                                                    width={100}
                                                    height={100}
                                                    alt="ikon"
                                                />
                                            </div>
                                            <div className="text-xs capitalize">
                                                {dt.user.nama}
                                            </div>
                                            {/* user yang membuatnya */}
                                            {/* tanggal di buat */}
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
                                            {/* tanggal di buat */}
                                            {/* hapus kategori */}
                                            <div className="w-3 h-3">
                                                <Image
                                                    src={'/icons/hapus.svg'}
                                                    width={100}
                                                    height={100}
                                                    alt="ikon"
                                                />
                                            </div>
                                            <div className="text-xs text-red-600 hover:text-red-700 cursor-pointer" onClick={() => clickhapus(dt)}>
                                                Hapus kategori
                                            </div>
                                            {/* hapus kategori */}
                                            {/* edit kategori */}
                                            <div className="w-3 h-3">
                                                <Image
                                                    src={'/icons/hapus.svg'}
                                                    width={100}
                                                    height={100}
                                                    alt="ikon"
                                                />
                                            </div>
                                            <div className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer" onClick={() => editini(dt)}>
                                                Edit kategori
                                            </div>
                                            {/* edit kategori */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        : null
                }
            </div>
        </>
    )
}