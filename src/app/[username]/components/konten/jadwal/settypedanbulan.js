"use client"

import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { limaBulanJadwal } from "../../../../../../lib/fnc";
import moment from "moment";
import 'moment/locale/id'
import { KapitalTeks } from "../../../../../../lib/public/fnc";
moment.locale('id')

export default function Settypedanbulan({ data }) {
    const statekategoriacara = useSelector(state => state.stateKategoriacara)
    const anehjadwal = useSearchParams()
    // nanti kita lihat kalau sudah membuat konter bulan maka kita bisa tambahkan di bawah sambil mengecek apakah bulan ada dalam konter atau tidak
    const getjadwal = anehjadwal.get('get')
    const getbulan = anehjadwal.get('bulan')
    const gettype = anehjadwal.get('type')
    // jadi pilihan tipe jadwal yang akan di pilih
    // pilihan tipe jadwal
    const [tipejadwal, settipejadwal] = useState({
        tipejadwalnya: [],
    })
    // pilihan bulan jadwa;
    const [tipebulantahun, setTipebulantahun] = useState({
        bulantahun: []
    })
    useEffect(() => {
        const semula = { link: `/${data.username}?get=${getjadwal}` }
        // di sini kita membuat pengecekan untuk bulan
        if (getbulan) {
            const cekju = limaBulanJadwal()
            const cekni = cekju.includes(KapitalTeks(getbulan.split("-").join(" ")))
            if (cekni) {
                semula.link = `${semula.link}&bulan=${getbulan}`
            }
        }
        if (statekategoriacara.status === "success") {
            const konterhasil = [{ link: `${semula.link}`, konter: null, nama: 'semua jadwal', id: null }]
            if (statekategoriacara.kategoriacara.length) {
                statekategoriacara.kategoriacara.map(dt => {
                    const namanya = dt.nama
                    konterhasil.push({ link: `${semula.link}&type=${namanya.split(" ").join("-")}`, konter: namanya.split(" ").join('-'), nama: dt.nama })
                })
            }
            settipejadwal({ tipejadwalnya: konterhasil })
        }
    }, [statekategoriacara, getbulan, data.username, getjadwal])

    useEffect(() => {
        const konternya = []
        if (statekategoriacara.status === "success") {
            if (statekategoriacara.kategoriacara.length) {
                statekategoriacara.kategoriacara.map(dt => {
                    konternya.push(dt.nama)
                })
            }
        }
        const linkasli = { link: `/${data.username}?get=${getjadwal}` }
        if (gettype) {
            const pch = gettype.split("-").join(" ")
            if (konternya.includes(pch)) {
                linkasli.link = `${linkasli.link}&type=${gettype}`
            }
        }
        const simpanpilihan = []
        const limaBulanJadwaldong = limaBulanJadwal()
        limaBulanJadwaldong.map(dt => {
            const jarilinkdankonter = dt.toLowerCase().split(" ").join("-")
            simpanpilihan.push({ link: `${linkasli.link}&bulan=${jarilinkdankonter}`, nama: dt, konter: dt.toLowerCase() === moment().format("MMMM YYYY").toLowerCase() ? null : jarilinkdankonter, konterdua: jarilinkdankonter })
        })
        setTipebulantahun({ bulantahun: simpanpilihan })
        // if(getbulan)
    }, [statekategoriacara, gettype, data.username, getjadwal])
    return (
        <div className="bg-white rounded-sm px-5 py-7 m-5 grid grid-cols-1 gap-5">
            <div className="text-xs  uppercase mb-3">
                filter bulan dan tipe jadwal kecimol <span className="text-blue-600">{data.nama}</span> untuk di tampilkan
            </div>
            <div className="border-b border-gray-200 border-dotted pb-4">
                <Splide aria-label="Kategori acara" options={{
                    autoWidth: true,
                    gap: 20,
                    pagination: false,
                    arrows: false
                }}>
                    {
                        tipejadwal.tipejadwalnya.length ?
                            tipejadwal.tipejadwalnya.map((dt, idx) => (
                                <SplideSlide key={idx}>
                                    <Link className=' relative' href={dt.link}>
                                        <div className={`uppercase font-semibold text-xs hover:text-blue-600 ${gettype === dt.konter ? 'text-blue-600' : ''}`}>
                                            {dt.nama}
                                        </div>
                                    </Link>
                                </SplideSlide>
                            ))
                            : null
                    }
                </Splide>
            </div>
            <div>
                <Splide aria-label="Kategori acara" options={{
                    autoWidth: true,
                    gap: 20,
                    pagination: false,
                    arrows: false
                }}>
                    {
                        tipebulantahun.bulantahun.length ?
                            tipebulantahun.bulantahun.map((dt, idx) => (
                                <SplideSlide key={idx}>
                                    <Link className=' relative' href={dt.link}>
                                        <div className={`uppercase font-semibold text-xs hover:text-blue-600 ${getbulan === dt.konter || getbulan === dt.konterdua ? 'text-blue-600' : ''}`}>
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
    )
}
