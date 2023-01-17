import Pie from "../../components/NewPage/charts/Pie";
import Columnar from "../../components/NewPage/charts/Columnar";
import LargeArea from "../../components/NewPage/charts/LargeArea";
import DottedBar from "../../components/NewPage/charts/DottedBar";

const col4Chart = [
    {
        com: Pie,
        key: 0
    },
    {
        com: Columnar,
        key: 1
    },
]

const col6Chart = [
    {
        com: LargeArea,
        key: 0
    },
    {
        com: DottedBar,
        key: 1
    },
]

export {col4Chart,col6Chart}