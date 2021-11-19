import {useMemo} from "react";
import {useTable} from "react-table/src/hooks/useTable";
import MOCK_DATA from './MOCK_DATA.json';
import './Table.css';
import {useSortBy} from "react-table/src/plugin-hooks/useSortBy";

const collumns = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Nome',
        accessor: 'first_name'
    },
    {
        Header: 'Sobrenome',
        accessor: 'last_name'
    },
    {
        Header: 'E-mail',
        accessor: 'email'
    },
]

export const Table = () => {
    const columns = useMemo(() => collumns, []);
    const data = useMemo(() => MOCK_DATA, []);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data}, useSortBy);

    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(hg =>
                <tr{...hg.getHeaderGroupProps()}>
                    {hg.headers.map(column =>
                        <th{...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            {/*<span>{column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}</span>*/}
                        </th>)}
                </tr>
            )}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr{...row.getRowProps}>
                        {row.cells.map(cell =>
                            <td{...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}


export default Table;