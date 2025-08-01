// excelExport Header

export const columns1 = [
    {
        Header: 'Sr. No',
    },
    {
        Header: 'DATE & TIME',
    },
    {
        Header: 'DLT BARCODE',
    },  
    {
        Header: 'DLT WATER CAVITY LEAK',
    },
    {
        Header: 'DLT OIL CAVITY LEAK',
    },
    {
        Header: 'DLT BODY LEAK VALUE',
    },
    {
        Header: 'RESULT',
    },
]

export const csvheaders =[
    { label:"sr.No", key:"Sr"},
    { label:"DATE & TIME", key:"timeat"},
    { label:"BARCODE", key:"barcode"},
    { label:"BODY LEAK VALUE", key:"body"},
    { label:"RESULT", key:"dlt_result"},
]

export const columnsPDF = [
  {
    Header: 'DATE & TIME ',
    accessor: 'timeat',
  },
  {
    Header: 'DLT BARCODE ',
    accessor: 'barcode',
  },
  {
    Header: 'DLT BODY LEAK VALUE ',
    accessor: 'body',
  },
  {
    Header: 'DLT RESULT ',
    accessor: 'dlt_result',
  }
]