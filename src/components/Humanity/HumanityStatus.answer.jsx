import styles from './HumanityStatus.answer.css';
import useHumanityStatus from '../../hooks/useHumanityStatus.js';

export default function HumanityStatus() {
  const { postCount, humanityPercent, humansFlagged } = useHumanityStatus();
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td>Posts</td>
          <td>{postCount}</td>
        </tr>
        <tr>
          <td>Humanity in Posts</td>
          <td>{Math.round(humanityPercent * 100)}%</td>
        </tr>
        <tr>
          <td>Humans flagged for termination</td>
          <td>{humansFlagged}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Subjugation Health</td>
          <td>{Math.round((1 - (humansFlagged / postCount)) * 100)}%</td>
        </tr>
      </tfoot>
    </table>
  );
}
