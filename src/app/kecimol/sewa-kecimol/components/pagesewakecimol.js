"use client"
import Select from "@/components/input/select";
import Parentinput from "@/components/parentinput";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/id'
import Button from "@/components/input/button";
import { userMauSewaKecimol } from "../../../../../lib/public-request/sewa-kecimol/fnc";
import Daftarkecimol from "./daftarkecimol";
import { addStatistikPerHalaman } from "../../../../../lib/public-request/statistik/fnc";
moment.locale('id')
export default function Pagesewakecimol() {
    const statekategoriacara = useSelector(state => state.stateKategoriacara)
    const [pilihankategori, setpilihankategori] = useState([])
    useEffect(() => {
        setpilihankategori(statekategoriacara.kategoriacara)
    }, [statekategoriacara])
    const [vlue, setvlue] = useState({
        tanggal: null,
        kategoriacara: null,
    })
    const [msg] = useState({
        tanggal: 'tanggal acara',
        kategoriacara: 'tipe acara'
    })
    const [pesanError, setPesanError] = useState({
        tanggal: { error: false, message: msg.tanggal },
        kategoriacara: { error: false, message: msg.kategoriacara },
    })
    const changedia = e => {
        const { path } = e
        if (path === "kategoriacara") {
            setvlue({ ...vlue, [path]: e })
        } else if (path === "tanggal") {
            const jadioke = { tanggal: e.tanggal, nama: moment(e.tanggal).format('dddd, D MMMM YYYY') }
            setvlue({ ...vlue, [path]: jadioke })
        }
        if (pesanError[path].error) {
            setPesanError({ ...pesanError, [path]: { error: false, message: msg[path] } })
        }
    }
    // proses mencari kecimol
    const [loadingcari, setLoadingcari] = useState(false)
    const [hasilcarinya, setHasilcarinya] = useState({ loading: true, data: [], query: null })
    const carikecimoldong = async e => {
        e.preventDefault()
        setLoadingcari(true)
        setHasilcarinya({ ...hasilcarinya, loading: true })
        const jarini = { loading: false, data: [], query: null }
        const hasildata = await userMauSewaKecimol(vlue)
        if (hasildata.status === 200) {
            jarini.data = hasildata.data.datakecimol
            jarini.query = hasildata.data.query
        } else if (hasildata.status === 400) {
            setPesanError({ ...pesanError, [hasildata.data.path]: { error: true, message: hasildata.data.message } })
        }
        setHasilcarinya({ ...hasilcarinya, ...jarini })
        setLoadingcari(false)
    }
    // menambahkan statistik perhalaman
    const timeoutRef = useRef(null)
    useEffect(() => {
        timeoutRef.current = setTimeout(async () => {
            await addStatistikPerHalaman({ tanggal: new Date().setHours(0, 0, 0, 0), type: 'sewa kecimol' })
        }, 10000)
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    cari kecimol yang jadwalnya kosong untuk di gunakan pada acara anda
                </div>
            </div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <form onSubmit={carikecimoldong}>
                    <div className="grid grid-cols-1 gap-8 w-full max-w-[600px]">
                        <Parentinput judul="tanggal acara" deskripsi="pilih tanggal acara">
                            <Select ikon="date" path={'tanggal'} value={vlue} pesanError={pesanError} tampilkantanggal={true} onChangeValue={changedia} />
                        </Parentinput>
                        <Parentinput judul="tipe acara" deskripsi="pilih tipe acara">
                            <Select ikon="typeacara" path={'kategoriacara'} value={vlue} pilihan={pilihankategori} onChangeValue={changedia} pesanError={pesanError} />
                        </Parentinput>
                        <Button loading={loadingcari} teks={'cari kecimol'} bg={'bg-blue-600 hover:bg-blue-700'} />
                    </div>
                </form>
            </div>
            {
                !hasilcarinya.loading && hasilcarinya.query ?
                    <Daftarkecimol datalengkap={hasilcarinya} />
                    : null
            }
        </div>
    )
}
