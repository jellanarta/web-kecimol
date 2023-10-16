"use client"

import Pagebg from "@/components/content/pagebg"
import Pagecontent from "@/components/content/pagecontent"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifikasiupdatestate, verifikasiuser } from "../../../../lib/user/verifikasiuser/fnc"
import Loadingpage from "@/components/loadingpage"
import Pagedikelola from "./components/pagedikelola"

export default function Parent({ dikelola }) {
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
                            <Pagebg teks={'kecimol yang di kelola'}>
                                <Konterdikelola dikelola={dikelola} />
                            </Pagebg>
                        </Pagecontent>
                        : <Loadingpage />
                    : <Loadingpage />
            }
        </>
    )
}

function Konterdikelola({ dikelola }) {
    const statedikelola = useSelector(state => state.stateDikelola)
    return (
        <div>
            <div className="text-sm uppercase font-semibold">
                daftar kecimol yang di kelola serta undangan yang di kirimkan untuk anda
            </div>
            {
                statedikelola.status === "success" && statedikelola.dikelola.length ?
                    <div className="mt-7">
                        <Pagedikelola dikelola={dikelola} />
                    </div>
                    : null
            }
        </div>
    )
}
