"use client"

import Pagecontent from "@/components/content/pagecontent"
import { useEffect } from "react"
import { verifikasiuser } from "../../../lib/user/verifikasiuser/fnc"
import { useDispatch, useSelector } from "react-redux"
import Pageberanda from "./components/pageberanda"
import Loadingpage from "@/components/loadingpage"

export default function Parent({ databeranda }) {
    const stateuser = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        const anhanh = async () => {
            if (stateuser.status !== "success") {
                await verifikasiuser(stateuser, dispatch)
            }
        }
        anhanh()
    }, [stateuser, dispatch])
    return (
        <>
            {
                databeranda ?
                    <Pagecontent>
                        <Pageberanda databeranda={databeranda} />
                    </Pagecontent>
                    : <Loadingpage />
            }
        </>
    )
}
