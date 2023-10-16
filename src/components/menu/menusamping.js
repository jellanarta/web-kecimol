"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { sendUserKeluar } from "../../../lib/user"
import { logOut } from "@/redux/auth"
import { usePathname } from "next/navigation"
import { userKeluar } from "../../../lib/user/auth/fnc"
import { setKecimolNull } from "@/redux/kecimol"
import { setDikelolaNull } from "@/redux/kelolakecimol"
import { setMengikutiNull } from "@/redux/mengikutikecimol"
import { bukaMenuadmin, bukamenuBuatJadwal, bukamenukelolakecimol } from "../../../lib/public/cekmenu"

export default function Menusamping() {
    const stateuser = useSelector(state => state.authReducer)
    const statekecimol = useSelector(state => state.stateKecimol)
    const statedikelola = useSelector(state => state.stateDikelola)
    const satekategoriacara = useSelector(state => state.stateKategoriacara)

    const [loginorno, setLoginorno] = useState(false)
    useEffect(() => {
        if (stateuser.status === "success") {
            if (stateuser.login) {
                setLoginorno(true)
            } else {
                setLoginorno(false)
            }
        }
    }, [stateuser.login, stateuser.status])
    function mengembalikanacara() {
        if (satekategoriacara.status === "success" && satekategoriacara.kategoriacara.length) {
            const linkjadwal = '/jadwal'
            const disimpan = [{ nama: 'hari ini', link: linkjadwal }]
            const baitaran = satekategoriacara.kategoriacara.map(dt => dt.nama)
            baitaran.map(dt => {
                disimpan.push({ nama: dt, link: `${linkjadwal}/${dt.split(" ").join("-")}` })
            })
            return disimpan
        }
    }
    return (
        <div className="w-full  grid gap-8 grid-cols-1">
            {/* logo dan nama website */}
            <div className="grid gap-5 grid-cols-[auto,1fr] items-center border-b border-dotted border-gray-200 pb-5">
                <div className="w-[70px] h-[70px]">
                    <Image
                        src={'/logo.png'}
                        alt="logo kecimol.com"
                        width={100}
                        height={100}
                    />
                </div>
                <div>
                    <div className="text-[16px] font-bold uppercase">
                        kecimol
                    </div>
                    <div className="text-xs text-gray-700">
                        Nusa Tenggara Barat
                    </div>
                </div>
            </div>
            {/* anak mnu */}
            <div className="grid grid-cols-1 gap-5">

                {/* menu admin */}
                {
                    bukaMenuadmin(stateuser, ['admin', 'rootadmin']) ?
                        <Parentanakmenu judul="menu admin">
                            <Anakamenu ikon="dashboard" teks="dashboard" link="/admin/dashboard" />
                            {
                                bukaMenuadmin(stateuser, ['rootadmin']) ?
                                    <>
                                        <Anakamenu ikon="kategoriacara" teks="kategori acara" link="/admin/kategori-acara" />
                                        <Anakamenu ikon="userrole" teks="kelola role" link="/admin/kelola-role" />
                                    </>
                                    : null
                            }
                            <Anakamenu ikon="setujuikecimol" teks="setujui kecimol" link="/admin/setujui-kecimol" />
                        </Parentanakmenu>
                        : null
                }
                {/* menu admin */}

                {/* dashboard kecimol */}
                {
                    loginorno ?
                        statekecimol.status === "success" && statekecimol.kecimol.length ?
                            bukamenukelolakecimol(statekecimol) ?
                                <Parentanakmenu judul="dashboard kecimol">
                                    <Anakamenu ikon="dashboard" teks="dashboard" link="/kecimol/dashboard" />
                                </Parentanakmenu>
                                : null
                            : null
                        : null
                }
                {/* dashboard kecimol */}

                {/* pengelola kecimol */}
                {
                    loginorno ?
                        statekecimol.status === "success" && statekecimol.kecimol.length ?
                            bukamenukelolakecimol(statekecimol) ?
                                <Parentanakmenu judul="pengelola kecimol">
                                    <Anakamenu ikon="undangpengelolakecimol" teks="daftar pengelola kecimol" link="/pengelola-kecimol" />
                                </Parentanakmenu>
                                : null
                            : null
                        : null
                }
                {/* pengelola kecimol */}
                {/* undangan pengelola dan yang di kelola */}
                {
                    loginorno ?
                        statedikelola.status === "success" && statedikelola.dikelola.length ?
                            <Parentanakmenu judul="kecimol yang di kelola">
                                <Anakamenu ikon="pengelolakecimol" teks="kecimol yang di kelola" link="/kecimol/dikelola" />
                            </Parentanakmenu>
                            : null
                        : null
                }
                {/* undangan pengelola dan yang di kelola */}
                {
                    loginorno ?
                        bukamenuBuatJadwal({ statekecimol, statedikelola }) ?
                            <Parentanakmenu judul="jadwal kecimol">
                                <Anakamenu ikon="addjadwal" teks="kirim jadwal kecimol" link="/jadwal/new-jadwal" />
                            </Parentanakmenu>
                            : null
                        : null
                }
                {/* daftarkan kecimol */}
                {
                    loginorno ?
                        <Parentanakmenu judul="daftarkan kecimol anda">

                            <Anakamenu ikon="kecimol" teks="daftarkan kecimol" link="/daftarkan-kecimol" />
                        </Parentanakmenu>
                        : null
                }
                {/* daftarkan kecimol */}

                {/* kecimol */}
                <Parentanakmenu judul="semua kecimol">
                    {
                        loginorno ?
                            statekecimol.status === "success" && statekecimol.kecimol.length ?
                                <Anakamenu ikon="user" teks="kecimol saya" link="/kecimol/me" />
                                : null
                            : null
                    }
                    {
                        loginorno ?
                            <Anakamenu ikon="diikuti" teks="kecimol di ikuti" link="/kecimol/diikuti" />
                            : null
                    }
                    <Anakamenu ikon="kecimol" teks="semua kecimol" link="/kecimol" />
                    <Anakamenu ikon="sewakecimol" teks="sewa kecimol" link="/kecimol/sewa-kecimol" />
                </Parentanakmenu>
                {/* kecimol */}

                {/* jadwal kecimol */}
                <Parentanakmenu judul="jadwal kecimol">
                    {
                        mengembalikanacara() && mengembalikanacara().length ?
                            mengembalikanacara().map((dt, idx) => (
                                <Anakamenu ikon="typeacara" teks={dt.nama} link={dt.link} key={idx} />
                            ))
                            : null
                    }
                </Parentanakmenu>
                {/* jadwal kecimol */}

                {/* blog kecimolz */}
                <Parentanakmenu judul="blog kecimol">
                    <AnakBlank ikon="blog" teks="artikel kecimol" />
                </Parentanakmenu>
                {/* blog kecimolz */}

                {/* login register */}
                {
                    !loginorno ?
                        <Parentanakmenu judul="masuk / daftar">
                            <Anakamenu ikon="login" teks="masuk" link="/masuk?ref=back" />
                            <Anakamenu ikon="register" teks="daftar" link="/daftar" />
                        </Parentanakmenu>
                        : null
                }
                {/* login register */}

                {/* profil user */}
                {
                    loginorno ?
                        <Parentanakmenu judul="Profil User">
                            <Anakamenu ikon="userperson" link="/user" teks="profil" />
                        </Parentanakmenu>
                        : null
                }
                {/* profil user */}

                {/* keluar akun */}
                {
                    loginorno ?
                        <Parentanakmenu judul="keluar akun">
                            <Hususkeluarni />
                        </Parentanakmenu>
                        : null
                }
                {/* keluar akun */}
            </div>
        </div>
    )
}

