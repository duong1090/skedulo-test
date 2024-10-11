import { Avatar, Search, Table } from "components";
import { User } from "model";
import { useState } from "react";
import {
  getUsersAsync,
  getUsersSelector,
  useAppDispatch,
  useAppSelector,
} from "states";
import "./styles.scss";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const { data, fetching } = useAppSelector(getUsersSelector);
  const [searchTerm, setSearchTerm] = useState("");

  // function ----------------------------------------------------------------------------------------------------------------------
  const handleSearch = () => {
    dispatch(getUsersAsync({ searchTerm, perPage: 100 })).finally(() => {
      setSearchTerm("");
    });
  };

  // render ------------------------------------------------------------------------------------------------------------------------
  const renderAvatar = (item: User) => {
    return <Avatar src={item.avatar} alt={item.username} size="medium" />;
  };

  return (
    <div className="feat-users-list">
      <Search
        value={searchTerm}
        onChange={setSearchTerm}
        disabled={searchTerm.length < 3}
        onSearch={handleSearch}
      />
      <Table
        data={data}
        loading={fetching}
        columns={[
          { label: "Avatar", render: renderAvatar },
          { label: "Username", dataIndex: "username" },
          { label: "Type", dataIndex: "type" },
          { label: "Score", dataIndex: "score" },
        ]}
      />
    </div>
  );
};

export default UsersList;
