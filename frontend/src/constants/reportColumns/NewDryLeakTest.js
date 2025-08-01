// excelExport Header

export const columns1 = [
    {
        Header: 'Sr. No',
    },
    {
        Header: 'DATE &time',
    },
    {
        Header: ' BARCODE',
    },
    {
        Header: ' WATER CAVITY LEAK',
    },
    {
        Header: ' OIL CAVITY LEAK',
    },
    {
        Header: ' RESULT',
    },
]

export const csvheaders =[
    { label:"sr.No", key:"Sr"},
    { label:"DATE & TIME", key:"timeat"},
    { label:"BARCODE", key:"barcode"},
    { label:"WATER CAVITY LEAK", key:"water"},
    { label:"OIL CAVITY LEAK", key:"oil"},
    { label:"RESULT", key:"newdlt_result"},
]

export const columnsPDF = [
  {
    Header: 'DATE & TIME ',
    accessor: 'timeat',
  },
  {
    Header: 'NEW DLT BARCODE ',
    accessor: 'barcode',
  },
  {
    Header: 'NEW DLT WATER CAVITY LEAK ',
    accessor: 'water',
  },
  {
    Header: 'NEW DLT OIL CAVITY LEAK ',
    accessor: 'oil',
  },
  {
    Header: 'NEW DLT RESULT ',
    accessor: 'newdlt_result',
  }
]

