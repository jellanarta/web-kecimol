"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { cekjamrequestjadwal } from "../../../../../lib/fnc"
import moment from "moment"
import 'moment/locale/id'
import Select from "@/components/input/select"
import { ScaleLoader } from "react-spinners"
import Jadwal from "@/components/card/jadwal"
import Sharejadwal from "@/components/share/sharejadwal"
moment.locale('id')

function setNilaiDefault(data) {
    if (data.type === "tanggal") {
        const kembalikan = { tanggal: new Date(cekjamrequestjadwal()), nama: moment(cekjamrequestjadwal()).format("dddd, D MMMM YYYY") }
        if (data.data) {
            const testdulu = /^\d+$/
            if (testdulu.test(data.data)) {
                kembalikan.tanggal = new Date(Number.parseInt(data.data))
                kembalikan.nama = moment(Number.parseInt(data.data)).format("dddd, D MMMM YYYY")
            }
        }
        return kembalikan
    } else if (data.type === "dari") {
        const kembalikan = { nama: 'semua kecimol' }
        if (data.data) {
            if (data.pilihan.length) {
                const ubahabeh = data.data.split("-").join(" ")
                const semuapilihan = data.pilihan.map(dt => dt.nama)
                if (semuapilihan.includes(ubahabeh)) {
                    kembalikan.nama = ubahabeh
                }
            }
        }
        return kembalikan
    }
}
export default function Setfilterjadwal({ datajadwal }) {
    const anhparam = useParams()
    const namanya = anhparam?.kategorijadwal ? anhparam.kategorijadwal.split("-").join(" ") : null
    const router = useRouter()
    // cariapakah ada filter sebelumnya
    const carifilter = useSearchParams()
    const dari = carifilter.get('dari')
    const tanggaljd = carifilter.get('tanggal')
    const taoknnani = `/jadwal/${anhparam.kategorijadwal}`

    // pesan error untuk select nya
    const [pesanError] = useState({
        tanggal: { error: false, message: 'tanggal jadwal' },
        anggota_ak_ntb: { error: false, message: 'jadwal dari ak ntb atau sebaliknya' }
    })
    const [pilihananggota] = useState([
        { nama: 'semua kecimol' },
        { nama: 'ak ntb' },
        { nama: 'selain ak ntb' },
    ])
    setNilaiDefault({ type: 'dari', data: dari, pilihan: pilihananggota })
    const [valuenya, setValuenya] = useState({
        tanggal: setNilaiDefault({ type: 'tanggal', data: tanggaljd }),
        anggota_ak_ntb: setNilaiDefault({ type: 'dari', data: dari, pilihan: pilihananggota })
    })

    // function set router
    function setdonglink(data) {
        if (data.type === "tanggal") {
            let linksemula = `${taoknnani}?${dari ? `dari=${dari}` : ''}`
            if (data.data !== cekjamrequestjadwal()) {
                linksemula = `${linksemula}&tanggal=${data.data}`
            }
            router.push(linksemula)
        } else if (data.type === "dari") {
            const semuanama = pilihananggota.map(dt => dt.nama)
            if (semuanama.includes(data.data)) {
                let linkdari = `${taoknnani}?${tanggaljd ? `tanggal=${tanggaljd}` : ''}`
                if (data.data !== "semua kecimol") {
                    linkdari = `${linkdari}&dari=${data.data.split(" ").join("-")}`
                }
                router.push(linkdari)
            }
        }
    }

    // change tanggal
    const changetanggal = e => {
        setValuenya({ ...valuenya, tanggal: { tanggal: e.tanggal, nama: moment(e.tanggal).format("dddd, D MMMM YYYY") } })
        setdonglink({ type: 'tanggal', data: new Date(e.tanggal).getTime() })
    }
    // change anggota
    const changeanggota = e => {
        setValuenya({ ...valuenya, anggota_ak_ntb: { nama: e.nama } })
        setdonglink({ type: 'dari', data: e.nama })
    }
    return (
        <>
            <div className="bg-white rounded-sm px-5 py-7  m-5">
                <div className="text-sm uppercase font-semibold mb-5 border-b border-gray-200 border-dotted pb-5">
                    filter jadwal <span className="text-orange-600">{namanya === "nyongkolan" || namanya === "nyambut" ? 'nyongkolan & nyambut' : namanya}</span> untuk di tampilkan
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* tampilkan pilihan tanggal */}
                    <Select path={'tanggal'} value={valuenya} ikon="date" tampilkantanggal={true} pesanError={pesanError} onChangeValue={changetanggal} />
                    <Select path={'anggota_ak_ntb'} value={valuenya} ikon="user" pilihan={pilihananggota} pesanError={pesanError} onChangeValue={changeanggota} />
                    {/* tampilkan pilihan tanggal */}
                </div>
            </div>

            {/* menjelaskan yang di cari */}
            <div className="bg-white rounded-sm px-5 py-7  m-5">
                <div className="uppercase font-semibold text-sm">
                    jadwal <span className="text-orange-600">{namanya === "nyongkolan" || namanya === "nyambut" ? 'nyongkolan & nyambut' : namanya}</span> dari <span className="text-blue-600">{setNilaiDefault({ type: 'dari', data: dari, pilihan: pilihananggota }).nama}</span> pada tanggal {setNilaiDefault({ type: 'tanggal', data: tanggaljd }).nama}
                </div>
                {
                    !datajadwal?.loading && datajadwal.data.length ?
                        <Sharejadwal tipejadwal={namanya === "nyongkolan" || namanya === "nyambut" ? 'nyongkolan & nyambut' : namanya} dari={setNilaiDefault({ type: 'dari', data: dari, pilihan: pilihananggota }).nama} pada={`📆 tanggal ${setNilaiDefault({ type: 'tanggal', data: tanggaljd }).nama}`} jadwal={datajadwal.data} />
                        : null
                }
            </div>

            {/* tampilkan jadwal */}
            {
                datajadwal && datajadwal.loading ?
                    <div className="flex justify-center">
                        <ScaleLoader color="blue" />
                    </div>
                    :
                    datajadwal.data.length ?
                        <>
                            <div className="m-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    datajadwal.data.map((dt, idx) => (
                                        <Jadwal jadwal={dt} nomor={idx + 1} key={idx} />
                                    ))
                                }
                            </div>
                        </>
                        :
                        <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden m-5">
                            Belum ada jadwal <span className="text-orange-600">{namanya === "nyongkolan" || namanya === "nyambut" ? 'nyongkolan & nyambut' : namanya}</span> yang bisa di tampilkan dari <span className="text-blue-600">{setNilaiDefault({ type: 'dari', data: dari, pilihan: pilihananggota }).nama}</span> pada tanggal {setNilaiDefault({ type: 'tanggal', data: tanggaljd }).nama}
                        </div>
            }
        </>
    )
}