function Parentanakmenu({ children, judul = "penjelasan menu" }) {
    return (
        <div>
            <div className="text-[11px] font-semibold uppercase text-gray-700">
                {judul}
            </div>
            <div className="grid grid-cols-1 gap-2 mt-3">
                {children}
            </div>
        </div>
    )
}

function AnakBlank({ ikon = 'blog', teks = 'artikel kecimol' }) {
    return (
        <a href={process.env.NEXT_PUBLIC_BLOG} target="_blank">
            <div className={`grid grid-cols-[auto,1fr] gap-2 items-center border-dotted border-b  pb-2 hover:border-blue-400 hover:text-blue-400 transition-all border-gray-200`}>
                <div className="w-4 h-4">
                    <Image
                        src={`/icons/${ikon}.svg`}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
                <div className="text-sm line-clamp-1 font-medium capitalize">
                    {teks}
                </div>
            </div>
        </a>
    )
}
function Anakamenu({ ikon = 'home3', link = '/', teks = 'nama menu' }) {
    const [taokmni, setTaokmni] = useState('')
    const pathname = usePathname()
    useEffect(() => {
        setTaokmni(pathname)
    }, [pathname])
    return (
        <Link href={link} className={`grid grid-cols-[auto,1fr] gap-2 items-center border-dotted border-b  pb-2 hover:border-blue-400 hover:text-blue-400 transition-all ${taokmni === link ? 'text-blue-400 border-blue-400' : 'border-gray-200'}`}>
            <div className="w-4 h-4">
                <Image
                    src={`/icons/${ikon}.svg`}
                    width={100}
                    height={100}
                    alt="ikon"
                />
            </div>
            <div className="text-sm line-clamp-1 font-medium capitalize">
                {teks}
            </div>
        </Link>
    )
}
function Hususkeluarni() {
    const dispatch = useDispatch()
    const [openmoadl, setOpenmoadl] = useState(false)
    const setkirimkeluar = async () => {
        openmoadl ? setOpenmoadl(false) : setOpenmoadl(true)
    }
    const keluardong = async () => {
        const hasil = await userKeluar()
        if (hasil.status === 200) {
            dispatch(setKecimolNull())
            dispatch(setDikelolaNull())
            dispatch(setMengikutiNull())
            dispatch(logOut())
        }
        setOpenmoadl(false)
    }
    return (
        <>
            {
                openmoadl ?
                    <div className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-[20009999000]" style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <div className="max-w-[400px] m-5 w-full bg-white p-6">
                            <div className="text-xs text-center">
                                Apakah anda yakin ingin keluar?
                            </div>
                            <div className="mt-7 flex justify-center text-xs font-semibold">
                                <div className="grid grid-cols-2 gap-5 w-full max-w-[200px] uppercase">
                                    <div className="cursor-pointer text-center" onClick={setkirimkeluar}>Batal</div>
                                    <div className="cursor-pointer text-center text-blue-600" onClick={keluardong}>Keluar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
            <div className="grid grid-cols-[auto,1fr] gap-2 items-center border-dotted border-b border-gray-200 pb-2 hover:border-blue-400 hover:text-blue-400 transition-all cursor-pointer" onClick={setkirimkeluar}>

                <div className="w-4 h-4">
                    <Image
                        src={`/icons/${'logout'}.svg`}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
                <div className="text-sm line-clamp-1 font-medium capitalize">
                    keluar
                </div>
            </div>
        </>
    )
}