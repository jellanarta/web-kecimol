"use client"

import { desa, kabupaten, kecamatan } from "daftar-wilayah-indonesia"
import { useEffect, useState } from "react"
import Formcreatejadwal from "./formcreatejadwal"
import { useSearchParams } from "next/navigation"
import { ScaleLoader } from "react-spinners"
import { userCariJadwalUntukDiEdit } from "../../../../../lib/jadwal/fnc"
import moment from "moment"
import 'moment/locale/id'
moment.locale('id')
export default function Pagenewjadwal({ semuakecimol }) {
    const [vljdwl, setVljdwl] = useState({
        tanggal: null,
        tbg: false,
        waktujadwal: null,
        jadwallainnya: '',
        lokasi_main: {
            kabupaten: null,
            kecamatan: null,
            desa: null,
            dusun: ''
        },
        tujuan_main: {
            kabupaten: null,
            kecamatan: null,
            desa: null,
            dusun: ''
        },
        kecimol: semuakecimol?.length === 1 ? { nama: semuakecimol[0].nama, kecimol: semuakecimol[0] } : null,
        kategoriacara: null
    })
    const [tjlk] = useState({
        kabupaten: kabupaten('52'),
        kecamatan: [],
        desa: []
    })
    const [pilihan, setPilihan] = useState({
        kecimol: semuakecimol?.length ? semuakecimol.map(dt => {
            return { nama: dt.nama, kecimol: dt }
        }) : [],
        lokasi_main: tjlk,
        tujuan_main: tjlk,
        waktujadwal: [{ nama: 'malam hari' }, { nama: 'siang hari' }]
    })
    const [idjadwaledit, setIdjadwaledit] = useState(null)
    const [jadwalsemulanoedit, setJadwalsemulanoedit] = useState(null)
    const [bukapage, setBukapage] = useState({
        loading: true,
        open: false
    })
    const change = useSearchParams()
    const idjadwal = change.get('change')
    const tanggaljadwal = change.get('tanggal')
    useEffect(() => {
        const anhanh = async () => {
            if (bukapage.loading) {
                const jariserot = { loading: false, open: true }
                if (idjadwal && tanggaljadwal) {
                    const hasil = await userCariJadwalUntukDiEdit(idjadwal, tanggaljadwal)
                    if (hasil.status === 200) {
                        setIdjadwaledit(hasil.data.id)
                        const jadinya = {}
                        for (const key in vljdwl) {
                            if (key === "tanggal") {
                                hasil.data.tanggal = { tanggal: new Date(hasil.data.tanggal), nama: moment(hasil.data.tanggal).format("dddd, D MMMM YYYY") }
                            } else if (key === "kecimol") {
                                hasil.data.kecimol = { nama: hasil.data.kecimol.nama, kecimol: hasil.data.kecimol }
                            } else if (key === "waktujadwal" && hasil.data.waktujadwal?.length && hasil.data.kategoriacara) {
                                hasil.data.waktujadwal = { nama: hasil.data.waktujadwal }
                            }
                            jadinya[key] = hasil.data[key]
                        }
                        const pilihanlokasimain = pilihan.lokasi_main
                        pilihanlokasimain.kecamatan = kecamatan(jadinya.lokasi_main.kabupaten.kode)
                        pilihanlokasimain.desa = desa(jadinya.lokasi_main.kecamatan.kode)
                        const pilihantujuanmain = pilihan.tujuan_main
                        if (jadinya.kategoriacara.nama === "nyongkolan" && !jadinya.tbg) {
                            pilihantujuanmain.kecamatan = kecamatan(jadinya.tujuan_main.kabupaten.kode)
                            pilihantujuanmain.desa = desa(jadinya.tujuan_main.kecamatan.kode)
                        }
                        const selapukn = { ...pilihan }
                        selapukn.lokasi_main = pilihanlokasimain
                        selapukn.tujuan_main = pilihantujuanmain
                        setPilihan(selapukn)
                        setVljdwl(jadinya)
                        setJadwalsemulanoedit(jadinya)
                        setBukapage(jariserot)
                    } else {
                        setBukapage(jariserot)
                    }
                } else {
                    setBukapage(jariserot)
                }
            }
        }
        anhanh()
    }, [idjadwal, pilihan, tanggaljadwal, vljdwl, bukapage])
    return (
        <div>
            <div className="text-sm font-semibold uppercase">
                {
                    idjadwaledit ?
                        <>
                            yuk perbarui jadwal sebelumnya yang sudah di publikasikan
                        </>
                        :
                        <>
                            Kirim jadwal baru kecimol anda untuk di tampilkan ke publik
                        </>
                }
            </div>
            <div className="mt-7">
                {
                    !bukapage.loading && bukapage.open ?
                        <Formcreatejadwal valuejadwal={vljdwl} pilihan={pilihan} idjadwaledit={idjadwaledit} jadwalsemulanoedit={jadwalsemulanoedit} />
                        :
                        <div className="flex justify-center">
                            <ScaleLoader color="blue" />
                        </div>
                }
            </div>
        </div>
    )
}
