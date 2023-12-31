import { BsImage } from 'react-icons/bs';
import { styled } from 'styled-components';

const FileIcon = styled.div`
  color: var(--color-gray5);
  width: 23px;
  cursor: pointer;
  transition: scale 0.3s ease-in-out;
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    scale: 110%;
    transition: scale 0.2s ease-in-out;
  }
`;

const FileName = styled.div`
  font-size: 13px;
  overflow: hidden;
`;

const AttachFileInput = styled.input`
  display: none;
`;

export default function ImageFileIcon({
  id,
  imageFile,
  setImageFile,
}: {
  id: string;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const imageSize = files && files[0].size;
    if ((files && files.length === 1) || (imageSize && imageSize < 1048576)) {
      setImageFile(files[0]);
    }
  };
  return (
    <>
      <label htmlFor={`file${id}`}>
        {imageFile ? (
          <FileName>{imageFile.name}</FileName>
        ) : (
          <FileIcon>
            <BsImage />
          </FileIcon>
        )}
      </label>
      <AttachFileInput
        onChange={onFileChange}
        id={`file${id}`}
        type="file"
        accept="image/*"
      />
    </>
  );
}
