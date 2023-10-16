"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";
import 'moment/locale/id'
import { adminKecimolMenghapusPengelola } from "../../../../lib/pengelola-kecimol/fnc";
moment.locale('id')

export default function Daftarpengelolakecimol({ datakecimol, idpengelolaidkecimol }) {
    const [tampilkanini, setTampilkanini] = useState([])
    useEffect(() => {
        if (datakecimol?.length) {
            datakecimol.map(dt => {
                dt.count = dt.pengelolakecimols?.length
            })
            datakecimol.sort((a, b) => b.count - a.count)
            // bagi array menjadi dua
            const pembagian = Math.ceil(datakecimol.length / 2)
            const jadinya = [datakecimol.slice(0, pembagian), datakecimol.slice(pembagian)]
            setTampilkanini(jadinya)
        }
    }, [datakecimol])
    return (
        <div className="border-t border-dotted border-gray-200 pt-8">
            <div className="text-sm font-semibold uppercase">
                daftar kecimol berserta pengelola yang sudah di tambahkan sebelumnya
            </div>
            <div className="mt-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div>
                        <div className="grid grid-cols-1 gap-7">
                            {
                                tampilkanini.length ?
                                    tampilkanini[0].length ?
                                        tampilkanini[0].map((dt, idx) => (
                                            <Cardkecimoldanpengelola idpengelolaidkecimol={idpengelolaidkecimol} key={idx} data={dt} />
                                        ))
                                        : null
                                    : null
                            }
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 gap-7">
                            {
                                tampilkanini.length ?
                                    tampilkanini[1].length ?
                                        tampilkanini[1].map((dt, idx) => (
                                            <Cardkecimoldanpengelola idpengelolaidkecimol={idpengelolaidkecimol} key={idx} data={dt} />
                                        ))
                                        : null
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Cardkecimoldanpengelola({ data, idpengelolaidkecimol }) {
    const [hapusini, setHapusini] = useState({
        pengelola: null,
        kecimol: null,
        opendrop: false
    })
    const [loadinghapus, setLoadinghapus] = useState(false)
    const adminmauhapuspengelola = e => {
        if (hapusini.opendrop) {
            if (!loadinghapus) {
                setHapusini({ ...hapusini, opendrop: false, kecimol: null, pengelola: null })
            }
        } else {
            setHapusini({ ...hapusini, opendrop: true, kecimol: data, pengelola: e })
        }
    }
    const lanjutkanhapus = async () => {
        const idpengeloa = hapusini.pengelola.id
        const idkecimol = hapusini.kecimol.id
        const hasil = await adminKecimolMenghapusPengelola(idpengeloa, idkecimol)
        if (hasil.status === 200) {
            idpengelolaidkecimol(hapusini)
        }
        setLoadinghapus(false)
        setHapusini({ ...hapusini, opendrop: false, pengelola: null, kecimol: null })
    }
    return (
        <div className="ring-1 ring-gray-200 rounded-sm overflow-hidden p-5 relative">
            {
                hapusini.opendrop && hapusini.pengelola ?
                    <div className="absolute top-0 w-full h-full left-0 z-10" style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <div className="m-5 bg-white rounded-sm p-5">
                            <div className="text-sm text-center">
                                apakah anda yakin ingin menghapus <span className="text-blue-600 capitalize">{hapusini.pengelola.user.nama}</span> dari daftar pengelola kecimol  <span className="text-blue-600 capitalize">{hapusini.kecimol.nama}</span>?
                            </div>
                            <div className="flex justify-center gap-5 mt-5 uppercase font-semibold text-[11px]">
                                <div className="text-red-600 cursor-pointer hover:text-red-700" onClick={lanjutkanhapus}>
                                    lanjutkan
                                </div>
                                <div className="cursor-pointer" onClick={() => adminmauhapuspengelola()}>
                                    batalkan
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
            <div className="grid grid-cols-[auto,1fr] gap-5">
                <div className="w-[80px] h-[80px] rounded-full relative ring-1 ring-blue-400">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER}/profil-kecimol/${data.poto_profil}`}
                        sizes="100%"
                        fill
                        alt={data.nama}
                        style={{
                            objectFit: 'cover',
                            borderRadius: '100%'
                        }}
                    />
                </div>
                <div>
                    <div className="uppercase text-sm font-semibold">
                        {data.nama}
                    </div>
                    <div className="text-xs">
                        @{data.username}
                    </div>
                    <div className="flex text-xs gap-3 mt-3 font-medium">
                        <Link href={`/daftarkan-kecimol?change=${data.username}`} className="text-blue-600 hover:text-blue-700 capitalize">
                            edit kecimol
                        </Link>
                        <Link href={`/${data.username}`} className="text-green-600 hover:text-green-700 capitalize">
                            lihat kecimol
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="text-xs font-semibold uppercase">
                    pengelola kecimol
                </div>
                <div className="mt-5">
                    {
                        data.pengelolakecimols.length ?
                            <div className="grid grid-cols-1 gap-3">
                                {
                                    data.pengelolakecimols.map((dt, idx) => (
                                        <div className="grid grid-cols-[auto,1fr] gap-2 border-b border-dotted border-gray-200 pb-2" key={idx}>
                                            <div className="text-xs font-semibold">
                                                {idx + 1}.
                                            </div>
                                            <div>
                                                <div className="uppercase text-xs font-semibold">
                                                    {dt.user.nama}
                                                </div>
                                                <div className="mt-2 grid grid-cols-1 gap-3">

                                                    <div className="grid grid-cols-[auto,1fr] items-center gap-2">
                                                        {/* email */}
                                                        <div className="w-3 h-3">
                                                            <Image
                                                                src={'/icons/email.svg'}
                                                                width={100}
                                                                height={100}
                                                                alt="ikon"
                                                            />
                                                        </div>
                                                        <div className="text-xs">
                                                            {dt.user.email}
                                                        </div>
                                                        {/* email */}
                                                        {/* tanggal */}
                                                        <div className="w-3 h-3">
                                                            <Image
                                                                src={'/icons/date.svg'}
                                                                width={100}
                                                                height={100}
                                                                alt="ikon"
                                                            />
                                                        </div>
                                                        <div className="text-xs">
                                                            {moment(dt.createdAt).format("D, MMMM YYYY")}
                                                        </div>
                                                        {/* tanggal */}
                                                        {/* status persetujuan */}
                                                        <div className="w-4 h-4 -ml-[1.5px]">
                                                            <Image
                                                                src={'/icons/verifikasi.svg'}
                                                                width={100}
                                                                height={100}
                                                                alt="ikon"
                                                            />
                                                        </div>
                                                        <div className={`text-xs ${dt.status ? 'text-green-700' : 'text-red-600'}`}>
                                                            {dt.status ? 'Di setujui' : 'Belum di setujui'}
                                                        </div>
                                                        {/* status persetujuan */}
                                                        {/* hapus pengelola */}
                                                        <div className="w-4 h-4 -ml-[1.5px]">
                                                            <Image
                                                                src={'/icons/hapus.svg'}
                                                                width={100}
                                                                height={100}
                                                                alt="ikon"
                                                            />
                                                        </div>
                                                        <div className="text-xs text-red-500 hover:text-red-700 cursor-pointer" onClick={() => adminmauhapuspengelola(dt)}>
                                                            Hapus pengelola
                                                        </div>
                                                        {/* hapus pengelola */}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <div className="text-orange-600 text-xs">
                                Belum ada pengelola yang di tambahkan untuk kecimol <span className="uppercase text-blue-600">{data.nama}</span>
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}