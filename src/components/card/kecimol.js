"use client"
import Image from "next/image";
import Link from "next/link";
import { formatAngkaRBJT } from "../../../lib/fnc";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCekMengikutiAtauTidak, userMengikutiKecimol } from "../../../lib/public-request/mengikuti/fnc";
import { setMengikuti } from "@/redux/mengikutikecimol";
import { AdminMauHapusKecimolNiArta, userDeleteKecimolnya } from "../../../lib/kecimol/delete/fnc";
import { setKecimol } from "@/redux/kecimol";
import { yakinSetujuiAtauNonaktivkan } from "../../../lib/admin/fnc";

export default function Kecimol({ kecimol, nomor = 1, children, adminhapus = true, userhapus = true, setujuipendaftaran = false, nonaktivkankecimol = false }) {
    const [pengikutnya, setPengikutnya] = useState(kecimol.totalpengikut)
    const stateuser = useSelector(state => state.authReducer)
    const statemengikuti = useSelector(state => state.stateMengikuti)
    const dispatch = useDispatch()

    const mengikutikecimol = async () => {
        if (stateuser.login) {
            const hasil = await userMengikutiKecimol({ idkecimol: kecimol.id })
            if (hasil.status === 200) {
                if (hasil.data.type === "create") {
                    const awalni = [...statemengikuti.mengikuti]
                    const anhbae = hasil.data
                    awalni.push(anhbae.data.kecimol)
                    dispatch(setMengikuti({ mengikuti: awalni }))
                    const tambahsatu = pengikutnya + 1
                    setPengikutnya(tambahsatu)
                } else {
                    const nihapus = hasil.data.data
                    const sisen = []
                    if (statemengikuti.mengikuti.length) {
                        statemengikuti.mengikuti.map(dt => {
                            if (dt.id !== nihapus.idkecimol) {
                                sisen.push(dt)
                            }
                        })
                    }
                    dispatch(setMengikuti({ mengikuti: sisen }))
                    const kurangsatu = pengikutnya - 1
                    setPengikutnya(kurangsatu)
                }
            }
        }
    }

    const [idkecimoltidakboleh, setIdkecimoltidakboleh] = useState([])
    const kembalikanidnya = e => {
        const selapukn = [...idkecimoltidakboleh]
        selapukn.push(e)
        setIdkecimoltidakboleh(selapukn)
    }
    return (
        <>
            {
                idkecimoltidakboleh.includes(kecimol.id) ?
                    null
                    :
                    <div className="rounded-sm bg-white ring-1 ring-gray-100 px-5 py-7 grid grid-cols-1 gap-5 justify-center relative">
                        <div className="absolute top-5 right-5">
                            <div className="w-8 h-8 rounded-full ring-1 ring-orange-600 text-orange-600 font-semibold text-sm flex justify-center items-center">
                                {nomor}
                            </div>
                        </div>
                        <div>
                            <div className="w-[100px] h-[100px] rounded-full overflow-hidden ring-1 relative mx-auto">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_SERVER}/profil-kecimol/${kecimol.poto_profil}`}
                                    alt={`profil kecimol`}
                                    fill
                                    sizes="100%"
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: '100%'
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="flex justify-center items-center gap-1">
                                    <Link href={`/${kecimol.username}`} className="uppercase block hover:text-blue-600 text-sm font-semibold">
                                        {kecimol.nama}
                                    </Link>
                                    {
                                        kecimol?.anggota_ak_ntb?.nama === "ya" ?
                                            <div className="w-4 h-4">
                                                <Image
                                                    src={'/icons/akntb.svg'}
                                                    width={100}
                                                    height={100}
                                                    alt="anggota ak ntb"
                                                />
                                            </div>
                                            : null
                                    }
                                </div>
                                <div className="text-xs text-center ">
                                    @{kecimol.username}
                                </div>
                            </div>
                        </div>
                        {/* alamat kecimol */}
                        <div>
                            <div className="text-[13px] capitalize text-center">
                                {kecimol.alamat?.kabupaten?.nama}, kecamatan {kecimol.alamat?.kecamatan?.nama}, desa {kecimol.alamat?.desa?.nama}{kecimol.alamat?.dusun?.length ? `, dusun ${kecimol.alamat?.dusun}` : ''}
                            </div>
                        </div>
                        {/* sosmed kecimol */}
                        <div>
                            <div className="flex justify-center items-center gap-3">
                                {
                                    kecimol.sosmed?.facebook?.length ?
                                        <Sosmedkecimol username={kecimol.sosmed.facebook} />
                                        : null
                                }
                                {
                                    kecimol.sosmed?.instagram?.length ?
                                        <Sosmedkecimol ikon="instagram" username={kecimol.sosmed.instagram} />
                                        : null
                                }
                                {
                                    kecimol.sosmed?.tiktok?.length ?
                                        <Sosmedkecimol ikon="tiktok" username={'@' + kecimol.sosmed.tiktok} />
                                        : null
                                }
                                {
                                    kecimol.sosmed?.youtube?.length ?
                                        <Sosmedkecimol ikon="youtube" username={'@' + kecimol.sosmed.youtube} />
                                        : null
                                }
                            </div>
                        </div>
                        {/* jadwal dan pengikut */}
                        <div>
                            <div className="grid w-full grid-cols-2  justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-700">
                                        {formatAngkaRBJT(pengikutnya)}
                                    </div>
                                    <div className="text-[10px] uppercase">
                                        pengikut
                                    </div>
                                </div>
                                <div className="text-center border-l border-gray-200 ">
                                    <div className="text-2xl font-bold text-gray-700">
                                        {formatAngkaRBJT(kecimol.totaljadwal)}
                                    </div>
                                    <div className="text-[10px] uppercase">
                                        jadwal
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ikuti dan lihat kecimol */}
                        <div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`${userCekMengikutiAtauTidak(statemengikuti, kecimol.id) ? 'ring-1 ring-blue-200 text-blue-500 hover:ring-blue-400' : 'bg-blue-600 hover:bg-blue-700 text-gray-50 '} py-3 rounded-full cursor-pointer text-[11px] uppercase text-center`} onClick={mengikutikecimol}>
                                    {userCekMengikutiAtauTidak(statemengikuti, kecimol.id) ? 'di ikuti' : 'ikuti'}
                                </div>
                                <Link href={`/${kecimol.username}`} className="bg-green-600 hover:bg-green-700 text-gray-50 block py-3 rounded-full cursor-pointer text-[11px] uppercase text-center">
                                    lihat profil
                                </Link>
                            </div>
                        </div>

                        {/* children */}
                        {
                            setujuipendaftaran ?
                                <div>
                                    <AdminSetujuiKecimol kecimol={kecimol} kembalikanidnya={kembalikanidnya} />
                                </div>
                                : null
                        }
                        {/* children */}

                        {/* user menghapus kecimolnya */}
                        {
                            userhapus ?
                                <div>
                                    <UserHapusKecimol kecimol={kecimol} kembalikanidnya={kembalikanidnya} />
                                </div>
                                : null
                        }
                        {/* user menghapus kecimolnya */}

                        {/* admin nonaktivkan kecimol */}
                        {
                            nonaktivkankecimol ?
                                <AdminNonAktivkanKecimol kecimol={kecimol} kembalikanidnya={kembalikanidnya} />
                                : null
                        }
                        {/* admin nonaktivkan kecimol */}

                        {/* admin hapus kecimol */}
                        {
                            adminhapus ?
                                <AdminMauHapusKecimol kecimol={kecimol} kembalikanidnya={kembalikanidnya} />
                                : null
                        }
                        {/* admin hapus kecimol */}

                    </div>
            }
        </>
    )
}

function Sosmedkecimol({ ikon = 'facebook', username = 'username' }) {
    const setLink = () => `https://${ikon}.com/${username}`
    return (
        <a href={`${setLink()}`} target="_blank">
            <div className="w-10 h-10 rounded-full flex justify-center items-center ring-1 ring-gray-200 hover:ring-blue-400">
                <div className="w-5 h-5">
                    <Image
                        src={`/icons/${ikon}.svg`}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
            </div>
        </a>
    )
}

// user hapus kecimol
function UserHapusKecimol({ kecimol, kembalikanidnya }) {
    const stateuser = useSelector(state => state.authReducer)
    const statekecimol = useSelector(state => state.stateKecimol)
    const dispatch = useDispatch()
    const berhakcek = () => {
        let berhak = false
        if (stateuser.status === "success" && stateuser.login) {
            if (kecimol.idUser === stateuser.user.id) {
                berhak = true
            }
        }
        return berhak
    }

    // proses hapus
    const [opendrop, setOpendrop] = useState(false)
    const [loadinghapuskecimol, setLoadinghapuskecimol] = useState(false)
    const usermauhapus = () => {
        if (!loadinghapuskecimol) {
            opendrop ? setOpendrop(false) : setOpendrop(true)
        }
    }
    const lanjutkansah = async () => {
        const idkecimol = kecimol.id
        setLoadinghapuskecimol(true)
        const hasil = await userDeleteKecimolnya(idkecimol)
        const semuakecimol = [...statekecimol.kecimol]
        if (hasil.status === 200) {
            const sisenaok = []
            if (semuakecimol.length) {
                semuakecimol.map(dt => dt.id !== idkecimol ? sisenaok.push(dt) : null)
            }
            dispatch(setKecimol({ kecimol: sisenaok }))
            kembalikanidnya(idkecimol)
        }
        setLoadinghapuskecimol(false)
    }
    return (
        <>
            {
                berhakcek() ?
                    <>
                        {
                            opendrop ?
                                <div className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center p-5">
                                    <div>
                                        <div className="text-center text-sm">
                                            Apakah anda yakin ingin menghapus kecimol <span className="uppercase text-blue-600">{kecimol.nama}</span>? semua data yang terkait dengan kecimol tersebut juga akan di hapus.
                                        </div>
                                        <div className="flex justify-center gap-4 mt-5">
                                            <div className="text-sm uppercase font-semibold text-red-600 hover:text-red-700 cursor-pointer" onClick={lanjutkansah}>
                                                {loadinghapuskecimol ? '...' : 'lanjutkan'}
                                            </div>
                                            <div className="text-sm uppercase font-semibold text-gray-600 hover:text-gray-700 cursor-pointer" onClick={usermauhapus}>
                                                batalkan
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }

                        <div className="rounded-full p-3 bg-red-600 hover:bg-red-700 text-gray-50 text-center text-xs uppercase cursor-pointer" onClick={usermauhapus}>
                            hapus kecimol
                        </div>
                    </>
                    : null
            }
        </>
    )
}

// admin hapus kecimol
function AdminMauHapusKecimol({ kecimol, kembalikanidnya }) {
    const stateuser = useSelector(state => state.authReducer)
    const [opendrop, setOpendrop] = useState(false)
    const [setLoadinghapuskecimol, setSetLoadinghapuskecimol] = useState(false)
    const adminhapusni = () => {
        if (!setLoadinghapuskecimol) {
            opendrop ? setOpendrop(false) : setOpendrop(true)
        }
    }
    const lanjutkansah = async () => {
        setSetLoadinghapuskecimol(true)
        const idkecimol = kecimol.id
        const hasil = await AdminMauHapusKecimolNiArta(idkecimol)
        if (hasil.status === 200) {
            kembalikanidnya(idkecimol)
        }
        setSetLoadinghapuskecimol(false)
    }
    return (
        <>
            {
                stateuser.status === "success" && stateuser.login && ['rootadmin'].includes(stateuser.user?.role) ?
                    <div>
                        {
                            opendrop ?
                                <div className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center p-5">
                                    <div>
                                        <div className="text-center text-sm">
                                            Apakah anda yakin ingin menghapus kecimol <span className="uppercase text-blue-600">{kecimol.nama}</span>? semua data yang terkait dengan kecimol tersebut juga akan di hapus.
                                        </div>
                                        <div className="flex justify-center gap-4 mt-5">
                                            <div className="text-sm uppercase font-semibold text-red-600 hover:text-red-700 cursor-pointer" onClick={lanjutkansah}>
                                                {setLoadinghapuskecimol ? '...' : 'lanjutkan'}
                                            </div>
                                            <div className="text-sm uppercase font-semibold text-gray-600 hover:text-gray-700 cursor-pointer" onClick={adminhapusni}>
                                                batalkan
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                        <div className="rounded-full p-3 bg-red-600 hover:bg-red-700 text-gray-50 text-center text-xs uppercase cursor-pointer" onClick={adminhapusni}>
                            admin hapus kecimol
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

// admin setujui kecimol
function AdminSetujuiKecimol({ kecimol, kembalikanidnya }) {
    const stateuser = useSelector(state => state.authReducer)
    const [opendrop, setOpendrop] = useState(false)
    const [loadingsetuju, setLoadingsetuju] = useState(false)
    const mausetujui = () => {
        if (!loadingsetuju) {
            opendrop ? setOpendrop(false) : setOpendrop(true)
        }
    }

    // lanjutkan setujuii
    const lanjutkansah = async () => {
        setLoadingsetuju(true)
        const idkecimol = kecimol.id
        const hasil = await yakinSetujuiAtauNonaktivkan({ idkecimol })
        if (hasil.status === 200) {
            kembalikanidnya(idkecimol)
        }
        setLoadingsetuju(false)
    }
    return (
        <>
            {
                stateuser.status === "success" && stateuser.login && ['admin', 'rootadmin'].includes(stateuser.user?.role) ?
                    <>
                        {
                            opendrop ?
                                <div className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center p-5">
                                    <div>
                                        <div className="text-center text-sm">
                                            Apakah anda yakin ingin emnyetujui kecimol <span className="uppercase text-blue-600">{kecimol.nama}</span> ?
                                        </div>
                                        <div className="flex justify-center gap-4 mt-5">
                                            <div className="text-sm uppercase font-semibold text-green-600 hover:text-green-700 cursor-pointer" onClick={lanjutkansah}>
                                                {loadingsetuju ? '...' : 'lanjutkan'}
                                            </div>
                                            <div className="text-sm uppercase font-semibold text-gray-600 hover:text-gray-700 cursor-pointer" onClick={mausetujui}>
                                                batalkan
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                        <div className="rounded-full p-3 bg-green-600 hover:bg-green-700 text-gray-50 text-center text-xs uppercase cursor-pointer" onClick={mausetujui}>
                            setujui kecimol
                        </div>
                    </>
                    : null
            }
        </>
    )
}

// nonaktivkan kecimol
function AdminNonAktivkanKecimol({ kecimol, kembalikanidnya }) {
    const stateuser = useSelector(state => state.authReducer)
    const [opendrop, setOpendrop] = useState(false)
    const [loadingnonaktivkan, setLoadingnonaktivkan] = useState(false)
    const clicknonaktivk = () => {
        if (!loadingnonaktivkan) {
            opendrop ? setOpendrop(false) : setOpendrop(true)
        }
    }
    const lanjutkansah = async () => {
        setLoadingnonaktivkan(true)
        const idkecimol = kecimol.id
        const hasil = await yakinSetujuiAtauNonaktivkan({ idkecimol }, 'nonaktivkan')
        if (hasil.status === 200) {
            kembalikanidnya(idkecimol)
        }
        setLoadingnonaktivkan(false)
    }
    return (
        <>
            {
                stateuser.status === "success" && stateuser.login && ['admin', 'rootadmin'].includes(stateuser.user?.role) ?
                    <div>
                        {
                            opendrop ?
                                <div className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center p-5">
                                    <div>
                                        <div className="text-center text-sm">
                                            Apakah anda yakin ingin menonaktivkan kecimol <span className="uppercase text-blue-600">{kecimol.nama}</span> ?
                                        </div>
                                        <div className="flex justify-center gap-4 mt-5">
                                            <div className="text-sm uppercase font-semibold text-red-600 hover:text-red-700 cursor-pointer" onClick={lanjutkansah}>
                                                {loadingnonaktivkan ? '...' : 'lanjutkan'}
                                            </div>
                                            <div className="text-sm uppercase font-semibold text-gray-600 hover:text-gray-700 cursor-pointer" onClick={clicknonaktivk}>
                                                batalkan
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                        <div className="rounded-full p-3 bg-violet-600 hover:bg-violet-700 text-gray-50 text-center text-xs uppercase cursor-pointer" onClick={clicknonaktivk}>
                            admin nonaktivkan kecimol
                        </div>
                    </div>
                    : null
            }
        </>
    )
}