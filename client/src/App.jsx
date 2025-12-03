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

        const userData = Object.fromEntries(formData);

        console.log(userData);
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
