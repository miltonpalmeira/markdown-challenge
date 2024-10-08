import React from "react";

interface UserListProps {
  users: string[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      <h2>Users Editing:</h2>
      {users.map((user) => (
        <div key={user}>{user}</div>
      ))}
    </div>
  );
};

export default UserList;
