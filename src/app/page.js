import { cookies, headers } from "next/headers";
import Parent from "./beranda/parent";

async function ambilsemuadataberanda(token, agent, tanggal = new Date().setHours(0, 0, 0, 0)) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER}/user-public/beranda?tanggal=${tanggal}`, {
    method: "GET",
    cache: 'default',
    headers: {
      'Authorization': token,
      'User-Agent': agent,
      'Cache-Control': 'max-age=600'
    }
  })
}
export default async function Page() {
  const cookieuser = cookies()
  const dataheaders = headers()
  const tokenkecimol = cookieuser.get('tokenkecimolntb')
  const tokennya = tokenkecimol?.value
  const agentnya = dataheaders.get('user-agent')
  const hasilnya = await ambilsemuadataberanda(tokennya, agentnya)
  const hasildata = { databeranda: null }
  if (hasilnya && hasilnya.status === 200) {
    const jarinah = await hasilnya.json()
    hasildata.databeranda = jarinah
  }
  return (
    <Parent databeranda={hasildata.databeranda} />
  )
}
