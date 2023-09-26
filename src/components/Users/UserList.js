import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import Card from "../UI/Card";
import classes from "./UserList.module.css";
import { saveAs } from "file-saver";

const UsersList = (props) => {
  const [editedUserId, setEditedUserId] = useState(null);
  const [editedUserName, setEditedUserName] = useState("");
  const [editedUserAge, setEditedUserAge] = useState("");
  const [userData, setUserData] = useState(props.users);

  useEffect(() => {
    setUserData(props.users);
  }, [props.users]);

  const handleDelete = (userId) => {
    const updatedUsers = userData.filter((user) => user.id !== userId);
    setUserData(updatedUsers);
    // Handle the updatedUsers array as you would in your codebase.
  };
  console.log(props.users, "props.users");
  console.log(userData, "userData");
  const handleEdit = (userId) => {
    setEditedUserId(userId);
    const userToEdit = userData.find((user) => user.id === userId);
    console.log(userToEdit, "1111111");
    setEditedUserName(userToEdit?.name);
    setEditedUserAge(userToEdit?.age);
  };

  const handleSave = (userId) => {
    const updatedUsers = userData?.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          name: editedUserName,
          age: editedUserAge,
        };
      }
      return user;
    });
    setUserData((_prev) => {
      return updatedUsers;
    });

    console.log(`saved:`, updatedUsers);
    // Handle the updatedUsers array as you would in your codebase.
    setEditedUserId(null);
    setEditedUserName("");
    setEditedUserAge("");
  };

  const handleCancel = () => {
    setEditedUserId(null);
    setEditedUserName("");
    setEditedUserAge("");
  };

  const exportToCSV = () => {
    const csvData = userData
      .map((user) => `${user.name},${user.age}`)
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "users.csv");
  };

  return (
    <Card className={classes.users}>
      <ul>
        {userData?.map((user) => (
          <li id={user.id} key={user.id}>
            {editedUserId === user.id ? (
              <>
                <input 
                  type="text"
                  value={editedUserName}
                  onChange={(event) => setEditedUserName(event.target.value)}
                />
                <input
                  type="number"
                  value={editedUserAge}
                  onChange={(event) => setEditedUserAge(event.target.value)}
                />
                <button
                  className={classes.buttonsave}
                  onClick={() => handleSave(user.id)}
                >
                  Save
                </button>
                <button className={classes.button} onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {user.name} ({user.age} years old)
                <button
                  className={classes.buttonedit}
                  onClick={() => handleEdit(user.id)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className={classes.button}
                  onClick={() => handleDelete(user.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button className={classes.buttondownload} onClick={exportToCSV}>
        <FontAwesomeIcon icon={faFileCsv} />
      </button>
    </Card>
  );
};

export default UsersList;
