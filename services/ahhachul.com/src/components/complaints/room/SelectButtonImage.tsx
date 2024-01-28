import Image, { type StaticImageData } from "next/image";

function SelectButtonImage({ image }: { image: StaticImageData }) {
  return (
    <Image
      priority
      alt=""
      src={image.src}
      width={image.width / 3}
      height={image.height / 3}
    />
  );
}

export default SelectButtonImage;
