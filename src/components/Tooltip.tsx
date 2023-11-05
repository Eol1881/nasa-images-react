interface Props {
  isHovered: boolean;
  imageUrl: string;
  center: string;
  dateCreated: string;
}

export function Tooltip(props: Props) {
  const { isHovered, imageUrl, center, dateCreated } = props;

  return (
    <div className={`tooltip ${isHovered ? 'visible opacity-100' : 'invisible opacity-0'}`}>
      <img src={imageUrl} alt="Image" className="h-32 w-32 object-cover" />
      <p className="font-pixelify">Center: {center}</p>
      <p className="font-pixelify">{dateCreated}</p>
    </div>
  );
}
