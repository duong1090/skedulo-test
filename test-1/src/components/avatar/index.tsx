import clsx from "clsx";
import "./styles.scss";
import { AvatarProps } from "./types";

const Avatar = ({
  src,
  alt,
  size = "medium",
  shape = "circle",
}: AvatarProps) => {
  return (
    <div className={clsx("cmp-avatar", `--${size}`, `--${shape}`)}>
      <img src={src} alt={alt} className="avatar-img" />
    </div>
  );
};

export default Avatar;
