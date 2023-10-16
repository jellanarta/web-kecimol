"use client"
import { useEffect, useRef, useState } from "react"
import Setfilterjadwal from "./setfilterjadwal"
import { useParams, useSearchParams } from "next/navigation"
import { jadwalWithKategori } from "../../../../../lib/jadwal/fnc"
import { addStatistikPerHalaman } from "../../../../../lib/public-request/statistik/fnc"
export default function Kategorijadwal({ jadwal }) {
    const paramsnya = useParams()
    const [semuajadwal] = useState(jadwal)
    const carifilter = useSearchParams()
    const tanggal = carifilter.get('tanggal')
    const dari = carifilter.get('dari')
    const [tampilkandong, setTampilkandong] = useState({
        loading: true,
        data: []
    })
    useEffect(() => {
        const lalo = async () => {
            setTampilkandong({ loading: true, data: [] })
            const jaritampil = []
            if (tanggal) {
                const testdulu = /^\d+$/
                if (testdulu.test(tanggal)) {
                    const datajadwal = await jadwalWithKategori(paramsnya.kategorijadwal, tanggal)
                    if (datajadwal.status === 200) {
                        if (datajadwal.data.length) {
                            datajadwal.data.map(dt => jaritampil.push(dt))
                        }
                    }
                } else {
                    semuajadwal.map(dt => jaritampil.push(dt))
                }
            } else {
                semuajadwal.map(dt => jaritampil.push(dt))
            }
            const haknitampilan = { data: [] }
            if (dari && jaritampil.length) {
                const konternya = ['ak-ntb', 'selain-ak-ntb']
                if (konternya.includes(dari)) {
                    if (dari === "ak-ntb") {
                        jaritampil.map(dt => {
                            if (dt.kecimol?.anggota_ak_ntb?.nama === "ya") {
                                haknitampilan.data.push(dt)
                            }
                        })
                    } else if (dari === "selain-ak-ntb") {
                        jaritampil.map(dt => {
                            if (dt.kecimol?.anggota_ak_ntb?.nama === "tidak") {
                                haknitampilan.data.push(dt)
                            }
                        })
                    }
                } else {
                    haknitampilan.data = jaritampil
                }
            } else {
                haknitampilan.data = jaritampil
            }
            if (haknitampilan.data.length) {
                haknitampilan.data.sort((a, b) => {
                    if (a.kecimol && b.kecimol) {
                        const namaA = a.kecimol.nama.toUpperCase()
                        const namaB = b.kecimol.nama.toUpperCase()
                        if (namaA < namaB) {
                            return -1
                        }
                        if (namaA > namaB) {
                            return 1
                        }
                        return 0
                    }
                })
            }
            const bagusuah = haknitampilan.data
            setTampilkandong({ loading: false, data: bagusuah })
        }
        lalo()
    }, [tanggal, dari, paramsnya.kategorijadwal, semuajadwal])

    // menambahkan statistik perhalaman
    const timeoutRef = useRef(null)
    useEffect(() => {
        timeoutRef.current = setTimeout(async () => {
            await addStatistikPerHalaman({ tanggal: new Date().setHours(0, 0, 0, 0), type: paramsnya.kategorijadwal.split("-").join(" ") })
        }, 10000)
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [paramsnya.kategorijadwal])
    return (
        <Setfilterjadwal datajadwal={tampilkandong} />
    )
}
