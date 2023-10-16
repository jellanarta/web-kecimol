"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifikasiupdatestate, verifikasiuser } from "../../../../lib/user/verifikasiuser/fnc"
import Loadingpage from "@/components/loadingpage"
import Pagecontent from "@/components/content/pagecontent"
import Pagebg from "@/components/content/pagebg"
import Pagekelolarole from "./components/pagekelolarole"

export default function Parent() {
    const stateuser = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        const anhanh = async () => {
            if (stateuser.status === "success") {
                verifikasiupdatestate(router, stateuser, true, ['rootadmin'])
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
                    ['rootadmin'].includes(stateuser.user?.role) ?
                        <Pagecontent>
                            <Pagebg teks={'kelola role user'} type="db">
                                <Pagekelolarole />
                            </Pagebg>
                        </Pagecontent>
                        : <Loadingpage />
                    : <Loadingpage />
            }
        </>
    )
}
