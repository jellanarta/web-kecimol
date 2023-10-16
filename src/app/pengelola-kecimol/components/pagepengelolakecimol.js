"use client"

import Input from "@/components/input"
import Button from "@/components/input/button"
import Select from "@/components/input/select"
import Parentinput from "@/components/parentinput"
import { useEffect, useState } from "react"
import { createPengelolaKecimol } from "../../../../lib/pengelola-kecimol/fnc"
import Daftarpengelolakecimol from "./daftarpengelolakecimol"
export default function Pagepengelolakecimol({ kecimol }) {
    const [semuakecimolaktiv, setSemuakecimolaktiv] = useState([])
    const [msg] = useState({
        email_user: 'email user',
        kecimol: 'kecimol'
    })
    const [pesanerror, setPesanerror] = useState({
        email_user: { error: false, message: msg.email_user },
        kecimol: { error: false, message: msg.kecimol },
    })
    const [vlpengelola, setVlpengelola] = useState({
        email_user: '',
        kecimol: null
    })
    const [pilihankecimol, setPilihankecimol] = useState([])
    useEffect(() => {
        const hasilnya = []
        if (kecimol.length) {
            kecimol.map(dt => hasilnya.push({ nama: dt.nama, kecimol: dt }))
            setSemuakecimolaktiv(kecimol)
        }
        if (hasilnya === 1) {
            setVlpengelola({ email_user: '', kecimol: hasil[0] })
        }
        setPilihankecimol(hasilnya)
    }, [kecimol])
    // change email user
    const changeemailuser = e => {
        setVlpengelola({ ...vlpengelola, [e.path]: e.value })
        if (pesanerror[e.path].error) {
            setPesanerror({ ...pesanerror, [e.path]: { error: false, message: msg[e.path] } })
        }
    }
    // change pilihan kecimol
    const changepilihkecimol = e => {
        setVlpengelola({ ...vlpengelola, [e.path]: e })
        if (pesanerror[e.path].error) {
            setPesanerror({ ...pesanerror, [e.path]: { error: false, message: msg[e.path] } })
        }
    }
    // kirim pengelola
    const [errorlain, setErrorlain] = useState({
        opennotifikasi: false,
        message: null,
        bg: 'bg-blue-600'
    })
    const [loadingkirimpengelola, setLoadingkirimpengelola] = useState(false)
    const kirimpengelola = async e => {
        e.preventDefault()
        setLoadingkirimpengelola(true)
        const hasil = await createPengelolaKecimol(vlpengelola)
        const { status, data } = hasil
        if (status === 200) {
            // proses menambahkan pengelola
            const hasilnya = []
            if (semuakecimolaktiv.length) {
                semuakecimolaktiv.map(dt => {
                    if (dt.id === data.idkecimol) {
                        const pengelola = dt.pengelolakecimols.map(kcm => kcm)
                        pengelola.push(data.datapengelola)
                        dt.pengelolakecimols = pengelola
                        hasilnya.push(dt)
                    } else {
                        hasilnya.push(dt)
                    }

                })
            }
            setSemuakecimolaktiv(hasilnya)
            setErrorlain({ ...errorlain, opennotifikasi: true, message: `user dengan alamat email ${data.email_user} berhasil di tambahkan jadi pengelola kecimol ${data.nama_kecimol}`, bg: 'bg-green-100' })
        } else if (status === 400) {
            setPesanerror({ ...pesanerror, [data.path]: { error: true, message: data.message } })
        } else if (status === 403) {
            setErrorlain({ ...errorlain, opennotifikasi: true, message: data.message, bg: 'bg-red-100' })
        }
        setLoadingkirimpengelola(false)
    }
    useEffect(() => {
        let jadinya
        if (errorlain.opennotifikasi) {
            jadinya = setTimeout(() => {
                if (errorlain.opennotifikasi) {
                    setErrorlain({ ...errorlain, opennotifikasi: false, message: null })
                }
            }, 7000)
        }
        return () => clearTimeout(jadinya)
    }, [errorlain])
    // kita akan menghapus data pengelola yang sebelumnya di hapus dari sini
    const idpengelolaidkecimol = e => {
        const idkecimol = e.kecimol.id
        const idpengelola = e.pengelola.id
        const jaribaru = []
        if (semuakecimolaktiv.length) {
            semuakecimolaktiv.map(dt => {
                if (dt.id === idkecimol) {
                    const sisepengelola = []
                    if (dt.pengelolakecimols.length) {
                        dt.pengelolakecimols.map(dtdua => {
                            if (dtdua.id !== idpengelola) {
                                sisepengelola.push(dtdua)
                            }
                        })
                    }
                    dt.pengelolakecimols = sisepengelola
                    jaribaru.push(dt)
                } else {
                    jaribaru.push(dt)
                }
            })
        }
        setSemuakecimolaktiv(jaribaru)
    }
    return (
        <div className="grid grid-cols-1 gap-8">
            <div>
                <form onSubmit={kirimpengelola}>
                    <div className="grid grid-cols-1 gap-8 w-full max-w-[600px]">
                        {
                            errorlain.opennotifikasi && errorlain.message ?
                                <div className={`${errorlain.bg} rounded-sm text-xs flex text-center p-5`}>
                                    <div className="max-w-[400px] mx-auto">
                                        {errorlain.message}
                                    </div>
                                </div>
                                : null
                        }
                        <Parentinput judul="email user" deskripsi="masukan email user yang ingin di tambahkan sebagai pengelola.">
                            <Input value={vlpengelola} path={'email_user'} ikon="email" pesanError={pesanerror} onChangeValue={changeemailuser} />
                        </Parentinput>
                        <Parentinput judul="daftar kecimol" deskripsi="pilih kecimol yang ingin ditambahkan pengelolanya">
                            <Select pesanError={pesanerror} value={vlpengelola} path={'kecimol'} pilihan={pilihankecimol} ikon="kecimol" onChangeValue={changepilihkecimol} />
                        </Parentinput>
                        <Button teks={'tambah pengelola'} loading={loadingkirimpengelola} bg={`bg-blue-600 hover:bg-blue-700`} />
                    </div>
                </form>
            </div>
            <Daftarpengelolakecimol datakecimol={semuakecimolaktiv} idpengelolaidkecimol={idpengelolaidkecimol} />
        </div>
    )
}
