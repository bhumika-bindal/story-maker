interface StoryData {
  idea: string;
  genre: string;
  tone: string;
  audience: string;
}

interface StoryScene {
  id: number;
  text: string;
  imageUrl?: string;
  title: string;
}

// Enhanced story templates with richer, more detailed narratives
const storyTemplates = {
  fantasy: {
    titles: ["The Magical Discovery", "An Enchanted Adventure", "The Secret Realm", "Mystical Beginnings", "The Enchanted Quest"],
    scenes: [
      {
        title: "The Discovery",
        template: "In the mystical realm of {setting}, where ancient magic still whispers through the air, {protagonist} stumbled upon something that defied all explanation. Hidden beneath layers of time and forgotten dreams, a {central_element} pulsed with otherworldly energy, calling out to those brave enough to listen. The very ground beneath seemed to hum with anticipation, as if the world itself had been waiting for this moment of destiny."
      },
      {
        title: "The Journey Begins", 
        template: "With newfound purpose burning bright in their soul, {protagonist} stepped beyond the familiar boundaries of their world. The path ahead sparkled with {tone} possibilities, each step revealing wonders that painted the landscape in impossible colors. Ancient trees whispered secrets of forgotten times, while mystical creatures watched from the shadows, recognizing the spark of destiny that now surrounded our hero."
      },
      {
        title: "The Challenge",
        template: "But destiny never comes without trials. {protagonist} found themselves face to face with their greatest fear, a challenge that would test not just their strength, but the very essence of who they were becoming. The {central_element} grew heavy in their hands, its power flickering like a candle in a storm, as dark forces gathered to extinguish the light that threatened to change everything."
      },
      {
        title: "The Triumph",
        template: "In that moment of deepest darkness, {protagonist} discovered that true {positive_trait} comes not from magic or power, but from the courage to believe in oneself. The {central_element} blazed to life, responding to the purity of their heart, banishing the shadows and revealing a truth more beautiful than any spell: that the greatest magic had been within them all along."
      },
      {
        title: "The New Beginning",
        template: "As the sun set on their incredible adventure, {protagonist} stood transformed, no longer the same person who had first discovered the {central_element}. They carried within them not just the memory of their journey, but the wisdom to help others find their own path to magic. The {setting} would forever remember their story, and somewhere in the distance, new adventures were already beginning to unfold."
      }
    ]
  },
  "sci-fi": {
    titles: ["Future Discoveries", "Cosmic Adventures", "The Space Odyssey", "Tomorrow's Heroes", "Stars Beyond Tomorrow"],
    scenes: [
      {
        title: "The Anomaly",
        template: "In the year 2157, aboard the research station {setting}, {protagonist} was monitoring routine deep-space transmissions when their instruments detected something impossible. The {central_element} emanated a signal pattern that violated every law of physics, its quantum signature suggesting technology far beyond human comprehension. As star charts flickered with unknown constellations, {protagonist} realized they were witnessing humanity's first glimpse into a universe far stranger and more wonderful than anyone had dared imagine."
      },
      {
        title: "First Contact",
        template: "The revelation struck {protagonist} like lightning across the cosmos: they were not alone. The {central_element} pulsed with intelligence, communicating in harmonics that bypassed language and spoke directly to the soul. Each transmission carried the weight of civilizations that had risen and fallen among distant stars, and {protagonist} found themselves chosen as humanity's first ambassador to the infinite."
      },
      {
        title: "The Mission",
        template: "Armed with humanity's most advanced technology and an unshakeable {tone} determination, {protagonist} prepared for a journey beyond the edge of known space. The {central_element} served as both guide and gateway, its alien energy interfacing with their ship's systems in ways that seemed more like magic than science. As they launched into the cosmic unknown, reality itself seemed to bend around them, opening pathways through dimensions that had never been mapped."
      },
      {
        title: "The Revelation",
        template: "What {protagonist} discovered in the depths of space challenged the very foundation of existence itself. The {central_element} was not just technology—it was a key to understanding the universe's deepest secrets, revealing that consciousness itself was the fundamental force that shaped reality. Through {positive_trait} and an open mind, they learned that humanity was part of a cosmic tapestry far more intricate and beautiful than anyone had ever conceived."
      },
      {
        title: "The Future",
        template: "Returning to Earth forever changed, {protagonist} carried with them the gift of cosmic perspective. The {central_element} had become a bridge between worlds, opening humanity's eyes to their place in the grand design of the universe. As they shared their discoveries, they knew this was not an ending, but the first page of humanity's greatest chapter—the beginning of their journey as true citizens of the cosmos."
      }
    ]
  },
  mystery: {
    titles: ["The Unsolved Case", "Clues in the Shadows", "The Hidden Truth", "Secrets Revealed", "Whispers in the Dark"],
    scenes: [
      {
        title: "The Mystery",
        template: "It was during the {tone} hours of dawn in {setting} when {protagonist} first noticed something deeply unsettling. The {central_element} lay there, seemingly innocent, yet every instinct screamed that it held secrets darker than the shadows that surrounded it. Details that should have been ordinary instead felt charged with significance, as if reality itself was holding its breath, waiting for someone brave enough to ask the right questions."
      },
      {
        title: "Following Clues",
        template: "Driven by an insatiable need for truth, {protagonist} began to unravel the intricate web of mysteries surrounding the {central_element}. Each clue led to two more questions, each answer revealed deeper layers of deception. The investigation took them through hidden passages of {setting}, where every shadow seemed to whisper fragments of a story that someone had desperately tried to erase from history."
      },
      {
        title: "The Plot Thickens",
        template: "Just when {protagonist} believed they were closing in on the truth, the investigation took a {tone} turn that shattered everything they thought they knew. The {central_element} was not what it appeared to be, and the people they had trusted were wearing masks of deception. Danger lurked in every corner as {protagonist} realized they had stumbled upon something far more sinister than a simple mystery—they had uncovered a conspiracy that reached into the very heart of {setting}."
      },
      {
        title: "The Breakthrough",
        template: "In a moment of brilliant clarity, fueled by {positive_trait} and relentless determination, {protagonist} finally saw the complete picture. The {central_element} was the key that unlocked not just the mystery, but a truth that had been hidden in plain sight all along. Like pieces of a shattered mirror coming together, every strange detail, every misleading clue, suddenly formed a pattern that revealed the stunning reality behind the deception."
      },
      {
        title: "Case Closed",
        template: "As the final revelations came to light, {protagonist} stood in the aftermath of their discovery, forever changed by the knowledge they now carried. The {central_element} had served its purpose, leading them to a truth more complex and surprising than anyone could have imagined. Justice had been served, secrets had been exposed, and {setting} could finally rest easy, knowing that {protagonist} had the courage to seek truth in the darkest of places."
      }
    ]
  }
};

