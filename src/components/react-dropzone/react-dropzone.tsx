import styles from "./dropzone.module.scss";
import Dropzone from "react-dropzone";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// eslint-disable-next-line no-unused-vars
export default function ReactDropzone(props: {
  image: File[] | null;
  setImage: (image: File[] | null) => void;
  type: string;
  multiple?: boolean;
}) {
  const { image, setImage, type, multiple } = props;

  const acceptedImgFiles = {
    "image/jpeg": [],
    "image/png": [],
  };

  const acceptedPdfFiles = {
    "application/pdf": [".pdf"],
  };

  const statusDropzone = (isDragActive: boolean, isDragReject: boolean) => {
    const classesAccepted = [
      styles.dropContainer,
      styles.dropContainerActive,
    ].join(" ");
    const classesRejected = [
      styles.dropContainer,
      styles.dropContainerReject,
    ].join(" ");

    if (isDragActive && !isDragReject) {
      return classesAccepted;
    } else if (isDragReject) {
      return classesRejected;
    }
    return styles.dropContainer;
  };

  const renderMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      if (type === "img") {
        if (image) {
          return <p>Clique ou Arraste para alterar a foto</p>;
        }

        return <p>Clique ou Arraste a foto Principal aqui...</p>;
      } else {
        if (image) {
          return <p>Clique ou Arraste para alterar o PDF</p>;
        }

        return <p>Clique ou Arraste o PDF aqui...</p>;
      }
    }

    if (isDragReject) {
      return <p className={styles.error}>Arquivo não suportado</p>;
    }

    return <p className={styles.success}>Solte os arquivos aqui...</p>;
  };

  const onUpload = (files: File[]) => {
    setImage(files);
  };

  return (
    <>
      <Dropzone
        multiple={multiple}
        accept={type === "img" ? acceptedImgFiles : acceptedPdfFiles}
        onDropAccepted={onUpload}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <section style={{ fontFamily: "Inter" }}>
            <div
              className={statusDropzone(isDragActive, isDragReject)}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <span>{renderMessage(isDragActive, isDragReject)}</span>
            </div>
          </section>
        )}
      </Dropzone>
      {image && <FileList image={image} setImage={setImage} />}
    </>
  );
}

// eslint-disable-next-line no-unused-vars
function FileList(props: {
  image: File[] | null;
  setImage: (image: File[] | null) => void;
}) {
  const { image, setImage } = props;

  const formatFileSize = (size: number) => {
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) + " " + units[i];
  };

  return (
    <div className={styles.container}>
      {image.map((file, index) => (
        <li key={file.name}>
          <div className={styles.fileInfo}>
            <img
              className={styles.preview}
              src={URL.createObjectURL(file)}
              alt="Foto Principal"
            />
            <div>
              <span>{file.name}</span>
              <span>
                {formatFileSize(file.size)}{" "}
                <button
                  onClick={() => {
                    const newFiles = image.filter((file, i) => i !== index);
                    setImage(newFiles);
                  }}
                >
                  Excluir
                </button>
              </span>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}
