"use client"

import Input from "@/components/input"
import Button from "@/components/input/button"
import Select from "@/components/input/select"
import Parentinput from "@/components/parentinput"
import { useState } from "react"
import { adminMenambahkanRole } from "../../../../../lib/admin/role/fnc"

export default function Formrole({ value, pilihan, kembalikanjikaselainuser }) {
    const [valuerole, setValuerole] = useState(value)
    const [msg] = useState({
        email: 'email user',
        role: 'role'
    })
    const [pesanError, setPesanError] = useState({
        email: { error: false, message: msg.email },
        role: { error: false, message: msg.role },
    })
    // change 
    const changeapa = e => {
        if (e.path === "email") {
            setValuerole({ ...valuerole, [e.path]: e.value.toLowerCase() })
        } else if (e.path === "role") {
            setValuerole({ ...valuerole, [e.path]: { nama: e.nama } })
        }
        if (pesanError[e.path].error) {
            setPesanError({ ...pesanError, [e.path]: { error: false, message: msg[e.path] } })
        }
    }
    const [loadingkirim, setLoadingkirim] = useState(false)
    const submitdatadong = async e => {
        e.preventDefault()
        setLoadingkirim(true)
        const hasil = await adminMenambahkanRole(valuerole)
        if (hasil.status === 200) {
            if (hasil.data.role !== "user") {
                kembalikanjikaselainuser(hasil.data)
            }
        } else if (hasil.status === 400) {
            setPesanError({ ...pesanError, [hasil.data.path]: { error: true, message: hasil.data.message } })
        }
        setLoadingkirim(false)
    }
    return (
        <div className="bg-white rounded-sm px-5 py-7 m-5">
            <form onSubmit={submitdatadong}>
                <div className="grid grid-cols-1 gap-8 w-full max-w-[600px]">

                    <Parentinput judul="email user" deskripsi="masukan email user yang sudah terdaftar">
                        <Input value={valuerole} path={'email'} ikon="email" pesanError={pesanError} onChangeValue={changeapa} />
                    </Parentinput>

                    <Parentinput judul="pilih role" deskripsi="pilih role untuk user tersebut">
                        <Select path={'role'} ikon="userrole" pesanError={pesanError} value={valuerole} pilihan={pilihan} onChangeValue={changeapa} />
                    </Parentinput>

                    <Button teks={`kirim role`} bg={'bg-blue-600 hover:bg-blue-700'} loading={loadingkirim} />

                </div>
            </form>
        </div>
    )
}
