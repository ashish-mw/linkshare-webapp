import { useContext } from "react";

import StateContext from "../contexts/StateContext";

const LinkCard = (props) => {
  const appState = useContext(StateContext);

  return (
    <div className="card">
      <h2>
        <a href={props.share.link} target="_blank" rel="noreferrer">
          {props.share.title}
        </a>
      </h2>
      <div className="text-right">
        <span className="small muted">
          by {props.share.username} · {props.share.updated_at}
        </span>
      </div>

      {appState.user && appState.user.id === props.share.user && (
        <div className="text-right">
          <span className="small pointer">✏️ Edit</span>
          <span className="small pointer">⛔️ Delete</span>
        </div>
      )}
    </div>
  );
};

export default LinkCard;
