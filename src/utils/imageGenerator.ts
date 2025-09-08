interface StoryScene {
  id: number;
  text: string;
  title: string;
  imagePrompt?: string;
}

interface StoryData {
  idea: string;
  genre: string;
  tone: string;
  audience: string;
}

export async function generateSceneImage(scene: StoryScene, storyData: StoryData, sceneIndex: number): Promise<string> {
  try {
    // Create a detailed prompt based on scene content and story context
    const basePrompt = generateDetailedImagePrompt(scene, storyData);
    
    // For demo purposes, we'll simulate image generation
    // In a real implementation, you would call an actual image generation API
    const timestamp = Date.now();
    const filename = `generated-scene-${timestamp}-${sceneIndex + 1}.jpg`;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return the path where the image would be saved
    return `src/assets/${filename}`;
  } catch (error) {
    console.error('Error generating scene image:', error);
    throw error;
  }
}

function generateDetailedImagePrompt(scene: StoryScene, storyData: StoryData): string {
  const styleModifiers = {
    kids: "colorful, friendly, cartoon-style, Disney-like animation",
    teens: "dynamic, detailed, adventure-style, anime-inspired", 
    adults: "cinematic, atmospheric, artistic, photorealistic"
  };
  
  const genreModifiers = {
    fantasy: "magical, enchanted, mystical, ethereal lighting, fantasy art style",
    "sci-fi": "futuristic, technological, space-age, neon lighting, cyberpunk style",
    mystery: "noir, shadowy, investigative, dramatic lighting, thriller aesthetic",
    adventure: "exciting, outdoor, action-packed, epic landscape",
    comedy: "bright, cheerful, whimsical, vibrant colors",
    drama: "emotional, realistic, character-focused, natural lighting"
  };

  const toneModifiers = {
    lighthearted: "bright, uplifting, joyful atmosphere",
    epic: "grand, heroic, dramatic scale, majestic",
    mysterious: "dark, enigmatic, atmospheric shadows",
    humorous: "playful, fun, exaggerated expressions",
    dramatic: "intense, emotional, powerful composition"
  };
  
  const style = styleModifiers[storyData.audience as keyof typeof styleModifiers] || "detailed, artistic";
  const genreStyle = genreModifiers[storyData.genre as keyof typeof genreModifiers] || "atmospheric";
  const toneStyle = toneModifiers[storyData.tone as keyof typeof toneModifiers] || "balanced lighting";
  
  // Extract key visual elements from the scene
  const sceneText = scene.text.toLowerCase();
  const sceneTitle = scene.title.toLowerCase();
  
  let visualElements = [];
  
  // Character detection
  if (sceneText.includes('protagonist') || sceneText.includes('hero')) {
    visualElements.push('main character in focus');
  }
  
  // Setting detection
  if (sceneText.includes('forest') || sceneText.includes('trees')) {
    visualElements.push('enchanted forest background');
  } else if (sceneText.includes('space') || sceneText.includes('cosmic')) {
    visualElements.push('space setting with stars and nebulas');
  } else if (sceneText.includes('city') || sceneText.includes('town')) {
    visualElements.push('urban environment');
  }
  
  // Action detection
  if (sceneTitle.includes('discovery')) {
    visualElements.push('moment of revelation, glowing magical object');
  } else if (sceneTitle.includes('journey')) {
    visualElements.push('epic travel scene, vast landscape');
  } else if (sceneTitle.includes('challenge') || sceneTitle.includes('battle')) {
    visualElements.push('intense action, dramatic conflict');
  } else if (sceneTitle.includes('triumph')) {
    visualElements.push('victorious moment, brilliant lighting');
  } else if (sceneTitle.includes('beginning') || sceneTitle.includes('end')) {
    visualElements.push('peaceful, contemplative scene');
  }
  
  // Mood detection
  if (sceneText.includes('dark') || sceneText.includes('shadow')) {
    visualElements.push('dramatic shadows, contrast lighting');
  } else if (sceneText.includes('bright') || sceneText.includes('light')) {
    visualElements.push('brilliant illumination, hopeful atmosphere');
  }
  
  const visualDescription = visualElements.length > 0 ? visualElements.join(', ') : 'beautiful composition';
  
  return `${scene.title}: ${visualDescription}, ${style}, ${genreStyle}, ${toneStyle}, ultra high resolution, masterpiece quality, perfect composition, detailed artwork`;
}

export { generateDetailedImagePrompt };