import { useState } from "react";

const Home = () => {
  const users = [
    { id: 1, name: "Rahul", status: "active" },
    { id: 2, name: "Anita", status: "inactive" },
    { id: 3, name: "Vikram", status: "active" },
    { id: 4, name: "Sneha", status: "inactive" },
    { id: 5, name: "Aman", status: "active" },
  ];

  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [filteredList, setFilteredList] = useState(users);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const searchFilter = (value, status) => {
    const filtered = users.filter((user) => {
      if (
        user.name.toLowerCase().includes(value) &&
        (user.status === status || status === "all")
      ) {
        return user;
      }
      return false;
    });
    return filtered;
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "" && status === "all") {
      setFilteredList(users);
      return;
    }
    if (value === "") {
      const statusfilter = searchFilter("", status);
      setFilteredList(statusfilter);
      return;
    }
    setSearch(value);
    const newList = searchFilter(value, status);
    setFilteredList(newList);
    // debounce(() => {
    //   console.log("val", e.target.value);
    // }, 500);
  };

  const handleStatusOptions = (e) => {
    setStatus(e.target.value);
    const statusValue = e.target.value;

    if (statusValue === "all" && search !== "") {
      setFilteredList(users);
      return;
    }
    const status = searchFilter(search, statusValue);
    setFilteredList(status);
  };

  return (
    <main>
      <div className="border px-2 py-4">
        <section className="flex gap-2 border p-2 w-4/6 rounded-md">
          <div className="flex gap-2">
            <label htmlFor="name">Search Users</label>
            <input
              className="border border-gray-600"
              name="search"
              id="name"
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="filter">Status</label>
            <select
              id="filter"
              className="border border-gray-600"
              onClick={handleStatusOptions}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">InActive</option>
            </select>
          </div>
        </section>
        <section className="mt-4 mx">
          <p className="font-semibold">User Name - Status</p>
          <ul>
            <li>{filteredList.length === 0 ? "No Users Found" : ""}</li>
            {filteredList.map((user, index) => {
              return (
                <li key={user.id}>
                  {user.name} - {user.status}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Home;
