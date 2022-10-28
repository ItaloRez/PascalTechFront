import { useState } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ReactDropzone from "../react-dropzone/react-dropzone";

interface ModalEditInfosProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalEditInfos = ({ open, handleClose }: ModalEditInfosProps) => {
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Editar informações da loja"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required
                id="slogan"
                name="slogan"
                label="Slogan"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required
                id="callToAction"
                name="callToAction"
                label="Call to action"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                required
                id="descricao"
                name="descricao"
                label="Descrição"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required
                id="telefone"
                name="telefone"
                label="Telefone"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
              <TextField
                required
                id="endereco"
                name="endereco"
                label="Endereço"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <TextField
                required
                id="numero"
                name="numero"
                label="Número"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <TextField
                required
                id="bairro"
                name="bairro"
                label="Bairro"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <TextField
                required
                id="cidade"
                name="cidade"
                label="Cidade"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={[
                  "SP",
                  "MG",
                  "RJ",
                  "ES",
                  "BA",
                  "SE",
                  "AL",
                  "PE",
                  "PB",
                  "RN",
                  "CE",
                  "PI",
                  "MA",
                  "PA",
                  "AM",
                  "AC",
                  "RO",
                  "RR",
                  "AP",
                  "TO",
                  "GO",
                  "MT",
                  "MS",
                  "DF",
                ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Estado"
                    sx={{ mt: 2 }}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <TextField
                required
                id="facebook"
                name="facebook"
                label="Facebook"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <TextField
                required
                id="twitter"
                name="twitter"
                label="Twitter"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <TextField
                required
                id="instagram"
                name="instagram"
                label="Instagram"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
