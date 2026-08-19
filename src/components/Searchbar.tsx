// src/components/Searchbar.tsx

import styles from './Searchbar.module.css';

type Props = {
  onSearch: (value: string) => void;
};

export default function Searchbar({ onSearch }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>{`\u2315`}</span>
      <input
        type="text"
        className={styles.searchbar}
        placeholder="Search venues"
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}
