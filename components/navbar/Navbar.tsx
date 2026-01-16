"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
 const [mounted, setMounted] = useState(false);
  // Load theme from localStorage
   useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };


  return (
    <nav className="bg-white dark:bg-primary border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
         <div className="flex text-xl font-bold text-slate-900 dark:text-white">
            AI Course Creator
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a className="nav-link" href="#">Home</a>
            <a className="nav-link" href="#">My Courses</a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
     <div className="bg-white md:hidden dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-1 px-4 py-3">
            <a className="mobile-link" href="#">Home</a>
            <a className="mobile-link" href="#">About</a>
            <a className="mobile-link" href="#">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
