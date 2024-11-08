import { writable } from "svelte/store";
import { RESTClient } from "../Utils/RESTClient";
export const user = writable(null);
const authClient = new RESTClient("auth");
const userClient = new RESTClient("users");
const userStore = writable([]);
export const userEmail = writable("");

const fetchUsers = async () => {
  const response = await userClient.get("/vendor/all");
  if (response) {
    userStore.update((users) =>  response);
  } else {
    console.error("Error fetching users: ", response.message);
  }
};

const addUser = async (user) => {
  const response = await authClient.post("/inviteVendorAdminUser", user);
  if (response.code) {
    console.error("Error adding user: ", response.message);
    throw (response.message)   
  }
  userStore.update((users) => [...users, response.user]);
};

const updateUser = async (user, userstatus = "active") => {
  user.status = userstatus;
  const { email, firstName, lastName, role, status } = user;
  const response = await userClient.patch(`/vendor/edit/${user._id}`, {
    email,
    firstName,
    lastName,
    role,
    status,
  });
  if (response.code) {
    console.error("Error updating user: ", response.message);
    return;
  }
  userStore.update((users) =>
    users.map((u) =>
      u.id === user.id ? { ...u, email, firstName, lastName, role, status } : u
    )
  );
};

const updateProfile = async (userData) => {
  // Assuming userData has all the fields
  const { email, firstName, lastName, role, status = "active", avatar } = userData;  
  // Update userStore
  userStore.update((users) =>
      users.map((u) =>
          u.id === userData.id ? { ...u, email, firstName, lastName, role, status, avatar } : u)
  );
};


const role_permissions = writable([]); 

export { userStore, fetchUsers, addUser, updateUser, updateProfile,role_permissions };
