





import { Injectable, signal, inject } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';
import { Campaign, BusinessInfo, GroundingSource, CampaignIdea } from '../models';
import { TranslationService } from './translation.service';

declare var process: {
  env: {
    API_KEY: string;
  };
};

export interface PlanningData {
    trends: { title: string; description: string }[];
    specialDays: { day: string; description: string }[];
    campaignIdeas: CampaignIdea[];
}


@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private genAI: GoogleGenAI | null = null;
  private translationService = inject(TranslationService);
  apiKeyError = signal<string>('');

  constructor() {
    this.initialize();
  }

  private initialize() {
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error('API key is not configured.');
      }
      this.genAI = new GoogleGenAI({ apiKey });
      this.apiKeyError.set('');
    } catch (e) {
      console.error('Failed to initialize GoogleGenAI:', e);
      this.apiKeyError.set(
        this.translationService.get('errors.apiKeyMissing')
      );
    }
  }

  isInitialized(): boolean {
    return !!this.genAI;
  }

  private _parseJsonResponse<T>(responseText: string): T {
    let jsonString = responseText;
    const jsonMatch = jsonString.match(/```(json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[2]) {
      jsonString = jsonMatch[2];
    }
    
    try {
      return JSON.parse(jsonString) as T;
    } catch (e) {
      console.error('Failed to parse JSON response:', jsonString, e);
      throw new Error(this.translationService.get('errors.jsonParseFailed'));
    }
  }
  
  private _getHardcodedEmergencyPlan(): PlanningData {
    const plan = this.translationService.get('hardcodedEmergencyPlan');
    return {
        trends: plan?.trends || [],
        specialDays: plan?.specialDays || [],
        campaignIdeas: plan?.campaignIdeas || [],
    };
  }

  async analyzeSocialMediaAccount(
    accountHandle: string, platform: string, langName: string, websiteUrl?: string
  ): Promise<{ businessInfo: Partial<BusinessInfo>, report: string }> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    const prompt = this.translationService.get('prompts.analyzeSocialMediaAccount', { accountHandle, platform, websiteUrl: websiteUrl || this.translationService.get('common.notProvided'), langName });

    const response = await this.genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            businessInfo: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The full name of the business." },
                    industry: { type: Type.STRING, description: "The industry the business operates in." },
                    targetAudience: { type: Type.STRING, description: "The customer demographic they are targeting." },
                    products: { type: Type.STRING, description: "The main products or services offered." },
                    usp: { 
                        type: Type.STRING,
                        description: "The unique selling proposition that sets them apart. Summarize this in a single sentence, maximum 250 characters."
                    },
                    tone: { type: Type.STRING, description: "The general communication tone used in posts (e.g., humorous, professional, friendly)." },
                },
            },
            report: { type: Type.STRING, description: "A detailed report evaluating the account's strengths, weaknesses, audience engagement, content quality, and overall digital presence, with concrete suggestions for improvement." }
          },
          required: ['businessInfo', 'report']
        },
      },
    });

    try {
      return this._parseJsonResponse(response.text);
    } catch (e) {
      console.error('Failed to parse account info JSON:', response.text, e);
      throw new Error(this.translationService.get('errors.accountParseFailed'));
    }
  }

  async analyzeBusiness(info: Partial<BusinessInfo>, report: string, langName: string): Promise<string> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    const prompt = this.translationService.get('prompts.analyzeBusiness', {
        name: info.name || this.translationService.get('common.unspecified'),
        industry: info.industry || this.translationService.get('common.unspecified'),
        targetAudience: info.targetAudience || this.translationService.get('common.unspecified'),
        products: info.products || this.translationService.get('common.unspecified'),
        usp: info.usp || this.translationService.get('common.unspecified'),
        tone: info.tone || this.translationService.get('common.unspecified'),
        report: report || this.translationService.get('common.noReport'),
        langName
    });

    const response = await this.genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  }
  
  async analyzeCompetitors(info: Partial<BusinessInfo>, platform: string, langName: string): Promise<{ analysis: string; sources: GroundingSource[] }> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    const prompt = this.translationService.get('prompts.analyzeCompetitors', {
        name: info.name || this.translationService.get('common.unspecified'),
        industry: info.industry || this.translationService.get('common.unspecified'),
        targetAudience: info.targetAudience || this.translationService.get('common.unspecified'),
        products: info.products || this.translationService.get('common.unspecified'),
        platform: platform,
        langName
    });

    const response = await this.genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    
    const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    return { analysis: response.text, sources };
  }

  async generatePlanningInsightsAndCampaignIdeas(analysis: string, startDate: string, endDate: string, langName: string, platform: string): Promise<PlanningData> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    const generate = async (promptKey: string): Promise<PlanningData> => {
        const prompt = this.translationService.get(promptKey, { analysis, startDate, endDate, langName, platform });
        const response = await this.genAI!.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    trends: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } }, required: ['title', 'description'] } },
                    specialDays: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { day: { type: Type.STRING }, description: { type: Type.STRING } }, required: ['day', 'description'] } },
                    campaignIdeas: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } }, required: ['title', 'description'] } }
                  },
                  required: ['trends', 'specialDays', 'campaignIdeas']
                },
            },
        });
        return this._parseJsonResponse<PlanningData>(response.text);
    };
    
    const isDataEmpty = (data: PlanningData | null): boolean => {
        if (!data) return true;
        return (!data.trends || data.trends.length === 0) &&
               (!data.specialDays || data.specialDays.length === 0) &&
               (!data.campaignIdeas || data.campaignIdeas.length === 0);
    };

    try {
        let insights = await generate('prompts.generatePlanningInsightsAndCampaignIdeas');
        
        if (isDataEmpty(insights)) {
            console.warn('Initial planning insights were empty. Trying fallback prompt.');
            insights = await generate('prompts.generatePlanningInsightsFallback');
        }

        if (isDataEmpty(insights)) {
            console.warn('Fallback planning insights were also empty. Trying emergency fallback prompt.');
            insights = await generate('prompts.generatePlanningInsightsEmergencyFallback');
        }
        
        if (isDataEmpty(insights)) {
            console.error('All API-based planning attempts failed to return content. Using hardcoded emergency plan.');
            return this._getHardcodedEmergencyPlan();
        }
        
        return insights;
    } catch (e) {
        console.error('Failed to generate or parse planning insights:', e);
        throw new Error(this.translationService.get('errors.planningFailed'));
    }
  }

  async createCampaignFromIdea(analysis: string, platform: string, idea: CampaignIdea, langName: string): Promise<Campaign> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    const prompt = this.translationService.get('prompts.createCampaignFromIdea', {
        analysis,
        platform,
        ideaTitle: idea.title,
        ideaDescription: idea.description,
        langName
    });

    const response = await this.genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              concept: { type: Type.STRING },
              caption: { type: Type.STRING },
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              imagePrompt: { 
                type: Type.STRING,
                description: 'A detailed, creative prompt for an AI image generator (like Imagen) to create a visual for this post.'
              },
              adTargeting: {
                  type: Type.STRING,
                  description: 'A detailed description of the target audience for this ad, including demographics, interests, and behaviors, formatted as an HTML list.'
              },
              adCreative: {
                  type: Type.STRING,
                  description: 'A description of the ad creative concept, including visual elements, call to action (CTA), and the main message, formatted as an HTML list.'
              }
            },
            required: ['title', 'concept', 'caption', 'hashtags', 'imagePrompt', 'adTargeting', 'adCreative'],
          },
      },
    });

    try {
      return this._parseJsonResponse(response.text);
    } catch (e) {
      console.error('Failed to parse campaign from idea JSON:', response.text, e);
      throw new Error(this.translationService.get('errors.campaignParseFailed'));
    }
  }
  
  async createSpecialDayContent(analysis: string, platform: string, trends: { title: string; description: string }[], selectedDays: string[], langName: string): Promise<Campaign[]> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    const trendsText = trends.map(t => `### ${t.title}\n${t.description}`).join('\n\n');

    const prompt = this.translationService.get('prompts.createSpecialDayContent', {
        analysis,
        platform,
        trends: trendsText,
        selectedDays: selectedDays.join(', '),
        langName
    });

    const response = await this.genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              concept: { type: Type.STRING },
              caption: { type: Type.STRING },
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              imagePrompt: { 
                type: Type.STRING,
                description: 'A detailed, creative prompt for an AI image generator (like Imagen) to create a visual for this post.'
              },
              adTargeting: {
                  type: Type.STRING,
                  description: 'A detailed description of the target audience for this ad, including demographics, interests, and behaviors, formatted as an HTML list.'
              },
              adCreative: {
                  type: Type.STRING,
                  description: 'A description of the ad creative concept, including visual elements, call to action (CTA), and the main message, formatted as an HTML list.'
              }
            },
            required: ['title', 'concept', 'caption', 'hashtags', 'imagePrompt', 'adTargeting', 'adCreative'],
          },
        },
      },
    });

    try {
      return this._parseJsonResponse(response.text);
    } catch (e) {
      console.error('Failed to parse special day campaigns JSON:', response.text, e);
      throw new Error(this.translationService.get('errors.campaignParseFailed'));
    }
  }
  
  async createRegularContent(analysis: string, platform: string, trends: { title: string; description: string }[], postsPerWeek: number, langName: string): Promise<Campaign[]> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    const totalRegularPosts = postsPerWeek * 4;
    const trendsText = trends.map(t => `### ${t.title}\n${t.description}`).join('\n\n');

    const prompt = this.translationService.get('prompts.createRegularContent', {
        analysis,
        platform,
        trends: trendsText,
        totalRegularPosts: String(totalRegularPosts),
        langName
    });

    const response = await this.genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              concept: { type: Type.STRING },
              caption: { type: Type.STRING },
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              imagePrompt: { 
                type: Type.STRING,
                description: 'A detailed, creative prompt for an AI image generator (like Imagen) to create a visual for this post.'
              },
              adTargeting: {
                  type: Type.STRING,
                  description: 'A detailed description of the target audience for this ad, including demographics, interests, and behaviors, formatted as an HTML list.'
              },
              adCreative: {
                  type: Type.STRING,
                  description: 'A description of the ad creative concept, including visual elements, call to action (CTA), and the main message, formatted as an HTML list.'
              }
            },
            required: ['title', 'concept', 'caption', 'hashtags', 'imagePrompt', 'adTargeting', 'adCreative'],
          },
        },
      },
    });

    try {
      return this._parseJsonResponse(response.text);
    } catch (e) {
      console.error('Failed to parse regular campaigns JSON:', response.text, e);
      throw new Error(this.translationService.get('errors.campaignParseFailed'));
    }
  }
  
  async translateText(text: string, targetLangName: string = 'English'): Promise<string> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));
    if (!text) return '';

    const prompt = `Translate the following text to ${targetLangName}. Return only the translated text, without any additional explanations or formatting.\n\nText to translate: "${text}"`;
    
    try {
        const response = await this.genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (e) {
        console.error(`Failed to translate text to ${targetLangName}:`, e);
        return text; // Return original text on failure
    }
  }

  async translateCampaign(campaign: Campaign, targetLangName: string): Promise<Campaign> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    const originalCampaignJson = JSON.stringify({
        title: campaign.title,
        concept: campaign.concept,
        caption: campaign.caption,
        hashtags: campaign.hashtags
    });

    const prompt = this.translationService.get('prompts.translateCampaign', {
        targetLangName: targetLangName,
        campaignJson: originalCampaignJson,
        langName: targetLangName
    });

    const response = await this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    concept: { type: Type.STRING },
                    caption: { type: Type.STRING },
                    hashtags: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    },
                },
                required: ['title', 'concept', 'caption', 'hashtags'],
            },
        },
    });

    try {
        const translatedContent = this._parseJsonResponse<Partial<Campaign>>(response.text);
        return {
            ...campaign,
            ...translatedContent
        };
    } catch (e) {
        console.error('Failed to parse translated campaign JSON:', response.text, e);
        return campaign;
    }
  }

  async generateImage(prompt: string, style: string, aspectRatio: string, referenceImageBase64?: string): Promise<string> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));
    
    let finalPrompt: string;
    
    const englishStyle = this.translationService.getEnglishImageStyle(style) || 'photorealistic';

    if (referenceImageBase64) {
        const imageAnalysisPrompt = this.translationService.get('prompts.generateImage.withReference', { prompt, style: englishStyle });
        
        const imagePart = {
            inlineData: {
              mimeType: 'image/jpeg',
              data: referenceImageBase64,
            },
          };
        const textPart = { text: imageAnalysisPrompt };

        const result = await this.genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });
        finalPrompt = result.text;
    } else {
        finalPrompt = this.translationService.get('prompts.generateImage.noReference', { prompt, style: englishStyle });
    }
    
    const response = await this.genAI.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: finalPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio as "1:1" | "16:9" | "9:16" | "4:3" | "3:4",
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    }

    throw new Error(this.translationService.get('errors.imageGenerationFailed'));
  }

  async generateUgcVideoScript(campaignConcept: string, langName: string): Promise<string> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    const prompt = this.translationService.get('prompts.generateUgcVideoScript', { campaignConcept, langName });

    const response = await this.genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  }

  async generateVideo(prompt: string, imageBase64: string, statusCallback: (status: string) => void, isUgc: boolean = false): Promise<string> {
    if (!this.genAI) throw new Error(this.translationService.get('errors.geminiNotInitialized'));

    statusCallback(this.translationService.get('videoStatuses.requesting'));
    
    const englishPrompt = await this.translateText(prompt, 'English');
    let finalPrompt: string;

    if (isUgc) {
      finalPrompt = this.translationService.get('prompts.generateVideoFromUgcScript', { ugcScript: englishPrompt });
    } else {
      finalPrompt = this.translationService.get('prompts.generateVideo', { prompt: englishPrompt });
    }

    let operation = await this.genAI.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: finalPrompt,
      image: {
        imageBytes: imageBase64,
        mimeType: 'image/jpeg',
      },
      config: {
        numberOfVideos: 1,
      }
    });

    const pollIntervals = [10000, 10000, 15000, 20000, 30000];
    let pollIndex = 0;
    
    const statusMessages = this.translationService.get('videoStatuses.progress');

    while (!operation.done) {
      const waitTime = pollIntervals[Math.min(pollIndex, pollIntervals.length - 1)];
      await new Promise(resolve => setTimeout(resolve, waitTime));
      statusCallback(statusMessages[Math.min(pollIndex, statusMessages.length - 1)]);
      operation = await this.genAI.operations.getVideosOperation({operation: operation});
      pollIndex++;
    }
    
    statusCallback(this.translationService.get('videoStatuses.success'));

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error(this.translationService.get('errors.videoDownloadLinkMissing'));
    }
    
    return downloadLink;
  }
}