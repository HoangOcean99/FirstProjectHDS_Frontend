import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, TablePagination
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './DataTableComponent.css';
import { confirmDelete } from "../utils/swalPopUp";

const DataTableComponent = ({ total, data, columnData, deleteProduct, openPopUpEdit, page, setPage, rowsPerPage, setRowsPerPage }) => {
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        console.log('data', data)
        setDisplayData(data || []);
    }, [data]);
    useEffect(() => {
        console.log('displayData', displayData)
    }, [displayData]);
    const handleDelete = async (id) => {
        const result = await confirmDelete({
            title: "Bạn có chắc chắn muốn xóa sản phẩm không?",
            text: "Khi xóa sản phẩm thì các lịch sử mua của sản phẩm cũng bị xóa theo",
        });
        if (result.isConfirmed) deleteProduct(id);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        const newRows = parseInt(event.target.value, 10);
        setRowsPerPage(newRows);
        setPage(0);
    }

    const maxPage = Math.max(
        0,
        Math.ceil(displayData.length / rowsPerPage) - 1
    );
    const safePage = Math.min(page, maxPage);

    return (
        <Paper className="card shadow-sm">
            <TableContainer>
                <Table sx={{ borderCollapse: "collapse" }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#198754" }}>
                            <TableCell
                                align="center"
                                sx={{ color: "#fff", fontWeight: "bold", border: "1px solid #ccc" }}
                            >
                                STT
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ color: "#fff", fontWeight: "bold", border: "1px solid #ccc" }}
                            >
                                Action
                            </TableCell>
                            {columnData.map(col => (
                                <TableCell
                                    key={col.data}
                                    align="center"
                                    sx={{ color: "#fff", fontWeight: "bold", border: "1px solid #ccc" }}
                                >
                                    {col.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayData
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:hover": { backgroundColor: "#f5f5f5" },
                                        transition: "0.2s",
                                        border: "1px solid #ccc"
                                    }}
                                >
                                    <TableCell align="center" sx={{ border: "1px solid #ccc" }}>
                                        {page * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell align="center" sx={{ border: "1px solid #ccc" }}>
                                        <IconButton color="primary" onClick={() => openPopUpEdit(row)} className="btn-edit me-1">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(row.id)} className="btn-delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    {columnData.map(col => (
                                        <TableCell key={col.data} align="center" sx={{ border: "1px solid #ccc" }}>
                                            {row[col.data]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 20, 50, 100]}
            />

        </Paper>
    )
};

export default DataTableComponent;
