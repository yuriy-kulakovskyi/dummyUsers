import { useEffect, useState } from "react";
import UsersList from "./components/UsersList";

function App() {
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetch("https://dummyjson.com/users?limit=10")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.users);
          localStorage.setItem("users", JSON.stringify(data.users));
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, []);

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center">
      <UsersList
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}

export default App;
