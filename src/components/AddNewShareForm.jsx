import { useReducer, useMemo, useEffect, useContext } from "react";
import axios from "axios";
import { getAxiosError } from "../services/utils";
import { apiCreateLinkShare } from "../services/api";
import DispatchContext from "../contexts/DispatchContext";

const AddNewShareForm = ({ onSuccess }) => {
  const appDispatch = useContext(DispatchContext);

  const initState = {
    title: "",
    link: "",
    submitCount: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setTitle":
        return {
          ...state,
          title: action.value,
          submitCount: 0,
        };
      case "setLink":
        return {
          ...state,
          link: action.value,
          submitCount: 0,
        };
      case "submit":
        return {
          ...state,
          submitCount: state.submitCount + 1,
        };
      case "reset":
        return {
          ...state,
          title: "",
          link: "",
          submitCount: 0,
        };
      default:
        return { ...state };
    }
  }

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function addShare() {
      try {
        const payload = {
          title: state.title,
          link: state.link,
        };
        await apiCreateLinkShare(payload, request.token);
        onSuccess();
        dispatch({ type: "reset" });
      } catch (e) {
        appDispatch({
          type: "setMessage",
          value: { text: getAxiosError(e), type: "error" },
        });
      }
    }

    if (state.submitCount && state.title && state.link) {
      addShare();
    }

    return () => request.cancel();
  }, [
    state.submitCount,
    state.title,
    state.link,
    appDispatch,
    dispatch,
    onSuccess,
  ]);

  const isFormValid = useMemo(() => {
    if (state.title && state.link) {
      return true;
    }
    return false;
  }, [state.title, state.link]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "submit" });
  }

  return (
    <>
      <h2>Add a new link</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title for your share</label>
        <input
          type="text"
          id="title"
          placeholder="Linux wiki"
          onChange={(e) =>
            dispatch({ type: "setTitle", value: e.target.value })
          }
          value={state.title}
        />

        <label htmlFor="link">Link</label>
        <input
          type="text"
          id="link"
          placeholder="https://en.wikipedia.org/wiki/Linux"
          onChange={(e) => dispatch({ type: "setLink", value: e.target.value })}
          value={state.link}
        />

        <input type="submit" value="Submit link" disabled={!isFormValid} />
      </form>
    </>
  );
};

export default AddNewShareForm;
