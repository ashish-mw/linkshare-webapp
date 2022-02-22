import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Page from "../components/Page";
import { getAxiosError } from "../services/utils";
import { apiGetLinkShareInfo, apiUpdateLinkShare } from "../services/api";
import DispatchContext from "../contexts/DispatchContext";

const EditSharePage = () => {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);

  const [shareInfo, setShareInfo] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const request = axios.CancelToken.source();
    async function getShareInfo() {
      try {
        const { data } = await apiGetLinkShareInfo({ shareId }, request.token);
        setShareInfo(data.share);
        setNewTitle(data.share.title);
      } catch (e) {
        appDispatch({
          type: "setMessage",
          value: { text: getAxiosError(e), type: "error" },
        });
      }
    }
    if (shareId) {
      getShareInfo();
    }

    return () => request.cancel();
  }, [shareId, appDispatch]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function updateShareInfo() {
      try {
        await apiUpdateLinkShare({ shareId, title: newTitle }, request.token);
        setShareInfo(null);
        setNewTitle("");
        setSubmit(0);
        navigate("/my-links");
      } catch (e) {
        appDispatch({
          type: "setMessage",
          value: { text: getAxiosError(e), type: "error" },
        });
      }
    }

    if (submit && newTitle && shareId) {
      updateShareInfo();
    }

    return () => request.cancel();
  }, [submit, appDispatch, newTitle, shareId, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);
  }

  return (
    <Page title="Edit link">
      {shareInfo && (
        <>
          <div className="m-b-20">
            <button className="link" onClick={() => navigate(-1)}>
              Go back
            </button>
          </div>
          <h2>Editing {shareInfo.title}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title for your share</label>
            <input
              type="text"
              id="title"
              placeholder="Linux wiki"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            />

            <label htmlFor="link">Link</label>
            <input
              type="text"
              id="link"
              placeholder="https://en.wikipedia.org/wiki/Linux"
              disabled={true}
              value={shareInfo.link}
            />

            <input type="submit" value="Update link" disabled={!newTitle} />
          </form>
        </>
      )}
    </Page>
  );
};

export default EditSharePage;
