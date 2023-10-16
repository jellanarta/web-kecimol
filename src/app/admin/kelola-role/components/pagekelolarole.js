"use client"

import { useEffect, useState } from "react"
import Formrole from "./formrole"
import { ambilUserSelainRoleUser } from "../../../../../lib/admin/role/fnc"
import Dataselainuser from "./dataselainuser"

export default function Pagekelolarole() {
    const [dataselainuser, setDataselainuser] = useState({
        loading: true,
        data: []
    })
    useEffect(() => {
        const anh = async () => {
            const solo = { loading: false, data: [] }
            const hasilnya = await ambilUserSelainRoleUser()
            if (hasilnya.status === 200) {
                solo.data = hasilnya.data
            }
            setDataselainuser(solo)
        }
        anh()
    }, [])
    const [pilihanrole] = useState([
        { nama: 'user' },
        { nama: 'admin' },
        { nama: 'rootadmin' },
    ])
    const [valuerole, setValuerole] = useState({
        email: '',
        role: null
    })
    const kembalikanjikaselainuser = e => {
        const hakmule = [...dataselainuser.data]
        hakmule.push(e)
        setDataselainuser({ ...dataselainuser, data: hakmule })
    }
    return (
        <div>
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="text-sm font-semibold uppercase">
                    kelola role user, tambah, ubah atau hapus admin di kecimol.com
                </div>
            </div>
            <Formrole value={valuerole} pilihan={pilihanrole} kembalikanjikaselainuser={kembalikanjikaselainuser} />
            {
                !dataselainuser.loading ?
                    dataselainuser.data.length ?
                        <Dataselainuser datauser={dataselainuser.data} />
                        : null
                    : null
            }
        </div>
    )
}
