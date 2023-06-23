import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ProductManagementHalfTable = () => {
    const CustomPagination = () => null;



    const [rows, setRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/halfitem');
            const data = await response.json();

            // Generate unique IDs for the rows based on their index
            const rowsWithIds = data.map((row, index) => ({ ...row, id: index + 1 }));

            setRows(rowsWithIds);
        } catch (error) {
            console.error('Error fetching grid data:', error);
        }
    };

    useEffect(() => {
        fetchGridData();
    }, []);

    const columns = [
        { field: 'halfName', headerName: '반자재', width: 150 },
        { field: 'halfCount', headerName: 'Company Name', width: 150 },
        { field: 'halfRegDate', headerName: 'Company Phone', width: 150 },
        { field: 'halfRegUpdate', headerName: 'Buy', width: 100 },
        { field: 'halfPrice', headerName: 'Sell', width: 100 },
    ];

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id}
                      components={{
                          Pagination: CustomPagination,
                      }}

            />
        </div>
    );
};
export default ProductManagementHalfTable;
