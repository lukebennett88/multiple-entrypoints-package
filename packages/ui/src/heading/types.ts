type NativeHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export type HeadingProps = NativeHeadingProps & {
  level: "1" | "2" | "3" | "4" | "5" | "6";
};
