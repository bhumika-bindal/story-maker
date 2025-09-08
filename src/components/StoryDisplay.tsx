import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Home, Download, Share } from "lucide-react";

interface StoryScene {
  id: number;
  text: string;
  imageUrl?: string;
  title: string;
}

interface StoryDisplayProps {
  scenes: StoryScene[];
  onBack: () => void;
  storyTitle: string;
}

const StoryDisplay = ({ scenes, onBack, storyTitle }: StoryDisplayProps) => {
  const [currentScene, setCurrentScene] = useState(0);

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  const scene = scenes[currentScene];

  return (
    <div className="min-h-screen bg-gradient-story">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            onClick={onBack}
            variant="ghost"
            className="hover:bg-secondary"
          >
            <Home className="mr-2 h-4 w-4" />
            New Story
          </Button>
          
          <h1 className="font-bold text-xl text-story-header truncate max-w-md">
            {storyTitle}
          </h1>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="hidden sm:flex"
            >
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hidden sm:flex"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <Card className="shadow-story border-0 bg-story-bg/95 backdrop-blur-sm animate-page-turn overflow-hidden">
          <CardContent className="p-0">
            {/* Scene Image */}
            {scene.imageUrl ? (
              <div className="aspect-video w-full bg-gradient-to-br from-muted to-secondary overflow-hidden relative group">
                <img
                  src={scene.imageUrl}
                  alt={scene.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                  Scene {currentScene + 1}
                </div>
              </div>
            ) : (
              <div className="aspect-video w-full bg-gradient-magic flex items-center justify-center relative overflow-hidden">
                <div className="text-center text-white p-8">
                  <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg font-semibold">Generating Beautiful Illustration...</p>
                  <p className="text-white/80 mt-2">Scene {currentScene + 1} of {scenes.length}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse"></div>
              </div>
            )}
            
            {/* Scene Content */}
            <div className="p-8 lg:p-12 space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 text-sm text-accent font-medium">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Scene {currentScene + 1} of {scenes.length}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-story-header leading-tight">
                  {scene.title}
                </h2>
              </div>
              
              <div className="prose prose-xl max-w-none">
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <p className="text-story-text leading-relaxed text-lg lg:text-xl font-medium first-letter:text-4xl first-letter:font-bold first-letter:text-accent first-letter:float-left first-letter:mr-2 first-letter:leading-[0.8]">
                    {scene.text}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Navigation */}
        <div className="flex items-center justify-between mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <Button
            onClick={prevScene}
            disabled={currentScene === 0}
            variant="outline"
            className="min-w-[140px] h-12 disabled:opacity-50 bg-white/20 border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous Scene
          </Button>

          {/* Enhanced Scene Indicators */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {scenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScene(index)}
                  className={`relative transition-all duration-300 ${
                    index === currentScene
                      ? "w-8 h-4 bg-accent rounded-full shadow-magical scale-110"
                      : "w-4 h-4 bg-white/40 hover:bg-accent/60 rounded-full hover:scale-110"
                  }`}
                >
                  {index === currentScene && (
                    <div className="absolute inset-0 bg-accent rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            <div className="ml-4 text-sm text-story-text font-medium">
              {currentScene + 1} / {scenes.length}
            </div>
          </div>

          <Button
            onClick={nextScene}
            disabled={currentScene === scenes.length - 1}
            variant="outline"
            className="min-w-[140px] h-12 disabled:opacity-50 bg-white/20 border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            Next Scene
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Story completion message */}
        {currentScene === scenes.length - 1 && (
          <div className="text-center mt-12 p-8 bg-gradient-magic rounded-lg shadow-magical">
            <h3 className="text-2xl font-bold text-white mb-2">
              The End
            </h3>
            <p className="text-white/90 mb-6">
              Thank you for reading this magical story!
            </p>
            <Button 
              onClick={onBack}
              className="bg-white text-primary hover:bg-white/90"
            >
              Create Another Story
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDisplay;