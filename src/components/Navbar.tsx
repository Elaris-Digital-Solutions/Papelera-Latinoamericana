import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  const productLinks = [
    { name: "Papel Higiénico", href: "/productos#papel-higienico" },
    { name: "Servilletas", href: "/productos#servilletas" },
    { name: "Papel Toalla", href: "/productos#papel-toalla" },
    { name: "Ver Todos", href: "/productos" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card border-b-2 border-ink shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="#inicio" className="flex items-center">
            <img src={logo} alt="Papelería Latinoamericana" className="h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary font-body text-sm font-medium tracking-wide transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
            
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-foreground hover:text-primary font-body text-sm font-medium tracking-wide transition-colors uppercase">
                Productos
                <ChevronDown size={16} className={`transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProductsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border shadow-lg rounded-md z-50">
                  {productLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-3 text-foreground hover:text-primary hover:bg-muted transition-colors font-body text-sm"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-divider">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary font-body text-sm font-medium tracking-wide transition-colors uppercase"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Products Section */}
              <div>
                <button 
                  onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                  className="flex items-center justify-between w-full text-foreground hover:text-primary font-body text-sm font-medium tracking-wide transition-colors uppercase"
                >
                  Productos
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isProductsDropdownOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {productLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-muted-foreground hover:text-primary font-body text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
