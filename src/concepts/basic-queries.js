//basic goal:
//1. How to do basic crud operation

//create a new table
//inserting a new record
//fetch all the records
//how to update
//delete
import query from "../db/db-connection.js";

export async function createUsersTable() {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

    )`;
  try {
    await query(createTableQuery);
    console.log("User table created successfully");
  } catch (e) {
    console.log("Error-----", e);
    throw e;
  }
}

export async function insertUser(username, email) {
  const insterUserQuery = `INSERT INTO users (username,email)
VALUES ($1, $2)
RETURNING *`;

  try {
    const res = await query(insterUserQuery, [username, email]);
    console.log("User inserted successfully", res);
  } catch (e) {
    console.log("Error while inserting into table", e);
  }
}

export async function fetchAllUsers() {
  const allUsers = `SELECT * FROM users`;
  try {
    const res = await query(allUsers);
    console.log("fetched all users", res);
    return res.rows;
  } catch (e) {
    console.log("error while fetching user details", e);
    throw e;
  }
}

//update useremail using username
export async function updateUserEmail(username, newEmail) {
  const updateUserEmail = `
    UPDATE users
    SET email=$2
    WHERE username= $1
    RETURNING *`;

  try {
    const res = await query(updateUserEmail, [username, newEmail]);

    if (res.rows.length > 0) {
      console.log("updated user successfully", res.rows[0]);
    } else {
      console.log("no user is found with given username");
      return null;
    }
  } catch (e) {
    console.log("error while updating user email");
    throw e;
  }
}

export async function deleteUser(username) {
  const deleteQuery = `DELETE FROM users
    WHERE username=$1
    RETURNING *`;

  try {
    const res = await query(deleteQuery, [username]);
    console.log("deleted user successfully", res);
    if (res.rows.length > 0) {
      console.log("User deleted successfully!", res.rows[0]);
      return res.rows[0];
    } else {
      console.log("No user found with given username");
      return null;
    }
  } catch (e) {
    console.log("error while deleting user", e);
    throw e;
  }
}
