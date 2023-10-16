"use client"
import React, { useEffect } from 'react'
import Pagecontent from '../content/pagecontent'
import Pagebg from '../content/pagebg'
import Notfound from '.'
import { useDispatch, useSelector } from 'react-redux'
import { verifikasiuser } from '../../../lib/user/verifikasiuser/fnc'
import Footer from '@/app/beranda/components/footer'

export default function Parentnotfound({ teks }) {
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
            <Pagebg teks={'not found 404'}>
                <Notfound teks={teks} />
            </Pagebg>
            <Footer />
        </Pagecontent>
    )
}
