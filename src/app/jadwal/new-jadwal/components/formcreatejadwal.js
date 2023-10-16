"use client"

import Select from "@/components/input/select"
import Parentinput from "@/components/parentinput"
import { useState } from "react"
import moment from "moment"
import 'moment/locale/id'
import { useSelector } from "react-redux"
import Input from "@/components/input"
import { desa, kecamatan } from "daftar-wilayah-indonesia"
import Button from "@/components/input/button"
import { pemilikJadwalMauHapus, userCreateJadwal, userEditjadwal } from "../../../../../lib/jadwal/fnc"
import Checkbox from "@/components/input/checkbox"
import Link from "next/link"
import Modalnotifikasi from "@/components/modalnotifikasi"
import { useRouter, useSearchParams } from "next/navigation"
moment.locale('id')
export default function Formcreatejadwal({ valuejadwal, pilihan, idjadwaledit, jadwalsemulanoedit }) {
    const statekategoriacara = useSelector(state => state.stateKategoriacara)
    const backorno = useSearchParams()
    const refback = backorno.get('ref')
    const router = useRouter()
    const [vl, setvl] = useState(valuejadwal)
    const [plhn, setPlhn] = useState(pilihan)
    const [msg] = useState({
        tanggal: 'tanggal jadwal',
        kecimol: 'kecimol terkait',
        kategoriacara: 'tipe jadwal',
        jadwallainnya: 'nama jadwal',
        lokasi_main: {
            kabupaten: 'kabupaten',
            kecamatan: 'kecamatan',
            desa: 'desa',
            dusun: 'dusun',
        },
        waktujadwal: 'waktu jadwal'
    })
    const [pesanError, setPesanError] = useState({
        tanggal: { error: false, message: msg.tanggal },
        kecimol: { error: false, message: msg.kecimol },
        kategoriacara: { error: false, message: msg.kategoriacara },
        jadwallainnya: { error: false, message: msg.jadwallainnya },
        lokasi_main: {
            kabupaten: { error: false, message: msg.lokasi_main.kabupaten },
            kecamatan: { error: false, message: msg.lokasi_main.kecamatan },
            desa: { error: false, message: msg.lokasi_main.desa },
            dusun: { error: false, message: msg.lokasi_main.dusun },
        },
        tujuan_main: {
            kabupaten: { error: false, message: msg.lokasi_main.kabupaten },
            kecamatan: { error: false, message: msg.lokasi_main.kecamatan },
            desa: { error: false, message: msg.lokasi_main.desa },
            dusun: { error: false, message: msg.lokasi_main.dusun },
        },
        waktujadwal: { error: false, message: msg.waktujadwal },
    })
    // waktu jadwal yang sudah pasti
    const [waktujadwalpasti] = useState(['nyongkolan', 'nyambut', 'bejogetan'])

    // pilihan select
    // set error false
    function setTidakError(path) {
        if (pesanError[path].error) {
            setPesanError({ ...pesanError, [path]: { error: false, message: msg[path] } })
        }
    }
    // tanggal
    const changetanggal = e => {
        const jadioke = { tanggal: e.tanggal, nama: moment(e.tanggal).format('dddd, D MMMM YYYY') }
        setvl({ ...vl, tanggal: jadioke })
        setTidakError('tanggal')
    }
    // kecimol
    const changekecimol = e => {
        setvl({ ...vl, kecimol: e })
        setTidakError('kecimol')
    }
    // change tipe jadwal
    const changekategoriacara = e => {
        if (e.path === 'kategoriacara') {
            setvl({ ...vl, kategoriacara: e })
            setTidakError('kategoriacara')
        } else {
            setvl({ ...vl, [e.path]: e.value })
            setTidakError(e.path)
        }
    }
    // change waktu jadwal
    const changewaktujadwal = e => {
        setvl({ ...vl, [e.path]: e })
        setTidakError(e.path)
    }
    // change lokasi main
    function mempermudah(data, path) {
        const plsb = plhn[path]
        const vlsb = vl[path]
        if (data.path === "kabupaten") {
            // set value dulu
            vlsb.kabupaten = data
            vlsb.kecamatan = null
            vlsb.desa = null
            vlsb.dusun = ''
            // set pilihan
            plsb.kecamatan = kecamatan(data.kode)
            plsb.desa = []
            // set data
            setvl({ ...vl, [path]: vlsb })
            setPlhn({ ...plhn, [path]: plsb })
        } else if (data.path === 'kecamatan') {
            // set value dulu
            vlsb.kecamatan = data
            vlsb.desa = null
            vlsb.dusun = ''
            // set pilihan
            plsb.desa = desa(data.kode)
            // set data
            setvl({ ...vl, [path]: vlsb })
            setPlhn({ ...plhn, [path]: plsb })
        } else if (data.path === 'desa') {
            // set value dulu
            vlsb.desa = data
            vlsb.dusun = ''
            // set data
            setvl({ ...vl, [path]: vlsb })
        } else if (data.path === 'dusun') {
            vlsb.dusun = data.value
            setvl({ ...vl, [path]: vlsb })
        }
        const semuaerror = pesanError[path]
        if (semuaerror[data.path].error) {
            semuaerror[data.path] = { error: false, message: msg.lokasi_main[data.path] }
            setPesanError({ ...pesanError, [path]: semuaerror })
        }
    }
    const changelokasimain = e => {
        mempermudah(e, 'lokasi_main')
    }
    const changetujuanmain = e => {
        mempermudah(e, 'tujuan_main')
    }
    // change tbg
    const pilihantbg = e => {
        setvl({ ...vl, [e.path]: e.data.tbg })
    }
    // kirim jadwal
    // set pesan error
    function jadikanerrormudah(data) {
        setPesanError({ ...pesanError, [data.path]: { error: true, message: data.message } })
    }
    function jadierormudahalamat(data, path) {
        const persingkat = pesanError[path]
        persingkat[data.path] = { error: true, message: data.message }
        setPesanError({ ...pesanError, [path]: persingkat })
    }
    // sukses mengirim jadwal
    const [sukseskirimjadwal, setsukseskirimjadwal] = useState({
        opendrop: false,
        data: null
    })
    const [loadingkirimjadwal, setLoadingkirimjadwal] = useState(false)
    // anatara edit atau membuat
    async function antaraeditataumembuat() {
        if (!idjadwaledit) {
            return await userCreateJadwal(vl)
        } else {
            return await userEditjadwal(idjadwaledit, vl)
        }
    }
    const kirimjadwal = async e => {
        e.preventDefault()
        setLoadingkirimjadwal(true)
        const hasil = await antaraeditataumembuat()
        if (hasil.status === 200) {
            setsukseskirimjadwal({ ...sukseskirimjadwal, opendrop: true, data: hasil.data })
        } else if (hasil.status === 400) {
            const apakahiya = Object.keys(hasil.data)
            if (apakahiya.includes('lokasi_main') || apakahiya.includes('tujuan_main')) {
                if (apakahiya.includes('lokasi_main')) {
                    jadierormudahalamat(hasil.data, 'lokasi_main')
                } else {
                    jadierormudahalamat(hasil.data, 'tujuan_main')
                }
            } else {
                jadikanerrormudah(hasil.data)
            }
        }
        setLoadingkirimjadwal(false)
    }

    // hapus jadwal
    const [hapusini, setHapusini] = useState({
        opendrop: false,
        data: null
    })
    const hapusjadwalnya = () => {
        setHapusini({ ...hapusini, opendrop: true, data: jadwalsemulanoedit })
    }
    const [loadinglalohapus, setLoadinglalohapus] = useState(false)
    const [hususkondisihapus, setHususkondisihapus] = useState(false)
    const lanjutkanhapus = async e => {
        if (!loadinglalohapus) {
            if (e === "batalkan") {
                setHapusini({ ...hapusini, opendrop: false, data: null })
            } else {
                setLoadinglalohapus(true)
                const hasilhapus = await pemilikJadwalMauHapus(idjadwaledit)
                if (hasilhapus.status === 200) {
                    setHususkondisihapus(true)
                    setHapusini({ ...hapusini, opendrop: false, data: null })
                    setsukseskirimjadwal({ ...sukseskirimjadwal, opendrop: true, data: hasilhapus.data })
                } else {
                    setHapusini({ ...hapusini, opendrop: false, data: null })
                }
                setLoadinglalohapus(false)
            }
        }
    }
    return (
        <div>
            {
                hapusini.opendrop ?
                    <Modalnotifikasi>
                        <div className="text-center text-sm">
                            Apakah anda yakin ingin menghapus jadwal <span className="text-blue-600 text-xs uppercase">{hapusini.data.kategoriacara.nama}</span> dari kecimol <span className="font-semibold text-xs uppercase">{hapusini.data.kecimol.nama}</span>
                        </div>
                        <div className="mt-5 flex justify-center gap-4">
                            <div className="uppercase cursor-pointer text-xs text-red-600 hover:text-red-700 font-semibold" onClick={() => lanjutkanhapus('lanjutkan')}>
                                {loadinglalohapus ? '...' : 'lanjutkan'}
                            </div>
                            <div className="uppercase cursor-pointer text-xs font-semibold" onClick={() => lanjutkanhapus('batalkan')}>
                                batal
                            </div>
                        </div>
                    </Modalnotifikasi>
                    : null
            }
            {
                sukseskirimjadwal.opendrop ?
                    <Modalnotifikasi>
                        <div className="text-center text-sm">
                            Jadwal <span className="text-blue-600 text-xs uppercase">{sukseskirimjadwal.data.kategoriacara.nama}</span> untuk kecimol <span className="font-semibold text-xs uppercase">{sukseskirimjadwal.data.kecimol.nama}</span> pada tanggal <span className="text-blue-600">{moment(sukseskirimjadwal.data.tanggal).format("dddd, D MMMM YYYY")}</span> berhasil di {idjadwaledit ? hususkondisihapus ? 'hapus' : 'perbarui' : 'tambahkan'}
                        </div>
                        <div className="mt-5 text-center">
                            {
                                refback && refback === "back" ?
                                    <div className="uppercase cursor-pointer text-xs text-blue-600 hover:text-blue-700" onClick={() => router.back()}>
                                        Kembali
                                    </div>
                                    :
                                    <Link href={`/jadwal/${sukseskirimjadwal.data.kategoriacara.nama.split(" ").join("-")}?tanggal=${sukseskirimjadwal.data.tanggal}`} className="uppercase text-xs text-blue-600 hover:text-blue-700">
                                        lihat jadwal
                                    </Link>
                            }
                        </div>
                    </Modalnotifikasi>

                    : null
            }

            <form onSubmit={kirimjadwal} className="mb-6">
                <div className="grid grid-cols-1 gap-10 max-w-[600px]">
                    {/* pilih tanggal */}
                    <Parentinput judul="tanggal jadwal" deskripsi="masukan tanggal jadwal kecimol anda">
                        <Select path={'tanggal'} value={vl} ikon="date" pesanError={pesanError} tampilkantanggal={true} onChangeValue={changetanggal} />
                    </Parentinput>
                    {/* pilih tanggal */}
                    {/* pilih kecimol */}
                    <Parentinput judul="pilih kecimol" deskripsi="pilih kecimol yang ingin di tambahkan jadwal">
                        <Select path={'kecimol'} value={vl} ikon="kecimol" pesanError={pesanError} pilihan={plhn.kecimol} onChangeValue={changekecimol} />
                    </Parentinput>
                    {/* pilih kecimol */}
                    {/* type jadwal */}
                    <Parentinput judul="tipe jadwal" deskripsi="ingin menambahkan jadwal apa?">
                        <Select path={'kategoriacara'} value={vl} ikon="typeacara" pesanError={pesanError} pilihan={statekategoriacara.kategoriacara} onChangeValue={changekategoriacara} />
                        {
                            vl.kategoriacara && vl.kategoriacara.nama.toLowerCase() === "acara lainnya" ?
                                <>
                                    <Input value={vl} onChangeValue={changekategoriacara} ikon='typeacara' pesanError={pesanError} path={'jadwallainnya'} />
                                </>
                                : null
                        }
                        {
                            vl.kategoriacara && vl.kategoriacara.nama && !waktujadwalpasti.includes(vl.kategoriacara.nama.toLowerCase()) ?
                                <Select path={'waktujadwal'} value={vl} ikon="waktuacara" pesanError={pesanError} pilihan={plhn.waktujadwal} onChangeValue={changewaktujadwal} />
                                : null
                        }
                    </Parentinput>
                    {/* type jadwal */}
                    {/* lokasi manin */}
                    <Parentinput judul={`lokasi ${vl.kategoriacara ? vl.kategoriacara.nama : 'acara'}`} deskripsi={`pilih lokasi dimana kecimol anda mengisi acara ${vl.kategoriacara ? vl.kategoriacara.nama : ''}`}>
                        <Select path={'kabupaten'} value={vl.lokasi_main} ikon="location" pesanError={pesanError.lokasi_main} pilihan={plhn.lokasi_main.kabupaten} onChangeValue={changelokasimain} />
                        <Select path={'kecamatan'} value={vl.lokasi_main} ikon="location" pesanError={pesanError.lokasi_main} pilihan={plhn.lokasi_main.kecamatan} onChangeValue={changelokasimain} />
                        <Select path={'desa'} value={vl.lokasi_main} ikon="location" pesanError={pesanError.lokasi_main} pilihan={plhn.lokasi_main.desa} onChangeValue={changelokasimain} />
                        <Input value={vl.lokasi_main} onChangeValue={changelokasimain} ikon='location' pesanError={pesanError.lokasi_main} path={'dusun'} />
                    </Parentinput>
                    {/* lokasi manin */}
                    {/* tujuan main husus kecimol */}
                    {
                        vl.kategoriacara && vl.kategoriacara.nama.toLowerCase() === 'nyongkolan' ?
                            <Parentinput judul={`lokasi nyongkolan`} deskripsi={`pilih tujuan nyongkolan kecimol anda`}>
                                <Checkbox tbg={vl.tbg} kamumemilih={pilihantbg} />
                                {
                                    !vl.tbg ?
                                        <>
                                            <Select path={'kabupaten'} value={vl.tujuan_main} ikon="location" pesanError={pesanError.tujuan_main} pilihan={plhn.tujuan_main.kabupaten} onChangeValue={changetujuanmain} />
                                            <Select path={'kecamatan'} value={vl.tujuan_main} ikon="location" pesanError={pesanError.tujuan_main} pilihan={plhn.tujuan_main.kecamatan} onChangeValue={changetujuanmain} />
                                            <Select path={'desa'} value={vl.tujuan_main} ikon="location" pesanError={pesanError.tujuan_main} pilihan={plhn.tujuan_main.desa} onChangeValue={changetujuanmain} />
                                            <Input value={vl.tujuan_main} onChangeValue={changetujuanmain} ikon='location' pesanError={pesanError.tujuan_main} path={'dusun'} />
                                        </>
                                        : null
                                }
                            </Parentinput>
                            : null
                    }
                    {/* tujuan main husus kecimol */}
                    <Button teks={idjadwaledit ? 'perbarui jadwal' : `kirim jadwal`} loading={loadingkirimjadwal} bg={'bg-blue-600 hover:bg-blue-700'} />

                    {
                        idjadwaledit && jadwalsemulanoedit ?
                            <div className={`bg-red-600 hover:bg-red-700 h-[47px] text-gray-50 flex items-center justify-center rounded-sm w-full text-sm font-medium uppercase cursor-pointer`} onClick={hapusjadwalnya}>
                                hapus jadwal
                            </div>
                            : null
                    }

                </div>
            </form>
        </div>
    )
}
