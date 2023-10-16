"use client"

import Input from "@/components/input"
import Button from "@/components/input/button"
import Parentinput from "@/components/parentinput"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { updateNama } from "../../../../lib/user/crud/updatenamaemail/fnc"
import Image from "next/image"
import { base64ToImg } from "../../../../lib/public/baseimg"
import { userUpdateProfil } from "../../../../lib/user/crud/updateprofil/fnc"

export default function Pageuser() {
    const stateuser = useSelector(state => state.authReducer)
    return (
        <div>
            <div className="text-sm font-semibold uppercase">
                halaman profil akun {stateuser.user.nama}
            </div>
            <div className="mt-10 grid grid-cols-1 gap-14">
                <div>
                    <Updatepotoprofil data={stateuser} />
                </div>
                <div className="grid grid-cols-1 gap-14 md:gap-10 md:grid-cols-2">
                    <UpdateNama data={stateuser} />
                    <UpdateEmail data={stateuser} />
                    <Updatepassword data={stateuser} />
                </div>
            </div>
        </div>
    )
}
function Updatepotoprofil({ data }) {
    const [valuegambar, setValuegambar] = useState(data.user.poto_profil)
    const refIMG = useRef(null)
    const customclick = () => {
        refIMG.current.click()
    }
    const [msg] = useState({
        poto_profil: 'gambar untuk mengubah poto profil'
    })
    const [pesanError, setPesanError] = useState({
        poto_profil: { error: false, message: msg.poto_profil }
    })
    const [valuegambaroke, setValuegambaroke] = useState(null)
    const changeFile = async e => {
        const fl = e.target.files
        if (fl.length === 1) {
            const file = fl[0]
            const fileType = file.type
            const fileSize = file.size
            const allowType = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
            if (!allowType.includes(fileType)) {
                setPesanError({ ...pesanError, poto_profil: { error: true, message: 'file gambar tidak dizinkan' } })
            } else if (fileSize >= 2000000) {
                setPesanError({ ...pesanError, poto_profil: { error: true, message: 'ukuran gambar maksimal 2MB' } })
            } else if (fileSize <= 60000) {
                setPesanError({ ...pesanError, poto_profil: { error: true, message: 'ukuran gambar minimal 60KB' } })
            } else {
                if (pesanError.poto_profil.error) {
                    setPesanError({ ...pesanError, poto_profil: { error: false, message: msg.poto_profil } })
                }
                const reader = new FileReader()
                reader.onload = () => {
                    const filenya = base64ToImg(reader.result, 'poto_profil')
                    setValuegambaroke(filenya)
                }
                reader.readAsDataURL(file)
            }
        }
    }
    useEffect(() => {
        const gogo = async () => {
            if (valuegambaroke) {
                const formdata = new FormData()
                formdata.append('poto_profil', valuegambaroke)
                const hasil = await userUpdateProfil(formdata)
                if (hasil.status === 200) {
                    setValuegambar(hasil.data.poto_profil)
                } else if (hasil.status === 400) {
                    setPesanError({ poto_profil: { error: true, message: hasil.data.message } })
                }
            }
        }
        gogo()
    }, [valuegambaroke])
    return (
        <Parentinput judul="poto profil" deskripsi="masukan poto profil baru ukuran maksimal 2MB">
            <input ref={refIMG} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" multiple={false} onChange={changeFile} />
            <div className="w-[100px] h-[100px] relative rounded-full ring-1 ring-gray-200 cursor-pointer hover:ring-blue-400" onClick={customclick}>
                <Image
                    src={valuegambar ? `${process.env.NEXT_PUBLIC_SERVER}/profil-user/${valuegambar}` : `/no-user.gif`}
                    sizes="100%"
                    alt={`profil user`}
                    fill
                    style={{
                        objectFit: 'cover',
                        borderRadius: '100%'
                    }}
                />
            </div>
            <div className="mb-2">
                <div className="mt-1 flex items-start gap-2">
                    <div className="w-3 h-3 relative mt-[1px] ">
                        <Image
                            src={'/icons/quote.svg'}
                            width={100}
                            height={100}
                            alt="ikon"
                        />
                    </div>
                    <div className={`text-xs font-medium ${pesanError.poto_profil.error ? 'text-red-500' : 'text-gray-700'}`}>
                        {pesanError.poto_profil.error ? '' : 'klik'} {pesanError.poto_profil.message}
                    </div>
                </div>
            </div>
        </Parentinput>
    )
}
function UpdateNama({ data }) {
    const [msg] = useState({
        nama: 'nama lengkap',
    })
    const [pesanError, setPesanError] = useState({
        nama: { error: false, message: msg.nama },
    })
    const [vluser, setVluser] = useState({
        nama: data.user.nama,
    })
    const changevalue = e => {
        setVluser({ ...vluser, [e.path]: e.value })
        if (pesanError[e.path].error) {
            setPesanError({ ...pesanError, [e.path]: { error: false, message: msg[e.path] } })
        }
    }
    const [loadingupdatenama, setLoadingupdatenama] = useState(false)
    const [messagesukses, setMessagesukses] = useState(null)
    const updatedong = async e => {
        e.preventDefault()
        setLoadingupdatenama(true)
        const hasil = await updateNama(vluser)
        if (hasil.status === 200) {
            setMessagesukses('Nama akun berhasil di perbarui')
        } else if (hasil.status === 400) {
            setPesanError({ ...pesanError, [hasil.data.path]: { error: true, message: hasil.data.message } })
        }
        setLoadingupdatenama(false)
    }

    return (
        <Parentinput judul="nama akun anda" deskripsi="nama yang anda masukan saat membuat akun">
            <form onSubmit={updatedong}>
                <div className="grid grid-cols-1 gap-5">
                    {
                        messagesukses ?
                            <div className="bg-green-100 p-5 text-xs">
                                {
                                    messagesukses
                                }
                            </div>
                            : null
                    }
                    <Input path={'nama'} ikon="userperson" onChangeValue={changevalue} value={vluser} pesanError={pesanError} />
                    <Button teks={'perbarui nama'} loading={loadingupdatenama} bg={'bg-blue-600 hover:bg-blue-700'} />
                </div>
            </form>
        </Parentinput>
    )
}

