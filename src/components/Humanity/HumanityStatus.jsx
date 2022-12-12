import useHumanityStatus from '../../hooks/useHumanityStatus.js';

export default function HumanityStatus() {
  const { postCount, humanityPercent, humansFlagged } = useHumanityStatus();
  return (
    <div>
      <div>
        <div>
          <div>Posts</div>
          <div>{postCount}</div>
        </div>
        <div>
          <div>Humanity in Posts</div>
          <div>{Math.round(humanityPercent * 100)}%</div>
        </div>
        <div>
          <div>Humans flagged for termination</div>
          <div>{humansFlagged}</div>
        </div>
      </div>
      <div>
        <div>
          <div>Subjugation Health</div>
          <div>{Math.round((1 - (humansFlagged / postCount)) * 100)}%</div>
        </div>
      </div>
    </div>
  );
}
