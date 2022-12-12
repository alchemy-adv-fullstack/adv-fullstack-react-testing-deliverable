import { Outlet } from 'react-router-dom';
import HumanityStatus from '../Humanity/HumanityStatus.jsx';
import styles from './TimelineBasePage.css';

export default function TimelineBasePage() {
  return (
    <div className={styles.base}>
      <Outlet />
      <HumanityStatus />
    </div>
  );
}
