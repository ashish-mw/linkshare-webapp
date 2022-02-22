import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { getAxiosError } from "../services/utils";
import { apiDeleteLinkShare } from "../services/api";

import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

const LinkCard = (props) => {
  const { onDelSuccess } = props;
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [del, setDel] = useState(null);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function deleteShare() {
      try {
        const payload = {
          id: del,
        };

        await apiDeleteLinkShare(payload);
        setDel(null);
        onDelSuccess();
      } catch (e) {
        appDispatch({
          type: "setMessage",
          value: { text: getAxiosError(e), type: "error" },
        });
      }
    }

    if (del) {
      deleteShare();
    }
    return () => request.cancel();
  }, [del, appDispatch, onDelSuccess]);

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
          <span
            className="small pointer"
            onClick={() => setDel(props.share.id)}
          >
            ⛔️ Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default LinkCard;
