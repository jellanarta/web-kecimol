"use client"

import Input from "@/components/input"
import Button from "@/components/input/button"
import { useEffect, useState } from "react"
import { linkGantiPassword } from "../../../../lib/user/crud/update-lupa-password/fnc"
import { useSearchParams } from "next/navigation"
import Loadingpage from "@/components/loadingpage"
import Link from "next/link"

export default function Parent() {
    const params = useSearchParams()
    const token = params.get("token")
    const [tampilkirimemail, setTampilkirimemail] = useState({
        loading: true,
        email: false
    })

    useEffect(() => {
        if (token && token.length) {
            setTampilkirimemail({ loading: false, email: false })
        } else {
            setTampilkirimemail({ loading: false, email: true })
        }
    }, [token])
    return (
        <>
            {
                !tampilkirimemail.loading ?
                    <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center">
                        {
                            tampilkirimemail.email ?
                                <Kirimlinkgantipassword />
                                :
                                <Gantipassword />
                        }
                    </div>
                    : <Loadingpage />
            }
        </>
    )
}

function Kirimlinkgantipassword() {
    const [msg] = useState({
        email: 'alamat email'
    })
    const [pesanError, setPesanError] = useState({
        email: { error: false, message: msg.email }
    })
    const [valueemail, setValueemail] = useState({
        email: ''
    })
    const changeemail = e => {
        setValueemail({ ...valueemail, email: e.value })
        if (pesanError.email.error) {
            setPesanError({ ...pesanError, email: { error: false, message: msg.email } })
        }
    }
    const [messagesukses, setMessagesukses] = useState(null)
    const [loadinglalo, setLoadinglalo] = useState(false)
    const kirimemail = async e => {
        e.preventDefault()
        setLoadinglalo(true)
        const hasil = await linkGantiPassword(valueemail)
        if (hasil.status === 200) {
            setMessagesukses('Link ganti password sudah di kirim ke alamat email anda, silahkan klik link tersebut. Jika anda tidak menemukan email kami, silahkan periksa folder spam.')
        } else if (hasil.status === 400) {
            setPesanError({ ...pesanError, [hasil.data.path]: { error: true, message: hasil.data.message } })
        }
        setLoadinglalo(false)
    }
    return (
        <div className="bg-white max-w-[400px] w-full rounded-sm p-6 grid grid-cols-1 gap-8 m-5">
            <div className="text-xs font-semibold uppercase">
                Lupa password? Masukan alamat email yang terdaftar di kecimol.com
            </div>
            <form onSubmit={kirimemail}>
                <div className="grid grid-cols-1 gap-6">
                    {
                        messagesukses ?
                            <div className="bg-green-100 p-5 text-xs">
                                {
                                    messagesukses
                                }
                            </div>
                            : null
                    }
                    <Input path={'email'} ikon="email" pesanError={pesanError} value={valueemail} onChangeValue={changeemail} />
                    <Button loading={loadinglalo} teks={'kirim email'} bg={'bg-blue-600 hover:bg-blue-700'} />
                </div>
            </form>
        </div>
    )
}
function Gantipassword() {
    const params = useSearchParams()
    const token = params.get("token")
    const [loadingverifikasitoken, setLoadingverifikasitoken] = useState({
        loading: true,
        error: false,
        message: null
    })
    useEffect(() => {
        const gogo = async () => {
            const hasil = await linkGantiPassword({ token }, 'verifikasi-link-reset-password')
            if (hasil.status === 200) {
                setLoadingverifikasitoken({ loading: false, error: false, message: null })
            } else {
                setLoadingverifikasitoken({ loading: false, error: true, message: 'Link ganti password salah atau sudah kadaluarsa, silahkan minta link baru' })
            }
        }
        gogo()
    }, [token])
    return (
        <div className="bg-white max-w-[400px] w-full rounded-sm p-6 grid grid-cols-1 gap-8 m-5">
            <div className="text-xs font-semibold uppercase">
                {
                    loadingverifikasitoken.loading ?
                        'Loading verifikasi link ganti password. silahkan tungu sebentar'
                        : 'masukan password baru untuk akun anda'
                }
            </div>
            <div>
                {
                    loadingverifikasitoken.error ?
                        <>
                            <div className="border border-orange-600 p-5 text-center text-xs border-dashed">
                                {
                                    loadingverifikasitoken.message
                                }
                            </div>
                            <Link href="/user/lupa-password" className="p-3 text-center text-sm uppercase bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-sm mt-5 block">
                                minta link baru
                            </Link>
                        </>
                        :
                        <Formmembuatpasswordbaru token={token} />
                }
            </div>
        </div>
    )
}

function Formmembuatpasswordbaru({ token }) {
    const [vlpassword, setVlpassword] = useState({
        password: '',
        konfirmasi_password: ''
    })
    const [msg] = useState({
        password: 'password baru',
        konfirmasi_password: 'konfirmasi password baru'
    })
    const [pesanError, setPesanError] = useState({
        password: { error: false, message: msg.password },
        konfirmasi_password: { error: false, message: msg.konfirmasi_password },
    })
    const changepassword = e => {
        setVlpassword({ ...vlpassword, [e.path]: e.value })
        if (pesanError[e.path].error) {
            setPesanError({ ...pesanError, [e.path]: { error: false, message: msg[e.path] } })
        }
    }

    // kirim password
    const [loadingkirimpassword, setloadingkirimpassword] = useState(false)
    const [kondisikirimpassword, setkondisikirimpassword] = useState({
        loading: true,
        status: 0
    })
    const kirimpasswordoke = async e => {
        e.preventDefault()
        vlpassword.token = token
        setloadingkirimpassword(true)
        setkondisikirimpassword({ loading: true, status: 0 })
        const hasil = await linkGantiPassword(vlpassword, 'proses-reset-password')
        if (hasil.status == 400) {
            setPesanError({ ...pesanError, [hasil.data.path]: { error: true, message: hasil.data.message } })
        } else {
            setkondisikirimpassword({ loading: false, status: hasil.status })
        }
        setloadingkirimpassword(false)
    }
    return (
        <form onSubmit={kirimpasswordoke}>
            <div className="grid grid-cols-1 gap-6">
                {
                    !kondisikirimpassword.loading ?
                        <div className={`${kondisikirimpassword.status === 200 ? 'bg-green-100' : 'bg-red-200'} p-5 text-xs`}>
                            {
                                kondisikirimpassword.status === 200 ?
                                    <span>
                                        Password akun berhasil di ubah. Silahkan masuk kembali ke akun anda. <Link href={'/masuk'} className="text-blue-600 hover:text-blue-700">Klik disini</Link>
                                    </span>
                                    : null
                            }
                            {
                                kondisikirimpassword.status === 403 ?
                                    <span>
                                        Link verifikasi ganti password salah atau sudah kadaluarsa. Silahkan minta link baru. <Link href={'/user/lupa-password'} className="text-blue-600 hover:text-blue-700">Klik disini</Link>
                                    </span>
                                    : null
                            }
                        </div>
                        : null
                }
                <Input type="password" path={'password'} ikon="password" value={vlpassword} pesanError={pesanError} onChangeValue={changepassword} />
                <Input type="password" path={'konfirmasi_password'} ikon="password" value={vlpassword} pesanError={pesanError} onChangeValue={changepassword} />
                <Button loading={loadingkirimpassword} teks={'kirim password'} bg={'bg-blue-600 hover:bg-blue-700'} />
            </div>
        </form >
    )
}