function extractStoryElements(idea: string, genre: string, tone: string, audience: string) {
  // Simple extraction based on common patterns
  const protagonist = extractProtagonist(idea, audience);
  const setting = extractSetting(idea, genre);
  const centralElement = extractCentralElement(idea);
  
  return {
    protagonist,
    setting,
    central_element: centralElement,
    positive_trait: getPositiveTraitForTone(tone),
    tone: tone
  };
}

function extractProtagonist(idea: string, audience: string): string {
  // Look for character mentions in the idea
  const characterPatterns = [
    /a (\w+) (boy|girl|man|woman|person|child)/i,
    /the (\w+) (boy|girl|man|woman|person|child)/i,
    /(boy|girl|man|woman|person|child)/i
  ];
  
  for (const pattern of characterPatterns) {
    const match = idea.match(pattern);
    if (match) {
      return match[0];
    }
  }
  
  // Default based on audience
  const defaults = {
    kids: "a young child",
    teens: "a brave teenager", 
    adults: "an adventurous explorer"
  };
  
  return defaults[audience as keyof typeof defaults] || "a curious protagonist";
}

function extractSetting(idea: string, genre: string): string {
  // Look for location mentions
  const locationPatterns = [
    /in (?:a|an|the) ([^,\.]+)/i,
    /at (?:a|an|the) ([^,\.]+)/i,
    /from ([^,\.]+)/i
  ];
  
  for (const pattern of locationPatterns) {
    const match = idea.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  
  // Default based on genre
  const defaults = {
    fantasy: "a mystical realm",
    "sci-fi": "a distant space station",
    mystery: "a quiet town",
    adventure: "an unexplored wilderness",
    comedy: "a bustling city",
    drama: "a small community"
  };
  
  return defaults[genre as keyof typeof defaults] || "an extraordinary place";
}

function extractCentralElement(idea: string): string {
  // Look for key objects or concepts
  const objectPatterns = [
    /finds? (?:a|an|the) ([^,\.]+)/i,
    /discovers? (?:a|an|the) ([^,\.]+)/i,
    /(?:a|an|the) ([^,\.]+) that/i
  ];
  
  for (const pattern of objectPatterns) {
    const match = idea.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  
  return "mysterious object";
}

function getPositiveTraitForTone(tone: string): string {
  const traits = {
    lighthearted: "kindness",
    epic: "heroism", 
    mysterious: "cleverness",
    humorous: "wit",
    dramatic: "courage"
  };
  
  return traits[tone as keyof typeof traits] || "wisdom";
}

export function generateStory(storyData: StoryData): { scenes: StoryScene[], title: string } {
  const template = storyTemplates[storyData.genre as keyof typeof storyTemplates] || storyTemplates.fantasy;
  const elements = extractStoryElements(storyData.idea, storyData.genre, storyData.tone, storyData.audience);
  
  // Generate title
  const title = template.titles[Math.floor(Math.random() * template.titles.length)];
  
  // Generate scenes
  const scenes: StoryScene[] = template.scenes.map((sceneTemplate, index) => {
    let text = sceneTemplate.template;
    
    // Replace placeholders with extracted elements
    Object.entries(elements).forEach(([key, value]) => {
      text = text.replace(new RegExp(`{${key}}`, 'g'), value);
    });
    
    // Add original idea context to first scene
    if (index === 0) {
      text = `${storyData.idea} ${text}`;
    }
    
    return {
      id: index + 1,
      title: sceneTemplate.title,
      text: text,
    };
  });
  
  return { scenes, title };
}

export function generateImagePrompt(scene: StoryScene, storyData: StoryData): string {
  const styleModifiers = {
    kids: "colorful, friendly, cartoon-style",
    teens: "dynamic, detailed, adventure-style", 
    adults: "cinematic, atmospheric, artistic"
  };
  
  const genreModifiers = {
    fantasy: "magical, enchanted, mystical",
    "sci-fi": "futuristic, technological, space-age",
    mystery: "noir, shadowy, investigative",
    adventure: "exciting, outdoor, action-packed",
    comedy: "bright, cheerful, whimsical",
    drama: "emotional, realistic, character-focused"
  };
  
  const style = styleModifiers[storyData.audience as keyof typeof styleModifiers] || "detailed, artistic";
  const genreStyle = genreModifiers[storyData.genre as keyof typeof genreModifiers] || "atmospheric";
  
  // Extract key visual elements from the scene text
  const sceneDescription = scene.text.toLowerCase();
  let visualPrompt = `${scene.title}: `;
  
  // Add context from the scene
  if (sceneDescription.includes('discover')) {
    visualPrompt += "a moment of discovery, ";
  }
  if (sceneDescription.includes('journey')) {
    visualPrompt += "an epic journey scene, ";
  }
  if (sceneDescription.includes('challenge') || sceneDescription.includes('obstacle')) {
    visualPrompt += "a dramatic challenge, ";
  }
  if (sceneDescription.includes('magic')) {
    visualPrompt += "magical elements glowing, ";
  }
  
  return `${visualPrompt} ${style}, ${genreStyle}, ultra high resolution, beautiful composition`;
}