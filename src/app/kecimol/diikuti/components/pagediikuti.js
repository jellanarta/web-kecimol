"use client"

import Kecimol from "@/components/card/kecimol";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { userAmbilSemuaYangDiIkuti } from "../../../../../lib/public-request/mengikuti/fnc";
import { ScaleLoader } from "react-spinners";
import { addStatistikPerHalaman } from "../../../../../lib/public-request/statistik/fnc";

export default function Pagediikuti() {
    const [yangikuti, setyangikuti] = useState({
        loading: true, data: []
    })
    useEffect(() => {
        const aloh = async () => {
            const jarinah = { loading: false, data: [] }
            const ambildong = await userAmbilSemuaYangDiIkuti()
            if (ambildong.status == 200) {
                jarinah.data = ambildong.data
            }
            setyangikuti(jarinah)
        }
        aloh()
    }, [])

    // menambahkan statistik perhalaman
    const timeoutRef = useRef(null)
    useEffect(() => {
        timeoutRef.current = setTimeout(async () => {
            await addStatistikPerHalaman({ tanggal: new Date().setHours(0, 0, 0, 0), type: 'di ikuti' })
        }, 10000)
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    daftar semua kecimol yang di ikuti
                </div>
            </div>
            {
                !yangikuti.loading ?
                    yangikuti.data.length ?
                        <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {
                                yangikuti.data.map((dt, idx) => (
                                    <Kecimol kecimol={dt} key={idx} nomor={idx + 1} userhapus={false} adminhapus={false} />
                                ))
                            }
                        </div>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5  md:py-8 text-center text-sm overflow-hidden m-5">
                            Anda belum mengikuti kecimol manapun. Yuk lihat daftar <Link href={'/kecimol'} className="text-blue-600 hover:text-blue-700">semua kecimol</Link>
                        </div>
                    :
                    <div className="flex justify-center">
                        <ScaleLoader color="blue" />
                    </div>
            }
        </div>
    )
}
