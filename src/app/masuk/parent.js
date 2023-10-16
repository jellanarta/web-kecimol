"use client"

import ParentAuth from "@/components/auth"
import Input from "@/components/input"
import Button from "@/components/input/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { usermasuk } from "../../../lib/user/auth/fnc"
import jwtDecode from "jwt-decode"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/redux/auth"
import Link from "next/link"
import { verifikasiuser } from "../../../lib/user/verifikasiuser/fnc"
import Loadingpage from "@/components/loadingpage"

export default function Parent() {
    const stateuser = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    const params = useSearchParams()
    const ref = params.get('ref')
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
    const [loadingdaftar, setLoadingdaftar] = useState(false)
    const [msg] = useState({
        email: 'alamat email',
        password: 'password akun',
    })
    const [pessanError, setPessanError] = useState({
        email: { error: false, message: msg.email },
        password: { error: false, message: msg.password },
    })
    const [valuedaftar, setValuedaftar] = useState({
        email: '',
        password: '',
    })
    const changevaluedaftar = e => {
        setValuedaftar({ ...valuedaftar, [e.path]: e.value })
        if (pessanError[e.path].error) {
            setPessanError({ ...pessanError, [e.path]: { error: false, message: msg[e.path] } })
        }
    }
    const kirimdatadaftar = async e => {
        e.preventDefault()
        setLoadingdaftar(true)
        const hasil = await usermasuk(valuedaftar)
        if (hasil.status === 200) {
            const { token } = hasil.data
            const datauser = jwtDecode(token)
            dispatch(setUser({ user: datauser, token, login: true }))
            if (ref) {
                if (ref === "back") {
                    router.back()
                } else {
                    router.push(`/${ref}`)
                }
            } else {
                router.push('/')
            }
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
                        <ParentAuth data={{ judul: 'masuk baru', deskripsi: 'Yuk masuk dulu ke akun mu untuk melihat apa yang baru di kecimol.com' }} tekslink="daftar">
                            <form onSubmit={kirimdatadaftar}>
                                <div className="grid grid-cols-1 gap-6">
                                    <Input value={valuedaftar} path={'email'} ikon="email" pesanError={pessanError} onChangeValue={changevaluedaftar} />
                                    <Input type="password" value={valuedaftar} ikon="password" path={'password'} pesanError={pessanError} onChangeValue={changevaluedaftar} />
                                    <div className="flex justify-end text-xs text-blue-600 hover:text-blue-700">
                                        <Link href={'/user/lupa-password'}>Lupa Pasword?</Link>
                                    </div>
                                    <Button loading={loadingdaftar} teks={'masuk'} bg={'bg-blue-600 hover:bg-blue-700'} />
                                </div>
                            </form>
                        </ParentAuth>
                        : <Loadingpage />
                    : <Loadingpage />
            }
        </>
    )
}
