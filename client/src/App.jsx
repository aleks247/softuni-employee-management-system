import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import UserList from "./components/UserList";
import CreateUserModal from "./components/CreateUserModal";

function App() {
    const [showCreateUser, setShowCreateUser] = useState(false);

    const addUserClickHandler = () => {
        setShowCreateUser(true);
    };

    const addUserSubmitHandler = (event) => {
        event.preventDefault();
        // setShowCreateUser()
        const formData = new FormData(event.target);

        const {country, city, street, streetNumber, ...userData} = Object.fromEntries(formData);
        userData.address = {
            country, 
            city, 
            street, 
            streetNumber
        };

        userData.createdAt = new Date().toISOString();
        userData.updatedAt = new Date().toISOString();

        fetch("http://localhost:3030/jsonstore/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const closeUserModalHandler = () => {
        setShowCreateUser(false);
    };

    return (
        <main>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search />

                    <UserList />

                    <button
                        onClick={addUserClickHandler}
                        className="btn-add btn"
                    >
                        Add new user
                    </button>

                    <Pagination />
                </section>

                {showCreateUser && (
                    <CreateUserModal
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
