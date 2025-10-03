import { useState, useMemo } from "react";
import Header from "@/components/Header";
import CategoryFilters, { FilterCategory } from "@/components/CategoryFilters";
import AICard from "@/components/AICard";
import VideoModal from "@/components/VideoModal";
import { aiCardsData } from "@/data/aiCards";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    typeOfAI: string[];
    domain: string[];
    modality: string[];
  }>({
    typeOfAI: [],
    domain: [],
    modality: [],
  });
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const handleFilterChange = (category: FilterCategory, value: string) => {
    setActiveFilters((prev) => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [category]: newValues,
      };
    });
  };

  const handleCategoryClick = (category: FilterCategory) => {
    const categoryOptions: Record<FilterCategory, string[]> = {
      typeOfAI: ["GenAI", "DI", "ML", "AgenticAI"],
      domain: ["Healthcare", "BFSI", "Telecom", "Mortgage", "EdTech", "Text", "Image"],
      modality: ["Multi-Modal", "Structured Data"],
    };

    setActiveFilters((prev) => {
      const currentValues = prev[category];
      const allOptions = categoryOptions[category];
      const allSelected = allOptions.every((opt) => currentValues.includes(opt));
      
      return {
        ...prev,
        [category]: allSelected ? [] : allOptions,
      };
    });
  };

  const handlePlayDemo = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setVideoModalOpen(true);
  };

  const filteredCards = useMemo(() => {
    console.log("Active Filters:", activeFilters);
    
    const filtered = aiCardsData.filter((card) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.models.some((model) =>
          model.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filters
      const hasActiveFilters =
        activeFilters.typeOfAI.length > 0 ||
        activeFilters.domain.length > 0 ||
        activeFilters.modality.length > 0;

      if (!hasActiveFilters) {
        return matchesSearch;
      }

      const matchesTypeOfAI =
        activeFilters.typeOfAI.length === 0 ||
        activeFilters.typeOfAI.some((filter) =>
          card.tags.typeOfAI.includes(filter)
        );

      const matchesDomain =
        activeFilters.domain.length === 0 ||
        activeFilters.domain.some((filter) => card.tags.domain.includes(filter));

      const matchesModality =
        activeFilters.modality.length === 0 ||
        activeFilters.modality.some((filter) =>
          card.tags.modality.includes(filter)
        );

      const result = matchesSearch && matchesTypeOfAI && matchesDomain && matchesModality;
      
      if (hasActiveFilters) {
        console.log(`Card "${card.title}":`, {
          tags: card.tags,
          matchesTypeOfAI,
          matchesDomain,
          matchesModality,
          result
        });
      }

      return result;
    });
    
    console.log(`Filtered cards count: ${filtered.length}`);
    return filtered;
  }, [searchQuery, activeFilters]);

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <CategoryFilters
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onCategoryClick={handleCategoryClick}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-foreground/70">
            Showing <span className="font-semibold text-foreground">{filteredCards.length}</span> results
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <AICard key={card.id} data={card} onPlayDemo={handlePlayDemo} />
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-foreground/60">
              No AI solutions found matching your criteria.
            </p>
            <p className="text-sm text-foreground/40 mt-2">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </main>

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={currentVideoUrl}
      />
    </div>
  );
};

export default Index;
