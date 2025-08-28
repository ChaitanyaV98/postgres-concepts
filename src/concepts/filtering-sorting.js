import query from "../db/db-connection.js";

//where clause
export async function getUsersWhere(condition) {
  const getUsersQuery = `SELECT * FROM users
    WHERE ${condition}`;
  try {
    const res = await query(getUsersQuery);
    return res.rows;
  } catch (e) {
    console.log("error occured while applying where condition");
  }
}

export async function getSortedUsers(column, order = "ASC") {
  const sortColumn = `SELECT * FROM users
    ORDER BY ${column} ${order} `;

  try {
    const res = await query(sortColumn);
    return res.rows;
  } catch (error) {
    console.log("error while applying sort condition", error);
  }
}

export async function getPaginatedUsers(limit, offset) {
  const getPaginatedQuery = `SELECT * FROM users
    LIMIT $1 OFFSET $2`;

  try {
    const result = await query(getPaginatedQuery, [limit, offset]);
    return result;
  } catch (e) {
    console.log("Error when doing pagination");
  }
}
