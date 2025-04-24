import { defineStore } from "pinia";
import { ref } from "vue";

export const useCustomerStore = defineStore("customer", () => {
  const users = ref([
    {
      id: 1,
      name: "John Deo",
      email: "johndoe2211@gmail.com",
      phone: "+33757005467",
      gender: "Male",
      role: "UI/UX Designer",
      avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
      address: "2239 Hog Camp Road Schaumburg",
    },
    {
      id: 2,
      name: "Shelby Goode",
      email: "shelbygoode481@gmail.com",
      phone: "+33757005467",
      gender: "Female",
      role: "Frontend Developer",
      avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      address: "123 Main Street New York",
    },
    {
      id: 3,
      name: "Robert Bacins",
      email: "robertbacins4182@com",
      phone: "+33757005467",
      gender: "Male",
      role: "Backend Developer",
      avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      address: "456 Oak Avenue Chicago",
    },
  ]);

  // Simulate API: fetch all users
  const fetchUsers = async () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(users.value), 500)
    );
  };

  const addUser = async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("user", user);
        user.id = Date.now();
        users.value.push(user);
        resolve(user);
      }, 500);
    });
  };

  // Simulate API: update user
  const updateUser = async (updatedUser) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const idx = users.value.findIndex((u) => u.id === updatedUser.id);
        if (idx !== -1) users.value[idx] = { ...updatedUser };
        resolve(updatedUser);
      }, 500);
    });
  };

  // Simulate API: delete user
  const deleteUser = async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        users.value = users.value.filter((u) => u.id !== userId);
        resolve();
      }, 500);
    });
  };

  return { users, fetchUsers, addUser, updateUser, deleteUser };
});
