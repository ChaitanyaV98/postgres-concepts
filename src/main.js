import {
  createUsersTable,
  insertUser,
  fetchAllUsers,
  updateUserEmail,
  deleteUser,
} from "./concepts/basic-queries.js";
import {
  getUsersWhere,
  getSortedUsers,
  getPaginatedUsers,
} from "./concepts/filtering-sorting.js";

async function testBasicQueries(params) {
  try {
    await createUsersTable();
    await insertUser("xyz", "xyz@gmail.com");
    await insertUser("John Doe", "john@gmail.com");
    await insertUser("Travis Mclaren", "travis@gmail.com");
    await insertUser("Chai", "chai@gmail.com");
    await insertUser("Jennifer Lopez", "jennifer@gmail.com");
    await fetchAllUsers();
    await updateUserEmail("Chai", "chaitanya@gmail.com");
    await deleteUser("John Doe");
  } catch (e) {
    console.log("Error", e);
  }
}

async function testFilterAndSortQueries(params) {
  try {
    //get all users whose name starts with J
    // const filteredNames = await getUsersWhere("username LIKE 'J%'");
    // console.log("Filtered names starting with J", filteredNames);
    // const sortedUsers = await getSortedUsers("created_at", "DESC");
    // console.log("SORTED USERS---", sortedUsers);
    const paginatedUsers = await getPaginatedUsers(2, 0);

    console.log("fetch 1st 2 users based on paginated users", paginatedUsers);
  } catch (e) {
    console.log("Error in main file filter", e);
  }
}

async function testAllQueries(params) {
  try {
    // await testBasicQueries();
    await testFilterAndSortQueries();
  } catch (e) {
    console.log("error running queries", e);
  }
}

testAllQueries();
