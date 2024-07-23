"use client"

const BackdropGradientBlurBlob = ({ color, top, left, right, bottom, className }: {
  color: string,
  top?: string,
  left?: string,
  right?: string,
  bottom?: string,
  className?: string
}) => {
  const style = {
    background: `radial-gradient(circle, ${color} 0%, ${color}00 50%)`,
    top: top || 'auto',
    left: left || 'auto',
    right: right || 'auto',
    bottom: bottom || 'auto',
  };

  return (
    <div
      className={`absolute w-[50%] h-[50%] overflow-hidden z-[-1] rounded-[50%_50%_50%_50%] ${className}`}
      style={style}
    > </div>
  );
};

export default BackdropGradientBlurBlob;