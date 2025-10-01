import Navbar from "./Navbar/Navbar.jsx";

function Header(props) {
    return (
        <header className="bg-primary">
            <div className="container-fluid px-0">
                <Navbar {...props} />
            </div>
        </header>
    );
}

export default Header;