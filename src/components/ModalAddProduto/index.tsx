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

interface ModalAddProdutoProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalAddProduto = ({
  open,
  handleClose,
}: ModalAddProdutoProps) => {
  const [image, setImage] = useState(null);
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
          {"Adicionar produto na loja"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required
                id="nome"
                name="nome"
                label="Nome do produto"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required
                id="preco"
                name="preco"
                label="Preço do produto"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required
                id="quantidade"
                name="quantidade"
                label="Quantidade do produto"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={["Destaques"]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categoria"
                    sx={{ mt: 2 }}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                required
                id="descricao"
                name="descricao"
                label="Descrição do produto"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <ReactDropzone
                type="img"
                image={image}
                setImage={setImage}
                multiple={true}
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
