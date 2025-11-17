import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Historia", path: "/historia" },
    { name: "Misión y Visión", path: "/mision-vision" },
    { name: "Cobertura", path: "/cobertura" },
    { name: "Contacto", path: "/contacto" },
    { name: "Productos", path: "/productos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/assets/logo.png" alt="Papelera Latinoamericana" className="h-8 md:h-10 object-contain" />
            <span className="sr-only">Papelera Latinoamericana</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              item.name === "Productos" ? (
                <Link key={item.path} to={item.path}>
                  <Button
                    size="sm"
                    variant="solid"
                    className="rounded-full px-6 py-2 bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
                  >
                    {item.name}
                  </Button>
                </Link>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            {menuItems.map((item) => (
              item.name === "Productos" ? (
                <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size="sm"
                    variant="solid"
                    className="w-full text-left px-4 py-2 rounded-full bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
                  >
                    {item.name}
                  </Button>
                </Link>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;