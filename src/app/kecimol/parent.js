"use client"
import Pagebg from '@/components/content/pagebg'
import Pagecontent from '@/components/content/pagecontent'
import { useEffect } from 'react'
import Pagekecimol from './components/pagekecimol'
import { useDispatch, useSelector } from 'react-redux'
import { verifikasiuser } from '../../../lib/user/verifikasiuser/fnc'
import Footer from '../beranda/components/footer'

export default function Parent({ datakecimol }) {
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
            <Pagebg teks={'semua kecimol'} type='dashboard'>
                <Pagekecimol datakecimol={datakecimol} />
            </Pagebg>
            <Footer />
        </Pagecontent>
    )
}
