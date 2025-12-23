export interface Offer {
  id: string;
  type: string;
  name: string;
  audience: string;
  package: string;
  pricing: string;
  whyItWorks: string;
  notes?: string;
}

export interface MonthData {
  month: string;
  year: number;
  half: 'H1' | 'H2';
  target: number;
  targetFormatted: string;
  historicBaseline: number;
  mumbaiTarget: number;
  bengaluruTarget: number;
  theme: string;
  heroOffer: string;
  floorPriceTrap?: string;
  focus: string;
  offers: Offer[];
  context?: string;
  executionPlan?: string[];
  riskMitigation?: string;
}

export const h1MonthsData: MonthData[] = [
  {
    month: "January",
    year: 2026,
    half: 'H1',
    target: 5200000,
    targetFormatted: "₹52.0 Lakhs",
    historicBaseline: 3929116,
    mumbaiTarget: 3120000,
    bengaluruTarget: 1560000,
    theme: "Resolution Lock-In",
    heroOffer: "Resolution Bundle (3 Month)",
    floorPriceTrap: "Don't sell 1M below ₹12k",
    focus: "3-Month Commitments (Quarterly lock-in)",
    context: "Organic demand is high. Do NOT discount single months. Sell commitment.",
    offers: [
      {
        id: "jan-1",
        type: "New Member",
        name: "Resolution 2026 Bundle",
        audience: "New Leads",
        package: "Studio 3 Month Unlimited + Nutritional Guide & 2 Guest Passes",
        pricing: "Rack: 50,750 | VAT: 2,537 | Disc: 0% (Value Add) | Final: ₹53,288",
        whyItWorks: "Capture full wallet share immediately. No discount needed in Jan; Value adds convert."
      },
      {
        id: "jan-2",
        type: "New Member",
        name: "The \"Kickstarter\"",
        audience: "Hesitant Leads",
        package: "Studio 4 Class Pack",
        pricing: "Rack: 5,350 | VAT: 267 | Disc: 0% | Final: ₹5,617",
        whyItWorks: "Low barrier to entry. \"Just try it\". Upsell to membership in Feb."
      },
      {
        id: "jan-3",
        type: "Lapsed",
        name: "New Year Reset",
        audience: "Inactive <2025",
        package: "Studio 10 Class Pack",
        pricing: "Rack: 15,000 | VAT: 750 | Disc: 10% | Final: ₹14,175",
        whyItWorks: "Re-activates old users who want to restart their fitness journey."
      },
      {
        id: "jan-4",
        type: "Upsell",
        name: "Priority Access",
        audience: "Current Members",
        package: "Upgrade to Annual (Pre-Price Rise Warning)",
        pricing: "Rack: 192,500 | VAT: 9,625 | Final: ₹202,125",
        whyItWorks: "Scarcity tactic: \"Prices may rise in April\". Locks in cash now."
      },
      {
        id: "jan-5",
        type: "Innovative",
        name: "The \"Habit\" Challenge",
        audience: "All",
        package: "Attend 20 classes in Jan → Get Feb 15% Off",
        pricing: "--",
        whyItWorks: "Gamification. Drives massive utilization and community buzz."
      }
    ]
  },
  {
    month: "February",
    year: 2026,
    half: 'H1',
    target: 5400000,
    targetFormatted: "₹54.0 Lakhs",
    historicBaseline: 4136223,
    mumbaiTarget: 3240000,
    bengaluruTarget: 1620000,
    theme: "Love & Loyalty",
    heroOffer: "Couples/Pairs (2-for-1 style)",
    floorPriceTrap: "High ticket, lower yield per head but high volume",
    focus: "Referrals & 2-Person Sales",
    context: "Short month. Motivation dips. Leverage Valentine's/Pairs.",
    offers: [
      {
        id: "feb-1",
        type: "New Member",
        name: "\"Better Together\" Pair",
        audience: "Couples/BFFs",
        package: "2 x Studio 1 Month Unlimited (Must buy 2)",
        pricing: "Rack: 35,500 (for 2) | VAT: 1,775 | Disc: 20% | Final: ₹29,820 (₹14,910 each)",
        whyItWorks: "High ticket size (approx ₹30k). Acquires 2 members at once."
      },
      {
        id: "feb-2",
        type: "New Member",
        name: "Self-Love Single",
        audience: "Singles",
        package: "Studio 1 Month + Retail Candle/Socks",
        pricing: "Rack: 17,750 | VAT: 888 | Disc: 10% | Final: ₹16,773",
        whyItWorks: "\"Treat yourself\" messaging."
      },
      {
        id: "feb-3",
        type: "Lapsed",
        name: "We Miss You",
        audience: "Lapsed >60 Days",
        package: "Studio 5 Class Pack (Hidden SKU)",
        pricing: "Price: ₹7,500 + VAT",
        whyItWorks: "Low commitment re-entry point for those falling off the wagon."
      },
      {
        id: "feb-4",
        type: "Upsell",
        name: "Private Passion",
        audience: "Members",
        package: "Studio Private Class (Single)",
        pricing: "Rack: 5,000 | VAT: 250 | Disc: BOGO 50% (Buy 1, Get 2nd 50% off) | Final: ₹7,875 (for 2)",
        whyItWorks: "Drives private session revenue."
      },
      {
        id: "feb-5",
        type: "Innovative",
        name: "Blind Date Class",
        audience: "Event",
        package: "Single Class",
        pricing: "Price: ₹1,500 + VAT",
        whyItWorks: "Special themed class where you are partnered up. Fun/Social."
      }
    ]
  },
  {
    month: "March",
    year: 2026,
    half: 'H1',
    target: 4600000,
    targetFormatted: "₹46.0 Lakhs",
    historicBaseline: 3479117,
    mumbaiTarget: 2760000,
    bengaluruTarget: 1380000,
    theme: "March Madness (Fiscal End)",
    heroOffer: "Corporate/Bulk Packs",
    floorPriceTrap: "Clear inventory",
    focus: "Clearing Inventory & Corporate Sales",
    context: "Corporate budgets expiring. Stressful month for finance professionals.",
    offers: [
      {
        id: "mar-1",
        type: "New Member",
        name: "Fiscal Fitness",
        audience: "Corporates",
        package: "Bulk 50 Class Pass (Transferable)",
        pricing: "Price: ₹70,000 + VAT",
        whyItWorks: "B2B sale. Companies spend remaining L&D/Wellness budget before March 31."
      },
      {
        id: "mar-2",
        type: "New Member",
        name: "March Madness 20",
        audience: "High Volume Users",
        package: "Studio 20 Single Class Pack",
        pricing: "Rack: 30,000 | VAT: 1,500 | Disc: 15% | Final: ₹26,775",
        whyItWorks: "Great value for money, clearing the \"inventory\" before April new launches."
      },
      {
        id: "mar-3",
        type: "Lapsed",
        name: "Spring Clean",
        audience: "Old Leads",
        package: "Studio 1 Month Unlimited",
        pricing: "Rack: 17,750 | VAT: 888 | Disc: 15% (Strict Floor) | Final: ₹15,841",
        whyItWorks: "Reactivates leads before anniversary month."
      },
      {
        id: "mar-4",
        type: "Upsell",
        name: "Freeze Amnesty",
        audience: "Current Members",
        package: "Buy 30 Days Freeze",
        pricing: "Price: ₹2,500 + VAT",
        whyItWorks: "\"Too busy closing accounts? Buy a freeze.\""
      },
      {
        id: "mar-5",
        type: "Innovative",
        name: "Tax Free Weekend*",
        audience: "Flash Sale",
        package: "All Retail",
        pricing: "Disc: Equivalent to VAT (5%)",
        whyItWorks: "Marketing hook only. We pay the tax, customer gets 5% off."
      }
    ]
  },
  {
    month: "April",
    year: 2026,
    half: 'H1',
    target: 9400000,
    targetFormatted: "₹94.0 Lakhs",
    historicBaseline: 6938682,
    mumbaiTarget: 5640000,
    bengaluruTarget: 2820000,
    theme: "THE 8th ANNIVERSARY (GALA MONTH)",
    heroOffer: "Anniversary Annual @ 28% OFF",
    floorPriceTrap: "Aggressive 28% Discount on Annuals",
    focus: "Annuals, Long-Term Packs, & Celebration",
    context: "The biggest month of H1. We need excitement, celebration, and aggressive volume. Theme: \"Infinite 8\" (Symbolizing the Figure 8 / Infinity loop of Barre).",
    executionPlan: [
      "Events: \"Physique 57 Birthday Bash\" at Supreme HQ & Kenkere. Cake cutting, DJ class.",
      "Marketing: \"8 Years of Burn, Shake, Change.\"",
      "Ops: Staff wear \"Infinity 8\" T-shirts. Studios decorated in Gold/Brand colors."
    ],
    offers: [
      {
        id: "apr-1",
        type: "HERO OFFER",
        name: "The Infinite 8 (Annual)",
        audience: "VVIP / HNI",
        package: "Studio Annual Unlimited @ 28% OFF",
        pricing: "Rack: 192,500 | VAT: 9,625 | Disc: 28% | Final: ₹145,530",
        whyItWorks: "Once a year price. Beats the standard floor. Generates massive cash. Limited to first 28 people."
      },
      {
        id: "apr-2",
        type: "New Member",
        name: "The \"Great 8\" Bundle",
        audience: "General",
        package: "8 Month Unlimited Membership (Special SKU)",
        pricing: "Calculated Base: ~₹133k | Offer Price: ₹88,888 (+VAT) | Final: ₹93,332",
        whyItWorks: "Memorable pricing, strong commitment."
      },
      {
        id: "apr-3",
        type: "Lapsed",
        name: "Lucky 8 Pack",
        audience: "Lapsed",
        package: "8 Classes + 8 Days Validity Bonus",
        pricing: "Base: 8 Class Pack (₹10,200) | VAT: 510 | Price: ₹8,800 (inc VAT)",
        whyItWorks: "Cute, thematic, affordable."
      },
      {
        id: "apr-4",
        type: "Upsell",
        name: "Birthday Gift",
        audience: "Members",
        package: "Upgrade to next Tier",
        pricing: "Disc: Flat ₹8,000 Off",
        whyItWorks: "Simple flat discount on any upgrade > ₹50k."
      },
      {
        id: "apr-5",
        type: "Innovative",
        name: "The Golden Ticket",
        audience: "Retail/Class",
        package: "8 Hidden Tickets in Retail bags",
        pricing: "--",
        whyItWorks: "Find a ticket, win a 1 Month Unlimited. Drives retail sales."
      }
    ]
  },
  {
    month: "May",
    year: 2026,
    half: 'H1',
    target: 5300000,
    targetFormatted: "₹53.0 Lakhs",
    historicBaseline: 4044857,
    mumbaiTarget: 3180000,
    bengaluruTarget: 1590000,
    theme: "Summer Slim Down",
    heroOffer: "Summer Bootcamp",
    floorPriceTrap: "High yield, short duration",
    focus: "Short Term Intensity (Bikini Body)",
    context: "Post-anniversary hangover + Summer heat.",
    offers: [
      {
        id: "may-1",
        type: "New Member",
        name: "Summer Bootcamp",
        audience: "Gen Z / Millennials",
        package: "6 Week Unlimited (Strict Validity)",
        pricing: "Rack: 30,000 | VAT: 1,500 | Final: ₹31,500",
        whyItWorks: "High yield. Fixed date start (May 1 or May 15). Community feel."
      },
      {
        id: "may-2",
        type: "New Member",
        name: "The \"Detox\" Week",
        audience: "Trials",
        package: "Studio 1 Week Unlimited (Special SKU)",
        pricing: "Price: ₹4,500 + VAT",
        whyItWorks: "Short, sharp shock. Low barrier."
      },
      {
        id: "may-3",
        type: "Lapsed",
        name: "Mom's Summer Break",
        audience: "Parents",
        package: "Studio 10 Single Class Pack",
        pricing: "Rack: 15,000 | VAT: 750 | Disc: 0% + Free Kids Ballet Class | Final: ₹15,750",
        whyItWorks: "Value add for parents."
      },
      {
        id: "may-4",
        type: "Upsell",
        name: "Retail: Beach Ready",
        audience: "Members",
        package: "Grip Socks + Water Bottle",
        pricing: "Disc: 15% Bundle",
        whyItWorks: "Merch sales."
      },
      {
        id: "may-5",
        type: "Innovative",
        name: "The \"Sweat Bet\"",
        audience: "Members",
        package: "Attend 15 classes in May",
        pricing: "--",
        whyItWorks: "Reward: ₹1500 credit on June membership. Retention tool."
      }
    ]
  },
  {
    month: "June",
    year: 2026,
    half: 'H1',
    target: 5700000,
    targetFormatted: "₹57.0 Lakhs",
    historicBaseline: 4312599,
    mumbaiTarget: 3420000,
    bengaluruTarget: 1710000,
    theme: "The \"Jet Setter\" Strategy",
    heroOffer: "Travel/Flexibility",
    floorPriceTrap: "Extended validity is the key selling point",
    focus: "Online/Hybrid & Validity Extension",
    context: "Peak travel season. Revenue usually drops. We sell flexibility.",
    offers: [
      {
        id: "jun-1",
        type: "New Member",
        name: "The Nomad Pass",
        audience: "Travelers",
        package: "Studio 20 Class Pack + 6 Month Validity",
        pricing: "Rack: 30,000 | VAT: 1,500 | Disc: 5% | Final: ₹29,925",
        whyItWorks: "Standard validity is 105 days. Doubling it to 180 days justifies the price for travelers."
      },
      {
        id: "jun-2",
        type: "New Member",
        name: "Global Physiquer",
        audience: "Remote Leads",
        package: "Virtual Private Class x 10",
        pricing: "Rack: 45,000 | VAT: 2,250 | Disc: 20% | Final: ₹37,800",
        whyItWorks: "\"Take your trainer with you to London/Paris\"."
      },
      {
        id: "jun-3",
        type: "Lapsed",
        name: "Monsoon Early Bird",
        audience: "Locals",
        package: "Studio 3 Month Unlimited (Buy now, Start July 1)",
        pricing: "Rack: 50,750 | VAT: 2,537 | Disc: 15% | Final: ₹45,290",
        whyItWorks: "Pre-sell for July retention."
      },
      {
        id: "jun-4",
        type: "Upsell",
        name: "Freeze Extension",
        audience: "Members",
        package: "Unlimited Summer Freeze",
        pricing: "Price: ₹4,000",
        whyItWorks: "Allows them to freeze for 45 days (vacation) without cancelling."
      },
      {
        id: "jun-5",
        type: "Innovative",
        name: "Father's Day",
        audience: "Men/Dads",
        package: "Men's Strength Lab 5 Pack",
        pricing: "Price: ₹6,000 + VAT",
        whyItWorks: "Targeted at partners/dads. \"Real men do Barre/Strength\"."
      }
    ]
  }
];

