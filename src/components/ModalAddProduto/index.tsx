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

interface ModalAddProdutoProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalAddProduto = ({
  open,
  handleClose,
}: ModalAddProdutoProps) => {
  const [image, setImage] = useState(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([
    { title: "Categoria 1" },
    { title: "Categoria 2" },
    { title: "Categoria 3" },
  ]);
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([""]);

  const [saveLoading, setSaveLoading] = useState(false);

  const { createProduto } = useProdutos();

  const handleSubmit = async () => {
    if (
      !nome ||
      !preco ||
      !quantidade ||
      !categoria ||
      !descricao ||
      imagens[0] === ""
    ) {
      alert("Preencha todos os campos");
      return;
    }
    //verfiy if none of itens is empty
    else if (imagens.some((item) => item === "")) {
      alert("Não deixe nenhum campo de imagem vazio");
      return;
    }

    setSaveLoading(true);
    await createProduto({
      nome,
      preco: Number(preco),
      quantidade: Number(quantidade),
      categoria,
      descricao,
      imagens,
    });
    setSaveLoading(false);
    handleClose();
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
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                type="number"
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
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                type="number"
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
                onChange={(event, value) => {
                  setCategoria(value);
                }}
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
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {imagens.map((image, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <TextField
                    name={`imagem ${index}`}
                    label={`Imagem ${index}`}
                    fullWidth
                    sx={{ mt: 2 }}
                    value={image}
                    onChange={(e) => {
                      const newImages = [...imagens];
                      newImages[index] = e.target.value;
                      setImagens(newImages);
                    }}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      const newImages = imagens.filter((_, i) => i !== index);
                      setImagens(newImages);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Stack>
              ))}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button
                onClick={() => {
                  setImagens([...imagens, ""]);
                }}
              >
                Adicionar imagem
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} autoFocus>
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
