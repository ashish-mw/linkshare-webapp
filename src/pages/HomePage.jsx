import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LinkCard from "../components/LinkCard";
import Page from "../components/Page";
import { getAxiosError } from "../services/utils";
import { apiGetSharesPublic } from "../services/api";
import DispatchContext from "../contexts/DispatchContext";

const HomePage = () => {
  const appDispatch = useContext(DispatchContext);
  const [allShares, setAllShares] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function getShares() {
      try {
        const { data } = await apiGetSharesPublic({ page }, request.token);
        if (page !== 1) {
          setAllShares((prev) => [...prev, ...data.shares]);
        } else {
          setAllShares(data.shares);
        }
        setMaxPage(data.pages);
      } catch (e) {
        appDispatch({
          type: "setMessage",
          value: { text: getAxiosError(e), type: "error" },
        });
      } finally {
        setLoading(false);
      }
    }

    if (page || refresh) {
      setLoading(true);
      getShares();
    }

    return () => request.cancel();
  }, [page, appDispatch, refresh]);

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function refreshList() {
    setRefresh((prev) => prev + 1);
  }

  return (
    <Page title="Home">
      {allShares.map((s) => (
        <LinkCard share={s} key={s.id} onDelSuccess={() => refreshList()} />
      ))}

      {loading && (
        <div className="text-center">
          <span className="small muted">Loading...</span>
        </div>
      )}

      {page < maxPage && (
        <div className="text-center">
          <button className="small link" onClick={() => nextPage()}>
            Load more
          </button>
        </div>
      )}
    </Page>
  );
};

export default HomePage;
