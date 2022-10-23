export interface ButtonProps {
    label: string;
    type?: "button" | "submit" | "reset" | undefined;
    func?: () => void;
    classProp: string;
}