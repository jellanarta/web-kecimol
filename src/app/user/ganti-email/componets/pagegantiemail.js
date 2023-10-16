"use client"

import Loadingpage from "@/components/loadingpage"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { updateNama } from "../../../../../lib/user/crud/updatenamaemail/fnc"
import Link from "next/link"

export default function Pagegantiemail() {
    const [hasiilgantiemail, Hasiilgantiemail] = useState({
        message: null,
        loading: true
    })
    const params = useSearchParams()
    const token = params.get('token')
    const router = useRouter()
    useEffect(() => {
        const gogo = async () => {
            if (!token || !token.length) {
                router.push('/')
            } else {
                const hasil = await updateNama({ token }, 'verifikasi-ganti-email')
                if (hasil.status === 200) {
                    Hasiilgantiemail({ loading: false, message: 'Email anda berhasil di perbarui dengan email yang anda masukan pada saat meminta ganti email' })
                } else if (hasil.status === 400) {
                    Hasiilgantiemail({ loading: false, message: 'Token verifikasi ganti email salah atau sudah kadaluarsa, silahkan minta link baru lagi di halaman profil' })
                } else if (hasil.status === 401) {
                    router.push('/masuk?ref=back')
                }
            }
        }
        gogo()
    }, [token, router])
    return (
        <>

            {
                !hasiilgantiemail.loading ?
                    <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center">
                        <div className="max-w-[400px] w-full m-5 bg-white rounde-sm p-7">
                            <div className="text-xs text-center">
                                {hasiilgantiemail.message}
                            </div>
                            <div className="flex justify-center mt-6">
                                <Link href={'/'} className="block px-5 py-3 rounded-sm text-xs uppercase bg-blue-600 hover:bg-blue-700 text-gray-50">
                                    kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                    : <Loadingpage />
            }
        </>
    )
}
