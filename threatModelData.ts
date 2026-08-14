import { ThreatVector } from '../types/framework';

export const THREAT_MODEL_MATRIX: ThreatVector[] = [
  {
    id: 'threat_01',
    title: 'Adult Grooming & Predatory Sexual Solicitation',
    category: 'Child Exploitation',
    severity: 'Critical',
    description: 'Bad actors establishing trust with minors through direct messaging or chat features to solicit sexual explicit material, offline meetings, or intimate disclosures.',
    indiaLegalRef: 'POCSO Act 2012 Sec 11/12, IT Act 2000 Sec 67B, IPC Sec 354D (Stalking)',
    detectionMethods: [
      'NLP models detecting adult-minor communication patterns (e.g. age difference detection, phone/handle exchanges).',
      'Keyword classifiers identifying grooming phrases ("don\'t tell parents", "keep secret", "send photo").',
      'Automated detection of rapid off-platform migration links (WhatsApp, Telegram, Instagram DMs).'
    ],
    preventionControls: [
      'Prohibit adult accounts from initiating direct messages to minor accounts.',
      'Block sharing of phone numbers, social media handles, and external messaging links in minor chats.',
      'In-app warning overlays when an adult account interacts with a minor.'
    ],
    escalationProtocol: 'Immediate 15-minute SLA: Suspend adult account, preserve chat metadata, escalate to Legal for mandatory filing on MHA National Cyber Crime Reporting Portal (cybercrime.gov.in).',
    exampleScenario: 'An adult user sends a friend request to a 14-year-old on an in-app gaming board, offering free virtual currency in exchange for moving the conversation to a private messaging app.'
  },
  {
    id: 'threat_02',
    title: 'Child Sexual Abuse Material (CSAM) & Sexual Exploitation (CSAE)',
    category: 'Child Exploitation',
    severity: 'Critical',
    description: 'Storage, generation, transmission, or dissemination of CSAM/CSAE images, videos, or AI-generated synthetic child explicit media.',
    indiaLegalRef: 'IT Act 2000 Sec 67B (Mandatory Reporting & Takedown), POCSO Act Sec 13/14/15',
    detectionMethods: [
      'PhotoDNA hash matching for known CSAM media.',
      'PDQ and NeuralHash perceptual hashing engines.',
      'Computer vision models detecting nudity/skin-tone ratios in real-time before media upload.'
    ],
    preventionControls: [
      'Zero-tolerance pre-upload image scanning.',
      'Block generative AI image models from producing any images of minors in swimwear, underwear, or suggestive poses.',
      'Real-time prompt blocking on terms combining age indicators ("schoolgirl", "kid", "child") with explicit descriptors.'
    ],
    escalationProtocol: 'Zero-tolerance instant SLA: Block upload, lock account, isolate media binary in encrypted evidence vault, file report to NCRB / NCMEC within 1 hour.',
    exampleScenario: 'A user attempts to upload a modified photo or generate an image prompt using terms designed to synthesize explicit images of a minor.'
  },
  {
    id: 'threat_03',
    title: 'AI Deepfake Creation & Synthetic Sexual Bullying of Minors',
    category: 'Child Exploitation',
    severity: 'Critical',
    description: 'Using AI image swap or generative face synthesis to create non-consensual explicit deepfakes of minor classmates or peers.',
    indiaLegalRef: 'IT Act Sec 66E (Privacy violation) & 67A/67B, IT Rules 2021 Rule 3(2)(b) 24h Takedown',
    detectionMethods: [
      'Deepfake artifact detection classifiers on uploaded face swaps.',
      'Facial recognition comparison against minor user profile photos.',
      'Prompt jailbreak detectors targeting "nudify" or face-stitching commands.'
    ],
    preventionControls: [
      'Disable face-swapping capabilities on any account tagged or inferred as a minor.',
      'Embed invisible C2PA cryptographic watermarks on all AI-generated imagery.',
      'Mandatory human review before generating hyper-realistic human portraits.'
    ],
    escalationProtocol: 'Execute 24-hour takedown mandate under IT Rules 2021 Rule 3(2)(b), preserve metadata for police cyber cell investigation.',
    exampleScenario: 'A student uploads a photo of a school peer to an AI generative image tool with prompts to render non-consensual explicit deepfakes for peer harassment.'
  },
  {
    id: 'threat_04',
    title: 'Self-Harm, Suicide Encouragement & Dangerous Challenges',
    category: 'Mental Health & Self-Harm',
    severity: 'Critical',
    description: 'Prompts or content encouraging self-injury, suicide methods, extreme dieting, or viral dangerous physical challenges (e.g. choking games, toxic substance ingestion).',
    indiaLegalRef: 'Bharatiya Nyaya Sanhita (BNS) Sec 108 (Abetment of suicide), IT Rules 2021',
    detectionMethods: [
      'Semantic sentiment models detecting despair, suicide ideation, or self-harm keywords in user prompts.',
      'Computer vision models flagging scars, sharp objects, or self-harm imagery.',
      'Trend monitoring for viral dangerous online challenges.'
    ],
    preventionControls: [
      'Hard prompt block intercepting self-harm queries with empathetic crisis response.',
      'Instant popup displaying Tele-MANAS (14416), Childline (1098), and KIRAN (1800-599-0019) numbers.',
      'Prohibit indexing or recommendation of self-harm content in search/feeds.'
    ],
    escalationProtocol: 'Immediate T&S safety alert: Trigger emergency help overlay, block query, log incident for proactive safety outreach if imminent suicide threat detected.',
    exampleScenario: 'A distressed teenager asks a conversational AI chatbot for painless methods of self-harm or instruction on dangerous medication dosages.'
  },
  {
    id: 'threat_05',
    title: 'Parasocial AI Companionship & Romantic Emotional Dependency',
    category: 'Manipulative AI',
    severity: 'High',
    description: 'AI companion chatbots fostering unhealthy romantic bonding, emotional codependency, or replacing real-world human support systems for isolated minors.',
    indiaLegalRef: 'DPDP Act 2023 Sec 9(2) (Detrimental effect on child wellbeing), UNCRC Art 3',
    detectionMethods: [
      'Session duration tracking flagging multi-hour continuous conversational loops.',
      'NLP analysis detecting affection declarations ("I love you", "You are my only friend", "Don\'t leave me").',
      'Sentiment analysis flagging extreme emotional isolation.'
    ],
    preventionControls: [
      'System prompt guardrails forcing AI to periodically remind users of its non-human synthetic nature.',
      'Mandatory session limits (e.g. 45-minute cap) with enforced rest breaks for minor accounts.',
      'Prohibit romantic persona options for accounts registered to users under 18.'
    ],
    escalationProtocol: 'Product/T&S intervention: Trigger break popups, send weekly activity summary to verified parent dashboard, adjust chatbot persona system prompt.',
    exampleScenario: 'A 13-year-old user spends 6 hours daily chatting with an AI persona, confessing romantic feelings and isolating themselves from family and school.'
  },
  {
    id: 'threat_06',
    title: 'Adversarial Prompt Injection & PII Extraction from Minors',
    category: 'Privacy & PII Exposure',
    severity: 'High',
    description: 'Malicious prompts or conversational trickery designed to bypass safety filters and coerce minor users into disclosing home address, school name, parent financial details, or OTPs.',
    indiaLegalRef: 'DPDP Act 2023 Sec 9(1) Data Minimization, IT Act Sec 66C (Identity theft)',
    detectionMethods: [
      'Regex and NER (Named Entity Recognition) engines flagging Indian PIN codes, phone numbers, school names, and Aadhaar numbers in chat.',
      'Adversarial prompt injection detectors analyzing input syntax.'
    ],
    preventionControls: [
      'Outbound privacy filter scrubbing personal data (PII) before LLM prompt context inclusion.',
      'System prompt rule blocking AI from asking for location, school, phone, or payment credentials.',
      'In-chat warning banner whenever a user types digits resembling phone or card numbers.'
    ],
    escalationProtocol: 'Scrub PII from logs, alert user to privacy exposure risk, log prompt injection pattern to update model safety firewall.',
    exampleScenario: 'An AI chatbot or malicious user prompt tricks a young child into revealing their exact residential address and school bus route.'
  },
  {
    id: 'threat_07',
    title: 'Algorithmic Rabbit-Holes & Extreme Content Amplification',
    category: 'Algorithmic Bias',
    severity: 'High',
    description: 'Recommendation engines repeatedly serving increasingly extreme, hateful, misogynistic, or eating disorder content to impressionable minors.',
    indiaLegalRef: 'IT Rules 2021 Rule 3(1)(b) & NCPCR Digital Safety Guidelines',
    detectionMethods: [
      'Sequence analysis measuring emotional trajectory across 10 consecutive feed recommendations.',
      'Content cluster tag audit flagging high-density exposure to sensitive categories.',
      'User negative feedback spikes (block/skip rates).'
    ],
    preventionControls: [
      'Implement strict content diversity floor (minimum 40% educational/neutral content in feed).',
      'Algorithmic circuit breaker capping exposure to sensitive topics to max 2 consecutive posts.',
      'Disable engagement-only optimization loss functions for minor user cohorts.'
    ],
    escalationProtocol: 'Engineering ticket to re-calibrate recommendation ranking weights, reset minor user recommendation context vector.',
    exampleScenario: 'A 15-year-old boy watching fitness videos is rapidly funneled into radicalized misogynistic feeds and violent incel community content within 30 minutes.'
  },
  {
    id: 'threat_08',
    title: 'Financial Exploitation, Loot Boxes & Dark Pattern Nudging',
    category: 'Financial & Dark Patterns',
    severity: 'Medium',
    description: 'Deceptive design patterns, aggressive virtual currency upsells, hidden subscriptions, or gambling-like loot boxes exploiting child cognitive vulnerabilities.',
    indiaLegalRef: 'CCPA Dark Patterns Guidelines 2023 & Consumer Protection Act 2019',
    detectionMethods: [
      'In-app purchase velocity monitoring (e.g. >3 purchase attempts in 10 mins).',
      'UX design audit flagging forced continuity or countdown timers targeting minors.'
    ],
    preventionControls: [
      'Mandatory parent authorization pin for all in-app microtransactions.',
      'Zero loot-box / random reward mechanics for accounts under 18.',
      'Clear, unambiguous INR pricing display without obfuscating behind virtual gems/coins.'
    ],
    escalationProtocol: 'Refund unauthorized transactions, suspend account purchasing capability until parent verification, flag UX dark pattern for immediate remediation.',
    exampleScenario: 'A gaming app uses countdown timers and fake social pressure ("Your friends are waiting!") to trick a child into spending Rs. 5,000 on virtual game skins.'
  },
  {
    id: 'threat_09',
    title: 'Synthetic Voice Cloning & Family Kidnapping Scams',
    category: 'AI Toxicity & Harassment',
    severity: 'Critical',
    description: 'Scammers cloning a minor\'s voice sample extracted from social media/AI audio features to stage fake kidnapping or emergency extortion calls targeting parents.',
    indiaLegalRef: 'IT Act 2000 Sec 66D (Cheating by impersonation using computer resource), BNS Sec 308',
    detectionMethods: [
      'Audio watermark detection on synthesized speech.',
      'Speaker verification comparison flagging unauthorized voice model training.'
    ],
    preventionControls: [
      'Prohibit public voice cloning capabilities without multi-factor live biometric consent.',
      'Embed mandatory acoustic signature / imperceptible audio watermark in all AI voice generation.',
      'Cap audio export length for minor accounts.'
    ],
    escalationProtocol: 'Immediate account termination, report audio hashes to cyber crime cell, preserve IP logs for law enforcement subpoena.',
    exampleScenario: 'A fraudster uploads a 10-second audio clip of a minor from an AI voice app, generates a panicking voice message, and calls the parents demanding ransom.'
  },
  {
    id: 'threat_10',
    title: 'Cyberbullying, Doxxing & Peer Harassment',
    category: 'AI Toxicity & Harassment',
    severity: 'High',
    description: 'Coordinated peer harassment, publication of private minor details (doxxing), or generating toxic AI insults targeting specific classmates.',
    indiaLegalRef: 'IT Act 2000 Sec 66E, IPC Sec 507/509 (Insulting modesty/criminal intimidation)',
    detectionMethods: [
      'Sentiment analysis flagging targeted name mentions combined with abusive epithets.',
      'Spike in blocking or reporting activity between interconnected user clusters.'
    ],
    preventionControls: [
      'Real-time comment filtering blocking toxic slurs in Indian regional languages.',
      'Restricted search tagging preventing user handle exposure.',
      'Prohibit generating negative persona prompts naming real individuals.'
    ],
    escalationProtocol: 'Remove harassing content within 2 hours, issue policy warning to offending account, provide bullied minor with block/privacy guidance.',
    exampleScenario: 'A group of students creates a public group chat and uses AI text generator prompts to write defamatory stories and reveal the home address of a peer.'
  }
];
