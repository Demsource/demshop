import React from "react";

interface ButtonProps {
  text: string;
  title: string;
  bgColor: string;
  textColor: string;
  otherStyles?: string;
  handler: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  title,
  bgColor,
  textColor,
  handler,
  otherStyles,
  ...rest
}) => {
  return (
    <button
      {...rest}
      onClick={handler}
      title={title}
      className={`${bgColor} ${textColor} cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 ${otherStyles}`}
    >
      {text}
    </button>
  );
};

export default Button;
