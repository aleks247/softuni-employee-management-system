import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import UserList from "./components/UserList";

function App() {
    return (
        <main>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search />

                    <UserList />
                
                    <Pagination />
                </section>
            </main>
            <Footer />
        </main>
    );
}

export default App;
