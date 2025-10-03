import { Search, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary border-b border-primary/20 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-primary-foreground">
              <span className="text-xl font-bold">rel</span>
              <span className="text-xl font-bold text-secondary">AI</span>
            </div>
            <div className="h-6 w-px bg-primary-foreground/20" />
            <span className="text-lg font-semibold text-secondary">AI Store</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search AI store for your use cases"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-12 py-2 h-11 bg-input border-none rounded-full focus-visible:ring-2 focus-visible:ring-accent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-primary-foreground font-medium hidden sm:block">Pratik Panda</span>
            <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
              PP
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
