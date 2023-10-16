"use client"

import { useEffect, useState } from "react"
import Formdaftarkecimol from "./formdaftarkecimol"
import { desa, kabupaten, kecamatan } from "daftar-wilayah-indonesia"
import { useSearchParams } from "next/navigation"
import { userGetKecimolWithUsername } from "../../../../lib/kecimol/update/fnc"
import { ScaleLoader } from "react-spinners"

export default function Pagedaftarkecimol() {
    const params = useSearchParams()
    const username = params.get('change')
    const [loadingcarikecimol, setLoadingcarikecimol] = useState(true)
    const [editkecimol, setEditkecimol] = useState({
        status: false,
        kecimol: null
    })
    useEffect(() => {
        const gogo = async () => {
            if (username && username.length) {
                const hasil = await userGetKecimolWithUsername(username)
                if (hasil.status === 200) {
                    setEditkecimol({ status: true, kecimol: hasil.data })
                }
                setLoadingcarikecimol(false)
            } else {
                setLoadingcarikecimol(false)
            }
        }
        gogo()
    }, [username])
    return (
        <div>
            <div className="text-sm uppercase font-semibold">
                {
                    editkecimol.status ?
                        <>
                            ada yang baru ni. yuk perbarui data kecimol <span className="text-blue-600">{editkecimol.kecimol.nama}</span> anda dengan data terbaru
                        </>
                        :
                        <>
                            Daftarkan kecimol anda di <span className="text-blue-600">kecimol.com</span> agar semua orang bisa melihat jadwal lengkap dari kecimol anda.
                        </>
                }
            </div>
            <div className="mt-10">
                {
                    loadingcarikecimol ?
                        <div className="flex justify-center">
                            <ScaleLoader color="blue" />
                        </div>
                        :
                        <Pagedaftarkecimolparent editkecimol={editkecimol} />
                }
            </div>
        </div>
    )
}

function Pagedaftarkecimolparent({ editkecimol }) {
    const [pilihan, setPilihan] = useState({
        alamat: {
            kabupaten: kabupaten('52'),
            kecamatan: [],
            desa: []
        },
        anggota_ak_ntb: [
            { nama: 'ya' },
            { nama: 'tidak' },
        ]
    })
    const [taoksimpanuah] = useState({
        poto_profil: '',
        nama: '',
        username: '',
        nomor_hp: '',
        anggota_ak_ntb: null,
        alamat: {
            kabupaten: null,
            kecamatan: null,
            desa: null,
            dusun: ''
        },
        sosmed: {
            facebook: '',
            instagram: '',
            tiktok: '',
            youtube: ''
        },
        deskripsi: ''
    })
    const [valuekecimol, setValuekecimol] = useState(taoksimpanuah)
    const [tampilkan, setTampilkan] = useState(false)
    const [idkecimoledit, setIdkecimoledit] = useState(false)

    useEffect(() => {
        if (!tampilkan) {
            if (editkecimol.status) {
                const datanya = {}
                for (const key in taoksimpanuah) {
                    if (key === "poto_profil") {
                        datanya[key] = `${process.env.NEXT_PUBLIC_SERVER}/profil-kecimol/${editkecimol.kecimol[key]}`
                    } else {
                        datanya[key] = editkecimol.kecimol[key]
                    }
                }
                setValuekecimol(datanya)
                setIdkecimoledit(editkecimol.kecimol.id)
                const singkatalamat = datanya.alamat
                const semuakecamatan = kecamatan(singkatalamat.kabupaten.kode)
                const semuadesa = desa(singkatalamat.kecamatan.kode)
                const pilihanalamat = pilihan.alamat
                pilihanalamat.kecamatan = semuakecamatan
                pilihanalamat.desa = semuadesa
                const jarimodok = { ...pilihan }
                jarimodok.alamat = pilihanalamat
                setPilihan(jarimodok)
                setTampilkan(true)
            } else {
                setTampilkan(true)
            }
        }
    }, [tampilkan, editkecimol.status, editkecimol.kecimol, pilihan, taoksimpanuah])
    return (
        <>
            {
                tampilkan ?
                    <Formdaftarkecimol valuekecimol={valuekecimol} pilihanlokasi={pilihan} idkecimoledit={idkecimoledit} />
                    : null
            }
        </>
    )
}