export const h2MonthsData: MonthData[] = [
  {
    month: "July",
    year: 2026,
    half: 'H2',
    target: 6560000,
    targetFormatted: "₹65.6 Lakhs",
    historicBaseline: 4932988,
    mumbaiTarget: 3936000,
    bengaluruTarget: 1968000,
    theme: "The \"Monsoon Proof\" Strategy",
    heroOffer: "Freezes with 3M Pack",
    floorPriceTrap: "Don't sell 1M below ₹12k",
    focus: "Retention & Validity Extension",
    context: "High rainfall in Mumbai usually dips attendance. We sell \"Flexibility\" to combat churn.",
    executionPlan: [
      "Sales: Call script: \"Don't let the rain wash away your gains. We are offering unlimited freezes.\"",
      "Ops: Enable \"Monsoon Tag\" in CRM for unlimited freeze overriding in July.",
      "Risk: Users might over-freeze. Mitigation: Cap freeze usage to July/Aug only."
    ],
    offers: [
      {
        id: "jul-1",
        type: "New Member",
        name: "The Monsoon Shield",
        audience: "Leads (Cold)",
        package: "Studio 3 Month Unlimited + Unlimited Freeze for July",
        pricing: "Rack: 50,750 | VAT (5%): 2,537 | Disc: 15% | Final: ₹45,290",
        whyItWorks: "Removes the fear of \"wasted days\" due to rain. High ticket, secure revenue."
      },
      {
        id: "jul-2",
        type: "New Member",
        name: "Rainy Day Rebels",
        audience: "Leads (Warm)",
        package: "Studio 10 Class Pack + 2 Bonus Classes",
        pricing: "Rack: 15,000 | VAT: 750 | Disc: 0% (Value Add) | Final: ₹15,750",
        whyItWorks: "Increases effective value without dropping yield. 12 classes for price of 10 lowers cost-per-class perception."
      },
      {
        id: "jul-3",
        type: "Lapsed",
        name: "The \"Welcome Home\" Pass",
        audience: "Inactive 60+ Days",
        package: "Studio 1 Month Unlimited (Strict Floor Applied)",
        pricing: "Rack: 17,750 | VAT: 888 | Disc: 32% (Floor Check) | Final: ₹12,600",
        whyItWorks: "Hits just above the ₹11,999 floor. Aggressive re-activation for monsoon slump."
      },
      {
        id: "jul-4",
        type: "Upsell",
        name: "Q3 Power Up",
        audience: "Current Monthly Users",
        package: "Upgrade to 6 Month Unlimited + ₹3000 Retail Credit",
        pricing: "Rack: 99,750 | VAT: 4,987 | Disc: 10% | Final: ₹94,263",
        whyItWorks: "Retail credit clears inventory and makes the high price point palatable."
      },
      {
        id: "jul-5",
        type: "Innovative",
        name: "The \"Freeze Bank\"",
        audience: "All Members",
        package: "Buy 30 Days of Freeze",
        pricing: "Price: ₹3,150 (inc VAT)",
        whyItWorks: "Monetizes the \"Freeze\" feature. Pure profit line item."
      }
    ]
  },
  {
    month: "August",
    year: 2026,
    half: 'H2',
    target: 11000000,
    targetFormatted: "₹1.10 Crore",
    historicBaseline: 8271474,
    mumbaiTarget: 6600000,
    bengaluruTarget: 3300000,
    theme: "The Freedom & Vitality Push",
    heroOffer: "Annual @ 25% Off",
    floorPriceTrap: "Don't extend 25% off to 6M packs",
    focus: "Volume Acquisition (Annuals)",
    context: "Independence Day. High energy. Historic data shows August is a massive revenue month (Peak in '25).",
    offers: [
      {
        id: "aug-1",
        type: "New Member",
        name: "Freedom 25 (Annual)",
        audience: "High Net Worth Leads",
        package: "Studio Annual Unlimited (25% OFF)",
        pricing: "Rack: 192,500 | VAT: 9,625 | Disc: 25% | Final: ₹151,593",
        whyItWorks: "Anchor Offer. Hits the exact floor for Annuals. Massive cash injection."
      },
      {
        id: "aug-2",
        type: "New Member",
        name: "The \"1947\" Bundle",
        audience: "Gen Z / Students",
        package: "Studio 12 Class Pack (Special Price)",
        pricing: "Rack: 15,050 | VAT: 752 | Disc: Special | Final: ₹12,947",
        whyItWorks: "Symbolic pricing (1947). \"Freedom from commitment\" (Pack vs Membership)."
      },
      {
        id: "aug-3",
        type: "Lapsed",
        name: "Freedom to Move",
        audience: "Lapsed >90 Days",
        package: "Studio 20 Single Class Pack + Extended Validity (5 Months)",
        pricing: "Rack: 30,000 | VAT: 1,500 | Disc: 10% | Final: ₹28,350",
        whyItWorks: "Extending validity from 105 days to 150 days solves the \"I don't have time\" objection."
      },
      {
        id: "aug-4",
        type: "Upsell",
        name: "Private Freedom",
        audience: "Class Users",
        package: "Studio Private Class x 10 (Upgrade)",
        pricing: "Rack: 50,000 | VAT: 2,500 | Disc: 15% | Final: ₹44,625",
        whyItWorks: "Moves group class users to high-margin PT."
      },
      {
        id: "aug-5",
        type: "Innovative",
        name: "Gift of Fitness",
        audience: "Current Members",
        package: "Buy 1 Month, Gift 2 Weeks",
        pricing: "Rack: 17,750 | VAT: 888 | Final: ₹18,638",
        whyItWorks: "Member pays full price, gets a voucher to give a friend. Zero CAC lead generation."
      }
    ]
  },
  {
    month: "September",
    year: 2026,
    half: 'H2',
    target: 6950000,
    targetFormatted: "₹69.5 Lakhs",
    historicBaseline: 5220944,
    mumbaiTarget: 4170000,
    bengaluruTarget: 2085000,
    theme: "The \"Back to Grind\" Reset",
    heroOffer: "3M Bundle + PT",
    floorPriceTrap: "PT margins are lower; track trainer payout",
    focus: "3-Month Commitments (Close out the year)",
    context: "Post-summer/monsoon routine setting. Schools are open.",
    offers: [
      {
        id: "sep-1",
        type: "New Member",
        name: "The 90-Day Transformation",
        audience: "Weight Loss Leads",
        package: "Studio 3 Month Unlimited + 3 PT Sessions",
        pricing: "Rack: 50,750 (Mbship) + 15,000 (PT) | VAT: 5% | Bundle Price: ₹55,000",
        whyItWorks: "Bundling PT raises perceived value significantly."
      },
      {
        id: "sep-2",
        type: "New Member",
        name: "September Starter",
        audience: "Trials",
        package: "Studio 1 Month (No Joining Fee/Admin)",
        pricing: "Rack: 17,750 | VAT: 888 | Disc: 10% | Final: ₹16,773",
        whyItWorks: "Simple, clean discount for those returning to routine."
      },
      {
        id: "sep-3",
        type: "Lapsed",
        name: "The Recharge Pack",
        audience: "Ex-Pack Holders",
        package: "Studio 30 Single Class Pack",
        pricing: "Rack: 45,000 | VAT: 2,250 | Disc: 20% | Final: ₹37,800",
        whyItWorks: "High volume class pack. 20% off makes it ~₹1260/class."
      },
      {
        id: "sep-4",
        type: "Upsell",
        name: "Hybrid Warrior",
        audience: "Studio Members",
        package: "Add Virtual Private x 10",
        pricing: "Rack: 45,000 | VAT: 2,250 | Disc: 25% | Final: ₹35,437",
        whyItWorks: "Captures revenue for days they can't come to the studio."
      },
      {
        id: "sep-5",
        type: "Innovative",
        name: "Corporate Wellness",
        audience: "B2B / Offices",
        package: "50 Class Shared Pack (Company buys)",
        pricing: "Price: ₹75,000 (+VAT)",
        whyItWorks: "Bulk sale. Companies use \"Remaining Budget\" in Q3."
      }
    ]
  },
  {
    month: "October",
    year: 2026,
    half: 'H2',
    target: 5630000,
    targetFormatted: "₹56.3 Lakhs",
    historicBaseline: 4233809,
    mumbaiTarget: 3378000,
    bengaluruTarget: 1689000,
    theme: "The Festive Fit (Pre-Diwali)",
    heroOffer: "6-Week Bootcamp",
    floorPriceTrap: "Don't allow freezes on Bootcamp",
    focus: "Speed & Aesthetics (Short-term High Intensity)",
    context: "Short month effectively. People want to look good for parties but have no time.",
    riskMitigation: "Low attendance in last 10 days of Oct. Mitigation: Offers must be \"Buy now, activate later\".",
    offers: [
      {
        id: "oct-1",
        type: "New Member",
        name: "The \"Glow Up\" Bootcamp",
        audience: "Women 25-40",
        package: "Summer Bootcamp (rebranded) 6 Weeks",
        pricing: "Rack: 30,000 | VAT: 1,500 | Final: ₹31,500",
        whyItWorks: "Reusing the \"Summer Bootcamp\" SKU. 6 weeks fits perfectly before Diwali."
      },
      {
        id: "oct-2",
        type: "New Member",
        name: "Flash 50",
        audience: "Social Media Leads",
        package: "Studio 4 Class Pack (Trial)",
        pricing: "Rack: 5,350 | VAT: 267 | Disc: 0% + Free Pair of Grip Socks | Final: ₹5,617",
        whyItWorks: "Low barrier trial with value add."
      },
      {
        id: "oct-3",
        type: "Lapsed",
        name: "Diwali Detox Pre-Pay",
        audience: "All",
        package: "Studio 12 Class Pack",
        pricing: "Rack: 15,050 | VAT: 752 | Disc: 15% | Final: ₹13,431",
        whyItWorks: "Positioning: \"Buy now, start post-Diwali\"."
      },
      {
        id: "oct-4",
        type: "Upsell",
        name: "The Private Glow",
        audience: "HNI Members",
        package: "Studio Private Class (Single) B2G1",
        pricing: "Rack: 5,000 | VAT: 250 | Offer: Buy 2 Get 1 Free | Final: ₹10,500 for 3 sessions.",
        whyItWorks: "High margin private sessions."
      },
      {
        id: "oct-5",
        type: "Innovative",
        name: "The \"Cheat Day\" Pass",
        audience: "Members",
        package: "Retail Bundle (Smoothie + Bar + Class)",
        pricing: "Price: ₹2,500",
        whyItWorks: "Quick POS upsell."
      }
    ]
  },
  {
    month: "November",
    year: 2026,
    half: 'H2',
    target: 5750000,
    targetFormatted: "₹57.5 Lakhs",
    historicBaseline: 4316439,
    mumbaiTarget: 3450000,
    bengaluruTarget: 1725000,
    theme: "Black Friday & Detox",
    heroOffer: "B6G1 Free",
    floorPriceTrap: "Ensure validity is strictly enforced",
    focus: "High Ticket Sales (Black Friday)",
    context: "Post-festival guilt + Global Shopping Event.",
    offers: [
      {
        id: "nov-1",
        type: "New Member",
        name: "Black Friday BOGO",
        audience: "High Intent",
        package: "Buy 6 Months, Get 1 Month Free",
        pricing: "Rack: 99,750 | VAT: 4,987 | Price: ₹104,737",
        whyItWorks: "Validity extension (7 months total) is better than discounting price. Retains cash."
      },
      {
        id: "nov-2",
        type: "New Member",
        name: "The \"No Guilt\" Pass",
        audience: "Post-Diwali",
        package: "Studio 1 Month Unlimited",
        pricing: "Rack: 17,750 | VAT: 888 | Disc: ₹2000 flat | Final: ₹16,538",
        whyItWorks: "Simple discount for post-festival motivation."
      },
      {
        id: "nov-3",
        type: "Lapsed",
        name: "Cyber Week Class Pack",
        audience: "Digital Leads",
        package: "Studio 20 Class Pack",
        pricing: "Rack: 30,000 | VAT: 1,500 | Disc: 25% | Final: ₹23,625",
        whyItWorks: "Aggressive discount for digital-first audience."
      },
      {
        id: "nov-4",
        type: "Upsell",
        name: "Owner's Special Access",
        audience: "Top Tier Members",
        package: "Studio Privates - Anisha x 10",
        pricing: "Rack: 59,500 | VAT: 2,975 | Disc: 10% | Final: ₹56,227",
        whyItWorks: "Premium experience with the owner."
      },
      {
        id: "nov-5",
        type: "Innovative",
        name: "Retail Therapy",
        audience: "Walk-ins",
        package: "20% Off all Retail",
        pricing: "--",
        whyItWorks: "Clears stock before year-end."
      }
    ]
  },
  {
    month: "December",
    year: 2026,
    half: 'H2',
    target: 4000000,
    targetFormatted: "₹40.0 Lakhs",
    historicBaseline: 3004057,
    mumbaiTarget: 2400000,
    bengaluruTarget: 1200000,
    theme: "The \"Finish Strong\" & Pre-Resolution",
    heroOffer: "Pay 2027 Get Dec Free",
    floorPriceTrap: "Don't spend the cash; accrue for Q1",
    focus: "Cash Flow for Q1 2027",
    context: "Lowest attendance, but highest potential for \"Future Revenue\".",
    offers: [
      {
        id: "dec-1",
        type: "New Member",
        name: "The 2027 Headstart",
        audience: "Resolutioners",
        package: "Studio Annual (Pay now, Start Jan 1) + Dec Free",
        pricing: "Rack: 192,500 | VAT: 9,625 | Disc: 20% | Final: ₹161,700",
        whyItWorks: "Prepaid revenue for Q1 2027."
      },
      {
        id: "dec-2",
        type: "New Member",
        name: "Secret Santa Mystery",
        audience: "Walk-ins",
        package: "Studio 1 Month + Mystery Gift",
        pricing: "Rack: 17,750 | VAT: 888 | Price: ₹18,638",
        whyItWorks: "Gift = 2 extra guest passes or Retail item. Gamification excites users."
      },
      {
        id: "dec-3",
        type: "Lapsed",
        name: "Last Chance 2026",
        audience: "Expired in 2026",
        package: "Studio 8 Class Package",
        pricing: "Rack: 10,200 | VAT: 510 | Disc: 0% + Upgrade to 10 Classes | Final: ₹10,710",
        whyItWorks: "Last push to reactivate lapsed members."
      },
      {
        id: "dec-4",
        type: "Upsell",
        name: "Gift Cards",
        audience: "Corporate/Members",
        package: "₹5,000 Gift Card for ₹4,000",
        pricing: "Price: ₹4,200 (inc VAT)",
        whyItWorks: "Immediate cash flow. 20% breakage expected (cards not redeemed)."
      },
      {
        id: "dec-5",
        type: "Innovative",
        name: "Freeze For Charity",
        audience: "Members",
        package: "Unused Freeze Exchange",
        pricing: "--",
        whyItWorks: "Donate unused freeze days; Studio donates ₹100/day to charity. CSR Branding."
      }
    ]
  }
];

