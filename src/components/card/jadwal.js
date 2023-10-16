"use client"

import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import 'moment/locale/id'
import { useState } from "react";
import { useSelector } from "react-redux";
import { adminHapusJadwalKecimol } from "../../../lib/jadwal/fnc";
moment.locale('id')
export default function Jadwal({ jadwal, nomor = 1 }) {
    const stateuser = useSelector(state => state.authReducer)
    const [kontertanpawaktu] = useState(['nyongkolan', 'bejogetan', 'nyambut'])
    const [idtidakboleh, setidtidakboleh] = useState([])
    function cekberhakedit() {
        if (stateuser.status === "success" && stateuser.login) {
            if (jadwal.idUser === stateuser.user.id || jadwal.kecimol.idUser === stateuser.user.id) {
                return true
            } else {
                return false
            }
        }
    }
    const kembalikanidnya = e => {
        const selapukn = [...idtidakboleh]
        selapukn.push(e)
        setidtidakboleh(selapukn)
    }
    return (
        <>
            {
                !idtidakboleh.includes(jadwal.id) ?
                    <div className="bg-white rounded-sm ring-1 ring-gray-100 overflow-hidden relative">
                        <div className="p-5 border-b border-dotted border-gray-200 grid grid-cols-[1fr,auto] gap-2 items-center">
                            <div className="grid grid-cols-[auto,1fr] gap-3 items-center">
                                <div className="w-[50px] h-[50px] rounded-full relative">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_SERVER}/profil-kecimol/${jadwal.kecimol.poto_profil}`}
                                        sizes="100%"
                                        fill
                                        alt={jadwal.kecimol.nama}
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '100%'
                                        }}
                                    />
                                </div>
                                <div>
                                    <Link href={`/${jadwal.kecimol.username}`} className="flex flex-wrap gap-1 text-xs font-semibold uppercase hover:text-blue-600">
                                        {
                                            jadwal.kecimol.nama
                                        }
                                        {
                                            jadwal.kecimol?.anggota_ak_ntb?.nama?.toLowerCase() === "ya" ?
                                                <div className="w-4 h-4">
                                                    <Image
                                                        src={'/icons/akntb.svg'}
                                                        width={100}
                                                        height={100}
                                                        alt="ikon"
                                                    />
                                                </div>
                                                : null
                                        }
                                    </Link>
                                    <div className="text-xs text-gray-700">
                                        @{jadwal.kecimol.username}
                                    </div>
                                </div>
                            </div>
                            <div className="ring-1 ring-orange-600 rounded-full w-[30px] h-[30px] flex justify-center items-center font-semibold text-sm">
                                {nomor}
                            </div>
                        </div>
                        <div className="p-7">
                            <div className=" grid grid-cols-[auto,1fr] gap-3 items-center">
                                {/* kecimol dan type acara */}
                                <div className="w-4 h-4">
                                    <Image
                                        src={'/icons/typeacara.svg'}
                                        width={100}
                                        height={100}
                                        alt="ikon"
                                    />
                                </div>
                                <div className="text-sm font-semibold uppercase">
                                    {jadwal.kecimol.nama} <span className="text-orange-600">{jadwal.kategoriacara ? jadwal.kategoriacara.nama.toLowerCase() === "acara lainnya" ? jadwal.jadwallainnya : jadwal.kategoriacara.nama : ''}</span>
                                </div>
                                {/* kecimol dan type acara */}
                                {/* waktu jadwal jika bukan nyongkolan, nyambut dan bejogetan */}
                                {
                                    jadwal.kategoriacara && !kontertanpawaktu.includes(jadwal.kategoriacara.nama) ?
                                        <>
                                            <div className="w-4 h-4">
                                                <Image
                                                    src={'/icons/waktuacara.svg'}
                                                    width={100}
                                                    height={100}
                                                    alt="ikon"
                                                />
                                            </div>
                                            <div className="text-sm font-semibold uppercase">
                                                {jadwal.waktujadwal}
                                            </div>
                                        </>
                                        : null
                                }
                                {/* waktu jadwal jika bukan nyongkolan, nyambut dan bejogetan */}
                                {/* tanggal jadwal */}
                                <div className="w-4 h-4">
                                    <Image
                                        src={'/icons/date.svg'}
                                        width={100}
                                        height={100}
                                        alt="ikon"
                                    />
                                </div>
                                <div className="uppercase text-sm font-semibold text-blue-600 ">
                                    {moment(jadwal.tanggal).format("dddd, D MMMM YYYY")}
                                </div>
                                {/* tanggal jadwal */}
                                {/* lokasi main */}
                                <div className="w-4 h-4">
                                    <Image
                                        src={'/icons/location.svg'}
                                        width={100}
                                        height={100}
                                        alt="ikon"
                                    />
                                </div>
                                <div className="uppercase text-sm font-semibold ">
                                    lokasi <span className="text-orange-600">{jadwal.kategoriacara ? jadwal.kategoriacara.nama.toLowerCase() === "acara lainnya" ? jadwal.jadwallainnya : jadwal.kategoriacara.nama : 'acara'}</span>
                                </div>
                                <div className="w-4 h-4">
                                </div>
                                <div className="uppercase text-[11px]">
                                    {jadwal.lokasi_main?.kabupaten?.nama}, kecamatan {jadwal.lokasi_main?.kecamatan?.nama}, desa {jadwal.lokasi_main?.desa?.nama}{jadwal.lokasi_main?.dusun?.length ? `, dusun ${jadwal.lokasi_main?.dusun}` : ''}
                                </div>
                                {/* lokasi main */}
                                {/* tujuan nyongkolan jika tipe jadwal adalah nyongkolan */}
                                {
                                    jadwal.kategoriacara?.nama?.toLowerCase() === "nyongkolan" ?
                                        <>
                                            <div className="w-4 h-4">
                                                <Image
                                                    src={'/icons/location.svg'}
                                                    width={100}
                                                    height={100}
                                                    alt="ikon"
                                                />
                                            </div>
                                            <div className="uppercase text-sm font-semibold ">
                                                <span className="text-orange-600">nyongkolan</span> ke
                                            </div>
                                            <div className="w-4 h-4">
                                            </div>
                                            <div className="uppercase text-[11px]">
                                                {
                                                    jadwal.tbg ?
                                                        <>
                                                            tbg ( taok Bengan )
                                                        </>
                                                        :
                                                        <>
                                                            {jadwal.tujuan_main?.kabupaten?.nama}, kecamatan {jadwal.tujuan_main?.kecamatan?.nama}, desa {jadwal.tujuan_main?.desa?.nama}{jadwal.tujuan_main?.dusun?.length ? `, dusun ${jadwal.tujuan_main?.dusun}` : ''}
                                                        </>
                                                }
                                            </div>
                                        </>
                                        : null
                                }
                                {/* tujuan nyongkolan jika tipe jadwal adalah nyongkolan */}
                                {/* edit jadwal */}
                                {
                                    cekberhakedit() ?
                                        <>
                                            <div className="w-4 h-4">
                                                <Image
                                                    src={'/icons/edit.svg'}
                                                    width={100}
                                                    height={100}
                                                    alt="ikon"
                                                />
                                            </div>
                                            <Link href={`/jadwal/new-jadwal?change=${jadwal.id}&tanggal=${jadwal.tanggal}&ref=back`} className="uppercase text-blue-600 hover:text-blue-700 text-sm font-semibold ">
                                                edit jadwal
                                            </Link>
                                        </>
                                        : null
                                }
                                {/* edit jadwal */}

                            </div>
                            {/* admin hapus jadwal */}
                            <AdminHapusJadwal jadwal={jadwal} kembalikanidnya={kembalikanidnya} />
                            {/* admin hapus jadwal */}
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

function AdminHapusJadwal({ jadwal, kembalikanidnya }) {
    const stateuser = useSelector(state => state.authReducer)
    const [opendrop, setOpendrop] = useState(false)
    const [loadinghapusjadwal, setLoadinghapusjadwal] = useState(false)
    const clickhapus = () => {
        if (!loadinghapusjadwal) {
            opendrop ? setOpendrop(false) : setOpendrop(true)
        }
    }
    const lanjutkansah = async () => {
        setLoadinghapusjadwal(true)
        const idjadwal = jadwal.id
        const hasil = await adminHapusJadwalKecimol(idjadwal)
        if (hasil.status === 200) {
            kembalikanidnya(idjadwal)
        }
        setLoadinghapusjadwal(false)
    }
    const kembabilaknama = () => {
        let jadwalnya = ''
        const namasingkat = jadwal.kategoriacara?.nama
        if (namasingkat === "acara lainnya") {
            jadwalnya = jadwal.jadwallainnya
        } else {
            if (namasingkat) {
                jadwalnya = namasingkat
            }
        }
        return jadwalnya
    }
    return (
        <>
            {
                stateuser.status === "success" && stateuser.login && ['admin', 'rootadmin'].includes(stateuser.user?.role) ?
                    <div className="mt-5">
                        {
                            opendrop ?
                                <div className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center p-5">
                                    <div>
                                        <div className="text-center text-sm">
                                            Apakah anda yakin ingin menghapus jadwal <span className="text-orange-600 uppercase">{kembabilaknama()}</span> dari kecimol <span className="uppercase text-blue-600">{jadwal.kecimol.nama}</span> ?
                                        </div>
                                        <div className="flex justify-center gap-4 mt-5">
                                            <div className="text-sm uppercase font-semibold text-red-600 hover:text-red-700 cursor-pointer" onClick={lanjutkansah}>
                                                {loadinghapusjadwal ? '...' : 'lanjutkan'}
                                            </div>
                                            <div className="text-sm uppercase font-semibold text-gray-600 hover:text-gray-700 cursor-pointer" onClick={clickhapus}>
                                                batalkan
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                        <div className=" grid grid-cols-[auto,1fr] gap-3 items-center">
                            <div className="w-4 h-4">
                                <Image
                                    src={'/icons/hapus.svg'}
                                    width={100}
                                    height={100}
                                    alt="ikon"
                                />
                            </div>
                            <div className="uppercase text-sm font-semibold ">
                                <span className="text-red-600 hover:text-red-700 cursor-pointer" onClick={clickhapus}>hapus jadwal</span>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}