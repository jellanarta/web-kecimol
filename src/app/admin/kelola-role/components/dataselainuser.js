"use client"

import Image from "next/image"
import { useState } from "react"
import { adminUbahROleJadiuser } from "../../../../../lib/admin/role/fnc"

export default function Dataselainuser({ datauser }) {
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    admin atau rootadmin yang anda tambahkan sebelumnya
                </div>
            </div>
            <div className="m-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {
                    datauser && datauser.length ?
                        datauser.map((dt, idx) => (
                            <Cardadmindanrootadmin data={dt} nomor={idx + 1} key={idx} />
                        ))
                        : null
                }
            </div>
        </div>
    )
}
function Cardadmindanrootadmin({ data, nomor = 1 }) {
    const [idtidakboleh, setIdtidakboleh] = useState([])
    const kembalikanidnya = e => {
        const selapukn = [...idtidakboleh]
        selapukn.push(e)
        setIdtidakboleh(selapukn)
    }
    return (
        <>
            {
                !idtidakboleh.includes(data.id) ?
                    <div className="bg-white rounded-sm p-5 ring-1 ring-gray-200 relative">
                        <div className="grid grid-cols-[auto,1fr] gap-4">
                            <div className="text-sm font-semibold">
                                {nomor}.
                            </div>
                            <div>
                                <div className="text-sm uppercase font-semibold">
                                    {data.nama}
                                </div>
                            </div>
                            <div />
                            <div className="grid grid-cols-[auto,1fr] gap-3 items-center">
                                <div className="w-4 h-4">
                                    <Image
                                        src={'/icons/email.svg'}
                                        width={100}
                                        height={100}
                                        alt="ikon"
                                    />
                                </div>
                                <div className="text-sm">
                                    {data.email}
                                </div>
                                <div className="w-4 h-4">
                                    <Image
                                        src={'/icons/userrole.svg'}
                                        width={100}
                                        height={100}
                                        alt="ikon"
                                    />
                                </div>
                                <div className="text-sm">
                                    {data.role}
                                </div>
                                <div className="w-4 h-4">
                                    <Image
                                        src={'/icons/hapus.svg'}
                                        width={100}
                                        height={100}
                                        alt="ikon"
                                    />
                                </div>
                                <HususHapus data={data} kembalikanidnya={kembalikanidnya} />
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

function HususHapus({ data, kembalikanidnya }) {
    const [opendrop, setOpendrop] = useState(false)
    const [loadinghapus, setLoadinghapus] = useState(false)
    const mauhapus = () => {
        if (!loadinghapus) {
            opendrop ? setOpendrop(false) : setOpendrop(true)
        }
    }
    const lanjutkanni = async () => {
        setLoadinghapus(true)
        const iduserjadiuser = data.id
        const hasil = await adminUbahROleJadiuser(iduserjadiuser)
        if (hasil.status === 200) {
            kembalikanidnya(iduserjadiuser)
        }
        setLoadinghapus(false)
    }
    return (
        <>
            {
                opendrop ?
                    <div className="absolute left-0 top-0 w-full h-full bg-white p-5 justify-center items-center flex">
                        <div>
                            <div className="text-center text-sm">
                                Apakah anda yakin ingin menghapus <span className="font-semibold">{data.nama}</span> dari role <span className="text-blue-600">{data.role}</span>?
                            </div>
                            <div className="flex justify-center gap-3 mt-5">
                                <div className="text-xs uppercase font-semibold text-red-600 hover:text-red-700 cursor-pointer" onClick={lanjutkanni}>
                                    {loadinghapus ? '...' : 'lanjutkan'}
                                </div>
                                <div className="text-xs uppercase font-semibold  cursor-pointer" onClick={mauhapus}>
                                    batalkan
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
            <div className="text-sm text-red-600 hover:text-red-700 cursor-pointer" onClick={mauhapus}>
                hapus
            </div>
        </>
    )
}