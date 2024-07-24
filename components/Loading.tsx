import clsx from "clsx";

interface LoadingProps {
  width?: number;
  height?: number;
  className?: string;
}

const Loading = ({ width = 24, height = 24, className }: LoadingProps) => {
  return (
    <div className="flex justify-center items-center">
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        className={clsx(
          `animate-spin rounded-full border-b-2 border-primary`,
          className
        )}
      ></div>
    </div>
  );
};

export default Loading;
