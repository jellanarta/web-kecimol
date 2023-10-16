"use client"

import Kecimol from "@/components/card/kecimol"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Tampilkankecimol({ semuakecimol }) {
    const [linksaatini] = useState('/kecimol')
    const [pilihan] = useState([
        { nama: 'semua kecimol', konter: null, link: `${linksaatini}` },
        { nama: 'ak ntb', konter: 'ak-ntb', link: `${linksaatini}?data=ak-ntb` },
        { nama: 'selain ak ntb', konter: 'selain-ak-ntb', link: `${linksaatini}?data=selain-ak-ntb` },
    ])
    const [kecimoltampil, setKecimoltampil] = useState({
        loading: true,
        kecimol: []
    })
    useEffect(() => {
        setKecimoltampil({ loading: false, kecimol: semuakecimol })
    }, [semuakecimol])
    const gerohn = useSearchParams()
    const datanya = gerohn.get('data')
    useEffect(() => {
        if (semuakecimol && semuakecimol.length) {
            const simpan = { data: [] }
            if (!datanya) {
                simpan.data = semuakecimol
            } else {
                const konterdoang = pilihan.map(dt => dt.konter)
                if (konterdoang.includes(datanya)) {
                    if (datanya === "ak-ntb") {
                        const hasilkecimol = []
                        semuakecimol.map(dt => {
                            if (dt.anggota_ak_ntb?.nama === "ya") {
                                hasilkecimol.push(dt)
                            }
                        })
                        simpan.data = hasilkecimol
                    } else {
                        const hasilkecimol = []
                        semuakecimol.map(dt => {
                            if (dt.anggota_ak_ntb?.nama === "tidak") {
                                hasilkecimol.push(dt)
                            }
                        })
                        simpan.data = hasilkecimol
                    }
                } else {
                    simpan.data = semuakecimol
                }
            }
            setKecimoltampil({ loading: false, kecimol: simpan.data })
        }
    }, [datanya, pilihan, semuakecimol])
    function cekmana(data) {
        const selapukn = pilihan.map(dt => dt.konter)
        if (!data) {
            return 'dari daftar kecimol'
        } else {
            if (selapukn.includes(data)) {
                return data.split("-").join(" ")
            } else {
                return 'dari daftar kecimol'
            }
        }
    }
    return (
        <div>
            {
                !semuakecimol && !semuakecimol.length ?
                    <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5  md:py-8 text-center text-sm overflow-hidden m-5">
                        Belum ada kecimol yang terdaftar di <Link href={'/'} className="text-blue-600">kecimol.com</Link>. Yuk daftarkan kecimol anda di <Link href={'/daftarkan-kecimol'} className="text-blue-600">di sini</Link>
                    </div>
                    :
                    <div className="bg-white rounded-sm px-5 py-7 m-5 grid grid-cols-1 gap-5">
                        <div className="text-xs  uppercase">
                            filter kecimol untuk di tampilkan
                        </div>
                        <Splide aria-label="anggota kecimol" options={{
                            autoWidth: true,
                            gap: 20,
                            pagination: false,
                            arrows: false
                        }}>
                            {
                                pilihan.map((dt, idx) => (
                                    <SplideSlide key={idx}>
                                        <Link className=' relative' href={dt.link}>
                                            <div className={`uppercase font-semibold text-xs hover:text-blue-600 ${datanya === dt.konter ? 'text-blue-600' : ''}`}>
                                                {dt.nama}
                                            </div>
                                        </Link>
                                    </SplideSlide>
                                ))
                            }
                        </Splide>
                    </div>
            }
            {
                !kecimoltampil.loading ?
                    kecimoltampil.kecimol.length ?
                        <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {
                                kecimoltampil.kecimol.map((dt, idx) => (
                                    <Kecimol kecimol={dt} key={idx} nomor={idx + 1} userhapus={false} nonaktivkankecimol={true} />
                                ))
                            }
                        </div>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5  md:py-8 text-center text-sm overflow-hidden m-5">
                            Tidak ada kecimol yang bisa di tampilkan dari <span className="text-orange-600">{cekmana(datanya)}</span>
                        </div>
                    : null
            }
        </div>
    )
}
