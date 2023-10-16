"use client"

import Footer from "@/app/beranda/components/footer"
import Pagebg from "@/components/content/pagebg"
import Pagecontent from "@/components/content/pagecontent"
import Pageprivasi from "./components/pageprivasi"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { verifikasiuser } from "../../../../lib/user/verifikasiuser/fnc"
import { useParams } from "next/navigation"

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
    const prms = useParams()
    const aranni = prms.privasi

    return (
        <Pagecontent>
            <Pagebg teks={aranni.split("-").join(" ")}>
                <Pageprivasi />
            </Pagebg>
            <Footer />
        </Pagecontent>
    )
}
