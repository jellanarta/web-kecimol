"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Menusamping from "./menusamping";
import Menubawah from "./menubawah";
import { useDispatch, useSelector } from "react-redux";
import { carikecimoluser } from "../../../lib/user/kecimoluser/fnc";
import { getSemuaYangDiIkutiUser } from "../../../lib/public-request/mengikuti/fnc";
import { userGetPengelola } from "../../../lib/pengelola-kecimol/fnc";
import { SemuaOrangAmbilKategoriAcara } from "../../../lib/public-request/kategoriacara/fnc";
import { bukamenuBuatJadwal } from "../../../lib/public/cekmenu";
import { useRouter, useSearchParams } from "next/navigation";
import Searchkecimol from "../searchkecimol";



export default function Menuatas() {
    // husus ketika user mau search kecimol
    const [urlsaatini, setUrlsaatini] = useState(null)
    useEffect(() => {
        setUrlsaatini(window.location.href)
    }, [])
    const router = useRouter()
    const usermausearch = () => {
        if (urlsaatini) {
            router.push(`${urlsaatini}?query=search`)
        }
    }
    const maucarigak = useSearchParams()
    const apakahyadiamaucari = maucarigak.get('query')
    // husus ketika user mau search kecimol
    const stateuser = useSelector(state => state.authReducer)
    const statekecimol = useSelector(state => state.stateKecimol)
    // console.log(statekecimol);
    const statemengikuti = useSelector(state => state.stateMengikuti)
    const statedikelola = useSelector(state => state.stateDikelola)
    const statekategoriacara = useSelector(state => state.stateKategoriacara)
    const dispatch = useDispatch()
    useEffect(() => {
        const gogo = async () => {
            // await Promise.all()
            const proses1 = carikecimoluser(dispatch, stateuser, statekecimol)
            const proses2 = getSemuaYangDiIkutiUser(dispatch, stateuser, statemengikuti)
            const proses3 = userGetPengelola(dispatch, stateuser, statedikelola)
            const proses4 = SemuaOrangAmbilKategoriAcara(dispatch, statekategoriacara)
            await Promise.all([proses1, proses2, proses3, proses4])
        }
        gogo()
    }, [stateuser, dispatch, statedikelola, statekategoriacara, statekecimol, statemengikuti])
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [tampilkanatas, setTampilkanatas] = useState(true)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                setTampilkanatas(false)
            } else if (currentScrollTop < lastScrollTop) {
                setTampilkanatas(true)
            }

            setLastScrollTop(currentScrollTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            // Membersihkan event listener ketika komponen tidak lagi digunakan
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);
    // menutup menu samping
    const [openmenumobile, setOpenmenumobile] = useState(false)
    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (!event.target.closest("#konterbukatutup") && !event.target.closest("#kontermenuterbuka")) {
            setOpenmenumobile(false)
        }
    };
    const bukatutupmnmobile = () => {
        if (openmenumobile) {
            setOpenmenumobile(false)
        } else {
            setOpenmenumobile(true)
        }
    }

    return (
        <>
            {
                apakahyadiamaucari && apakahyadiamaucari === "search" ?
                    <Searchkecimol />
                    : null
            }
            {/* menu palingatas */}
            <div className={`bg-white lg:ml-[300px] z-[90] ${tampilkanatas ? 'sticky top-0' : ''} `}>
                <div className="max-w-[calc(1500px-300px)]">
                    <div className=" px-5 pt-5">
                        <div className="flex justify-between gap-7 items-center h-[50px]">
                            <div>
                                <div className="text-xs  text-gray-600">
                                    Hai, Selamat Datang
                                </div>
                                {/* untuk yang sudah login */}
                                <div className="text-lg font-semibold line-clamp-1 capitalize">
                                    {
                                        stateuser.status === "success" ?
                                            stateuser.login ?
                                                stateuser.user.nama
                                                :
                                                <Link href={'/masuk?ref=back'} className="hover:text-blue-600">
                                                    masuk dulu yuk
                                                </Link>
                                            : null
                                    }
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Imagedua linktujuan={stateuser.login ? bukamenuBuatJadwal({ statekecimol, statedikelola }) ? '/jadwal/new-jadwal' : '/daftarkan-kecimol' : '/masuk?ref=back'} link="/icons/addjadwal.svg" />
                                <Imagedua linktujuan={stateuser.login ? '/user' : '/masuk?ref=back'} link="/icons/userperson.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* menu kedua atas */}
            <div className={`bg-white sticky lg:ml-[300px] z-[90] ${tampilkanatas ? 'top-[70px]' : 'top-0'}  border-b border-gray-200`}>
                <div className="max-w-[calc(1500px-300px)]">
                    <div className=" px-5 py-4 grid grid-cols-[1fr,auto] gap-5 w-full md:grid-cols-2">
                        <div className="ring-1 ring-gray-200 bg-gray-50 p-3 text-[14px] text-gray-700 flex items-center rounded-full gap-3 cursor-pointer hover:ring-blue-400" onClick={usermausearch}>
                            <div className="w-5 h-5 relative">
                                <Image
                                    src={'/icons/search.svg'}
                                    width={100}
                                    height={100}
                                    alt="ikon"
                                />
                            </div>
                            <div>
                                cari kecimol...
                            </div>
                        </div>
                        <div className="flex justify-end w-full  items-center gap-0 md:gap-3">
                            <Menubawahkeatas />
                            <Menubawahkeatas link="/jadwal" ikon="book" />
                            <Menubawahkeatas link="/kecimol" ikon="kecimol" />
                            <div className="ring-1 ring-gray-100 lg:hidden rounded-full w-11 h-11 cursor-pointer hover:ring-blue-400 flex justify-center items-center" onClick={bukatutupmnmobile} id="konterbukatutup">
                                <div className="w-6 h-6 relative">
                                    <Image
                                        src={'/icons/menu.svg'}
                                        width={100}
                                        height={100}
                                        alt="ikon"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* open menu samping mobile */}
            <div className={`fixed lg:hidden w-full h-full top-0 z-[100] ${openmenumobile ? '-left-0' : '-left-[100%]'}`} style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className={`w-full max-w-[300px] overflow-y-auto p-5 fixed h-full bg-white ${openmenumobile ? 'left-0' : '-left-[110%]'} transition-all`} id="kontermenuterbuka">
                    {/* <div className="p-5">
                    </div> */}
                    <Menusamping />
                </div>
            </div>

            {/* menu bawah */}
            <div className="block md:hidden">
                <Menubawah />
            </div>

            {/* menusamping dekstop */}
            <div className="fixed hidden z-[500000] lg:block left-0 top-0 h-full bg-white w-[300px] p-5 overflow-y-auto">
                <Menusamping />
            </div>
        </>
    )
}
function Menubawahkeatas({ link = '/', ikon = 'home3' }) {
    return (
        <Link href={link} className="ring-1 ring-gray-100 rounded-full w-11 h-11 cursor-pointer hover:ring-blue-400 hidden md:flex justify-center items-center">
            <div className="w-6 h-6 relative">
                <Image
                    src={`/icons/${ikon}.svg`}
                    width={100}
                    height={100}
                    alt="ikon"
                />
            </div>
        </Link>
    )
}

function Imagedua({ link = '/icons/userperson.svg', linktujuan = '/' }) {
    return (

        < Link href={linktujuan} className="ring-1 ring-gray-100 rounded-full w-11 h-11 cursor-pointer hover:ring-blue-400 flex justify-center items-center" >
            <div className="w-6 h-6 relative">
                <Image
                    src={link}
                    width={100}
                    height={100}
                    alt="ikon"
                />
            </div>
        </Link >
    )
}
