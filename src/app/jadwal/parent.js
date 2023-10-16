"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifikasiuser } from "../../../lib/user/verifikasiuser/fnc"
import Pagecontent from "@/components/content/pagecontent"
import Pagebg from "@/components/content/pagebg"
import Pagejadwalhariini from "./components/pagejadwalhariini"
import Footer from "../beranda/components/footer"

export default function Parent() {
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
        <Pagecontent>
            <Pagebg teks={'jadwal hari ini'} type="dashboard">
                <Pagejadwalhariini />
            </Pagebg>
            <Footer />
        </Pagecontent>
    )
}
