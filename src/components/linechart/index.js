import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { KapitalTeks } from '../../../lib/public/fnc';
import moment from 'moment';
import 'moment/locale/id'
moment.locale('id')
// import Parentstatistik from './parentstatistik';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const optionsaran = (text = 'chartjs') => {
    return {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text,
            },
        },
        scale: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    };
}
export const dataaran = (datalengkap) => {
    const jadinyaoke = []
    datalengkap.map(dt => {
        jadinyaoke.push({
            label: KapitalTeks(dt.label),
            data: dt.data.map(dtdua => dtdua.data),
            borderColor: dt.warna,
            backgroundColor: dt.warna,
        })
    })
    let labels = datalengkap[0].data.map(dt => moment(dt.tanggal).format("ll"))
    return {
        labels,
        datasets: jadinyaoke
    };
}
export default function Linechartjs({ teks, data }) {
    return (
        <div>
            {
                data && data.length ?
                    <Line options={optionsaran(teks)} data={dataaran(data)} />
                    : null
            }
        </div>
    )
}
