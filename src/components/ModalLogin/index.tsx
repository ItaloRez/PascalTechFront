import { useState, Fragment } from "react";
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
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProdutos } from "src/contexts/produtosContext";
import { useAuth } from "src/contexts/authContext";

interface ModalLoginProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalLogin = ({ open, handleClose }: ModalLoginProps) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();

  const handleSubmit = async () => {
    await handleLogin(user, password);
    handleClose();
  };

  return (
    <Dialog
      maxWidth={"sm"}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Faça seu login para continuar"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Senha"
              type="password"
              fullWidth
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit} autoFocus>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
