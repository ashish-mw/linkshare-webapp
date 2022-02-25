import axios from "axios";
import { Link } from "react-router-dom";
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
        <>
        <div className="spacer-10"></div>
        <div className="text-right">
          <div className="card-inline-btn">
          <Link
            className="small no-underline"
            to={`/my-links/edit/${props.share.id}`}
          >
          <svg id="Group_2" data-name="Group 2" xmlns="http://www.w3.org/2000/svg" width="24.12" height="24.12" viewBox="0 0 24.12 24.12">
            <path id="Path_6" data-name="Path 6" d="M128.73,70.79a12.074,12.074,0,1,1,8.524-3.536,12.06,12.06,0,0,1-8.524,3.536Zm0-22.914a10.866,10.866,0,1,0,7.671,3.183A10.853,10.853,0,0,0,128.73,47.876Z" transform="translate(-116.67 -46.67)" fill="#fff"/>
            <g id="noun-edit-4619821" transform="translate(7.034 7.034)">
              <path id="Path_7" data-name="Path 7" d="M145.059,143.87l-4.662,4.662a.4.4,0,0,0-.114.239L140,151.3a.4.4,0,0,0,.4.442l.044,0,2.534-.281a.4.4,0,0,0,.239-.114l4.66-4.661Z" transform="translate(-139.999 -141.695)" fill="#fff"/>
              <path id="Path_8" data-name="Path 8" d="M391.214,49.737l-1.126-1.126a1.195,1.195,0,0,0-1.689,0l-1.263,1.263,2.815,2.816,1.263-1.263h0a1.195,1.195,0,0,0,0-1.689Z" transform="translate(-381.513 -48.261)" fill="#fff"/>
            </g>
          </svg>
          Edit
          </Link>
          </div>
          <div className="card-inline-btn">
          <span
            className="small pointer"
            onClick={() => setDel(props.share.id)}
          >
            <svg id="Group_1" data-name="Group 1" xmlns="http://www.w3.org/2000/svg" width="24.12" height="24.12" viewBox="0 0 24.12 24.12">
              <path id="Path_1" data-name="Path 1" d="M233.127,178.618h-9.648a1.809,1.809,0,1,1,0-3.618h9.648a1.809,1.809,0,1,1,0,3.618Zm-9.648-2.412a.6.6,0,1,0,0,1.206h9.648a.6.6,0,1,0,0-1.206Z" transform="translate(-216.243 -168.367)" fill="#fff"/>
              <path id="Path_2" data-name="Path 2" d="M292.269,131.948a.6.6,0,0,1-.6-.6v-1.206a1.809,1.809,0,0,1,1.809-1.809h2.412a1.809,1.809,0,0,1,1.809,1.809v.6a.6.6,0,1,1-1.206,0v-.6a.6.6,0,0,0-.6-.6h-2.412a.6.6,0,0,0-.6.6v1.206a.6.6,0,0,1-.6.6Z" transform="translate(-282.621 -124.109)" fill="#fff"/>
              <path id="Path_3" data-name="Path 3" d="M303.935,284.822a.6.6,0,0,1-.6-.6V280.6a.6.6,0,1,1,1.206,0v3.618a.6.6,0,0,1-.6.6Z" transform="translate(-293.684 -267.938)" fill="#fff"/>
              <path id="Path_4" data-name="Path 4" d="M373.935,284.822a.6.6,0,0,1-.6-.6V280.6a.6.6,0,1,1,1.206,0v3.618a.6.6,0,0,1-.6.6Z" transform="translate(-360.066 -267.938)" fill="#fff"/>
              <path id="Path_5" data-name="Path 5" d="M252.841,232.525h-4.824A3.018,3.018,0,0,1,245,229.51v-7.236a.6.6,0,0,1,.6-.6h9.648a.6.6,0,0,1,.6.6v7.236a3.018,3.018,0,0,1-3.015,3.015Zm-6.633-9.648v6.633a1.809,1.809,0,0,0,1.809,1.809h4.824a1.809,1.809,0,0,0,1.809-1.809v-6.633Z" transform="translate(-238.369 -212.626)" fill="#fff"/>
              <path id="Path_6" data-name="Path 6" d="M128.73,70.79a12.074,12.074,0,1,1,8.524-3.536,12.06,12.06,0,0,1-8.524,3.536Zm0-22.914a10.866,10.866,0,1,0,7.671,3.183A10.853,10.853,0,0,0,128.73,47.876Z" transform="translate(-116.67 -46.67)" fill="#fff"/>
            </svg>
            Delete
          </span>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default LinkCard;
