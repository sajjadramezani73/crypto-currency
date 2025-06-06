import React from "react";

interface Props {
  title?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  headerDivider?: boolean;
  children: React.ReactNode;
  childrenClassName?: string;
}

const Card: React.FC<Props> = ({
  title,
  className,
  children,
  icon,
  headerDivider = true,
  childrenClassName,
}) => {
  return (
    <div className={`bg-paper rounded-lg overflow-hidden ${className}`}>
      {(title || icon) && (
        <div
          className={`flex justify-between items-center pt-3 pb-2 px-4 font-medium text-titr ${
            headerDivider && "border-b border-border"
          }`}
        >
          <p className="font-bold text-titr">{title}</p>
          <span>{icon}</span>
        </div>
      )}
      {/* { && <Divider />} */}
      <div className={childrenClassName}>{children}</div>
    </div>
  );
};

export default Card;
