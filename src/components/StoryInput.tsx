import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface StoryInputProps {
  onGenerateStory: (data: {
    idea: string;
    genre: string;
    tone: string;
    audience: string;
  }) => void;
  isGenerating: boolean;
}

const StoryInput = ({ onGenerateStory, isGenerating }: StoryInputProps) => {
  const [storyIdea, setStoryIdea] = useState("");
  const [genre, setGenre] = useState("fantasy");
  const [tone, setTone] = useState("lighthearted");
  const [audience, setAudience] = useState("kids");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (storyIdea.trim()) {
      onGenerateStory({ 
        idea: storyIdea, 
        genre, 
        tone, 
        audience 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-story">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative mb-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-magic bg-clip-text text-transparent mb-4">
              Story Generator
            </h1>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse shadow-magical"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary rounded-full animate-bounce delay-300"></div>
          </div>
          <p className="text-xl text-story-text mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your imagination into beautifully illustrated stories. Share your idea and watch it come to life.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-story-text">
              🎨 AI Illustrations
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-story-text">
              📚 Rich Narratives
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-story-text">
              🌟 Multiple Genres
            </div>
          </div>
        </div>

        {/* Story Form */}
        <Card className="max-w-2xl mx-auto shadow-story border-0 bg-story-bg/95 backdrop-blur-sm animate-slide-up">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Story Idea Input */}
              <div className="space-y-3">
                <Label htmlFor="idea" className="text-lg font-semibold text-story-header flex items-center gap-2">
                  💡 Your Story Idea
                </Label>
                <Textarea
                  id="idea"
                  value={storyIdea}
                  onChange={(e) => setStoryIdea(e.target.value)}
                  placeholder="A young girl finds a secret door in her grandmother's attic that leads to a magical world..."
                  className="min-h-[120px] bg-white/50 border-white/30 focus:border-accent transition-all duration-300 resize-none text-lg"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Be creative! Describe your story idea in a few sentences.
                </p>
              </div>

              {/* Settings Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Genre Selection */}
                <div className="space-y-3">
                  <Label htmlFor="genre" className="text-sm font-medium text-story-header flex items-center gap-2">
                    🎭 Genre
                  </Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger className="bg-white/50 border-white/30 focus:border-accent h-12">
                      <SelectValue placeholder="Choose genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-story-bg border-white/30">
                      <SelectItem value="fantasy">🧙‍♂️ Fantasy</SelectItem>
                      <SelectItem value="sci-fi">🚀 Sci-Fi</SelectItem>
                      <SelectItem value="mystery">🔍 Mystery</SelectItem>
                      <SelectItem value="adventure">⛰️ Adventure</SelectItem>
                      <SelectItem value="comedy">😄 Comedy</SelectItem>
                      <SelectItem value="drama">🎭 Drama</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tone Selection */}
                <div className="space-y-3">
                  <Label htmlFor="tone" className="text-sm font-medium text-story-header flex items-center gap-2">
                    🎵 Tone
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-white/50 border-white/30 focus:border-accent h-12">
                      <SelectValue placeholder="Choose tone" />
                    </SelectTrigger>
                    <SelectContent className="bg-story-bg border-white/30">
                      <SelectItem value="lighthearted">☀️ Lighthearted</SelectItem>
                      <SelectItem value="epic">⚔️ Epic</SelectItem>
                      <SelectItem value="mysterious">🌙 Mysterious</SelectItem>
                      <SelectItem value="humorous">😂 Humorous</SelectItem>
                      <SelectItem value="dramatic">🎪 Dramatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Audience Selection */}
                <div className="space-y-3">
                  <Label htmlFor="audience" className="text-sm font-medium text-story-header flex items-center gap-2">
                    👥 Audience
                  </Label>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger className="bg-white/50 border-white/30 focus:border-accent h-12">
                      <SelectValue placeholder="Choose audience" />
                    </SelectTrigger>
                    <SelectContent className="bg-story-bg border-white/30">
                      <SelectItem value="kids">🧸 Kids (5-10)</SelectItem>
                      <SelectItem value="teens">🎒 Teens (11-17)</SelectItem>
                      <SelectItem value="adults">👔 Adults (18+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isGenerating || !storyIdea.trim()}
                  className="w-full h-14 text-lg font-semibold bg-gradient-magic hover:shadow-magical disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Your Story...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span>✨ Generate Story</span>
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>

              {/* Progress Indicator */}
              {isGenerating && (
                <div className="space-y-3 animate-fade-in">
                  <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-magic h-full w-1/3 animate-progress"></div>
                  </div>
                  <p className="text-center text-sm text-story-text">
                    Our AI is crafting your unique story with beautiful illustrations...
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoryInput;