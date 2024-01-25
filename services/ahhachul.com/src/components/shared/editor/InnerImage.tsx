import { css } from "@emotion/react";
import { ContentBlock, ContentState } from "draft-js";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CircleCloseSVG } from "~/assets/icons";
import { PATH } from "~/constants/path";

interface BlockComponentProps {
  contentState: ContentState;
  block: ContentBlock;
}

const imgWrapStyle = css`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;

  & > img {
    margin: 0;
    width: 100%;
    box-sizing: border-box;
  }

  & > button {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
  }
`;

const scrimCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 1px);
  background-color: rgb(0 0 0 / 45%);
`;

const Image = (props: BlockComponentProps) => {
  const { block, contentState } = props;
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();

  const pathname = usePathname();
  const [editable, setEditable] = useState(false);

  const handleEditable = () => {
    if (alreadyDeleted) {
      setEditable(false);
      return;
    }

    if (pathname === PATH.WRITE) {
      setEditable((prev) => !prev);
    }
  };

  const [alreadyDeleted, setAlreadyDeleted] = useState(false);
  const handleDeleteImage = () => {
    contentState.replaceEntityData(block.getEntityAt(0), {});
    setEditable(false);
    setAlreadyDeleted(true);
  };

  return (
    <div css={imgWrapStyle} onClick={handleEditable}>
      <img src={src} alt={src} role="presentation" />
      {editable && (
        <button onClick={handleDeleteImage}>
          <CircleCloseSVG />
        </button>
      )}
      {editable && !alreadyDeleted && <div css={scrimCss} />}
    </div>
  );
};

export const InnerImage = (props: BlockComponentProps) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const type = entity.getType();

  let media = null;
  if (type === "image") {
    media = <Image {...props} />;
  }

  return media;
};

export const imageBlockRenderer = (block: ContentBlock) => {
  if (block.getType() === "atomic") {
    return {
      component: InnerImage,
      editable: false,
    };
  }
  return null;
};
