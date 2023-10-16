"use client"

import ParentAuth from "@/components/auth"
import Input from "@/components/input"
import Button from "@/components/input/button"
import { useEffect, useState } from "react"
import { userdaftar } from "../../../lib/user/auth/fnc"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { verifikasiuser } from "../../../lib/user/verifikasiuser/fnc"
import Loadingpage from "@/components/loadingpage"

export default function Parent() {
    const router = useRouter()
    const stateuser = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        const anhanh = async () => {
            if (stateuser.status === "success") {
                if (stateuser.login) {
                    router.push('/')
                }
            } else {
                await verifikasiuser(stateuser, dispatch, true)
            }
        }
        anhanh()
    }, [stateuser, dispatch, router])

    const [msg] = useState({
        nama: 'nama lengkap',
        email: 'alamat email',
        password: 'password akun',
        konfirmasi_password: 'konfirmasi password'
    })
    const [pessanError, setPessanError] = useState({
        nama: { error: false, message: msg.nama },
        email: { error: false, message: msg.email },
        password: { error: false, message: msg.password },
        konfirmasi_password: { error: false, message: msg.konfirmasi_password },
    })
    const [valuedaftar, setValuedaftar] = useState({
        nama: '',
        email: '',
        password: '',
        konfirmasi_password: ''
    })
    const changevaluedaftar = e => {
        setValuedaftar({ ...valuedaftar, [e.path]: e.value })
        if (pessanError[e.path].error) {
            setPessanError({ ...pessanError, [e.path]: { error: false, message: msg[e.path] } })
        }
    }
    const [loadingdaftar, setLoadingdaftar] = useState(false)
    const kirimdatadaftar = async e => {
        e.preventDefault()
        setLoadingdaftar(true)
        const hasil = await userdaftar(valuedaftar)
        if (hasil.status === 200) {
            router.push('/masuk')
        } else if (hasil.status === 400) {
            setLoadingdaftar(false)
            setPessanError({ ...pessanError, [hasil.data.path]: { error: true, message: hasil.data.message } })
        }
    }
    return (
        <>
            {
                stateuser.status === "success" ?
                    !stateuser.login ?
                        <ParentAuth data={{ judul: 'daftar akun baru', deskripsi: 'Buat akun baru di kecimol.com dan jadilah bagian dari kami' }} tekslink="masuk">
                            <form onSubmit={kirimdatadaftar}>
                                <div className="grid grid-cols-1 gap-6">
                                    <Input value={valuedaftar} path={'nama'} pesanError={pessanError} onChangeValue={changevaluedaftar} />
                                    <Input value={valuedaftar} path={'email'} ikon="email" pesanError={pessanError} onChangeValue={changevaluedaftar} />
                                    <Input type="password" value={valuedaftar} ikon="password" path={'password'} pesanError={pessanError} onChangeValue={changevaluedaftar} />
                                    <Input type="password" value={valuedaftar} ikon="password" path={'konfirmasi_password'} pesanError={pessanError} onChangeValue={changevaluedaftar} />
                                    <Button loading={loadingdaftar} teks={'daftar'} bg={'bg-blue-600 hover:bg-blue-700'} />
                                </div>
                            </form>
                        </ParentAuth>
                        : null
                    : <Loadingpage />
            }
        </>
    )
}
