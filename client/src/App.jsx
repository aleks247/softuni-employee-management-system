import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import UserList from "./components/UserList";
import UserSaveModal from "./components/UserSaveModal";

function App() {
    const [showCreateUser, setShowCreateUser] = useState(false);

    const [users, setUsers] = useState([]);

    const [refresh, setRefresh] = useState(true);

    const [sortUsers, setSortUsers] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(Object.values(data));
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [refresh]);

    const addUserClickHandler = () => {
        setShowCreateUser(true);
    };

    const forceRefresh = () =>{
        setRefresh(state => !state)
    }

    const addUserSubmitHandler = (event) => {
        event.preventDefault();
        // setShowCreateUser()
        const formData = new FormData(event.target);

        const { country, city, street, streetNumber, ...userData } =
            Object.fromEntries(formData);
        userData.address = {
            country,
            city,
            street,
            streetNumber,
        };

        userData.createdAt = new Date().toISOString();
        userData.updatedAt = new Date().toISOString();

        fetch("http://localhost:3030/jsonstore/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then(() => {
                closeUserModalHandler();
                setRefresh((prev) => !prev);
            })
            .catch((err) => alert(err.message))
    };

    const closeUserModalHandler = () => {
        setShowCreateUser(false);
    };

    const sortUsersHandler = () => {
        if (sortUsers) {
            setUsers(state => [...state].sort((userA, userB)=> new Date(userB.createdAt) - new Date(userA.createdAt)))
        }else {
            setUsers(state => [...state].sort((userA, userB)=> new Date(userB.createdAt) - new Date(userA.createdAt)).reverse())
        }
        setSortUsers(state => !state);
    }

    return (
        <main>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search />

                    <UserList users={users} forceRef={forceRefresh} onSort={sortUsersHandler}/>

                    <button
                        onClick={addUserClickHandler}
                        className="btn-add btn"
                    >
                        Add new user
                    </button>

                    <Pagination />
                </section>

                {showCreateUser && (
                    <UserSaveModal
                        onClose={closeUserModalHandler}
                        onSubmit={addUserSubmitHandler}
                    />
                )}
            </main>
            <Footer />
        </main>
    );
}

export default App;
