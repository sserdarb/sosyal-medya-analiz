import { Component, ChangeDetectionStrategy, signal, inject, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule, FormGroup } from '@angular/forms';
import { GeminiService, PlanningData } from './services/gemini.service';
import { Campaign, BusinessInfo, SavedSession, GeneratedCampaignImage, GroundingSource, User, CampaignIdea } from './models';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TranslationService } from './services/translation.service';

declare var process: {
  env: {
    API_KEY: string;
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent, FormsModule],
})
export class AppComponent {
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);
  geminiService = inject(GeminiService);
  translationService = inject(TranslationService);

  // Translations
  translations = this.translationService.translations;
  
  // State management
  step = signal<'splash' | 'analysis' | 'onboarding' | 'app'>('splash');
  activeTab = signal<'planner' | 'reports' | 'settings'>('planner');
  
  isLoading = signal(false);
  loadingMessage = signal('');
  errorMessage = signal('');
  
  // Onboarding & Analysis
  businessInfoForm: FormGroup;
  analysisForm: FormGroup;
  accountReport = signal<string>('');
  

  // Planner state
  plannerTab = signal<'ideas' | 'calendar'>('ideas');
  planningForm: FormGroup;
  selectedPlatform = signal<'Instagram' | 'Facebook' | 'X' | 'LinkedIn'>('Instagram');
  platforms = ['Instagram', 'Facebook', 'X', 'LinkedIn'];
  planningInsights = signal<PlanningData | null>(null);
  selectedCampaignIdeas = signal<CampaignIdea[]>([]);
  selectedSpecialDays = signal<string[]>([]);
  
  // Content & Calendar state
  campaigns = signal<Campaign[]>([]);
  calendarDate = signal(new Date());
  monthName = computed(() => this.translations().calendar.months[this.calendarDate().getMonth()]);
  year = computed(() => this.calendarDate().getFullYear());
  monthDays = computed(() => this.generateMonthDays(this.calendarDate()));
  unscheduledCampaigns = computed(() => this.campaigns().filter(c => !c.scheduledAt));
  draggedCampaign = signal<Campaign | null>(null);

  // Modal states
  editingCampaign = signal<Campaign | null>(null);
  isShareModalOpen = signal(false);
  isNewPostModalOpen = signal(false);
  newPostForm: FormGroup;
  isGeneratingImage = signal(false);
  visualsTab = signal<'image' | 'video'>('image');
  
  // Image Generation State for Modal
  imageGenerationPrompt = signal('');
  selectedImageStyle = signal('Photorealistic');
  selectedAspectRatio = signal('1:1');
  aspectRatios = ['1:1', '16:9', '9:16', '4:3', '3:4'];

  // Reports
  competitorAnalysis = signal<{ analysis: string; sources: GroundingSource[] } | null>(null);
  isAnalyzingCompetitors = signal(false);
  totalPostsPlanned = computed(() => this.campaigns().length);
  scheduledPosts = computed(() => this.campaigns().filter(c => c.scheduledAt).length);

  // Dashboard computed properties
  businessName = computed(() => this.businessInfoForm.get('name')?.value || this.translations().common.defaultBusinessName);

  // Language state
  contentLanguage = signal<string>(this.translationService.currentLang());
  
  constructor() {
    // Initialize forms
    this.analysisForm = this.fb.group({
      instagramHandle: [''],
      websiteUrl: ['']
    });

    this.businessInfoForm = this.fb.group({
      name: ['', Validators.required],
      industry: ['', Validators.required],
      targetAudience: ['', Validators.required],
      products: ['', Validators.required],
      usp: ['', Validators.required],
      tone: ['', Validators.required],
    });

    this.newPostForm = this.fb.group({
        title: ['', Validators.required],
        concept: [''],
        caption: ['', Validators.required],
        hashtags: ['']
    });

    const today = new Date();
    // Default to the next month
    const year = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
    const month = today.getMonth() === 11 ? 0 : today.getMonth() + 1;
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    this.planningForm = this.fb.group({
      postsPerWeek: [3, [Validators.required, Validators.min(0), Validators.max(14)]],
      startDate: [formatDate(startDate), Validators.required],
      endDate: [formatDate(endDate), Validators.required]
    });

    // Splash screen timeout
    setTimeout(() => this.step.set('analysis'), 2500);

    effect(() => {
        const currentTheme = 'dark'; // Force dark theme as per designs
        if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });

    effect(() => {
        // Rerun when platform changes, but only in the app step and ideas tab
        if (this.step() === 'app' && this.plannerTab() === 'ideas') {
            this.fetchPlanningData();
        }
    }, { allowSignalWrites: true });
    
    // Effect for translating content on language change
    effect(() => {
        const newLang = this.translationService.currentLang();
        const oldLang = this.contentLanguage();
        
        // Only run if language has actually changed and we are in the main app view
        if (newLang !== oldLang && this.step() === 'app') {
            if (this.campaigns().length > 0 || this.competitorAnalysis()) {
                this.translateAllContent(newLang);
            } else {
                this.contentLanguage.set(newLang); // If no content, just update the language marker
            }
        }
    }, { allowSignalWrites: true });
  }

  // Language methods
  changeLanguage(langCode: string) {
    this.translationService.use(langCode as any);
    this.activeTab.set('planner');
  }

  async translateAllContent(targetLangCode: string) {
    this.isLoading.set(true);
    this.loadingMessage.set(this.translations().common.translating);
    
    try {
        const targetLangInfo = this.translationService.supportedLanguages.find(l => l.code === targetLangCode);
        if (!targetLangInfo) return;

        const targetLangName = targetLangInfo.name;

        // Translate campaigns
        if (this.campaigns().length > 0) {
            const campaignTranslationPromises = this.campaigns().map(campaign =>
                this.geminiService.translateCampaign(campaign, targetLangName)
            );
            const translatedCampaigns = await Promise.all(campaignTranslationPromises);
            this.campaigns.set(translatedCampaigns);
        }

        // Translate competitor analysis
        if (this.competitorAnalysis()) {
            const translatedAnalysis = await this.geminiService.translateText(
                this.competitorAnalysis()!.analysis,
                targetLangName
            );
            this.competitorAnalysis.update(ca => ca ? { ...ca, analysis: translatedAnalysis } : null);
        }

        // Translate planning insights
        if (this.planningInsights()) {
            this.loadingMessage.set(this.translations().planner.loadingIdeas);
            await this.fetchPlanningData(false); // Refetch planning data in the new language
        }

        this.contentLanguage.set(targetLangCode);
    } catch (e) {
        this.handleApiError(e);
    } finally {
        this.isLoading.set(false);
    }
  }


  // Analysis & Onboarding logic
  async startAnalysis() {
    if (!this.analysisForm.value.instagramHandle) {
      this.skipAnalysis();
      return;
    }
    this.isLoading.set(true);
    this.loadingMessage.set(this.translations().analysis.loadingMessage);
    try {
      const { instagramHandle, websiteUrl } = this.analysisForm.value;
      const { businessInfo, report } = await this.geminiService.analyzeSocialMediaAccount(
        instagramHandle, 
        'Instagram', 
        this.translationService.currentLanguageInfo()?.name || 'English', 
        websiteUrl
      );
      
      this.businessInfoForm.patchValue({
          name: businessInfo.name || '',
          industry: businessInfo.industry || '',
          targetAudience: businessInfo.targetAudience || '',
          products: businessInfo.products || '',
          usp: businessInfo.usp || '',
          tone: businessInfo.tone || '',
      });

      this.accountReport.set(report);
      this.step.set('onboarding');

    } catch (e) {
      this.handleApiError(e);
      this.step.set('onboarding'); // Fallback to manual onboarding on error
    } finally {
      this.isLoading.set(false);
    }
  }

  skipAnalysis() {
    this.step.set('onboarding');
  }

  finishOnboarding() {
    if(this.businessInfoForm.invalid) return;
    console.log('Onboarding complete:', this.businessInfoForm.value);
    this.contentLanguage.set(this.translationService.currentLang());
    this.step.set('app');
    // Initial data fetch is handled by the effect now
  }

  // Planner logic
  async fetchPlanningData(showLoading: boolean = true) {
    if (showLoading) {
      this.isLoading.set(true);
      this.loadingMessage.set(this.translations().planner.loadingIdeas);
    }
    this.planningInsights.set(null); // Clear previous insights
    try {
      const analysis = `İşletme Adı: ${this.businessInfoForm.get('name')?.value}, Sektör: ${this.businessInfoForm.get('industry')?.value}`;
      const { startDate, endDate } = this.planningForm.value;
      const insights = await this.geminiService.generatePlanningInsightsAndCampaignIdeas(
        analysis, 
        startDate, 
        endDate, 
        this.translationService.currentLanguageInfo()?.name || 'English',
        this.selectedPlatform()
      );
      this.planningInsights.set(insights);
    } catch (e) {
      this.handleApiError(e);
    } finally {
      if (showLoading) {
        this.isLoading.set(false);
      }
    }
  }

  toggleCampaignIdea(ideaToToggle: CampaignIdea) {
    this.selectedCampaignIdeas.update(ideas => {
        return ideas.some(idea => idea.title === ideaToToggle.title)
            ? ideas.filter(idea => idea.title !== ideaToToggle.title)
            : [...ideas, ideaToToggle];
    });
  }
  
  isIdeaSelected(idea: CampaignIdea): boolean {
    return this.selectedCampaignIdeas().some(i => i.title === idea.title);
  }

  toggleSpecialDay(dayToToggle: string) {
    this.selectedSpecialDays.update(days => {
      return days.includes(dayToToggle)
        ? days.filter(day => day !== dayToToggle)
        : [...days, dayToToggle];
    });
  }

  isSpecialDaySelected(day: string): boolean {
    return this.selectedSpecialDays().includes(day);
  }

  async generateContentPlan() {
    this.isLoading.set(true);
    this.loadingMessage.set(this.translations().planner.generatingPlan);
    
    try {
        const analysis = `Business Name: ${this.businessInfoForm.get('name')?.value}, Industry: ${this.businessInfoForm.get('industry')?.value}`;
        const langName = this.translationService.currentLanguageInfo()?.name || 'English';
        const platform = this.selectedPlatform();
        const trends = this.planningInsights()?.trends || [];
        const { postsPerWeek } = this.planningForm.value;

        const campaignPromises: Promise<Campaign[] | Campaign>[] = [];

        // Generate campaigns from selected ideas
        this.selectedCampaignIdeas().forEach(idea => {
            campaignPromises.push(this.geminiService.createCampaignFromIdea(analysis, platform, idea, langName));
        });

        // Generate content for special days
        if (this.selectedSpecialDays().length > 0) {
            campaignPromises.push(this.geminiService.createSpecialDayContent(analysis, platform, trends, this.selectedSpecialDays(), langName));
        }

        // Generate regular content
        if (postsPerWeek > 0) {
          campaignPromises.push(this.geminiService.createRegularContent(analysis, platform, trends, postsPerWeek, langName));
        }

        const results = await Promise.all(campaignPromises);
        
        // The result is an array of (Campaign[] or Campaign), so we flatten it.
        const newCampaigns: Campaign[] = (results as any[]).flat().map((c: Campaign) => ({
            ...c,
            color: this.getRandomColor()
        }));

        this.campaigns.update(existing => [...existing, ...newCampaigns]);
        this.selectedCampaignIdeas.set([]);
        this.selectedSpecialDays.set([]);
        this.plannerTab.set('calendar');
        this.contentLanguage.set(this.translationService.currentLang());

    } catch (e) {
        this.handleApiError(e);
    } finally {
        this.isLoading.set(false);
    }
  }

  getRandomColor(): string {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Calendar Methods
  generateMonthDays(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    let dayOfWeek = firstDay.getDay();
    if (dayOfWeek === 0) dayOfWeek = 7; // Sunday is 0, make it 7

    // Days from previous month
    for (let i = dayOfWeek - 1; i > 0; i--) {
      const prevDate = new Date(year, month, 1 - i);
      days.push({ day: prevDate.getDate(), dateObj: prevDate, isCurrentMonth: false });
    }

    // Days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({ day: i, dateObj: currentDate, isCurrentMonth: true });
    }

    // Days from next month
    const remainingSlots = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingSlots; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ day: i, dateObj: nextDate, isCurrentMonth: false });
    }

    return days;
  }

  changeMonth(delta: number) {
    this.calendarDate.update(d => {
      const newDate = new Date(d);
      newDate.setMonth(d.getMonth() + delta);
      return newDate;
    });
  }

  getCampaignsForDate(date: Date): Campaign[] {
    return this.campaigns().filter(c => {
      if (!c.scheduledAt) return false;
      const scheduledDate = new Date(c.scheduledAt);
      return scheduledDate.toDateString() === date.toDateString();
    });
  }

  // Drag & Drop
  onDragStart(event: DragEvent, campaign: Campaign) {
    this.draggedCampaign.set(campaign);
    if(event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).classList.add('drag-over');
  }

  onDragLeave(event: DragEvent) {
    (event.currentTarget as HTMLElement).classList.remove('drag-over');
  }

  onDrop(event: DragEvent, date: Date | null) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).classList.remove('drag-over');
    const campaignToMove = this.draggedCampaign();
    if (campaignToMove) {
      this.campaigns.update(campaigns =>
        campaigns.map(c =>
          c.title === campaignToMove.title
            ? { ...c, scheduledAt: date?.toISOString() ?? null }
            : c
        )
      );
      this.draggedCampaign.set(null);
    }
  }

  // Modal Methods
  openEditModal(campaign: Campaign) {
    this.visualsTab.set('image');
    this.editingCampaign.set({ ...campaign }); // Create a copy for editing
    if(campaign.imagePrompt) {
        this.imageGenerationPrompt.set(campaign.imagePrompt);
    }
  }

  closeEditModal() {
    this.editingCampaign.set(null);
  }

  saveEditedCampaign() {
    const editedCampaign = this.editingCampaign();
    if (editedCampaign) {
      this.campaigns.update(campaigns =>
        campaigns.map(c =>
          c.title === editedCampaign.title ? editedCampaign : c
        )
      );
    }
    this.closeEditModal();
  }

  openNewPostModal() {
    this.isNewPostModalOpen.set(true);
  }

  closeNewPostModal() {
    this.isNewPostModalOpen.set(false);
    this.newPostForm.reset();
  }

  saveNewPost() {
    if (this.newPostForm.invalid) return;
    const { title, concept, caption, hashtags } = this.newPostForm.value;
    const newCampaign: Campaign = {
      title,
      concept,
      caption,
      hashtags: hashtags ? hashtags.split(/[\s,]+/) : [],
      color: this.getRandomColor(),
      scheduledAt: null,
    };
    this.campaigns.update(c => [...c, newCampaign]);
    this.closeNewPostModal();
  }

  // Image & Video Generation
  async generateImageForCampaign() {
    const campaign = this.editingCampaign();
    if (!campaign || !this.imageGenerationPrompt()) return;

    this.isGeneratingImage.set(true);
    try {
        const imageBase64 = await this.geminiService.generateImage(
            this.imageGenerationPrompt(),
            this.selectedImageStyle(),
            this.selectedAspectRatio()
        );

        const newImage: GeneratedCampaignImage = {
            url: this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${imageBase64}`),
            urlString: `data:image/jpeg;base64,${imageBase64}`,
            style: this.selectedImageStyle(),
            aspectRatio: this.selectedAspectRatio()
        };

        this.editingCampaign.update(c => {
            if (!c) return null;
            const existingImages = c.generatedImages || [];
            return {
                ...c,
                generatedImages: [...existingImages, newImage]
            };
        });

    } catch(e) {
        this.handleApiError(e);
    } finally {
        this.isGeneratingImage.set(false);
    }
  }

  async generateUgcScriptForCampaign() {
    const campaign = this.editingCampaign();
    if (!campaign) return;

    this.editingCampaign.update(c => c ? { ...c, isGeneratingUgcScript: true } : null);
    try {
        const script = await this.geminiService.generateUgcVideoScript(campaign.concept, this.translationService.currentLanguageInfo()?.name || 'English');
        this.editingCampaign.update(c => c ? { ...c, ugcScript: script } : null);
    } catch (e) {
        this.handleApiError(e);
    } finally {
        this.editingCampaign.update(c => c ? { ...c, isGeneratingUgcScript: false } : null);
    }
  }

  async generateVideoForCampaign(source: 'concept' | 'ugc') {
    const campaign = this.editingCampaign();
    if (!campaign || !campaign.generatedImages || campaign.generatedImages.length === 0) {
        this.errorMessage.set(this.translations().errors.videoPrerequisitesImage);
        setTimeout(() => this.errorMessage.set(''), 5000);
        return;
    }

    let prompt: string;
    const isUgc = source === 'ugc';

    if (isUgc) {
        if (!campaign.ugcScript) {
            this.errorMessage.set(this.translations().errors.videoPrerequisitesScript);
            setTimeout(() => this.errorMessage.set(''), 5000);
            return;
        }
        prompt = campaign.ugcScript;
    } else {
        if (!campaign.concept) {
            this.errorMessage.set(this.translations().errors.videoPrerequisitesConcept);
            setTimeout(() => this.errorMessage.set(''), 5000);
            return;
        }
        prompt = campaign.concept;
    }

    const imageBase64 = campaign.generatedImages[0].urlString.split(',')[1];

    this.editingCampaign.update(c => c ? { ...c, isGenerating: 'video', generationStatus: this.translations().videoStatuses.requesting } : null);

    try {
        const statusCallback = (status: string) => {
            this.editingCampaign.update(c => c ? { ...c, generationStatus: status } : null);
        };

        const videoUrl = await this.geminiService.generateVideo(prompt, imageBase64, statusCallback, isUgc);
        
        const safeUrl = this.sanitizer.bypassSecurityTrustUrl(videoUrl);
        
        this.editingCampaign.update(c => c ? { 
            ...c, 
            generatedVideoUrl: safeUrl, 
            generatedVideoUrlString: videoUrl,
            isGenerating: null,
            generationStatus: this.translations().videoStatuses.success
        } : null);

    } catch (e) {
        this.handleApiError(e);
        this.editingCampaign.update(c => c ? { ...c, isGenerating: null, generationStatus: 'Failed' } : null);
    }
  }


  // Reports
  async runCompetitorAnalysis() {
    this.isAnalyzingCompetitors.set(true);
    try {
      const result = await this.geminiService.analyzeCompetitors(
        this.businessInfoForm.value,
        this.selectedPlatform(),
        this.translationService.currentLanguageInfo()?.name || 'English'
      );
      this.competitorAnalysis.set(result);
    } catch (e) {
      this.handleApiError(e);
    } finally {
      this.isAnalyzingCompetitors.set(false);
    }
  }

  // Helpers
  private handleApiError(e: any) {
    console.error(e);
    const message = e instanceof Error ? e.message : 'An unknown error occurred.';
    this.errorMessage.set(message);
    setTimeout(() => this.errorMessage.set(''), 5000); // Auto-hide error
  }
}
