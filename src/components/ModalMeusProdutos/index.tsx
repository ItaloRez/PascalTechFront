import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { useAuth } from "src/contexts/authContext";
import { supabase } from "src/services/supabase";
import styles from "./styles.module.scss";
import { Paper, Stack } from "@mui/material";

interface ModalMeusProdutosProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalMeusProdutos = ({
  open,
  handleClose,
}: ModalMeusProdutosProps) => {
  const [produtos, setProdutos] = useState([]);

  const { user } = useAuth();

  const getProdutos = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("compras")
      .select("id")
      .eq("usuario", user.id);

    if (!data) return;

    const compras = await supabase
      .from("produtos_da_compra")
      .select("*")
      .in(
        "compra",
        data.map((item) => item.id)
      );

    if (!compras.data) return;

    const prods = await supabase
      .from("produtos")
      .select("*")
      .in(
        "id",
        compras.data.map((c) => c.produto)
      );

    setProdutos(prods.data);
  };

  useEffect(() => {
    if (open) getProdutos();
  }, [open]);
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
        <DialogTitle id="alert-dialog-title">{"Meus Produtos"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack gap={3}>
                {produtos.map((produto: any) => (
                  <Paper key={produto.id} sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <div>
                        <h3>{produto.nome}</h3>
                        <span>{produto.quantidade}xUnidade</span>
                      </div>
                      <div>
                        <h3>Preço</h3>
                        <span>R$ {produto.preco * produto.quantidade}</span>
                      </div>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};
