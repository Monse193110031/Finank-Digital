import * as React from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddDialog from "./AddDialog";
import DeleteDialog from "./DeleteDialog";
import { useState } from "react";
import { useEffect } from "react";
import { getBankAccounts, updateBankAccount } from "../../../DB/db";

export const TablaCliente = () => {
  const [rows, setRows] = useState([]);

  const retrieveBankAccounts = async () => {
    const result = await getBankAccounts();
    console.log(result);
    setRows(result);
  };

  useEffect(() => {
    retrieveBankAccounts();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 15,
        boxShadow: "2px 2px 8px 1px rgba(0, 0, 0.5, 0.2)",
        borderRadius: 4,
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "medium " }}>Usuario</TableCell>
            <TableCell align="right" sx={{ fontSize: "medium " }}>
              Número de Cuenta
            </TableCell>
            <TableCell align="right" sx={{ fontSize: "medium " }}>
              Saldo Disponible
            </TableCell>
            <TableCell align="center" sx={{ fontSize: "medium " }}>
              + Saldo
            </TableCell>
            <TableCell align="center" sx={{ fontSize: "medium " }}>
              Cuenta
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.idCuentaBancaria}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ fontSize: "medium " }}
              >
                {row.idCuentaBancaria}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "medium " }}>
                {row.numeroCuenta}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "medium " }}>
                $&nbsp;{row.saldo}
              </TableCell>
              <TableCell align="center">
                <AddDialog props={row}/>{" "}
              </TableCell>
              <TableCell align="center">
                <DeleteDialog  props={row}/>
              </TableCell>
            </TableRow>
          ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
