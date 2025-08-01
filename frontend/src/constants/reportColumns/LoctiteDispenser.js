

// excelExport Header

export const columns1 = [
    {
        Header: 'Sr. No',
    },
    {
        Header: 'DATE & TIME',
    },
    {
        Header: ' BARCODE',
    },
    {
        Header: 'LOCTITE DISPENSER',
    },
    {
        Header: 'RESULT',
    },
]

export const csvheaders =[
    { label:"sr.No", key:"Sr"},
    { label:"DATE & TIME", key:"timeat"},
    { label:"BARCODE", key:"barcode"},
    { label:"LOCTITE DISPENSER", key:"dispenser"},
    { label:"RESULT", key:"ld_result"},
]

export const columnsPDF = [
    {
        Header: 'DATE & TIME ',
        accessor: 'timeat',
    },
    {
        Header: 'BARCODE ',
        accessor: 'barcode',
    },
    {
        Header: 'LOCTITE DISPENSER ',
        accessor: 'dispenser',
    },
    {
        Header: 'RESULT ',
        accessor: 'ld_result',
    }
]
