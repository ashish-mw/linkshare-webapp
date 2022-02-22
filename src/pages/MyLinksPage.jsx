import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Page from "../components/Page";
import AddNewShareForm from "../components/AddNewShareForm";
import LinkCard from "../components/LinkCard";
import { getAxiosError } from "../services/utils";
import { apiGetUserShares } from "../services/api";
import DispatchContext from "../contexts/DispatchContext";

const MyLinksPage = () => {
  const appDispatch = useContext(DispatchContext);
  const [myShares, setMyShares] = useState([]);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function getShares() {
      try {
        const { data } = await apiGetUserShares(request.token);
        setMyShares(data.shares);
      } catch (e) {
        appDispatch({
          type: "setMessage",
          value: { text: getAxiosError(e), type: "error" },
        });
      }
    }

    if (refresh) {
      getShares();
    }

    return () => request.cancel();
  }, [refresh, appDispatch]);

  function handleShareAddSuccess() {
    setRefresh((prev) => prev + 1);
  }

  function handleShareDelSuccess() {
    setRefresh((prev) => prev + 1);
  }

  return (
    <Page title="My Links">
      <AddNewShareForm onSuccess={handleShareAddSuccess} />
      <div className="separator"></div>

      <h2>My links</h2>
      {myShares.map((s) => (
        <LinkCard share={s} key={s.id} onDelSuccess={handleShareDelSuccess} />
      ))}
    </Page>
  );
};

export default MyLinksPage;
