import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-white">
          CineFind
        </Link>

        <Link
          to="/wishlist"
          className="text-sm text-zinc-300 transition hover:text-white"
        >
          Wishlist
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
