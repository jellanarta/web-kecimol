import { cookies, headers } from "next/headers"
import { limaBulanJadwal } from "../../../../lib/fnc"
import { KapitalTeks } from "../../../../lib/public/fnc"
import moment from "moment"
import 'moment/locale/id'
import { redirect } from "next/navigation"
import Parent from "./parent"
moment.locale('id')
const dataoke = {
    title: KapitalTeks('dashboard admin'),
    description: KapitalTeks('dashboard admin, ringkasan seluruh data kecimol.com'),
    keywords: 'dashboard admin'
}
export const metadata = {
    ...dataoke,
    robots: {
        index: false,
        follow: false,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/admin/dashboard`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/dashboard.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/admin/dashboard`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    },
}

const cariDataDashboardAdmin = async (tanggal, token, agent) => {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER}/admin/dashboard/default/${tanggal.awal}/${tanggal.akhir}/${new Date().setHours(0, 0, 0, 0)}`, {
        method: "GET",
        cache: 'no-store',
        headers: {
            'Authorization': token,
            'User-Agent': agent
        }
    })
}
export default async function Page() {
    const awalakhir = limaBulanJadwal('cari awal dan akhir', moment().format("MMMM YYYY"))
    const cookieuser = cookies()
    const dataheaders = headers()
    const tokenkecimol = cookieuser.get('tokenkecimolntb')
    if (!tokenkecimol) {
        redirect('/masuk?ref=kecimol/dashboard')
    }
    const tokennya = tokenkecimol.value
    const agentnya = dataheaders.get('user-agent')
    const hasildata = await cariDataDashboardAdmin(awalakhir, tokennya, agentnya)
    const hasildb = { data: null }
    if (hasildata && hasildata.status === 200) {
        const bgs = await hasildata.json()
        hasildb.data = bgs
    } else {
        redirect('/')
    }
    if (!hasildb.data) {
        redirect('/')
    }
    return (
        <>
            {
                hasildb.data ?
                    <Parent datadashboard={hasildb.data} />
                    : null
            }
        </>
    )
}
