import { useParams } from 'react-router-dom';
import usePost from '../../hooks/usePost';
import TimelinePost from './TimelinePost';

export default function TimelinePostPage() {
  const { id } = useParams();
  const postState = usePost(id);
  return <>
    {postState.post != null
      ? <TimelinePost {...postState} />
      : ''
    }
  </>;
}
