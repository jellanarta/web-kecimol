"use client"

import Pagebg from "@/components/content/pagebg"
import Pagecontent from "@/components/content/pagecontent"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifikasiupdatestate, verifikasiuser } from "../../../lib/user/verifikasiuser/fnc"
import Loadingpage from "@/components/loadingpage"
import { ScaleLoader } from "react-spinners"
import Notifikasikosong from "@/components/notifikasikosong"
import Pagepengelolakecimol from "./components/pagepengelolakecimol"

export default function Parent({ kecimol }) {
    const stateuser = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        const anhanh = async () => {
            if (stateuser.status === "success") {
                verifikasiupdatestate(router, stateuser)
            } else {
                await verifikasiuser(stateuser, dispatch)
            }
        }
        anhanh()
    }, [stateuser, dispatch, router])
    return (
        <>
            {
                stateuser.status === "success" ?
                    stateuser.login ?
                        <Kontercekkecimol kecimol={kecimol} />
                        : <Loadingpage />
                    : <Loadingpage />
            }
        </>
    )
}

function Kontercekkecimol({ kecimol }) {
    const statekecimol = useSelector(state => state.stateKecimol)

    const [loadingcekekcimol, setLoadingcekekcimol] = useState({
        loading: true,
        adakecimolaktiv: []
    })
    useEffect(() => {
        const kecimolaktiv = []
        if (kecimol.length) {
            kecimol.map(dt => {
                if (dt.statusKecimol) {
                    kecimolaktiv.push(dt)
                }
            })
        }
        const datajari = { loading: false, adakecimolaktiv: [] }
        if (kecimolaktiv.length) {
            datajari.loading = false
            datajari.adakecimolaktiv = kecimolaktiv
        }
        setLoadingcekekcimol(datajari)
    }, [kecimol])
    return (
        <Pagecontent>
            <Pagebg teks={'pengelola kecimol'}>
                <div className="text-sm font-semibold uppercase">
                    tambahkan pengelola kecimol untuk membantu membuat, mengedit dan menghapus jadwal acara kecimol anda
                </div>
                {
                    statekecimol.status === "success" && statekecimol.kecimol.length ?
                        <div className="mt-7">
                            {
                                loadingcekekcimol.loading ?
                                    <div className="flex justify-center">
                                        <ScaleLoader color="blue" />
                                    </div>
                                    :
                                    loadingcekekcimol.adakecimolaktiv.length ?
                                        <Pagepengelolakecimol kecimol={loadingcekekcimol.adakecimolaktiv} />
                                        :
                                        <Notifikasikosong>
                                            anda belum bisa mengelola daftar pengelola kecimol karena semua kecimol yang anda daftarkan belum di setujui admin
                                        </Notifikasikosong>
                            }
                        </div>
                        : null
                }

            </Pagebg>
        </Pagecontent>
    )
}