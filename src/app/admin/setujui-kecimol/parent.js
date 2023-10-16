"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifikasiupdatestate, verifikasiuser } from "../../../../lib/user/verifikasiuser/fnc"
import Loadingpage from "@/components/loadingpage"
import Pagecontent from "@/components/content/pagecontent"
import Pagebg from "@/components/content/pagebg"
import Pagesetujuikecimol from "./components/pagesetujuikecimol"

export default function Parent() {
    const stateuser = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        const anhanh = async () => {
            if (stateuser.status === "success") {
                verifikasiupdatestate(router, stateuser, true, ['admin', 'rootadmin'])
            } else {
                await verifikasiuser(stateuser, dispatch)
            }
        }
        anhanh()
    }, [stateuser, dispatch, router])
    return (
        <>
            {
                stateuser.status === "success" && stateuser.login ?
                    ['admin', 'rootadmin'].includes(stateuser.user?.role) ?
                        <Pagecontent>
                            <Pagebg teks={'setujui kecimol'} type="db">
                                <Pagesetujuikecimol />
                            </Pagebg>
                        </Pagecontent>
                        : <Loadingpage />
                    : <Loadingpage />
            }
        </>
    )
}
