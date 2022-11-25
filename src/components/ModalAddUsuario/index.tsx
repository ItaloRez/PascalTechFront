import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useAuth } from "src/contexts/authContext";

interface ModalAddUsuarioProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalAddUsuario = ({
  open,
  handleClose,
}: ModalAddUsuarioProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [perfil, setPerfil] = useState("");

  const { handleSignUp } = useAuth();

  const onSignUp = async () => {
    if (!email || !password || !perfil) {
      alert("Preencha todos os campos");
      return;
    }

    await handleSignUp(email, password, perfil === "Administrador");
  };

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
        <DialogTitle id="alert-dialog-title">{"Adicionar usuário"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required
                id="email"
                name="email"
                label="E-mail"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required
                id="senha"
                name="senha"
                label="Senha"
                fullWidth
                autoComplete="given-name"
                sx={{ mt: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={["Administrador", "Usuário"]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Permissões"
                    sx={{ mt: 2 }}
                    fullWidth
                  />
                )}
                onChange={(e, value) => setPerfil(value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button variant="contained" onClick={onSignUp} autoFocus>
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
