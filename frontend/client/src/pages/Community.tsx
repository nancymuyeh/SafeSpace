import { useState } from "react";
import { useGetStories } from "@/hooks/use-stories";
import { StoryCard } from "@/components/StoryCard";
import { CreateStoryModal } from "@/components/CreateStoryModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquareDashed } from "lucide-react";

export default function Community() {
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<"newest" | "popular">("newest");

  const { data: stories, isLoading, error } = useGetStories(
    filter === "all" ? undefined : filter,
    sort
  );

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Community Feed</h1>
              <p className="text-muted-foreground mt-1">
                Real stories from real people. You are not alone.
              </p>
            </div>
            <CreateStoryModal />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border sticky top-24">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Filters</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Mood</label>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full rounded-xl">
                      <SelectValue placeholder="Filter by mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Moods</SelectItem>
                      <SelectItem value="hopeful">Hopeful</SelectItem>
                      <SelectItem value="anxious">Anxious</SelectItem>
                      <SelectItem value="healing">Healing</SelectItem>
                      <SelectItem value="lonely">Lonely</SelectItem>
                      <SelectItem value="grateful">Grateful</SelectItem>
                      <SelectItem value="tired">Tired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sort} onValueChange={(v) => setSort(v as any)}>
                    <SelectTrigger className="w-full rounded-xl">
                      <SelectValue placeholder="Sort order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="popular">Most Supportive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </aside>

          {/* Feed */}
          <main className="lg:col-span-3 space-y-6 max-w-2xl">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                </div>
              ))
            ) : error ? (
              <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-red-600 font-medium">Failed to load stories.</p>
                <Button
                  variant="ghost"
                  className="text-red-700"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : stories?.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <MessageSquareDashed className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No stories yet</h3>
                <p className="text-muted-foreground mb-6">Be the first to share your story in this category.</p>
                <CreateStoryModal />
              </div>
            ) : (
              stories?.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
