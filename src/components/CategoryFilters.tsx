import { Badge } from "@/components/ui/badge";

export type FilterCategory = "typeOfAI" | "domain" | "modality";

interface CategoryFiltersProps {
  activeFilters: {
    typeOfAI: string[];
    domain: string[];
    modality: string[];
  };
  onFilterChange: (category: FilterCategory, value: string) => void;
  onCategoryClick: (category: FilterCategory) => void;
}

const filterData = {
  typeOfAI: {
    label: "Type of AI",
    options: ["GenAI", "DI", "ML", "AgenticAI"],
  },
  domain: {
    label: "Domain",
    options: ["Healthcare", "BFSI", "Telecom", "Mortgage", "EdTech", "Text", "Image"],
  },
  modality: {
    label: "Modality",
    options: ["Multi-Modal", "Structured Data"],
  },
};

const CategoryFilters = ({ activeFilters, onFilterChange, onCategoryClick }: CategoryFiltersProps) => {
  const isActive = (category: FilterCategory, value: string) => {
    return activeFilters[category].includes(value);
  };

  const isCategoryActive = (category: FilterCategory) => {
    return activeFilters[category].length > 0;
  };

  return (
    <div className="bg-primary/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(filterData).map(([key, { label, options }]) => (
            <div key={key} className="space-y-3">
              <h3 
                className={`text-sm font-semibold uppercase tracking-wide cursor-pointer transition-colors ${
                  isCategoryActive(key as FilterCategory)
                    ? "text-secondary font-bold"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
                onClick={() => onCategoryClick(key as FilterCategory)}
              >
                {label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <Badge
                    key={option}
                    variant={isActive(key as FilterCategory, option) ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      isActive(key as FilterCategory, option)
                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 border-primary-foreground/30"
                    }`}
                    onClick={() => onFilterChange(key as FilterCategory, option)}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
