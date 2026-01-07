import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateStory } from "@/hooks/use-stories";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PenLine, Loader2 } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().min(10, "Story must be at least 10 characters long."),
  mood: z.enum(["hopeful", "anxious", "healing", "lonely", "grateful", "tired"]),
  isAnonymous: z.boolean().default(true),
});
type FormValues = z.infer<typeof formSchema>;

const MOODS = [
  { value: "hopeful", label: "Hopeful 🌅", color: "bg-amber-100 text-amber-800" },
  { value: "anxious", label: "Anxious 🌧️", color: "bg-blue-100 text-blue-800" },
  { value: "healing", label: "Healing 🌱", color: "bg-green-100 text-green-800" },
  { value: "lonely", label: "Lonely 🌑", color: "bg-slate-100 text-slate-800" },
  { value: "grateful", label: "Grateful ✨", color: "bg-purple-100 text-purple-800" },
  { value: "tired", label: "Tired 😴", color: "bg-orange-100 text-orange-800" },
];

export function CreateStoryModal() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateStory();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      mood: undefined,
      isAnonymous: true,
    },
  });

  function onSubmit(data: FormValues) {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full shadow-lg hover:shadow-primary/25 transition-all">
          <PenLine className="w-5 h-5 mr-2" />
          Share Your Story
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Share Your Story</DialogTitle>
          <DialogDescription>
            This is a safe space. Your story will be posted anonymously by default.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How are you feeling right now?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select a mood..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOODS.map((mood) => (
                        <SelectItem key={mood.value} value={mood.value}>
                          {mood.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Story</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share what's on your mind..."
                      className="min-h-[150px] resize-none rounded-xl focus-visible:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="bg-primary hover:bg-primary/90 text-white rounded-xl"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Anonymously"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
