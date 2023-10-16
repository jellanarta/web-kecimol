"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Menubawah() {
    const stateuser = useSelector(state => state.authReducer)
    const statekecimol = useSelector(state => state.stateKecimol)
    const [attribute, setAttribute] = useState({
        ikon: 'diikuti',
        link: '/kecimol/diikuti',
        teks: 'di ikuti',
    })
    useEffect(() => {
        const yekn = {
            ikon: 'diikuti',
            link: '/kecimol/diikuti',
            teks: 'di ikuti',
        }
        if (stateuser.login) {
            if (statekecimol.status === "success" && statekecimol.kecimol.length) {
                yekn.ikon = 'user'
                yekn.teks = 'kecimol saya'
                yekn.link = '/kecimol/me'
            }
        }
        setAttribute(yekn)
    }, [stateuser.login, statekecimol.status, statekecimol.kecimol])
    return (
        <div className="fixed bottom-0 w-full h-[70px] bg-white border-t border-gray-200 z-[90]">
            <div className="w-full h-full grid grid-cols-4">
                <Komponentmenubawah />
                <Komponentmenubawah link="/jadwal" teks="Jadwal" ikon="book" />
                <Komponentmenubawah link="/kecimol" teks="kecimol" ikon="kecimol" />
                <Komponentmenubawah link={`${attribute.link}`} teks={attribute.teks} ikon={attribute.ikon} />
            </div>
        </div>
    )
}

function Komponentmenubawah({ ikon = 'home3', link = '/', teks = 'Beranda' }) {
    const [taokmni, setTaokmni] = useState('')
    const pathname = usePathname()
    useEffect(() => {
        setTaokmni(pathname)
    }, [pathname])
    return (
        <Link href={link} className={`grid grid-rows-2 hover:bg-gray-100 hover:text-blue-500 ${taokmni === link ? 'bg-gray-100 text-blue-500' : ''}`}>
            <div className="flex justify-center items-end">
                <div className="w-5 h-5 relative">
                    <Image
                        src={`/icons/${ikon}.svg`}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
            </div>
            <div className="text-[9px] font-semibold mt-1 text-center uppercase">
                {teks}
            </div>
        </Link>
    )
}