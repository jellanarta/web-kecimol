"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCekMengikutiAtauTidak, userMengikutiKecimol } from "../../../../lib/public-request/mengikuti/fnc";
import { setMengikuti } from "@/redux/mengikutikecimol";
import { formatAngkaRBJT } from "../../../../lib/fnc";
import Sharekecimol from "@/components/share/sharekecimol";

export default function Profilandname({ kecimol }) {
    const [opendropshare, setOpendropshare] = useState(false)
    const mausharebos = () => {
        setOpendropshare(true)
    }
    const kembalinutup = () => {
        setOpendropshare(false)
    }
    return (
        <>
            {/* share kecimol */}
            {
                opendropshare ?
                    <Sharekecimol kecimol={kecimol} kembalinutup={kembalinutup} />
                    : null
            }
            {/* share kecimol */}
            <div className="grid grid-cols-1 justify-center gap-6 md:grid-cols-[1fr,auto]">
                <div className="block md:flex md:items-start md:gap-6">
                    <div className="w-[100px] min-w-[100px]  h-[100px] rounded-full overflow-hidden relative ring-1 ring-blue-400 mx-auto md:mx-0">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_SERVER}/profil-kecimol/${kecimol.poto_profil}`}
                            sizes="100%"
                            fill
                            priority
                            alt={kecimol.nama}
                            style={{
                                objectFit: 'cover',
                                borderRadius: '100%'
                            }}
                        />
                    </div>
                    <div className="hidden md:grid grid-cols-1 gap-5">
                        <Alamatkecimoldananggotaakntb kecimol={kecimol} />
                    </div>

                </div>
                <div className="grid grid-cols-1 gap-6 md:hidden">
                    <Alamatkecimoldananggotaakntb kecimol={kecimol} />
                    <Mengikutikecimol mausharebos={mausharebos} kecimol={kecimol} />
                </div>
                <div className="hidden md:flex md:justify-end">
                    <Mengikutikecimol mausharebos={mausharebos} kecimol={kecimol} />
                </div>
            </div>
        </>
    )
}

function Alamatkecimoldananggotaakntb({ kecimol }) {
    return (
        <>
            <div className="text-center md:text-left">
                <div className="text-sm uppercase font-semibold flex flex-wrap justify-center md:justify-start gap-1">
                    {kecimol.nama}
                    {
                        kecimol?.anggota_ak_ntb?.nama?.toLowerCase() === "ya" ?
                            <div className="w-[18px] h-[18px]">
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
                <div className="text-xs">
                    @{kecimol.username}
                </div>
            </div>
            <Sosmed kecimol={kecimol} />
            <div className="text-center md:text-left text-xs capitalize">
                {kecimol.alamat.kabupaten.nama}, kecamatan {kecimol.alamat.kecamatan.nama}, desa {kecimol.alamat.desa.nama}{kecimol.alamat.dusun.length ? `, dusun ${kecimol.alamat.dusun}` : ''}
            </div>
            {
                kecimol?.anggota_ak_ntb?.nama?.toLowerCase() === "ya" ?
                    <div>
                        <div className="flex gap-2 justify-center items-end md:justify-start">
                            <div className="w-[18px] h-[18px]">
                                <Image
                                    src={'/icons/akntb.svg'}
                                    width={100}
                                    height={100}
                                    alt="anggota ak ntb"
                                />
                            </div>
                            <div className="uppercase text-xs text-blue-700">
                                anggota  ak - ntb
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

function Mengikutikecimol({ kecimol, mausharebos }) {
    const [totalpengikut, settotalpengikut] = useState(kecimol.totalpengikut)
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
                    const tambahsatu = totalpengikut + 1
                    settotalpengikut(tambahsatu)
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
                    const kurangsatu = totalpengikut - 1
                    settotalpengikut(kurangsatu)
                }
            }
        }
    }

    return (
        <div>
            <div className="flex justify-center gap-3 md:justify-start">
                {
                    stateuser.status === "success" && stateuser.login && stateuser.user.id === kecimol?.user?.id ?
                        <Link href={`/daftarkan-kecimol?change=${kecimol.username}`} className="min-w-[35px] flex justify-center items-center w-[35px] min-h-[35px] h-[35px] hover:ring-blue-400 rounded-full ring-1 ring-gray-200">
                            <div className="w-[20px] h-[20px]">
                                <Image
                                    src={`/icons/edit.svg`}
                                    width={100}
                                    height={100}
                                    alt="ikon"
                                />
                            </div>
                        </Link>
                        : null
                }
                <div className={`rounded-full ${userCekMengikutiAtauTidak(statemengikuti, kecimol.id) ? 'ring-1 ring-blue-200 text-blue-500 hover:ring-blue-400' : 'bg-blue-600 hover:bg-blue-700 text-gray-50 '} px-10 h-[35px] flex items-center uppercase text-[10px]  cursor-pointer`} onClick={mengikutikecimol}>
                    {userCekMengikutiAtauTidak(statemengikuti, kecimol.id) ? 'di ikuti' : 'ikuti'}
                </div>
                <div className="min-w-[35px] flex justify-center items-center w-[35px] min-h-[35px] h-[35px] hover:ring-blue-400 rounded-full ring-1 ring-gray-200 cursor-pointer" onClick={mausharebos}>
                    <div className="w-[15px] h-[15px]">
                        <Image
                            src={`/icons/sharekecimol.svg`}
                            width={100}
                            height={100}
                            alt="ikon"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                <div className="pr-3 border-r border-gray-200">
                    <div className="text-2xl text-center font-semibold text-gray-600">
                        {formatAngkaRBJT(totalpengikut)}
                    </div>
                    <div className="text-center text-[11px] uppercase">
                        pengikut
                    </div>
                </div>
                <div className="pl-3 border-l border-gray-200">
                    <div className="text-2xl text-center font-semibold text-gray-600">
                        {formatAngkaRBJT(kecimol.totaljadwal)}
                    </div>
                    <div className="text-center text-[11px] uppercase">
                        jadwal
                    </div>
                </div>
            </div>
        </div>
    )
}
function Sosmed({ kecimol }) {
    const [adasosmed, setAdasosmed] = useState(false)
    useEffect(() => {
        const konter = []
        for (const key in kecimol.sosmed) {
            if (kecimol.sosmed[key].length) {
                konter.push(kecimol.sosmed[key])
            }
        }
        if (konter.length) {
            setAdasosmed(true)
        } else {
            setAdasosmed(true)
        }
    }, [kecimol.sosmed])
    return (
        <>
            {
                adasosmed ?
                    <div className="flex justify-center gap-3 md:justify-start">
                        {
                            kecimol.sosmed.facebook.length ?
                                <Semakinmudah ikon="facebook" href={kecimol.sosmed.facebook} />
                                : null
                        }
                        {
                            kecimol.sosmed.instagram.length ?
                                <Semakinmudah ikon="instagram" href={kecimol.sosmed.instagram} />
                                : null
                        }
                        {
                            kecimol.sosmed.tiktok.length ?
                                <Semakinmudah ikon="tiktok" href={'@' + kecimol.sosmed.tiktok} />
                                : null
                        }
                        {
                            kecimol.sosmed.youtube.length ?
                                <Semakinmudah ikon="youtube" href={'@' + kecimol.sosmed.youtube} />
                                : null
                        }
                    </div>
                    : null
            }
        </>
    )
}
function Semakinmudah({ ikon = 'facebook', href = 'username' }) {
    return (
        <a href={`https://www.${ikon}/${href}`} className="min-w-[35px] flex justify-center items-center w-[35px] min-h-[35px] h-[35px] hover:ring-blue-400 rounded-full ring-1 ring-gray-200" target="_blank">
            <div className="w-[20px] h-[20px]">
                <Image
                    src={`/icons/${ikon}.svg`}
                    width={100}
                    height={100}
                    alt="ikon"
                />
            </div>
        </a>
    )
}