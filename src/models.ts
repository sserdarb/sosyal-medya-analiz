import { SafeUrl } from '@angular/platform-browser';

export interface BusinessInfo {
  name: string;
  industry: string;
  targetAudience: string;
  products: string;
  usp: string;
  tone: string;
}

export interface GeneratedCampaignImage {
    url: SafeUrl;
    urlString: string; // for saving
    style: string;
    aspectRatio: string;
}

export interface CampaignIdea {
  title: string;
  description: string;
}

export interface Campaign {
  title: string;
  concept: string;
  caption: string;
  hashtags: string[];
  referenceImage?: string; // base64 encoded string
  imagePrompt?: string;
  
  adTargeting?: string;
  adCreative?: string;
  
  generatedVideoUrl?: SafeUrl;
  generatedVideoUrlString?: string; // For saving
  
  isGenerating?: 'image' | 'video' | null;
  generationStatus?: string;
  
  selectedImageStyles?: string[];
  selectedAspectRatios?: string[];
  generatedImages?: GeneratedCampaignImage[];
  scheduledAt?: string | null;
  
  ugcScript?: string;
  isGeneratingUgcScript?: boolean;
  color?: string;
}

export interface User {
  id: number;
  email: string;
  phone: string;
  password?: string;
  role: 'user' | 'admin';
  status: 'guest' | 'pending_approval' | 'approved';
}

export interface SavedSession {
  id: number;
  name: string;
  userId: number;
  createdBy: string; // User's email
  date: string;
  accountHandle: string;
  websiteUrl?: string;
  accountReport: string;
  businessInfo: BusinessInfo;
  analysisResult: string;
  selectedPlatform: string;
  campaigns: Campaign[];
}

export interface GroundingSource {
  web?: {
    uri?: string;
    title?: string;
  };
}