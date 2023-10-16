"use client"

import { useState } from "react"
import Modalnotifikasi from "../modalnotifikasi"
import Image from "next/image"
import { FacebookMessengerShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"
import { KapitalTeks } from "../../../lib/public/fnc"

export default function Sharekecimol({ kecimol, kembalinutup }) {
    const [linkprofil] = useState(`${process.env.NEXT_PUBLIC_CLIENT}/${kecimol.username}`)
    const [deskripsi] = useState(KapitalTeks(`dapatkan informasi lengkap tentang kecimol ${kecimol.nama} hanya di ${process.env.NEXT_PUBLIC_CLIENT}`))
    return (
        <>
            <Modalnotifikasi>
                <div className="relative">
                    {/* close modal */}
                    <div className="absolute -top-11 ring-1 ring-gray-200 rounded-full w-8 h-8 -right-9 bg-white flex justify-center items-center cursor-pointer hover:ring-red-600 hover:text-red-600" onClick={kembalinutup}>
                        <div className="w-4 h-4">
                            <Image
                                src={'/icons/close.svg'}
                                width={100}
                                height={100}
                                alt='ikon'
                            />
                        </div>
                    </div>
                    {/* close modal */}
                    <div className="grid grid-cols-1 gap-5">
                        <div className="text-sm uppercase font-semibold border-b border-dotted border-gray-200 pb-5">
                            bagikan profil kecimol <span className="text-blue-600">{kecimol.nama}</span>
                        </div>
                        <div className="w-full h-[200px] relative bg-gray-200">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_SERVER}/profil-kecimol/${kecimol.poto_profil}`}
                                sizes="100%"
                                alt={kecimol.nama}
                                fill
                                style={{
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-wrap gap-4">
                            <FacebookShareButton url={linkprofil} quote={deskripsi} >
                                <Sosialshare />
                            </FacebookShareButton>
                            <FacebookMessengerShareButton url={linkprofil} >
                                <Sosialshare ikon='messenger' />
                            </FacebookMessengerShareButton>
                            <WhatsappShareButton url={linkprofil} title={deskripsi}>
                                <Sosialshare bg='bg-green-100 hover:bg-green-200' ikon='whatsapp' />
                            </WhatsappShareButton>
                            <TelegramShareButton url={linkprofil} title={deskripsi}>
                                <Sosialshare bg='bg-blue-200 hover:bg-blue-300' ikon='telegram' />
                            </TelegramShareButton>
                            <TwitterShareButton url={linkprofil} title={deskripsi}>
                                <Sosialshare ikon='twitter' />
                            </TwitterShareButton>
                            <Sosialshare datalengkap={{ link: linkprofil }} bg='bg-gray-100 hover:bg-gray-300' ikon='copylink' />
                        </div>
                        <div className="text-xs">
                            Bagikan profil kecimol <span className="text-blue-600">{kecimol.nama}</span> ke sosial media favorit anda
                        </div>
                    </div>
                </div>
            </Modalnotifikasi>
        </>
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
            <div className={`rounded-full ${bg} flex justify-center items-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] cursor-pointer`} onClick={klikkopi}>
                <div className="w-5 h-5">
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