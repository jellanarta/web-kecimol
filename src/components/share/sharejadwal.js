"use client"
import Image from 'next/image'
import Modalnotifikasi from '../modalnotifikasi'
import { useEffect, useState } from 'react'
import { FacebookMessengerShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import moment from 'moment'
import 'moment/locale/id'
moment.locale('id')
export default function Sharejadwal({ border = true, tipejadwal, dari, pada, jadwal, tanggal = false }) {
    const [openmodalshare, setOpenmodalshare] = useState(false)
    const membukashare = () => {
        openmodalshare ? setOpenmodalshare(false) : setOpenmodalshare(true)
    }
    const [semuadata, setSemuadata] = useState({
        judul: null,
        jadwal: null,
        link: null,
        deskripsi: null
    })
    useEffect(() => {
        if (jadwal && jadwal.length) {
            const kontertanpawaktu = ['nyongkolan', 'nyambut', 'bejogetan']
            const simpanjadwal = []
            jadwal.map((dt, idx) => {
                const simpan = []
                simpan.push(`${idx + 1}. ${dt.kecimol ? dt.kecimol.nama : 'kecimol telah di hapus'}`.toUpperCase())
                simpan.push(`👉 lokasi ${dt.kategoriacara?.nama === "acara lainnya" ? dt.jadwallainnya : dt.kategoriacara?.nama}${!kontertanpawaktu.includes(dt.kategoriacara?.nama) ? `, waktu ${dt.waktujadwal}` : ''}`.toUpperCase())
                simpan.push(`${dt.lokasi_main?.kabupaten?.nama}, kecamatan ${dt.lokasi_main?.kecamatan?.nama}, desa ${dt.lokasi_main?.desa?.nama}${dt.lokasi_main?.dusun?.length ? `, dusun ${dt.lokasi_main?.dusun}` : ''}`.toUpperCase())
                if (dt.kategoriacara?.nama === "nyongkolan") {
                    if (dt.tbg) {
                        simpan.push(`👉 TBG ( Taok Bengan )`.toUpperCase())
                    } else {
                        simpan.push(`👉 nyongkolan ke`.toUpperCase())
                        simpan.push(`${dt.tujuan_main?.kabupaten?.nama}, kecamatan ${dt.tujuan_main?.kecamatan?.nama}, desa ${dt.tujuan_main?.desa?.nama}${dt.tujuan_main?.dusun?.length ? `, dusun ${dt.tujuan_main?.dusun}` : ''}`.toUpperCase())
                    }
                }
                if (tanggal) {
                    simpan.push(`📆 tanggal ${moment(dt.tanggal).format("dddd, D MMMM YYYY")}`.toUpperCase())
                }
                simpanjadwal.push(simpan.join(`\n`))
            })
            const deskripsimu = `${`jadwal ${tipejadwal} dari ${dari} pada ${pada}\n\n`.toUpperCase()}${simpanjadwal.join('\n\n')}\n\n\n${`dapatkan jadwal kecimol lainnya di`.toUpperCase()} ${process.env.NEXT_PUBLIC_CLIENT}\n\n\n${`link jadwal saat ini`.toUpperCase()}\n`
            const dataoke = {
                jadwal: simpanjadwal.join('\n\n'),
                link: window.location.href,
                deskripsi: deskripsimu,
                judul: `jadwal ${tipejadwal} dari ${dari} pada ${pada}`.toUpperCase()
            }
            setSemuadata(dataoke)
        }
    }, [jadwal, dari, pada, tanggal, tipejadwal])

    async function SalinJadwal() {
        try {
            await navigator.clipboard.writeText(`${semuadata.deskripsi}${semuadata.link}`)
        } catch (error) {
            console.log('gagal copyt jadwal');
        }
    }
    return (
        <div className={`${border ? 'border-t border-dotted border-gray-200 mt-5 pt-5' : ''}`}>
            <div className="grid grid-cols-2 max-w-[450px] gap-5">
                <div className="bg-green-600 hover:bg-green-700 cursor-pointer rounded-sm w-full flex items-center justify-center p-3 gap-3" onClick={() => window.print()}>
                    <div className="w-4 h-4">
                        <Image
                            src={'/icons/printjadwal.svg'}
                            width={100}
                            height={100}
                            alt='print jadwal'
                        />
                    </div>
                    <div className="uppercase text-xs  text-gray-50">
                        cetak
                    </div>
                </div>
                <div className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-sm w-full flex items-center justify-center p-3 gap-3" onClick={membukashare}>
                    <div className="w-5 h-5">
                        <Image
                            src={'/icons/sharejadwal.svg'}
                            width={100}
                            height={100}
                            alt='print jadwal'
                        />
                    </div>
                    <div className="uppercase text-xs  text-gray-50">
                        bagikan
                    </div>
                </div>
            </div>

            {/* saat modal share di buka */}
            {
                openmodalshare ?
                    <Modalnotifikasi>
                        <div className="relative">
                            <div className="absolute -top-11 ring-1 ring-gray-200 rounded-full w-8 h-8 -right-9 bg-white flex justify-center items-center cursor-pointer hover:ring-red-600 hover:text-red-600" onClick={membukashare}>
                                <div className="w-4 h-4">
                                    <Image
                                        src={'/icons/close.svg'}
                                        width={100}
                                        height={100}
                                        alt='ikon'
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <div className="text-sm uppercase font-semibold border-b border-dotted border-gray-200 pb-5">
                                    bagikan jadwal <span className="text-orange-600">{tipejadwal}</span> dari <span className="text-blue-600">{dari}</span> pada {pada}
                                </div>
                                <div className="flex justify-center items-center flex-wrap gap-4">
                                    <FacebookShareButton url={semuadata.link} quote={semuadata.deskripsi} >
                                        <Sosialshare datalengkap={semuadata} />
                                    </FacebookShareButton>
                                    <FacebookMessengerShareButton url={semuadata.link} >
                                        <Sosialshare ikon='messenger' />
                                    </FacebookMessengerShareButton>
                                    <WhatsappShareButton url={semuadata.link} title={semuadata.deskripsi}>
                                        <Sosialshare bg='bg-green-100 hover:bg-green-200' ikon='whatsapp' />
                                    </WhatsappShareButton>
                                    <TelegramShareButton url={semuadata.link} title={semuadata.deskripsi}>
                                        <Sosialshare bg='bg-blue-200 hover:bg-blue-300' ikon='telegram' />
                                    </TelegramShareButton>
                                    <TwitterShareButton url={semuadata.link} title={semuadata.deskripsi}>
                                        <Sosialshare ikon='twitter' />
                                    </TwitterShareButton>
                                    <Sosialshare datalengkap={semuadata} bg='bg-gray-100 hover:bg-gray-300' ikon='copylink' />
                                </div>
                                <div className="text-sm uppercase  border-t border-dotted border-gray-200 pt-5">
                                    <div className="bg-blue-600 hover:bg-blue-700 cursor-pointer p-[14px] rounded-sm flex justify-center gap-3 items-center text-gray-50" onClick={SalinJadwal}>
                                        <div className="w-4 h-4">
                                            <Image
                                                src={'/share/copyjadwal.svg'}
                                                width={100}
                                                height={100}
                                                alt='ikon'
                                            />
                                        </div>
                                        <div>
                                            salin jadwal
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs">
                                    Bagikan jadwal <span className="text-orange-600">{tipejadwal}</span> dari <span className="text-blue-600">{dari}</span> pada {pada} ke sosial media favorit anda
                                </div>
                            </div>
                        </div>
                    </Modalnotifikasi>
                    : null
            }
        </div>
    )
}

function Sosialshare({ ikon = 'facebook', bg = 'bg-blue-100 hover:bg-blue-200', datalengkap }) {
    const klikkopi = async () => {
        try {
            if (ikon === "copylink") {
                await navigator.clipboard.writeText(datalengkap.link)
            }
        } catch (error) {
            console.log('gagal copy link');
        }
    }
    return (
        <>

            <div className={`rounded-full ${bg} flex justify-center items-center min-w-[50px] min-h-[50px] w-[50px] h-[50px] cursor-pointer`} onClick={klikkopi}>
                <div className="w-6 h-6">
                    <Image
                        src={`/share/${ikon}.svg`}
                        width={100}
                        height={100}
                        alt='ikon'
                    />
                </div>
            </div>
        </>
    )
}