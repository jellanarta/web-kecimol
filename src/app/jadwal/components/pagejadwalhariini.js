"use client"
import { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import { jadwalHariIni } from '../../../../lib/jadwal/fnc'
import { ScaleLoader } from 'react-spinners'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Jadwal from '@/components/card/jadwal'
import Sharejadwal from '@/components/share/sharejadwal'
import { addStatistikPerHalaman } from '../../../../lib/public-request/statistik/fnc'
moment.locale('id')
export default function Pagejadwalhariini() {
    const [semuajadwal, setSemuajadwal] = useState({
        loading: true, data: []
    })
    useEffect(() => {
        const gogo = async () => {
            if (semuajadwal.loading) {
                const carijadwal = await jadwalHariIni(new Date().setHours(0, 0, 0, 0))
                // const carijadwal = await jadwalHariIni(1697043600000)
                const smph = { loading: false, data: [] }
                if (carijadwal.status === 200) {
                    smph.data = carijadwal.data
                }
                setSemuajadwal(smph)
            }
        }
        gogo()
    }, [semuajadwal])
    const mencaricari = useSearchParams()
    const darimana = mencaricari.get('dari')
    const [pilihanfilter, setPilihanfilter] = useState([])
    useEffect(() => {
        const linksemula = `/jadwal`
        const simpanlink = [
            { link: linksemula, konter: null, nama: 'semua kecimol' },
            { link: `${linksemula}?dari=ak-ntb`, konter: 'ak-ntb', nama: 'ak ntb' },
            { link: `${linksemula}?dari=selain-ak-ntb`, konter: 'selain-ak-ntb', nama: 'selain ak ntb' },
        ]
        setPilihanfilter(simpanlink)
    }, [])
    const [jadwaltampil, setJadwaltampil] = useState({
        loading: true,
        data: []
    })
    useEffect(() => {
        if (!semuajadwal.loading) {
            const semuajadwalnyaoke = semuajadwal.data
            if (!darimana) {
                setJadwaltampil({ loading: false, data: semuajadwalnyaoke })
            } else {
                const simpankonter = pilihanfilter.map(dt => dt.konter)
                if (simpankonter.includes(darimana)) {
                    const simpanjarin = []
                    if (darimana === "ak-ntb") {
                        if (semuajadwal.data.length) {
                            semuajadwal.data.map(dt => {
                                if (dt.kecimol?.anggota_ak_ntb?.nama.toLowerCase() === 'ya') {
                                    simpanjarin.push(dt)
                                }
                            })
                        }
                    } else {
                        if (semuajadwal.data.length) {
                            semuajadwal.data.map(dt => {
                                if (dt.kecimol?.anggota_ak_ntb?.nama.toLowerCase() === 'tidak') {
                                    simpanjarin.push(dt)
                                }
                            })
                        }
                    }
                    setJadwaltampil({ loading: false, data: simpanjarin })
                } else {
                    setJadwaltampil({ loading: false, data: semuajadwalnyaoke })
                }
            }
        }
    }, [darimana, semuajadwal, pilihanfilter])
    function periksanamafilter() {
        const konter = pilihanfilter.map(dt => dt.konter)
        if (!darimana) {
            return null
        } else {
            if (konter.includes(darimana)) {
                return darimana.split("-").join(' ')
            } else {
                return null
            }
        }
    }

    // menambahkan statistik perhalaman
    const timeoutRef = useRef(null)
    useEffect(() => {
        timeoutRef.current = setTimeout(async () => {
            await addStatistikPerHalaman({ tanggal: new Date().setHours(0, 0, 0, 0), type: 'hari ini' })
        }, 10000)
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="uppercase font-semibold text-sm">
                    jadwal <span className="text-blue-600">{periksanamafilter() ? periksanamafilter() : 'semua kecimol'}</span> <span className="text-orange-600">hari ini</span> tanggal <span className="text-blue-600">{moment().format("dddd, D MMMM YYYY")}</span>
                </div>
                {
                    !jadwaltampil.loading && jadwaltampil.data.length ?
                        <Sharejadwal
                            tipejadwal={''}
                            dari={periksanamafilter() ? periksanamafilter() : 'semua kecimol'}
                            pada={`hari ini 📆 tanggal ${moment().format("dddd, D MMMM YYYY")}`}
                            jadwal={jadwaltampil.data} />
                        : null
                }
            </div>

            {/* husus jadwal */}
            {
                semuajadwal.loading ?
                    <div className="flex justify-center">
                        <ScaleLoader color='blue' />
                    </div>
                    :
                    !semuajadwal.data.length ?
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden m-5">
                            Jadwal semua kecimol pada tanggal <span className="text-orange-600">{moment().format("dddd, D MMMM YYYY")}</span> kosong
                        </div>
                        :
                        <div>
                            {/* filternya */}
                            <div className="bg-white rounded-sm px-5 py-7 m-5 grid grid-cols-1 gap-5">
                                <div className="text-xs  uppercase mb-3">
                                    filter jadwal dari anggota ak ntb atau sebaliknya
                                </div>
                                <div>
                                    <Splide aria-label="Kategori acara" options={{
                                        autoWidth: true,
                                        gap: 20,
                                        pagination: false,
                                        arrows: false
                                    }}>
                                        {
                                            pilihanfilter.length ?
                                                pilihanfilter.map((dt, idx) => (
                                                    <SplideSlide key={idx}>
                                                        <Link className=' relative' href={dt.link}>
                                                            <div className={`uppercase font-semibold text-xs hover:text-blue-600 ${darimana === dt.konter ? 'text-blue-600' : ''}`}>
                                                                {dt.nama}
                                                            </div>
                                                        </Link>
                                                    </SplideSlide>
                                                ))
                                                : null
                                        }
                                    </Splide>
                                </div>
                            </div>
                            {/* filternya */}
                            {/* tampilkan jadwalnya */}
                            {
                                !jadwaltampil.loading ?
                                    jadwaltampil.data.length ?
                                        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 m-5'>
                                            {
                                                jadwaltampil.data.map((dt, idx) => (
                                                    <Jadwal jadwal={dt} nomor={idx + 1} key={idx} />
                                                ))
                                            }
                                        </div>
                                        :
                                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden m-5">
                                            Tidak ada jadwal yang bisa di tampilkan dari {periksanamafilter() ? periksanamafilter() : ''} pada tanggal <span className="text-orange-600">{moment().format("dddd, D MMMM YYYY")}</span>
                                        </div>
                                    : null
                            }
                            {/* tampilkan jadwalnya */}
                        </div>
            }
            {/* husus jadwal */}
        </div>
    )
}
