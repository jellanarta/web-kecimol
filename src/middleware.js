import jwtDecode from 'jwt-decode'
import { NextResponse, userAgent } from 'next/server'
async function getUserVerify(token, agent) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/user-profil/profil`, {
            cache: 'no-store',
            headers: {
                'Authorization': token,
                'User-Agent': agent
            },
            credentials: 'include'
        })
        return response
    } catch (error) {
        return error.response
    }
}
export async function middleware(request) {
    const token = request.cookies.get('tokenkecimolntb')
    const taokm = request.nextUrl.pathname
    const kembalike = taokm.split('')
    const okesudah = kembalike.slice(1).join("")
    if (!token || !token.value || !token.value.length) {
        return NextResponse.redirect(new URL(`/masuk?ref=${okesudah === "kecimol/diikuti" ? '' : okesudah}`, request.url))
    } else {
        const agent = userAgent(request)
        const tokenkirim = token.value
        const hasil = await getUserVerify(tokenkirim, agent.ua)
        console.log(hasil.status)
        if (!hasil || hasil.status !== 200) {
            return NextResponse.redirect(new URL(`/masuk?ref=${okesudah === "kecimol/diikuti" ? '' : okesudah}`, request.url))
        } else {
            const inidia = await hasil.json()
            const datauser = jwtDecode(inidia.token)
            if (okesudah.includes('admin')) {
                if (datauser.role !== "admin" && datauser.role !== "rootadmin") {
                    return NextResponse.redirect(new URL(`/`, request.url))
                } else {
                    if (okesudah.includes('kategori-acara')) {
                        if (datauser.role !== "rootadmin") {
                            return NextResponse.redirect(new URL(`/`, request.url))
                        }
                    } else if (okesudah.includes('setujui-kecimol')) {
                        if (datauser.role !== "rootadmin" && datauser.role !== "admin") {
                            return NextResponse.redirect(new URL(`/`, request.url))
                        }
                    } else if (okesudah.includes('kelola-role')) {
                        if (datauser.role !== "rootadmin") {
                            return NextResponse.redirect(new URL(`/`, request.url))
                        }
                    } else if (okesudah.includes('dashboard')) {
                        if (datauser.role !== "rootadmin" && datauser.role !== "admin") {
                            return NextResponse.redirect(new URL(`/`, request.url))
                        }
                    }
                }
            }
        }
    }
}

export const config = {
    matcher: [
        '/daftarkan-kecimol', '/pengelola-kecimol', '/admin', '/admin/kategori-acara', '/admin/setujui-kecimol', '/admin/dashboard', '/jadwal/new-jadwal', '/kecimol/me', '/kecimol/dikelola', '/kecimol/diikuti', '/admin/kelola-role', '/kecimol/dashboard'
    ]
}