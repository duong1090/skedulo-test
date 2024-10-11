export interface SearchProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (text: string) => void;
  onSearch?: () => void;
}
