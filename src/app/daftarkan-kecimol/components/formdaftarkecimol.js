"use client"

import Input from "@/components/input"
import Button from "@/components/input/button"
import Inputimage from "@/components/input/inputimage"
import Select from "@/components/input/select"
import Parentinput from "@/components/parentinput"
import { desa, kecamatan } from "daftar-wilayah-indonesia"
import { useState } from "react"
import { base64ToImg } from "../../../../lib/public/baseimg"
import { userDaftarkanKecimol } from "../../../../lib/kecimol/create/fnc"
import { userUpdateKecimol } from "../../../../lib/kecimol/update/fnc"
import { useDispatch, useSelector } from "react-redux"
import { setKecimol } from "@/redux/kecimol"
import Modalnotifikasi from "@/components/modalnotifikasi"
import Link from "next/link"
import Deskripsikecimol from "@/components/editor/deskripsikecimol"
import Image from "next/image"

export default function Formdaftarkecimol({ valuekecimol, pilihanlokasi, idkecimoledit }) {
    const dispatch = useDispatch()
    const statekecimol = useSelector(state => state.stateKecimol)
    const [pilihan, setPilihan] = useState(pilihanlokasi)
    const [vlkecimol, setvlkecimol] = useState(valuekecimol)
    const [msg] = useState({
        poto_profil: 'poto profil kecimol',
        nama: 'nama kecimol',
        username: 'username kecimol',
        nomor_hp: 'nomor hp aktiv',
        anggota_ak_ntb: 'anggota ak-ntb',
        alamat: {
            kabupaten: 'kabupaten',
            kecamatan: 'kecamatan',
            desa: 'desa',
            dusun: 'dusun'
        },
        sosmed: {
            facebook: 'username facebook',
            instagram: 'username instagram',
            tiktok: 'username tiktok',
            youtube: 'username youtube',
        },
        deskripsi: 'deskripsi kecimol'
    })
    const [pesanError, setPesanError] = useState({
        poto_profil: { error: false, message: msg.poto_profil },
        nama: { error: false, message: msg.nama },
        username: { error: false, message: msg.username },
        nomor_hp: { error: false, message: msg.nomor_hp },
        anggota_ak_ntb: { error: false, message: msg.anggota_ak_ntb },
        alamat: {
            kabupaten: { error: false, message: msg.alamat.kabupaten },
            kecamatan: { error: false, message: msg.alamat.kecamatan },
            desa: { error: false, message: msg.alamat.desa },
            dusun: { error: false, message: msg.alamat.dusun },
        },
        sosmed: {
            facebook: { error: false, message: msg.sosmed.facebook },
            instagram: { error: false, message: msg.sosmed.instagram },
            tiktok: { error: false, message: msg.sosmed.tiktok },
            youtube: { error: false, message: msg.sosmed.youtube },
        },
        deskripsi: { error: false, message: msg.deskripsi }
    })

    // change input
    const changeteks = e => {
        const dalamselek = ['dusun', 'facebook', 'instagram', 'tiktok', 'youtube']
        if (dalamselek.includes(e.path)) {
            if (e.path === "dusun") {
                const alamat = vlkecimol.alamat
                alamat[e.path] = e.value
                setvlkecimol({ ...vlkecimol, alamat })
                const errordusun = pesanError.alamat
                if (errordusun[e.path].error) {
                    errordusun[e.path] = { error: false, message: msg.alamat[e.path] }
                    setPesanError({ ...pesanError, alamat: errordusun })
                }
            } else {
                const sosmed = vlkecimol.sosmed
                sosmed[e.path] = e.value
                setvlkecimol({ ...vlkecimol, sosmed })
                const errorsosmed = pesanError.sosmed
                if (errorsosmed[e.path].error) {
                    errorsosmed[e.path] = { error: false, message: msg.sosmed[e.path] }
                    setPesanError({ ...pesanError, sosmed: errorsosmed })
                }
            }
        } else {
            if (e.path === "username") {
                const pattern = /^[A-Za-z0-9_]+$/;
                if (pattern.test(e.value) || e.value === '') {
                    setvlkecimol({ ...vlkecimol, [e.path]: e.value.toLowerCase() })
                }
            } else if (e.path === "nomor_hp") {
                const konter = /^[0-9]*$/
                if (konter.test(e.value)) {
                    setvlkecimol({ ...vlkecimol, [e.path]: e.value })
                }
            } else {
                setvlkecimol({ ...vlkecimol, [e.path]: e.value })
            }
            if (pesanError[e.path].error) {
                setPesanError({ ...pesanError, [e.path]: { error: false, message: msg[e.path] } })
            }
        }

    }
    // change select
    const ambilsisanya = e => {
        const jarin = { ...pilihan.alamat }
        const jarinvl = { ...vlkecimol.alamat }
        const path = e.path
        if (path === "kabupaten") {
            jarinvl[path] = e
            jarinvl['kecamatan'] = null
            jarinvl['desa'] = null
            jarinvl['dusun'] = ''
            const kc = kecamatan(e.kode)
            jarin.kecamatan = kc
            jarin.desa = []
        } else if (path === "kecamatan") {
            jarinvl[path] = e
            jarinvl['desa'] = null
            jarinvl['dusun'] = ''
            const ds = desa(e.kode)
            jarin.desa = ds
        } else {
            jarinvl[path] = e
            jarinvl['dusun'] = ''
        }
        setPilihan({ ...pilihan, alamat: jarin })
        setvlkecimol({ ...vlkecimol, alamat: jarinvl })
    }
    const changeselect = e => {
        if (e.path !== "anggota_ak_ntb") {
            ambilsisanya(e)
            const erroralamat = pesanError.alamat
            if (erroralamat[e.path].error) {
                erroralamat[e.path] = { error: false, message: msg.alamat[e.path] }
                setPesanError({ ...pesanError, alamat: erroralamat })
            }
        } else {
            setvlkecimol({ ...vlkecimol, [e.path]: e })
            if (pesanError[e.path].error) {
                setPesanError({ ...pesanError, [e.path]: { error: false, message: msg[e.path] } })
            }
        }
    }
    // change poto profil
    const changepotoprofil = e => {
        if (e.error) {
            setPesanError({ ...pesanError, poto_profil: e })
            setvlkecimol({ ...vlkecimol, poto_profil: '' })
        } else {
            setvlkecimol({ ...vlkecimol, poto_profil: e.data })
            if (pesanError.poto_profil.error) {
                setPesanError({ ...pesanError, poto_profil: { error: false, message: msg.poto_profil } })
            }
        }
    }
    // change deskripsi 
    const changedeskripsi = e => {
        setvlkecimol({ ...vlkecimol, deskripsi: e })
        if (pesanError.deskripsi.error) {
            setPesanError({ ...pesanError, deskripsi: { error: false, message: msg.deskripsi } })
        }
    }
    // proses kirim pendaftaran
    const [loadingkirimkecimol, setLoadingkirimkecimol] = useState(false)

    // anatar edit atau daftar
    const pergimengirim = async data => {
        if (idkecimoledit) {
            return await userUpdateKecimol(data, idkecimoledit)
        } else {
            return await userDaftarkanKecimol(data)
        }
    }

    const [berhasilbuatedit, Berhasilbuatedit] = useState({
        opendrop: false,
        kecimol: null
    })
    const kirimkecimol = async e => {
        e.preventDefault()
        setLoadingkirimkecimol(true)
        const formdata = new FormData()
        const hasilfile = base64ToImg(vlkecimol.poto_profil)
        if (hasilfile && vlkecimol.poto_profil.length) {
            if (!vlkecimol.poto_profil.includes(process.env.NEXT_PUBLIC_SERVER)) {
                formdata.append('poto_profil', hasilfile)
            }
        }
        for (const key in vlkecimol) {
            if (key !== 'poto_profil') {
                if (key === "alamat" || key === "sosmed" || key === "anggota_ak_ntb") {
                    formdata.append(key, JSON.stringify(vlkecimol[key]))
                } else {
                    formdata.append(key, vlkecimol[key])
                }
            }
        }

        const hasil = await pergimengirim(formdata)
        const status = hasil.status
        if (status === 200) {
            const hasilkecimol = hasil.data
            let kecimolsebelumnya = [...statekecimol.kecimol]
            if (!idkecimoledit) {
                kecimolsebelumnya.push(hasilkecimol)
            } else {
                const jarinni = []
                if (kecimolsebelumnya.length) {
                    kecimolsebelumnya.map(dt => {
                        if (dt.id === hasilkecimol.id) {
                            jarinni.push(hasilkecimol)
                        } else {
                            jarinni.push(dt)
                        }
                    })
                }
                kecimolsebelumnya = jarinni
            }
            dispatch(setKecimol({ status: 'success', kecimol: kecimolsebelumnya }))
            Berhasilbuatedit({ ...berhasilbuatedit, opendrop: true, kecimol: hasilkecimol })
        } else if (status === 400) {
            const path = hasil.data.path
            const message = hasil.data.message
            const kontererroralamat = Object.keys(pesanError.alamat)
            const kontererrorsosmed = Object.keys(pesanError.sosmed)
            if (kontererroralamat.includes(path)) {
                const erroralamat = pesanError.alamat
                erroralamat[path] = { error: true, message }
                setPesanError({ ...pesanError, alamat: erroralamat })
            } else if (kontererrorsosmed.includes(path)) {
                const errorsosmed = pesanError.sosmed
                errorsosmed[path] = { error: true, message }
                setPesanError({ ...pesanError, sosmed: errorsosmed })
            } else {
                setPesanError({ ...pesanError, [path]: { error: true, message } })
            }
        }
        setLoadingkirimkecimol(false)
    }

    return (
        <>
            {
                berhasilbuatedit.opendrop ?
                    <Modalnotifikasi>
                        <div className="text-sm text-center">
                            Kecimol <span className="text-blue-600 uppercase">{berhasilbuatedit.kecimol.nama}</span> berhasil di {idkecimoledit ? 'perbarui' : 'daftarkan'}
                        </div>
                        <div className="mt-7 grid grid-cols-1">
                            <Link href={`/${berhasilbuatedit.kecimol.username}`} className="text-center text-blue-600 hover:text-blue-700 text-xs uppercase ">
                                lihat kecimol
                            </Link>
                        </div>
                    </Modalnotifikasi>
                    : null
            }
            <form onSubmit={kirimkecimol}>
                <div className="grid grid-cols-1 gap-8 w-full max-w-[600px]">
                    {/* poto profil */}
                    <Parentinput judul="poto profil kecimol" deskripsi="masukan poto profil kecimol anda">
                        <Inputimage pesanError={pesanError} value={vlkecimol} path={'poto_profil'} changeGambarOke={changepotoprofil} />
                    </Parentinput>

                    {/* nama, username, nomor hp */}
                    <Parentinput judul="data lengkap kecimol" deskripsi="masukan nama, username dan nomor hp kecimol anda">
                        <Input value={vlkecimol} path={'nama'} ikon="kecimol" pesanError={pesanError} onChangeValue={changeteks} />
                        <Input value={vlkecimol} path={'username'} ikon="user" pesanError={pesanError} onChangeValue={changeteks} />
                        <Input value={vlkecimol} path={'nomor_hp'} ikon="phone" pesanError={pesanError} onChangeValue={changeteks} />
                    </Parentinput>
                    {/* nama, username, nomor hp */}

                    {/* memilih apakah anggota ak ntb atau tidak */}
                    <Parentinput judul="anggota ak - ntb atau tidak" deskripsi="pilih ya jika kecimol anda bergabung di AK-NTB">
                        <Select pesanError={pesanError} value={vlkecimol} path={'anggota_ak_ntb'} pilihan={pilihan.anggota_ak_ntb} onChangeValue={changeselect} />
                    </Parentinput>
                    {/* memilih apakah anggota ak ntb atau tidak */}

                    {/* alamat kecimol */}
                    <Parentinput judul="alamat kecimol" deskripsi="pilih kabupaten kecamatan, desa dan masukan nama dusun alamat kecimol anda">
                        <Select pesanError={pesanError.alamat} value={vlkecimol.alamat} path={'kabupaten'} pilihan={pilihan.alamat.kabupaten} ikon="location" onChangeValue={changeselect} />
                        <Select pesanError={pesanError.alamat} value={vlkecimol.alamat} path={'kecamatan'} pilihan={pilihan.alamat.kecamatan} ikon="location" onChangeValue={changeselect} />
                        <Select pesanError={pesanError.alamat} value={vlkecimol.alamat} path={'desa'} pilihan={pilihan.alamat.desa} ikon="location" onChangeValue={changeselect} />
                        <Input value={vlkecimol.alamat} path={'dusun'} ikon="location" pesanError={pesanError.alamat} onChangeValue={changeteks} />
                    </Parentinput>
                    {/* alamat kecimol */}

                    {/* sosmed kecimol */}
                    <Parentinput judul="( opsinonal ) sosial media kecimol" deskripsi="masukan username sosial media kecimol anda jika ada">
                        <Input value={vlkecimol.sosmed} path={'facebook'} ikon="facebook" pesanError={pesanError.sosmed} onChangeValue={changeteks} />
                        <Input value={vlkecimol.sosmed} path={'instagram'} ikon="instagram" pesanError={pesanError.sosmed} onChangeValue={changeteks} />
                        <Input value={vlkecimol.sosmed} path={'tiktok'} ikon="tiktok" pesanError={pesanError.sosmed} onChangeValue={changeteks} />
                        <Input value={vlkecimol.sosmed} path={'youtube'} ikon="youtube" pesanError={pesanError.sosmed} onChangeValue={changeteks} />
                    </Parentinput>
                    {/* sosmed kecimol */}

                    {/* deskripsi kecimol */}
                    <Parentinput judul="deskripsi kecimol" deskripsi="masukan deskripsi yang menjelaskan kecimol anda">
                        <div>
                            <Deskripsikecimol value={vlkecimol.deskripsi} changedeskripsi={changedeskripsi} />
                            <div className="mt-1 flex items-start gap-2">
                                <div className="w-3 h-3 relative mt-[1px] ">
                                    <Image
                                        src={'/icons/quote.svg'}
                                        width={100}
                                        height={100}
                                        alt="ikon"
                                    />
                                </div>
                                <div className={`text-xs font-medium ${pesanError.deskripsi.error ? 'text-red-500' : 'text-gray-700'}`}>
                                    {pesanError.deskripsi.error ? '' : 'masukan'} {pesanError.deskripsi.message}
                                </div>
                            </div>
                        </div>
                    </Parentinput>
                    {/* deskripsi kecimol */}

                    {/* kirim kecimol */}
                    <Button teks={idkecimoledit ? 'perbarui kecimol' : 'kirim kecimol'} loading={loadingkirimkecimol} bg={`bg-blue-600 hover:bg-blue-700`} />
                </div>
            </form>
        </>
    )
}
