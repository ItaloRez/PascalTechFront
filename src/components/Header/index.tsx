import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import styles from "./styles.module.scss";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useCarrinhoContext } from "../../contexts/carrinho";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CircularProgress, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { ModalAddProduto } from "../ModalAddProduto";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { ModalAddUsuario } from "../ModalAddUsuario";
import { ModalEditInfos } from "../ModalEditInfos";

export const Header = () => {
  const { carrinho, removerProduto, adicionarProduto, diminirQuantidade } =
    useCarrinhoContext();
  const [anchorElCarrinho, setAnchorElCarrinho] = useState(null);
  const [anchorElLogin, setAnchorElLogin] = useState(null);
  const [loading, setLoading] = useState(false);

  const [openModalAddProduto, setOpenModalAddProduto] = useState(false);
  const [openModalAddUsuario, setOpenModalAddUsuario] = useState(false);
  const [openModalEditInfos, setOpenModalEditInfos] = useState(false);

  const [usuario, setUsuario] = useState({
    nome: "João",
    email: "joao@email.com",
    role: "admin",
  });

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorElCarrinho(event.currentTarget);
  };

  const handleClickLogin = (event) => {
    setAnchorElLogin(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElCarrinho(null);
  };

  const handleCloseLogin = () => {
    setAnchorElLogin(null);
  };

  const open = Boolean(anchorElCarrinho);
  const openLogin = Boolean(anchorElLogin);
  const id = open ? "simple-popover" : undefined;
  const idLogin = openLogin ? "simple-popover" : undefined;

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link href="/">
            <a>
              <Image
                src="/images/logo.png"
                alt="logo"
                width={167}
                height={32}
              />
            </a>
          </Link>
          <nav>
            <a href="#destaques">Destaques</a>
          </nav>
          <div className={styles.headerButtons}>
            <button aria-describedby={id} onClick={handleClick}>
              <FaShoppingCart />
            </button>
            <button onClick={handleClickLogin}>
              <FaUserAlt />
            </button>
          </div>
        </div>
      </header>

      {/* Carrinho */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorElCarrinho}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{}}
      >
        <Typography
          sx={{
            p: 2,
            fontWeight: "bold",
            borderBottom: "1px solid var(--gray-300)",
            minWidth: 300,
          }}
        >
          Carrinho de Compras
        </Typography>
        {carrinho.map((produto: any) => (
          <div key={produto.id} className={styles.produto}>
            <div>
              <p>{produto.nome}</p>
              <p>Preço {produto.preco}</p>
            </div>
            <div>
              <IconButton
                aria-label="remove"
                onClick={() => diminirQuantidade(produto)}
              >
                <RemoveIcon />
              </IconButton>

              <p>x{produto.quantidade}</p>

              <IconButton
                aria-label="add"
                onClick={() => adicionarProduto(produto)}
              >
                <AddIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => {
                  removerProduto(produto);
                }}
              >
                <DeleteIcon fontSize="inherit" color="error" />
              </IconButton>
            </div>
          </div>
        ))}
        {carrinho.length > 0 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/carrinho")}
            fullWidth
          >
            Finalizar Compra
          </Button>
        ) : (
          <Typography sx={{ p: 2 }}>Carrinho Vazio</Typography>
        )}
      </Popover>

      {/* Login */}
      <Popover
        id={idLogin}
        open={openLogin}
        anchorEl={anchorElLogin}
        onClose={handleCloseLogin}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ minWidth: "400px" }}
      >
        {usuario &&
          (usuario.role === "admin" ? (
            <>
              <Typography
                sx={{
                  p: 2,
                  fontWeight: "bold",
                  borderBottom: "1px solid var(--gray-300)",
                }}
              >
                Funções admin
              </Typography>

              <Stack spacing={2} sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModalAddProduto(true)}
                  startIcon={<ShoppingBagIcon />}
                >
                  Adicionar Produto
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModalAddUsuario(true)}
                  startIcon={<PersonIcon />}
                >
                  Adicionar Usuário
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModalEditInfos(true)}
                  startIcon={<StoreMallDirectoryIcon />}
                >
                  Editar infos da loja
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModalAddProduto(true)}
                  startIcon={<DashboardIcon />}
                >
                  Dashboard
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setUsuario(null)}
                  startIcon={<LogoutIcon />}
                >
                  Sair
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  p: 2,
                  fontWeight: "bold",
                  borderBottom: "1px solid var(--gray-300)",
                }}
              >
                Bem-vindo, {usuario.nome}!
              </Typography>
            </>
          ))}

        {!usuario && (
          <>
            <Typography
              sx={{
                p: 2,
                fontWeight: "bold",
                borderBottom: "1px solid var(--gray-300)",
                minWidth: 300,
              }}
            >
              Login
            </Typography>
            <Stack>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ m: 2 }}
              />

              <TextField
                id="outlined-basic"
                label="Senha"
                variant="outlined"
                sx={{ m: 2 }}
              />
            </Stack>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={async () => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setUsuario({
                    nome: "João",
                    email: "joao@email.com",
                    role: "admin",
                  });
                }, 2000);
              }}
            >
              {!loading ? (
                "Entrar"
              ) : (
                <CircularProgress color="inherit" size={20} />
              )}
            </Button>
          </>
        )}
      </Popover>

      <ModalAddProduto
        open={openModalAddProduto}
        handleClose={() => setOpenModalAddProduto(false)}
      />

      <ModalAddUsuario
        open={openModalAddUsuario}
        handleClose={() => setOpenModalAddUsuario(false)}
      />

      <ModalEditInfos
        open={openModalEditInfos}
        handleClose={() => setOpenModalEditInfos(false)}
      />
    </>
  );
};
