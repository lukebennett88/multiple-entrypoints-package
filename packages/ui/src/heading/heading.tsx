import { type HeadingProps } from "./types";

export function Heading({ children, level, ...consumerProps }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag {...consumerProps}>{children}</Tag>;
}
