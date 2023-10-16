"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifikasiuser } from "../../../../lib/user/verifikasiuser/fnc"
import Pagecontent from "@/components/content/pagecontent"
import Pagebg from "@/components/content/pagebg"
import Pagesewakecimol from "./components/pagesewakecimol"
import Footer from "@/app/beranda/components/footer"

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
            <Pagebg teks={'sewa kecimol'} type="db">
                <Pagesewakecimol />
            </Pagebg>
            <Footer />
        </Pagecontent>
    )
}
