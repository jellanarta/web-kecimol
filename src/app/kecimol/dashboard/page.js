import { cookies, headers } from "next/headers";
import { limaBulanJadwal } from "../../../../lib/fnc";
import { KapitalTeks } from "../../../../lib/public/fnc"
import moment from "moment";
import 'moment/locale/id'
import { redirect } from "next/navigation";
import Parent from "./parent";
moment.locale('id')
const dataoke = {
    title: KapitalTeks(`dashboard kecimol lombok nusa tenggara barat`),
    description: KapitalTeks("dashboard kecimol, Lihat statistik dan data lengkap kecimol anda"),
    keywords: 'dashboard kecimol, kecimol lombok, statistik kecimol, data lengkap kecimol, kecimol lombok nusa tenggara barat'
}
export const metadata = {
    ...dataoke,
    robots: {
        index: true,
        follow: true,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/dashboard`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/dashboard.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/dashboard`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    },
}

const cariDataDashboard = async (tanggal, token, agent) => {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER}/user-public/dashboard/kecimol/${tanggal.awal}/${tanggal.akhir}`, {
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
    const hasilnya = await cariDataDashboard(awalakhir, tokennya, agentnya)
    const hasildata = { datadashboard: null }
    if (hasilnya && hasilnya.status === 200) {
        const jarinah = await hasilnya.json()
        hasildata.datadashboard = jarinah
    } else {
        redirect('/')
    }
    if (!hasildata.datadashboard) {
        redirect('/')
    }
    return (
        <>
            {
                hasildata.datadashboard ?
                    <Parent datastatistik={hasildata.datadashboard} />
                    : null
            }
        </>
    )
}
