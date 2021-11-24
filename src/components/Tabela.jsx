import {useMemo} from "react";
import {useGlobalFilter, usePagination, useSortBy, useTable} from "react-table";
import MOCK_DATA from './MOCK_DATA.json';
import './Table.css';
import {GlobalFilter} from "./GlobalFilter";

const collumns = [
    {
        Header: 'Fornecedor',
        acessor: 'nomeFantasia',
    },
    {
        Header: 'Telefone',
        acessor: 'telefoneFornecedor',
    },
    {
        Header: 'Ações',
        acessor: 'acao',
    },
]

export const Table = () => {
    const columns = useMemo(() => collumns, []);
    const data = useMemo(() => MOCK_DATA, []);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({columns, data},
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {globalFilter, pageIndex, pageSize} = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(hg =>
                    <tr{...hg.getHeaderGroupProps()}>
                        {hg.headers.map(column =>
                            <th{...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>{column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}</span>
                            </th>)}
                    </tr>
                )}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr key={i} {...row.getRowProps}>
                            {row.cells.map(cell =>
                                <td{...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div>
                <select value={pageSize} onChange={event => setPageSize(Number(event.target.value))}>
                    {[10, 25, 50].map(pageSize => <option value={pageSize} key={pageSize}>{pageSize}</option>)}
                </select>
                <span>Pag{' '}<strong>{pageIndex + 1} de {pageOptions.length}</strong>{' '}</span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </>
    )
}


export default Table;