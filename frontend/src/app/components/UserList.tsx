import React from "react";

interface UserListProps {
  users: string[];
  currentUser: string | null;
}

const UserList: React.FC<UserListProps> = ({ users, currentUser }) => {
  return (
    <div>
      <h2>Users Editing:</h2>
      {users.map((user) => (
        <div key={user}>
          {user} {user === currentUser ? "(You)" : ""}
        </div>
      ))}
    </div>
  );
};

export default UserList;
