"use client"
import { useEffect, useRef } from "react";
import Bannerberanda from "./bannerberanda";
import Footer from "./footer";
import Jadwaldiikuti from "./jadwaldiikuti";
import Layanan from "./layanan";
import Semuakecimol from "./semuakecimol";
import Totaluserkecimoljadwal from "./totaluserkecimoljadwal";
import { addStatistikPerHalaman } from "../../../../lib/public-request/statistik/fnc";

export default function Pageberanda({ databeranda }) {
    // menambahkan statistik perhalaman
    const timeoutRef = useRef(null)
    useEffect(() => {
        timeoutRef.current = setTimeout(async () => {
            await addStatistikPerHalaman({ tanggal: new Date().setHours(0, 0, 0, 0), type: 'beranda' })
        }, 10000)
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    return (
        <div className="grid grid-cols-1 gap-12 md:gap-14">
            <Bannerberanda />
            <div className="grid grid-cols-1 gap-12 md:gap-14 px-5">
                <Semuakecimol databeranda={databeranda} />
                <Jadwaldiikuti databeranda={databeranda} />
                <Layanan />
                <Totaluserkecimoljadwal datadashboard={databeranda} />
            </div>
            <Footer />
        </div>
    )
}
