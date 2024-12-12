import Navbar from "./Navbar/Navbar.jsx";

function Header(props) {
    return (
        <header className={"container"}>
            <Navbar {...props} />
        </header>
    );
}

export default Header;