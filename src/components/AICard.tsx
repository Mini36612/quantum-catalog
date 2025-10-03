import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, MousePointer2, User } from "lucide-react";

export type AICardData = {
  id: string;
  title: string;
  description: string;
  date: string;
  models: string[];
  contact: string;
  rating: number;
  clicks: number;
  actionType: "play" | "try" | "coming";
  videoUrl?: string;
  websiteUrl?: string;
  status?: string;
  tags: {
    typeOfAI: string[];
    domain: string[];
    modality: string[];
  };
};

interface AICardProps {
  data: AICardData;
  onPlayDemo: (videoUrl: string) => void;
}

const AICard = ({ data, onPlayDemo }: AICardProps) => {
  const [userRating, setUserRating] = useState(data.rating);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleAction = () => {
    if (data.actionType === "play" && data.videoUrl) {
      onPlayDemo(data.videoUrl);
    } else if (data.actionType === "try" && data.websiteUrl) {
      window.open(data.websiteUrl, "_blank");
    }
  };

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const getButtonConfig = () => {
    switch (data.actionType) {
      case "play":
        return {
          text: "PLAY DEMO",
          className: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
          disabled: false,
        };
      case "try":
        return {
          text: "TRY NOW",
          className: "bg-success hover:bg-success/90 text-success-foreground",
          disabled: false,
        };
      case "coming":
        return {
          text: "COMING SOON",
          className: "bg-muted/20 text-muted-foreground cursor-not-allowed",
          disabled: true,
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <Card className="bg-card border-card/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 overflow-hidden group flex flex-col h-full">
      <div className="p-5 space-y-4 flex flex-col flex-1">
        {/* Header with Status Badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-card-foreground group-hover:text-secondary transition-colors flex-1">
            {data.title}
          </h3>
          {data.status && (
            <Badge className="bg-badge-exit text-badge-exit-foreground hover:bg-badge-exit/90 flex-shrink-0">
              {data.status}
            </Badge>
          )}
        </div>

        {/* Description with Tooltip */}
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <p className="text-sm text-card-foreground/80 leading-relaxed line-clamp-3 cursor-help">
                {data.description}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">{data.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Metadata */}
        <div className="space-y-2 text-xs text-card-foreground/60">
          <div>
            <span className="font-semibold">Date:</span> {data.date}
          </div>
          <div>
            <span className="font-semibold">Model:</span> {data.models.join(", ")}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">Contact:</span>
            <User className="w-3 h-3" />
            <span className="text-accent">{data.contact}</span>
          </div>
        </div>

        {/* Rating and Clicks */}
        <div className="flex items-center justify-between pt-2 border-t border-card-foreground/10 mt-auto">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-card-foreground/60">Your Rating:</span>
              <span className="font-semibold text-card-foreground">{userRating}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                const isHovered = hoveredStar !== null && starValue <= hoveredStar;
                const isFilled = starValue <= userRating;
                
                return (
                  <Star
                    key={i}
                    className={`w-3 h-3 cursor-pointer transition-colors ${
                      isHovered || isFilled ? "fill-yellow-400 text-yellow-400" : "text-card-foreground/30"
                    }`}
                    onClick={() => handleStarClick(starValue)}
                    onMouseEnter={() => setHoveredStar(starValue)}
                    onMouseLeave={() => setHoveredStar(null)}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-card-foreground/60">
            <span className="font-semibold">Avg Rating</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-card-foreground/60">
          <span>0.0 (0 Reviews)</span>
          <div className="flex items-center gap-1">
            <MousePointer2 className="w-3 h-3" />
            <span>{data.clicks} (Clicks)</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleAction}
          disabled={buttonConfig.disabled}
          className={`w-full font-bold ${buttonConfig.className}`}
        >
          {buttonConfig.text}
        </Button>
      </div>
    </Card>
  );
};

export default AICard;
