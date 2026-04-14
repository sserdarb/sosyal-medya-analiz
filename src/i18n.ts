const enTranslations = {
    splash: {
        title: 'Content Strategy Planner',
        tagline: 'Craft your content strategy with AI.'
    },
    analysis: {
        title: 'Ready to Analyze Your Account?',
        subtitle: 'Let\'s analyze your Instagram account and website to create the right strategy.',
        instagramLabel: 'Instagram Username',
        instagramPlaceholder: 'username',
        websiteLabel: 'Website (Optional)',
        websitePlaceholder: 'https://yoursite.com',
        startButton: 'Start Analysis',
        skipButton: 'Skip This Step',
        loadingMessage: 'Analyzing account...'
    },
    onboarding: {
        step: 'Step',
        title: 'Let\'s Get to Know Your Business',
        subtitle: 'We have pre-filled your business information based on our analysis. Please review and confirm.',
        reportTitle: 'AI Analysis Report',
        noReport: 'No analysis was performed. Please fill in your business details manually.',
        nameLabel: 'Business Name',
        namePlaceholder: 'e.g., Delicious Coffee Shop',
        industryLabel: 'Your Sector',
        industryPlaceholder: 'e.g., Food & Beverage',
        targetAudienceLabel: 'Your Target Audience',
        targetAudiencePlaceholder: 'Enter a brief description',
        productsLabel: 'Products/Services You Offer',
        productsPlaceholder: 'Separate with keywords',
        uspLabel: 'Unique Selling Proposition (USP)',
        uspPlaceholder: 'What sets you apart from your competitors?',
        toneLabel: 'Your Brand\'s Communication Tone',
        tonePlaceholder: 'Select...',
        nextButton: 'Next',
        finishButton: 'Finish Onboarding & Go to App'
    },
    tabs: {
        planner: 'Planner',
        reports: 'Reports',
        settings: 'Settings'
    },
    reports: {
        competitorAnalysisTitle: 'Competitor Analysis',
        runAnalysisButton: 'Run Competitor Analysis',
        analysisSourcesTitle: 'Sources',
        totalPosts: 'Total Posts',
        scheduled: 'Scheduled',
        unscheduled: 'Unscheduled',
        loadingCompetitors: 'Analyzing competitors...',
        noCompetitorAnalysis: 'Run an analysis to see how you stack up against the competition.'
    },
    planner: {
        title: 'Strategy Builder',
        ideasTab: 'Ideas',
        calendarTab: 'Calendar',
        platformSelectorLabel: 'Select a platform for your strategy',
        loadingIdeas: 'Generating strategic ideas...',
        generatingPlan: 'Generating your content plan...',
        planSettingsTitle: 'Plan Settings',
        postsPerWeekLabel: 'Regular Posts Per Week',
        startDateLabel: 'Start Date',
        endDateLabel: 'End Date',
        trendsTitle: 'Trends and Opportunities',
        specialDaysTitle: 'Special Days and Events',
        weeklySuggestionsTitle: 'Weekly Post Suggestions',
        campaignIdeasTitle: 'Campaign Ideas',
        seeAll: 'See All',
        createPlanButton: 'Create Content Plan',
        unplannedTitle: 'Unscheduled',
        newPost: 'New Post',
    },
    modals: {
        editPost: {
            title: 'Edit Post',
            postTitleLabel: 'Title',
            descriptionLabel: 'Description',
            statusLabel: 'Status (Color Code)',
            adTargeting: 'Ad Targeting',
            adCreative: 'Ad Creative',
            visualsTitle: 'Visual Content Generation',
            imageTab: 'Image',
            videoTab: 'Video',
            imagePromptLabel: 'Image Prompt',
            styleLabel: 'Style',
            aspectRatioLabel: 'Aspect Ratio',
            generateImageButton: 'Generate Image',
            imagePlaceholder: 'Generated images will appear here.',
            generateScriptButton: 'Generate UGC Video Script',
            ugcScriptLabel: 'UGC Video Script',
            ugcScriptPlaceholder: 'Generate or paste a UGC script here.',
            generateVideoButtonFromConcept: 'Generate from Concept',
            generateVideoButtonFromScript: 'Generate from Script',
            closeButton: 'Close',
            saveButton: 'Save',
        },
        newPost: {
            title: 'Create New Post',
            postTitleLabel: 'Title',
            postTitlePlaceholder: 'Enter post title',
            conceptLabel: 'Concept (Main idea of the content)',
            conceptPlaceholder: 'Describe the main idea of the content',
            captionLabel: 'Post Text',
            captionPlaceholder: 'Write your social media post text here...',
            hashtagsLabel: 'Hashtags',
            hashtagsPlaceholder: '#trending #marketing #design',
            hashtagsHelper: 'Separate words with commas or spaces.',
            saveButton: 'Save',
            closeButton: 'Cancel'
        }
    },
    common: {
        comingSoon: 'This screen will be implemented soon.',
        unspecified: 'Unspecified',
        notProvided: 'Not provided',
        noReport: 'No prior report available.',
        save: 'Save',
        close: 'Close',
        cancel: 'Cancel',
        translating: 'Translating content...',
        defaultBusinessName: 'Your Business'
    },
    communicationTones: ['Professional', 'Friendly', 'Witty', 'Formal', 'Energetic', 'Humorous', 'Inspirational'],
    platforms: {
        instagram: 'Instagram',
        facebook: 'Facebook',
        x: 'X',
        linkedin: 'LinkedIn',
    },
    calendar: {
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        daysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    imageStyles: ['Photorealistic', 'Cinematic', 'Minimalist', 'Abstract', '3D Render', 'Vector Art', 'Watercolor'],
    videoStatuses: {
      requesting: 'Requesting video generation...',
      progress: [
        'Warming up the creativity engine...',
        'Rendering pixels into motion...',
        'Almost there, adding the final touches...'
      ],
      success: 'Video generated successfully!'
    },
    errors: {
      apiKeyMissing: 'API Key is missing. Please configure your API key to use the AI features.',
      geminiNotInitialized: 'Gemini service is not initialized.',
      jsonParseFailed: 'An unexpected error occurred while processing the AI response. Please try again.',
      accountParseFailed: 'Could not analyze the account. Please check the account details and try again, or fill in the information manually.',
      planningFailed: 'Could not generate planning insights. The AI might be busy. Please try again in a moment.',
      campaignParseFailed: 'Could not generate campaign content. Please try generating the plan again.',
      imageGenerationFailed: 'Image generation failed. Please try again.',
      videoDownloadLinkMissing: 'Video was generated, but the download link is missing. Please try again.',
      videoPrerequisitesImage: 'Please generate at least one image before creating a video.',
      videoPrerequisitesScript: 'Please generate a UGC script before creating a video from the script.',
      videoPrerequisitesConcept: 'The campaign concept is missing. Please add a concept to generate a video.'
    },
    prompts: {
      analyzeSocialMediaAccount: `You are a world-class social media strategist. Analyze the following {platform} account and website to understand the business. The user's language preference is {langName}.

      **Account Handle:** @{accountHandle}
      **Website:** {websiteUrl}

      Based on the publicly available information, generate a JSON object with two keys: "businessInfo" and "report".

      1.  **businessInfo**: An object containing the following fields. Be concise and accurate.
          *   \`name\`: The full name of the business.
          *   \`industry\`: The industry the business operates in (e.g., "Fashion", "Food & Beverage", "Tech").
          *   \`targetAudience\`: A brief description of the customer demographic they are targeting.
          *   \`products\`: The main products or services offered.
          *   \`usp\`: The unique selling proposition. Summarize in a single sentence, max 250 characters.
          *   \`tone\`: The general communication tone (e.g., "humorous", "professional", "friendly").

      2.  **report**: A detailed but easy-to-read HTML string. Evaluate the account's strengths, weaknesses, audience engagement, content quality, and overall digital presence. Provide concrete, actionable suggestions for improvement. Use headings (<h3>) for sections and bullet points (<ul><li>) for suggestions.`,
      analyzeBusiness: `You are a master business strategist. Based on the business information provided below, write a comprehensive business analysis summary in {langName}.

      **Business Information:**
      *   Name: {name}
      *   Industry: {industry}
      *   Target Audience: {targetAudience}
      *   Products/Services: {products}
      *   Unique Selling Proposition: {usp}
      *   Communication Tone: {tone}
      *   Initial Social Media Report: {report}

      Your task is to synthesize this information into a cohesive analysis that will be the foundation for a content strategy. The output should be a single text string. Focus on the core brand identity and strategic opportunities.`,
      analyzeCompetitors: `You are a competitive intelligence analyst specializing in social media. The user's business, "{name}", is in the "{industry}" sector. Their target audience is "{targetAudience}" and they sell "{products}".

      Your task is to perform a competitive analysis for the "{platform}" platform in {langName}.

      1.  Identify 2-3 key competitors.
      2.  Analyze their content strategy: What themes do they use? What content formats are most successful (e.g., videos, carousels, stories)? What is their posting frequency?
      3.  Analyze their audience engagement: What are their most engaging posts about? How do they interact with their followers?
      4.  Identify their strengths and weaknesses.
      5.  Provide a summary of key takeaways and opportunities for "{name}" to differentiate itself and capture market share.

      The output should be a well-structured HTML report. Use headings and lists.`,
      generatePlanningInsightsAndCampaignIdeas: `You are a Senior Content Strategist. Based on the following business analysis, create a content plan for {platform} for the period {startDate} to {endDate}. The response must be in {langName}.

      **Business Analysis:** "{analysis}"

      Your task is to generate a JSON object with three keys: "trends", "specialDays", and "campaignIdeas".

      1.  **trends**: An array of 2-3 relevant trends or content opportunities for this business. Each object should have a "title" and a "description".
      2.  **specialDays**: An array of 3-4 upcoming special days, holidays, or events relevant to the business's industry and target audience within the specified date range. Each object should have a "day" (e.g., "October 31: Halloween") and a "description" of a content idea.
      3.  **campaignIdeas**: An array of 3-4 creative, high-level campaign ideas. These should be more than just single posts. Each object should have a "title" and a "description".`,
      generatePlanningInsightsFallback: `The previous attempt to generate a content plan failed. Let's try a simpler approach. Based on the business analysis "{analysis}", create a content plan for {platform} in {langName}. Generate a JSON object with "trends", "specialDays", and "campaignIdeas". Provide at least one item for each key.`,
      generatePlanningInsightsEmergencyFallback: `All previous attempts failed. Generate a generic but high-quality content plan for a business on {platform} in {langName}. The business analysis is: "{analysis}". The JSON must contain "trends", "specialDays", and "campaignIdeas" with at least one entry each.`,
      createCampaignFromIdea: `You are an AI Creative Director. Your task is to flesh out a campaign idea for {platform} into a detailed post concept. The response must be in {langName}.

      **Business Analysis:** "{analysis}"
      **Campaign Idea:**
      *   Title: {ideaTitle}
      *   Description: {ideaDescription}

      Generate a JSON object with the following keys:
      *   \`title\`: A catchy title for the specific post.
      *   \`concept\`: A short paragraph describing the main concept of the post.
      *   \`caption\`: A ready-to-use, engaging caption for the post. Include emojis.
      *   \`hashtags\`: An array of 5-7 relevant and trending hashtags.
      *   \`imagePrompt\`: A detailed, creative prompt for an AI image generator (like Imagen) to create a stunning visual for this post. Be descriptive about style, colors, composition, and subject.
      *   \`adTargeting\`: A detailed description of the target audience for this ad, formatted as an HTML list (<ul><li>). Include demographics, interests, and behaviors.
      *   \`adCreative\`: A description of the ad creative concept, formatted as an HTML list (<ul><li>). Include visual elements, call to action (CTA), and the main message.`,
      createSpecialDayContent: `You are an AI Content Creator. Create a series of social media posts for {platform} based on selected special days. The response must be in {langName}.

      **Business Analysis:** "{analysis}"
      **Relevant Trends:** "{trends}"
      **Selected Special Days:** {selectedDays}

      Generate a JSON array of post objects. Each object should have the following keys, similar to the single campaign creation: \`title\`, \`concept\`, \`caption\`, \`hashtags\`, \`imagePrompt\`, \`adTargeting\`, \`adCreative\`.`,
      createRegularContent: `You are an AI Content Creator. Create a set of {totalRegularPosts} regular, "evergreen" social media posts for {platform} for a one-month period. The response must be in {langName}.

      **Business Analysis:** "{analysis}"
      **Relevant Trends:** "{trends}"

      The posts should be varied and engaging, designed to build community and reinforce the brand's identity. Generate a JSON array of post objects, each with: \`title\`, \`concept\`, \`caption\`, \`hashtags\`, \`imagePrompt\`, \`adTargeting\`, \`adCreative\`.`,
      translateCampaign: `You are a professional translator. Translate the following campaign content to {targetLangName}.

      **Original Campaign (JSON):**
      {campaignJson}

      Your task is to return a JSON object with the exact same structure, but with the values of "title", "concept", "caption", and "hashtags" translated into {targetLangName}. Ensure the hashtags are relevant for the target language and region.`,
      generateImage: {
          withReference: `Analyze the provided reference image. Then, create a new, original image based on the following prompt, incorporating the style and mood of the reference image. Prompt: "{prompt}". The desired style is "{style}".`,
          noReference: `Create an image based on the following prompt: "{prompt}". The style should be "{style}".`
      },
      generateUgcVideoScript: `You are a scriptwriter for viral social media videos. Write a short, engaging User-Generated Content (UGC) style video script based on this campaign concept: "{campaignConcept}". The response must be in {langName}.

      The script should be formatted with clear scene descriptions and dialogue/voiceover. It should feel authentic and be easy for a creator to film. The output must be plain text.`,
      generateVideo: `Based on the following prompt, create a short video concept. Prompt: "{prompt}"`,
      generateVideoFromUgcScript: `Based on the following UGC script, create a video. Script: "{ugcScript}"`
    },
    hardcodedEmergencyPlan: {
      trends: [
        { title: 'Short-Form Video Content', description: 'Create engaging Reels or Shorts to capture audience attention quickly.' },
        { title: 'User-Generated Content (UGC)', description: 'Encourage your followers to share their experiences with your product and feature them.' }
      ],
      specialDays: [
        { day: 'World Coffee Day', description: 'Offer a special discount or create a unique coffee-themed post.' },
        { day: 'Local Community Event', description: 'Engage with the local community by posting about an upcoming event.' }
      ],
      campaignIdeas: [
        { title: 'Behind the Scenes', description: 'Showcase the process of how your product is made or the team behind your service.' },
        { title: 'Customer of the Week', description: 'Feature a loyal customer and share their story to build community.' }
      ]
    }
};

const trTranslations = {
    splash: {
        title: 'İçerik Stratejisi Planlayıcı',
        tagline: 'Yapay zeka ile içerik stratejinizi oluşturun.'
    },
    analysis: {
        title: 'Hesabınızı Analiz Etmeye Hazır Mısınız?',
        subtitle: 'Doğru stratejiyi oluşturmak için Instagram hesabınızı ve web sitenizi analiz edelim.',
        instagramLabel: 'Instagram Kullanıcı Adı',
        instagramPlaceholder: 'kullaniciadi',
        websiteLabel: 'Web Sitesi (İsteğe Bağlı)',
        websitePlaceholder: 'https://siteniz.com',
        startButton: 'Analize Başla',
        skipButton: 'Bu Adımı Atla',
        loadingMessage: 'Hesap analiz ediliyor...'
    },
    onboarding: {
        step: 'Adım',
        title: 'İşletmenizi Tanıyalım',
        subtitle: 'Analizimize göre işletme bilgilerinizi önceden doldurduk. Lütfen inceleyip onaylayın.',
        reportTitle: 'Yapay Zeka Analiz Raporu',
        noReport: 'Analiz yapılmadı. Lütfen işletme bilgilerinizi manuel olarak doldurun.',
        nameLabel: 'İşletme Adı',
        namePlaceholder: 'ör. Lezzetli Kahve Dükkanı',
        industryLabel: 'Sektörünüz',
        industryPlaceholder: 'ör. Yiyecek & İçecek',
        targetAudienceLabel: 'Hedef Kitleniz',
        targetAudiencePlaceholder: 'Kısa bir açıklama girin',
        productsLabel: 'Sunduğunuz Ürünler/Hizmetler',
        productsPlaceholder: 'Anahtar kelimelerle ayırın',
        uspLabel: 'Sizi Eşsiz Kılan Özellik (USP)',
        uspPlaceholder: 'Sizi rakiplerinizden ayıran nedir?',
        toneLabel: 'Markanızın İletişim Tonu',
        tonePlaceholder: 'Seçiniz...',
        nextButton: 'Sonraki',
        finishButton: 'Bitir ve Uygulamaya Geç'
    },
    tabs: {
        planner: 'Planlayıcı',
        reports: 'Raporlar',
        settings: 'Ayarlar'
    },
    reports: {
        competitorAnalysisTitle: 'Rakip Analizi',
        runAnalysisButton: 'Rakip Analizi Başlat',
        analysisSourcesTitle: 'Kaynaklar',
        totalPosts: 'Toplam Gönderi',
        scheduled: 'Planlanmış',
        unscheduled: 'Planlanmamış',
        loadingCompetitors: 'Rakipler analiz ediliyor...',
        noCompetitorAnalysis: 'Rakiplerinize karşı durumunuzu görmek için bir analiz çalıştırın.'
    },
    planner: {
        title: 'Strateji Oluşturucu',
        ideasTab: 'Fikirler',
        calendarTab: 'Takvim',
        platformSelectorLabel: 'Stratejiniz için bir platform seçin',
        loadingIdeas: 'Stratejik fikirler üretiliyor...',
        generatingPlan: 'İçerik planınız oluşturuluyor...',
        planSettingsTitle: 'Plan Ayarları',
        postsPerWeekLabel: 'Haftalık Rutin Gönderi Sayısı',
        startDateLabel: 'Başlangıç Tarihi',
        endDateLabel: 'Bitiş Tarihi',
        trendsTitle: 'Trendler ve Fırsatlar',
        specialDaysTitle: 'Özel Günler ve Etkinlikler',
        weeklySuggestionsTitle: 'Haftalık Gönderi Önerileri',
        campaignIdeasTitle: 'Kampanya Fikirleri',
        seeAll: 'Tümünü Gör',
        createPlanButton: 'İçerik Planı Oluştur',
        unplannedTitle: 'Planlanmamış',
        newPost: 'Yeni Gönderi',
    },
    modals: {
        editPost: {
            title: 'Gönderiyi Düzenle',
            postTitleLabel: 'Başlık',
            descriptionLabel: 'Açıklama',
            statusLabel: 'Durum (Renk Kodu)',
            adTargeting: 'Reklam Hedeflemesi',
            adCreative: 'Reklam Kreatifi',
            visualsTitle: 'Görsel İçerik Üretimi',
            imageTab: 'Görsel',
            videoTab: 'Video',
            imagePromptLabel: 'Görsel Komutu',
            styleLabel: 'Stil',
            aspectRatioLabel: 'En Boy Oranı',
            generateImageButton: 'Görsel Oluştur',
            imagePlaceholder: 'Oluşturulan görseller burada görünecek.',
            generateScriptButton: 'UGC Video Senaryosu Oluştur',
            ugcScriptLabel: 'UGC Video Senaryosu',
            ugcScriptPlaceholder: 'Buraya bir UGC senaryosu oluşturun veya yapıştırın.',
            generateVideoButtonFromConcept: 'Konseptten Oluştur',
            generateVideoButtonFromScript: 'Senaryodan Oluştur',
            closeButton: 'Kapat',
            saveButton: 'Kaydet',
        },
        newPost: {
            title: 'Yeni Gönderi Oluştur',
            postTitleLabel: 'Başlık',
            postTitlePlaceholder: 'Gönderi başlığını girin',
            conceptLabel: 'Konsept (İçeriğin ana fikri)',
            conceptPlaceholder: 'İçeriğin ana fikrini açıklayın',
            captionLabel: 'Gönderi Metni',
            captionPlaceholder: 'Sosyal medya gönderi metninizi buraya yazın...',
            hashtagsLabel: 'Etiketler',
            hashtagsPlaceholder: '#trend #pazarlama #tasarım',
            hashtagsHelper: 'Kelimeleri virgül veya boşlukla ayırın.',
            saveButton: 'Kaydet',
            closeButton: 'İptal'
        }
    },
    common: {
        comingSoon: 'Bu ekran yakında uygulanacaktır.',
        unspecified: 'Belirtilmemiş',
        notProvided: 'Sağlanmadı',
        noReport: 'Önceden rapor mevcut değil.',
        save: 'Kaydet',
        close: 'Kapat',
        cancel: 'İptal',
        translating: 'İçerik çevriliyor...',
        defaultBusinessName: 'İşletmeniz'
    },
    communicationTones: ['Profesyonel', 'Samimi', 'Esprili', 'Resmi', 'Enerjik', 'Mizahi', 'İlham Verici'],
    platforms: {
        instagram: 'Instagram',
        facebook: 'Facebook',
        x: 'X',
        linkedin: 'LinkedIn',
    },
    calendar: {
        months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        daysShort: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    },
    imageStyles: ['Fotogerçekçi', 'Sinematik', 'Minimalist', 'Soyut', '3D Render', 'Vektör Sanatı', 'Suluboya'],
    videoStatuses: {
        requesting: 'Video oluşturma isteniyor...',
        progress: [
            'Yaratıcılık motoru ısınıyor...',
            'Pikseller harekete dönüştürülüyor...',
            'Neredeyse bitti, son dokunuşlar ekleniyor...'
        ],
        success: 'Video başarıyla oluşturuldu!'
    },
    errors: {
        apiKeyMissing: 'API Anahtarı eksik. Yapay zeka özelliklerini kullanmak için lütfen API anahtarınızı yapılandırın.',
        geminiNotInitialized: 'Gemini servisi başlatılamadı.',
        jsonParseFailed: 'Yapay zeka yanıtı işlenirken beklenmedik bir hata oluştu. Lütfen tekrar deneyin.',
        accountParseFailed: 'Hesap analiz edilemedi. Lütfen hesap detaylarını kontrol edip tekrar deneyin veya bilgileri manuel olarak doldurun.',
        planningFailed: 'Planlama öngörüleri oluşturulamadı. Yapay zeka meşgul olabilir. Lütfen bir süre sonra tekrar deneyin.',
        campaignParseFailed: 'Kampanya içeriği oluşturulamadı. Lütfen planı tekrar oluşturmayı deneyin.',
        imageGenerationFailed: 'Görsel oluşturulamadı. Lütfen tekrar deneyin.',
        videoDownloadLinkMissing: 'Video oluşturuldu, ancak indirme bağlantısı eksik. Lütfen tekrar deneyin.',
        videoPrerequisitesImage: 'Lütfen video oluşturmadan önce en az bir görsel oluşturun.',
        videoPrerequisitesScript: 'Lütfen senaryodan video oluşturmadan önce bir UGC senaryosu oluşturun.',
        videoPrerequisitesConcept: 'Kampanya konsepti eksik. Lütfen video oluşturmak için bir konsept ekleyin.'
    },
    prompts: {
        analyzeSocialMediaAccount: `Sen birinci sınıf bir sosyal medya stratejistisin. İşi anlamak için aşağıdaki {platform} hesabını ve web sitesini analiz et. Kullanıcının dil tercihi {langName}.

        **Hesap Adı:** @{accountHandle}
        **Web Sitesi:** {websiteUrl}

        Herkese açık bilgilere dayanarak, "businessInfo" ve "report" olmak üzere iki anahtara sahip bir JSON nesnesi oluştur.

        1.  **businessInfo**: Aşağıdaki alanları içeren bir nesne. Kısa ve öz ol.
            *   \`name\`: İşletmenin tam adı.
            *   \`industry\`: İşletmenin faaliyet gösterdiği sektör (ör. "Moda", "Yiyecek & İçecek", "Teknoloji").
            *   \`targetAudience\`: Hedefledikleri müşteri demografisinin kısa bir açıklaması.
            *   \`products\`: Sunulan ana ürünler veya hizmetler.
            *   \`usp\`: Benzersiz satış teklifi. En fazla 250 karakterlik tek bir cümlede özetle.
            *   \`tone\`: Genel iletişim tonu (ör. "mizahi", "profesyonel", "samimi").

        2.  **report**: Ayrıntılı ama okunması kolay bir HTML dizesi. Hesabın güçlü ve zayıf yönlerini, kitle etkileşimini, içerik kalitesini ve genel dijital varlığını değerlendir. İyileştirme için somut, eyleme geçirilebilir öneriler sun. Bölümler için başlıklar (<h3>) ve öneriler için madde imleri (<ul><li>) kullan.`,
        analyzeBusiness: `Sen usta bir iş stratejistisin. Aşağıda verilen işletme bilgilerine dayanarak, {langName} dilinde kapsamlı bir işletme analizi özeti yaz.

        **İşletme Bilgileri:**
        *   Ad: {name}
        *   Sektör: {industry}
        *   Hedef Kitle: {targetAudience}
        *   Ürünler/Hizmetler: {products}
        *   Benzersiz Satış Teklifi: {usp}
        *   İletişim Tonu: {tone}
        *   İlk Sosyal Medya Raporu: {report}

        Görevin, bu bilgileri bir içerik stratejisinin temelini oluşturacak tutarlı bir analizde sentezlemek. Çıktı tek bir metin dizesi olmalıdır. Çekirdek marka kimliğine ve stratejik fırsatlara odaklan.`,
        analyzeCompetitors: `Sen sosyal medya konusunda uzmanlaşmış bir rekabet istihbaratı analistisin. Kullanıcının "{name}" adlı işletmesi "{industry}" sektöründe yer alıyor. Hedef kitleleri "{targetAudience}" ve sattıkları ürünler "{products}".

        Görevin, {langName} dilinde "{platform}" platformu için bir rakip analizi yapmak.

        1.  2-3 ana rakibi belirle.
        2.  İçerik stratejilerini analiz et: Hangi temaları kullanıyorlar? Hangi içerik formatları en başarılı (ör. videolar, karuseller, hikayeler)? Paylaşım sıklıkları nedir?
        3.  Kitle etkileşimlerini analiz et: En çok etkileşim alan gönderileri ne hakkında? Takipçileriyle nasıl etkileşime giriyorlar?
        4.  Güçlü ve zayıf yönlerini belirle.
        5.  "{name}" işletmesinin kendini farklılaştırması ve pazar payı kazanması için temel çıkarımların ve fırsatların bir özetini sun.

        Çıktı, iyi yapılandırılmış bir HTML raporu olmalıdır. Başlıklar ve listeler kullan.`,
        generatePlanningInsightsAndCampaignIdeas: `Sen Kıdemli bir İçerik Stratejistisin. Aşağıdaki işletme analizine dayanarak, {startDate} ile {endDate} tarihleri arası için {platform} platformuna yönelik bir içerik planı oluştur. Yanıt {langName} dilinde olmalıdır.

        **İşletme Analizi:** "{analysis}"

        Görevin, "trends", "specialDays" ve "campaignIdeas" olmak üzere üç anahtara sahip bir JSON nesnesi oluşturmak.

        1.  **trends**: Bu işletme için ilgili 2-3 trend veya içerik fırsatından oluşan bir dizi. Her nesnenin bir "title" ve "description" alanı olmalı.
        2.  **specialDays**: Belirtilen tarih aralığında işletmenin sektörüne ve hedef kitlesine uygun 3-4 yaklaşan özel gün, tatil veya etkinlikten oluşan bir dizi. Her nesnenin bir "day" (ör. "31 Ekim: Cadılar Bayramı") ve bir içerik fikri "description" alanı olmalı.
        3.  **campaignIdeas**: 3-4 yaratıcı, üst düzey kampanya fikrinden oluşan bir dizi. Bunlar tek bir gönderiden daha fazlası olmalı. Her nesnenin bir "title" ve "description" alanı olmalı.`,
        generatePlanningInsightsFallback: `İçerik planı oluşturma konusundaki önceki deneme başarısız oldu. Daha basit bir yaklaşım deneyelim. "{analysis}" işletme analizine dayanarak, {langName} dilinde {platform} için bir içerik planı oluştur. "trends", "specialDays" ve "campaignIdeas" içeren bir JSON nesnesi oluştur. Her anahtar için en az bir öğe sağla.`,
        generatePlanningInsightsEmergencyFallback: `Önceki tüm denemeler başarısız oldu. {langName} dilinde {platform} üzerinde bir işletme için genel ama yüksek kaliteli bir içerik planı oluştur. İşletme analizi: "{analysis}". JSON, her biri en az bir giriş içeren "trends", "specialDays" ve "campaignIdeas" anahtarlarını içermelidir.`,
        createCampaignFromIdea: `Sen bir Yapay Zeka Kreatif Direktörüsün. Görevin, bir kampanya fikrini {platform} için ayrıntılı bir gönderi konseptine dönüştürmek. Yanıt {langName} dilinde olmalıdır.

        **İşletme Analizi:** "{analysis}"
        **Kampanya Fikri:**
        *   Başlık: {ideaTitle}
        *   Açıklama: {ideaDescription}

        Aşağıdaki anahtarlara sahip bir JSON nesnesi oluştur:
        *   \`title\`: Belirli gönderi için akılda kalıcı bir başlık.
        *   \`concept\`: Gönderinin ana konseptini açıklayan kısa bir paragraf.
        *   \`caption\`: Gönderi için kullanıma hazır, ilgi çekici bir başlık metni. Emojiler ekle.
        *   \`hashtags\`: 5-7 adet ilgili ve trend olan etiketten oluşan bir dizi.
        *   \`imagePrompt\`: Bu gönderi için çarpıcı bir görsel oluşturmak üzere bir yapay zeka görsel oluşturucu (Imagen gibi) için ayrıntılı, yaratıcı bir komut. Stil, renkler, kompozisyon ve konu hakkında açıklayıcı ol.
        *   \`adTargeting\`: Bu reklam için hedef kitlenin HTML listesi (<ul><li>) olarak biçimlendirilmiş ayrıntılı bir açıklaması. Demografik bilgileri, ilgi alanlarını ve davranışları dahil et.
        *   \`adCreative\`: Reklam kreatif konseptinin HTML listesi (<ul><li>) olarak biçimlendirilmiş bir açıklaması. Görsel öğeleri, eylem çağrısını (CTA) ve ana mesajı dahil et.`,
        createSpecialDayContent: `Sen bir Yapay Zeka İçerik Üreticisisin. Seçilen özel günlere göre {platform} için bir dizi sosyal medya gönderisi oluştur. Yanıt {langName} dilinde olmalıdır.

        **İşletme Analizi:** "{analysis}"
        **İlgili Trendler:** "{trends}"
        **Seçilen Özel Günler:** {selectedDays}

        Gönderi nesnelerinden oluşan bir JSON dizisi oluştur. Her nesne, tek kampanya oluşturmaya benzer şekilde şu anahtarlara sahip olmalıdır: \`title\`, \`concept\`, \`caption\`, \`hashtags\`, \`imagePrompt\`, \`adTargeting\`, \`adCreative\`.`,
        createRegularContent: `Sen bir Yapay Zeka İçerik Üreticisisin. Bir aylık bir süre için {platform} platformunda {totalRegularPosts} adet düzenli, "her zaman geçerli" sosyal medya gönderisi oluştur. Yanıt {langName} dilinde olmalıdır.

        **İşletme Analizi:** "{analysis}"
        **İlgili Trendler:** "{trends}"

        Gönderiler, topluluk oluşturmak ve markanın kimliğini pekiştirmek için tasarlanmış, çeşitli ve ilgi çekici olmalıdır. Her biri şu anahtarlara sahip gönderi nesnelerinden oluşan bir JSON dizisi oluştur: \`title\`, \`concept\`, \`caption\`, \`hashtags\`, \`imagePrompt\`, \`adTargeting\`, \`adCreative\`.`,
        translateCampaign: `Sen profesyonel bir çevirmensin. Aşağıdaki kampanya içeriğini {targetLangName} diline çevir.

        **Orijinal Kampanya (JSON):**
        {campaignJson}

        Görevin, tam olarak aynı yapıya sahip, ancak "title", "concept", "caption" ve "hashtags" değerleri {targetLangName} diline çevrilmiş bir JSON nesnesi döndürmek. Etiketlerin hedef dil ve bölge için uygun olduğundan emin ol.`,
        generateImage: {
            withReference: `Sağlanan referans görseli analiz et. Ardından, aşağıdaki komuta dayanarak, referans görselin stilini ve ruh halini içeren yeni, orijinal bir görsel oluştur. Komut: "{prompt}". İstenen stil "{style}".`,
            noReference: `Aşağıdaki komuta dayanarak bir görsel oluştur: "{prompt}". Stil "{style}" olmalıdır.`
        },
        generateUgcVideoScript: `Sen viral sosyal medya videoları için bir senaristsin. Bu kampanya konseptine dayalı kısa, ilgi çekici bir Kullanıcı Tarafından Oluşturulan İçerik (UGC) tarzı video senaryosu yaz: "{campaignConcept}". Yanıt {langName} dilinde olmalıdır.

        Senaryo, net sahne açıklamaları ve diyalog/dış ses ile biçimlendirilmelidir. Otantik hissettirmeli ve bir içerik oluşturucunun çekmesi için kolay olmalıdır. Çıktı düz metin olmalıdır.`,
        generateVideo: `Aşağıdaki komuta dayanarak kısa bir video konsepti oluştur. Komut: "{prompt}"`,
        generateVideoFromUgcScript: `Aşağıdaki UGC senaryosuna dayanarak bir video oluştur. Senaryo: "{ugcScript}"`
    },
    hardcodedEmergencyPlan: {
        trends: [
            { title: 'Kısa Biçimli Video İçeriği', description: 'İzleyicinin dikkatini hızla çekmek için ilgi çekici Reels veya Shorts videoları oluşturun.' },
            { title: 'Kullanıcı Tarafından Oluşturulan İçerik (UGC)', description: 'Takipçilerinizi ürününüzle ilgili deneyimlerini paylaşmaya teşvik edin ve onları öne çıkarın.' }
        ],
        specialDays: [
            { day: 'Dünya Kahve Günü', description: 'Özel bir indirim sunun veya kahve temalı benzersiz bir gönderi oluşturun.' },
            { day: 'Yerel Topluluk Etkinliği', description: 'Yaklaşan bir etkinlik hakkında gönderi paylaşarak yerel toplulukla etkileşim kurun.' }
        ],
        campaignIdeas: [
            { title: 'Kamera Arkası', description: 'Ürününüzün nasıl yapıldığını veya hizmetinizin arkasındaki ekibi sergileyin.' },
            { title: 'Haftanın Müşterisi', description: 'Sadık bir müşteriyi öne çıkarın ve topluluk oluşturmak için hikayesini paylaşın.' }
        ]
    }
};

// Placeholder translations for other languages to prevent errors
const deTranslations = { ...enTranslations, splash: { title: 'Inhaltsstrategie-Planer', tagline: 'Gestalten Sie Ihre Inhaltsstrategie mit KI.' } };
const ruTranslations = { ...enTranslations, splash: { title: 'Планировщик контент-стратегии', tagline: 'Создайте свою контент-strategie с помощью ИИ.' } };
const svTranslations = { ...enTranslations, splash: { title: 'Innehållsstrategiplanerare', tagline: 'Skapa din innehållsstrategi med AI.' } };


export const translations = {
  en: enTranslations,
  tr: trTranslations,
  de: deTranslations,
  ru: ruTranslations,
  sv: svTranslations,
};