function UpdateEmail({ data }) {
    const [msg] = useState({
        email: 'alamat email',
    })
    const [pesanError, setPesanError] = useState({
        email: { error: false, message: msg.email },
    })
    const [vluser, setVluser] = useState({
        email: data.user.email,
    })
    const changevalue = e => {
        setVluser({ ...vluser, [e.path]: e.value })
        if (pesanError[e.path].error) {
            setPesanError({ ...pesanError, [e.path]: { error: false, message: msg[e.path] } })
        }
    }
    const [loadingupdatenama, setLoadingupdatenama] = useState(false)
    const [messagesukses, setMessagesukses] = useState(null)
    const updatedong = async e => {
        e.preventDefault()
        setLoadingupdatenama(true)
        const hasil = await updateNama(vluser, 'email')
        if (hasil.status === 200) {
            setMessagesukses('Link verifikasi pergantian email sudah di kirim ke email lama anda. Periksa folder spam jika anda tidak menemukan email kami')
        } else if (hasil.status === 400) {
            setPesanError({ ...pesanError, [hasil.data.path]: { error: true, message: hasil.data.message } })
        } else if (hasil.status === 204) {
            setMessagesukses('Email tidak ada yang berubah')
        }
        setLoadingupdatenama(false)
    }
    return (
        <Parentinput judul="email akun anda" deskripsi="email yang anda masukan saat membuat akun">
            <form onSubmit={updatedong}>
                <div className="grid grid-cols-1 gap-5">
                    {
                        messagesukses ?
                            <div className="bg-green-100 p-5 text-xs">
                                {
                                    messagesukses
                                }
                            </div>
                            : null
                    }
                    <Input path={'email'} ikon="email" onChangeValue={changevalue} value={vluser} pesanError={pesanError} />
                    <Button teks={'perbarui email'} loading={loadingupdatenama} bg={'bg-blue-600 hover:bg-blue-700'} />
                </div>
            </form>
        </Parentinput>
    )
}

function Updatepassword() {
    const [msg] = useState({
        password_lama: 'password lama akun anda',
        password_baru: 'password baru anda',
        konfirmasi_password_baru: 'konfirmasi password baru anda',
    })
    const [pesanError, setPesanError] = useState({
        password_lama: { error: false, message: msg.password_lama },
        password_baru: { error: false, message: msg.password_baru },
        konfirmasi_password_baru: { error: false, message: msg.konfirmasi_password_baru },
    })
    const [vlpassword, setvlpassword] = useState({
        password_lama: '',
        password_baru: '',
        konfirmasi_password_baru: ''
    })
    const changePassword = e => {
        setvlpassword({ ...vlpassword, [e.path]: e.value })
        if (pesanError[e.path].error) {
            setPesanError({ ...pesanError, [e.path]: { error: false, message: msg[e.path] } })
        }
    }

    // kirim password
    const [loadingsalinpassword, setLoadingsalinpassword] = useState(false)
    const [hasilmessage, setHasilmessage] = useState(null)

    const kirimpassword = async e => {
        e.preventDefault()
        setLoadingsalinpassword(true)
        const hasil = await updateNama(vlpassword, 'password')
        if (hasil.status === 200) {
            setHasilmessage('Password anda berhasil di perbarui')
        } else if (hasil.status === 400) {
            setPesanError({ ...pesanError, [hasil.data.path]: { error: true, message: hasil.data.message } })
        }
        setLoadingsalinpassword(false)
    }
    return (
        <Parentinput judul="password akun anda" deskripsi="untuk mengganti password, silahkan masukan password lama dan password baru untuk akun nada">
            <form onSubmit={kirimpassword}>
                <div className="grid grid-cols-1 gap-5">
                    {
                        hasilmessage ?
                            <div className="bg-green-100 p-5 text-xs">
                                {
                                    hasilmessage
                                }
                            </div>
                            : null
                    }
                    <Input path={'password_lama'} ikon="password" type="password" onChangeValue={changePassword} pesanError={pesanError} value={vlpassword} />
                    <Input path={'password_baru'} ikon="password" type="password" onChangeValue={changePassword} pesanError={pesanError} value={vlpassword} />
                    <Input path={'konfirmasi_password_baru'} ikon="password" type="password" onChangeValue={changePassword} pesanError={pesanError} value={vlpassword} />
                    <Button teks={'perbarui password'} loading={loadingsalinpassword} bg={'bg-blue-600 hover:bg-blue-700'} />
                </div>
            </form>
        </Parentinput>
    )
}