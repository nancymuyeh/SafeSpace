import { motion } from "framer-motion";
import { Heart, Flag, Share2, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAddReaction, useReportStory, Story } from "@/hooks/use-stories";
import { Badge } from "@/components/ui/badge";

interface StoryCardProps {
  story: Story;
  index: number;
}

const MOOD_STYLES: Record<string, string> = {
  hopeful: "bg-amber-100 text-amber-800 border-amber-200",
  anxious: "bg-blue-100 text-blue-800 border-blue-200",
  healing: "bg-green-100 text-green-800 border-green-200",
  lonely: "bg-slate-100 text-slate-800 border-slate-200",
  grateful: "bg-purple-100 text-purple-800 border-purple-200",
  tired: "bg-orange-100 text-orange-800 border-orange-200",
};

export function StoryCard({ story, index }: StoryCardProps) {
  const { mutate: addReaction } = useAddReaction();
  const { mutate: reportStory } = useReportStory();

  const handleReaction = () => {
    addReaction({ storyId: story.id, type: "heart" });
  };

  const handleReport = () => {
    reportStory({ storyId: story.id, reason: "Inappropriate content" });
  };

  const moodStyle = story.mood ? MOOD_STYLES[story.mood] : "bg-gray-100 text-gray-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg">
            👻
          </div>
          <div>
            <div className="font-medium text-foreground">
              Anonymous Friend
            </div>
            <div className="text-xs text-muted-foreground">
              {story.createdAt && formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem onClick={handleReport} className="text-destructive focus:text-destructive">
              <Flag className="w-4 h-4 mr-2" />
              Report Content
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-4">
        {story.mood && (
          <Badge variant="outline" className={`mb-3 px-3 py-1 text-xs font-medium border ${moodStyle}`}>
            {story.mood.charAt(0).toUpperCase() + story.mood.slice(1)}
          </Badge>
        )}
        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap font-body">
          {story.content}
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-dashed">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 group"
          onClick={handleReaction}
        >
          <Heart className="w-5 h-5 mr-1.5 transition-transform group-hover:scale-110" />
          <span className="text-sm font-medium">Support</span>
        </Button>

        <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
          <Share2 className="w-5 h-5 mr-1.5" />
          <span className="text-sm font-medium">Share</span>
        </Button>
      </div>
    </motion.div>
  );
}
