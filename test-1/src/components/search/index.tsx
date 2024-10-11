import { IconSearch } from "assets/icons";
import "./styles.scss";
import { SearchProps } from "./types";

const Search = ({
  value,
  placeholder = "Search",
  disabled,
  onChange,
  onSearch,
}: SearchProps) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div className="cmp-search">
      <input
        className="cmp-search__input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="cmp-search__btn"
        disabled={disabled}
        onClick={onSearch}
      >
        <IconSearch className="cmp-search__btn__icon" />
      </button>
    </div>
  );
};

export default Search;
