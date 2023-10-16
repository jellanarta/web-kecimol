import { cookies } from 'next/headers'
import { getKecimolWithUsername } from '../../../lib/public/getkecimolwithusername'
import { KapitalTeks } from '../../../lib/public/fnc'
import Parent from './parent'
import Parentnotfound from '@/components/notfound/parentnotfound'

export async function generateMetadata({ params }) {
    const cookieuser = cookies()
    const tokenkecimol = cookieuser.get('tokenkecimolntb')
    let tokennya = null
    if (tokenkecimol) {
        tokennya = tokenkecimol.value
    }
    const hasil = await getKecimolWithUsername(params.username, tokennya)
    if (hasil && hasil.status === 200) {
        const datanya = hasil.data
        const title = KapitalTeks(`profil kecimol ${datanya.nama}`)
        const description = KapitalTeks(`${datanya.nama} adalah kecimol miliknya ${datanya.user.nama}. kecimol ${datanya.nama} beralamat di ${datanya.alamat.kabupaten.nama}, kecamatan ${datanya.alamat.kecamatan.nama}, desa ${datanya.alamat.desa.nama} ${datanya.alamat.dusun.length ? `, dusun ${datanya.alamat.dusun}` : ''}, untuk mendapatkan informasi lebih lanjut tentang kecimol ${datanya.nama}, silahkan hubungi nomor hp ${datanya.nomor_hp} atau email pemiliknya di ${datanya.user.email}`)
        const keywords = `profil kecimol ${datanya.nama}, kecimol ${datanya.nama}, jadwal kecimol ${datanya.nama}, alamat kecimol ${datanya.nama}, kontak kecimol ${datanya.nama}, pemilik kecimol ${datanya.nama}, sewa kecimol ${datanya.nama}, personil kecimol ${datanya.nama}`
        const robots = {
            index: datanya.statusKecimol,
            follow: true,
            nocache: true
        }
        return {
            title,
            description,
            keywords,
            robots,
            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_CLIENT}/${datanya.username}`,
                languages: {
                    'id-ID': '/id-ID',
                },
            },
            themeColor: process.env.NEXT_PUBLIC_WARNA_WEB,
            openGraph: {
                title,
                description,
                images: `${process.env.NEXT_PUBLIC_SERVER}/profil-kecimol/${datanya.poto_profil}`,
                url: `${process.env.NEXT_PUBLIC_CLIENT}/${datanya.username}`,
                type: 'profile',
                locale: 'id_ID',
                authors: datanya.user.nama
            },
        }
    } else {
        return {
            title: KapitalTeks(`404 : kecimol tidak di temukan`),
            description: KapitalTeks('kecimol yang anda cari tidak di temukan'),
            robots: {
                index: false,
                nocache: true
            }
        }
    }
}
export default async function Page({ params }) {
    const cookieuser = cookies()
    const tokenkecimol = cookieuser.get('tokenkecimolntb')
    let tokennya = null
    if (tokenkecimol) {
        tokennya = tokenkecimol.value
    }
    const ambil = await getKecimolWithUsername(params.username, tokennya)
    return (
        <>
            {
                ambil && ambil.status === 200 ?
                    <Parent kecimol={ambil.data} />
                    :
                    <Parentnotfound teks={'kecimol'} />
            }
        </>
    )
}
