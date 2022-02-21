const AddNewShareForm = () => {
  return (
    <>
      <h2>Add a new link</h2>
      <form>
        <label htmlFor="title">Title for your share</label>
        <input type="text" id="title" placeholder="Linux wiki" />

        <label htmlFor="link">Link</label>
        <input
          type="text"
          id="link"
          placeholder="https://en.wikipedia.org/wiki/Linux"
        />

        <input type="submit" value="Submit link" />
      </form>
    </>
  );
};

export default AddNewShareForm;
