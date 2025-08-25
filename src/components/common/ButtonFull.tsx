import React from "react";

interface ButtonFullProps {
  text: string;
  title: string;
  bgColor: string;
  textColor: string;
  handler: () => void;
  icon?: React.ReactNode;
}

const ButtonFull: React.FC<ButtonFullProps> = ({
  text,
  title,
  bgColor,
  textColor,
  handler,
  icon,
  ...rest
}) => {
  return (
    <button
      {...rest}
      onClick={handler}
      title={title}
      className={`${bgColor} ${textColor} cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 w-full flex items-center justify-center gap-2`}
    >
      {text} {icon && icon}
    </button>
  );
};

export default ButtonFull;
