import { useState } from "react";
import { toast } from "sonner";
import StoryInput from "@/components/StoryInput";
import StoryDisplay from "@/components/StoryDisplay";
import { generateStory, generateImagePrompt } from "@/utils/storyGenerator";

interface StoryScene {
  id: number;
  text: string;
  imageUrl?: string;
  title: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'input' | 'story'>('input');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyScenes, setStoryScenes] = useState<StoryScene[]>([]);
  const [storyTitle, setStoryTitle] = useState("");

  const handleGenerateStory = async (storyData: {
    idea: string;
    genre: string;
    tone: string;
    audience: string;
  }) => {
    setIsGenerating(true);
    
    try {
      // Generate the story structure
      const { scenes, title } = generateStory(storyData);
      setStoryTitle(title);
      
      toast.success("Story created! Generating beautiful illustrations...");
      
      // Generate images for each scene dynamically
      const scenesWithImages = [];
      
      for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];
        try {
          const imagePrompt = generateImagePrompt(scene, storyData);
          
          // Generate unique filename for each scene
          const timestamp = Date.now();
          const imagePath = `src/assets/generated-scene-${timestamp}-${i + 1}.jpg`;
          
          toast.success(`Creating illustration for "${scene.title}"...`);
          
          // This would be where you call your image generation API
          // For now, we'll use a placeholder approach
          scenesWithImages.push({
            ...scene,
            imageUrl: imagePath,
            imagePrompt: imagePrompt
          });
          
        } catch (error) {
          console.error(`Failed to generate image for scene ${i + 1}:`, error);
          scenesWithImages.push({
            ...scene,
            imageUrl: undefined
          });
        }
      }

      setStoryScenes(scenesWithImages);
      setCurrentView('story');
      toast.success("Your beautifully illustrated story is ready!");
      
    } catch (error) {
      console.error('Error generating story:', error);
      toast.error("Failed to generate story. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackToInput = () => {
    setCurrentView('input');
    setStoryScenes([]);
    setStoryTitle("");
  };

  if (currentView === 'story') {
    return (
      <StoryDisplay
        scenes={storyScenes}
        onBack={handleBackToInput}
        storyTitle={storyTitle}
      />
    );
  }

  return (
    <StoryInput
      onGenerateStory={handleGenerateStory}
      isGenerating={isGenerating}
    />
  );
};

export default Index;