export const executiveSummary = {
  h1: {
    totalTarget: 35600000,
    totalTargetFormatted: "₹35.6M",
    mumbaiTotal: 21360000,
    bengaluruTotal: 10680000,
    historicTotal: 26800000,
    growthPercentage: 33,
    coreStrategy: [
      "Q1 (Jan-Mar): Capitalize on \"Resolutioners\" with 3-month commitments to lock them in until the Anniversary.",
      "April (The Event): A high-volume, high-energy month. Target is aggressive (35% growth over April '25).",
      "Q2 (May-Jun): Switch to \"Lifestyle & Travel\" flexibility offers to prevent summer churn."
    ]
  },
  h2: {
    totalTarget: 39890000,
    totalTargetFormatted: "₹39.89M",
    mumbaiTotal: 23900000,
    bengaluruTotal: 11960000,
    historicTotal: 29900000,
    growthPercentage: 33,
    coreStrategy: [
      "Volume-Led Growth: Leveraging the \"Supreme HQ\" surge and stabilizing \"Kwality House\".",
      "Yield Protection: Minimizing direct cash discounts in favor of Value Adds (Validity, Freezes, Retail)."
    ],
    locationSplit: {
      mumbai: 60,
      bengaluru: 30,
      popups: 10
    }
  }
};

