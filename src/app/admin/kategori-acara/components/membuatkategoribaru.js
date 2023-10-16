"use client"

import Input from "@/components/input"
import Button from "@/components/input/button"
import Parentinput from "@/components/parentinput"
import { useEffect, useState } from "react"
import { adminCreateKategoriAcara, adminUpdateKategori } from "../../../../../lib/kategori-acara/fnc"

export default function Membuatkategoribaru({ kontervl, datasebelumnya, kembalikan, idedit }) {
    const [maungedit, setMaungedit] = useState(null)
    useEffect(() => {
        setMaungedit(idedit)
    }, [idedit])
    const [vlsb, setVlsb] = useState(null)
    useEffect(() => {
        setVlsb(datasebelumnya)
    }, [datasebelumnya])
    const [vlkategori, setVlkategori] = useState(null)
    useEffect(() => {
        setVlkategori(kontervl)
    }, [kontervl])
    const [msg] = useState({
        nama: 'nama kategori acara'
    })
    const [pesanerror, setpesanerror] = useState({
        nama: { error: false, message: msg.nama }
    })
    const changenama = e => {
        setVlkategori({ ...vlkategori, [e.path]: e.value })
        if (pesanerror[e.path].error) {
            setpesanerror({ ...pesanerror, [e.path]: { error: false, message: msg[e.path] } })
        }
    }

    // kirim kategori
    const [loadingni, setLoadingni] = useState(false)
    const kirimkategori = async e => {
        e.preventDefault()
        setLoadingni(true)
        if (!maungedit) {
            const hasil = await adminCreateKategoriAcara(vlkategori)
            if (hasil.status === 200) {
                const jarin = vlsb ? [...vlsb] : []
                jarin.push(hasil.data)
                kembalikan(jarin)
            } else if (hasil.status === 400) {
                setpesanerror({ ...pesanerror, [hasil.data.path]: { error: true, message: hasil.data.message } })
            }
            bataldong()
        } else {
            const hasil = await adminUpdateKategori(vlkategori, maungedit)
            if (hasil.status === 200) {
                const jarin = []
                if (vlsb && vlsb.length) {
                    vlsb.map(dt => {
                        if (dt.id === maungedit) {
                            jarin.push(hasil.data)
                        } else {
                            jarin.push(dt)
                        }
                    })
                }
                kembalikan(jarin)
                bataldong()
            } else if (hasil.status === 400) {
                setpesanerror({ ...pesanerror, [hasil.data.path]: { error: true, message: hasil.data.message } })
            }
        }
        setLoadingni(false)
    }



    // husus membatalkan edit
    const bataldong = () => {
        setMaungedit(null)
        setVlkategori({ nama: '' })
    }
    return (
        <div className="max-w-[600px]">
            {
                vlkategori ?
                    <form onSubmit={kirimkategori}>
                        <Parentinput judul="nama kategori acara" deskripsi="masukan nama kategori acara">
                            <Input value={vlkategori} path={'nama'} ikon="typeacara" pesanError={pesanerror} onChangeValue={changenama} />
                            <Button teks={maungedit ? 'perbarui kategori' : `kirim kategori`} bg={'bg-blue-600 hover:bg-blue-700'} loading={loadingni} />
                            {
                                maungedit ?
                                    <div className="bg-green-600 hover:bg-green-700 p-4 text-center uppercase text-xs text-gray-50 rounded-sm cursor-pointer" onClick={bataldong}>
                                        batalkan edit
                                    </div>
                                    : null
                            }
                        </Parentinput>
                    </form>
                    : null
            }
        </div>
    )
}
