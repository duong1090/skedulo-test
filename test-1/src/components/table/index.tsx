import { Spinner } from "components";
import "./styles.scss";
import { TableProps } from "./types";

const Table = <T extends Record<string, any>>({
  columns,
  data = [],
  loading,
}: TableProps<T>) => {
  const renderHeader = () => {
    return (
      <thead>
        <tr>
          {columns?.map((col, index) => (
            <th key={index} className="column">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderBody = () => {
    return (
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={"row" + rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={"col" + colIndex} className="column">
                {col.render
                  ? col.render(row)
                  : col.dataIndex
                    ? row[col.dataIndex]
                    : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const renderEmpty = () => {
    return <div className="no-data">Empty data</div>;
  };

  const renderLoading = () => {
    return (
      <div className="no-data">
        <Spinner />
      </div>
    );
  };

  return (
    <div className="cmp-table">
      {loading ? (
        renderLoading()
      ) : data.length ? (
        <table className="cmp-table">
          {renderHeader()}
          {renderBody()}
        </table>
      ) : (
        renderEmpty()
      )}
    </div>
  );
};

export default Table;
