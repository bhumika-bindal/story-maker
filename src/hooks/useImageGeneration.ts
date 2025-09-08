import { useState } from 'react';
import { generateDetailedImagePrompt } from '@/utils/imageGenerator';

interface StoryScene {
  id: number;
  text: string;
  title: string;
  imageUrl?: string;
  imagePrompt?: string;
}

interface StoryData {
  idea: string;
  genre: string;
  tone: string;
  audience: string;
}

export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSceneImages = async (scenes: StoryScene[], storyData: StoryData): Promise<StoryScene[]> => {
    setIsGenerating(true);
    
    try {
      // Process scenes sequentially to avoid overwhelming the API
      const scenesWithImages = [];
      
      for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];
        const imagePrompt = generateDetailedImagePrompt(scene, storyData);
        
        // Simulate dynamic image generation
        // In a real implementation, you would call your image generation API here
        const timestamp = Date.now();
        const delay = Math.random() * 1000 + 500; // Random delay between 500-1500ms
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        scenesWithImages.push({
          ...scene,
          imageUrl: `/api/generated-images/scene-${timestamp}-${i + 1}.jpg`,
          imagePrompt
        });
      }
      
      return scenesWithImages;
    } catch (error) {
      console.error('Error generating scene images:', error);
      // Return scenes without images if generation fails
      return scenes.map(scene => ({ ...scene, imageUrl: undefined }));
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateSceneImages,
    isGenerating
  };
}