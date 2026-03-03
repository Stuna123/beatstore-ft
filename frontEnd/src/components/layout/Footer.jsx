import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    //*className="bg-slate-950 text-slate-100 border-b border-slate-800"
    <footer className="bg-slate-950 text-slate-100 border-b px-2 sm:px-4 py-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-row gap-4 md:flex-row md:items-center justify-between">
        
        {/* Left */}
        <span className="text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <Link
            to="/"
            className="font-bold text-white hover:text-blue-500 transition"
          >
            BeatStore
          </Link>
          . Tous droits réservés.
        </span>
          <p className="text-sm text-gray-400">
            Audio premium pour passionnés de musique.
          </p>

        {/* Right */}
        <ul className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          <li>
            <NavLink
              to="https://portfolioftab.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition"
            >
              Portfolio
            </NavLink>
          </li>

          <li>
            <NavLink
              to="https://github.com/Stuna123/beatstore-ft"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition"
            >
              GitHub
            </NavLink>
          </li>

          <li>
            <NavLink
              to="https://www.linkedin.com/in/francis-tabora-afata/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition"
            >
              LinkedIn
            </NavLink>
          </li>
        </ul>
      </div>
            {/* Center */}
      <span className="text-sm text-gray-500">
        <span className="flex justify-center font-medium text-gray-700 dark:text-gray-300">
          Made by Francis TABORA
        </span>
      </span>
    </footer>
  );
};

export default Footer;
