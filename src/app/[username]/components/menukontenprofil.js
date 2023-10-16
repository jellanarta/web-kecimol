"use client"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Menukontenprofil({ kecimol }) {
    const getnya = useSearchParams()
    const mbetaokn = getnya.get('get')
    const [datakonter, setDatakonter] = useState([])
    useEffect(() => {
        const kontermenu = ['beranda', 'jadwal', 'pengelola', 'kontak', 'tentang']
        const jadinya = []
        kontermenu.map(dt => {
            const hakni = {}
            if (dt === "beranda") {
                hakni.link = `/${kecimol.username}`
                hakni.nama = dt
                hakni.konter = null
            } else {
                hakni.link = `/${kecimol.username}?get=${dt}`
                hakni.nama = dt
                hakni.konter = dt
            }
            jadinya.push(hakni)
        })
        setDatakonter(jadinya)
    }, [kecimol.username])
    return (
        <div className="bg-white rounded-sm px-5 py-7  m-5">
            <Splide aria-label="Konter Page" options={{
                autoWidth: true,
                gap: 20,
                pagination: false,
                arrows: false
            }}>
                {
                    datakonter && datakonter.length ?
                        datakonter.map((dt, idx) => (
                            <SplideSlide key={idx}>
                                <Link className='block relative' href={dt.link}>
                                    <div className={`uppercase font-semibold text-xs hover:text-blue-600 ${mbetaokn === dt.konter ? 'text-blue-600' : ''}`}>
                                        {dt.nama}
                                    </div>
                                </Link>
                            </SplideSlide>
                        ))
                        : null
                }
            </Splide>
        </div>
    )
}