export const riskAssessment = [
  {
    risk: "April Cannibalization",
    probability: "High",
    impact: "Medium",
    mitigation: "Selling too many Annuals in April might kill May/June renewal revenue. Mitigation: Cap the \"Anniversary Annual\" at 50 units total. Push Class Packs for the rest."
  },
  {
    risk: "Bengaluru Lag",
    probability: "Medium",
    impact: "High",
    mitigation: "Kenkere House is newer. If numbers lag, launch a \"Neighbourhood Special\" (Indiranagar residents get 15% off) specifically for that branch in Feb/Mar."
  },
  {
    risk: "Trainer Burnout",
    probability: "Medium",
    impact: "Medium",
    mitigation: "April is high volume. Ensure trainer rotation is managed and they are incentivized on the \"Anniversary Upsells\"."
  },
  {
    risk: "Aggressive Discounting Dilutes Brand",
    probability: "Medium",
    impact: "High",
    mitigation: "Limit 25% discounts to \"Annuals\" only. Monthly packs never drop below 10-15% discount."
  },
  {
    risk: "Capacity Bottlenecks (Jan '27)",
    probability: "High",
    impact: "Low",
    mitigation: "If Dec \"Headstart\" sales are high, restrict class booking windows for Class Pass holders to prioritize Members."
  }
];
