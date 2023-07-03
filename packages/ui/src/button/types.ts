type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = NativeButtonProps & {
  isLoading?: boolean;
};
