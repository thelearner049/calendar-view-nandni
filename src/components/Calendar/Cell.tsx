import clsx from "clsx";

interface Props extends React.PropsWithChildren {
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  tabIndex?: number;
  onKeyDown?: () => void;
}

const Cell: React.FC<Props> = ({
  onClick,
  className,
  children,
  isActive = false,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      
      className={clsx(
        "h-18 flex items-center justify-center border-b border-r relative overflow-hidden ",
        !isActive && onClick
          ? "active:bg-gray-700 active:text-white hover:bg-gray-100  text-lg"
          : "",
        { "bg-blue-500 text-white": isActive },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Cell;
