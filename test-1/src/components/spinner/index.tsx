import "./styles.scss";

const Spinner = () => {
  return (
    <div className="cmp-spinner">
      {[...Array(8)].map((_, i) => (
        <div key={i} />
      ))}
    </div>
  );
};

export default Spinner;
