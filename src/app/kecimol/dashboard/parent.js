"use client"

import Pagebg from "@/components/content/pagebg"
import Pagecontent from "@/components/content/pagecontent"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifikasiupdatestate, verifikasiuser } from "../../../../lib/user/verifikasiuser/fnc"
import Loadingpage from "@/components/loadingpage"
import Pagedashboard from "./components/pagedashboard"

export default function Parent({ datastatistik }) {
    const stateuser = useSelector(state => state.authReducer)
    const router = useRouter()
    const dispatch = useDispatch()
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
                stateuser.status === "success" && stateuser.login ?
                    <Pagecontent>
                        <Pagebg teks={'dashboard kecimol'} type="db">
                            <Pagedashboard datadashboard={datastatistik} />
                        </Pagebg>
                    </Pagecontent>
                    : <Loadingpage />
            }
        </>
    )
}
