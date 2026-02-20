const NAV_LINKS = ["ABOUT", "PROJECTS", "CONTACT"] as const;

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-5 py-3.5 rounded-2xl">
      <div className="text-white text-md tracking-wide">
        <em className="font-light italic">FEYISAYO</em>{" "}
        <span className="font-bold">AKINOLA</span>
      </div>
      <div className="flex gap-10">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="text-white text-sm font-medium tracking-widest opacity-85 hover:opacity-100 transition-opacity no-underline"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
