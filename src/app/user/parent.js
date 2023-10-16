"use client"

import Pagebg from "@/components/content/pagebg"
import Pagecontent from "@/components/content/pagecontent"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifikasiupdatestate, verifikasiuser } from "../../../lib/user/verifikasiuser/fnc"
import { useRouter } from "next/navigation"
import Loadingpage from "@/components/loadingpage"
import Pageuser from "./components/pageuser"

export default function Parent() {
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
                        <Pagecontent>
                            <Pagebg teks={'profil user'}>
                                <Pageuser />
                            </Pagebg>
                        </Pagecontent>
                        : <Loadingpage />
                    : <Loadingpage />
            }
        </>
    )
}
