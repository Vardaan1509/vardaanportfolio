// NPC definitions with dialogue, gift-pokemon, and special actions.

export type SpecialAction = "giveResume";

export interface NPCChoice {
  question: string;
  options: {
    label: string;
    action?: SpecialAction;
    responseLines: string[];
  }[];
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  color: string; // shirt
  hair: string;
  dialogue: string[];
  choice?: NPCChoice; // presented after dialogue lines
  givesPokemon?: string; // species id, granted once when dialogue completes
  accessory?: "resume" | null;
}

export const npcs: NPC[] = [
  {
    id: "apiGroup",
    name: "Priya",
    role: "APi Group Teammate",
    x: 6, // near APi Group HQ (bldg at x=4..8)
    y: 8,
    color: "#3b82f6",
    hair: "#1e293b",
    givesPokemon: "deploybug",
    dialogue: [
      "Hey! Looking for Vardaan? He's a Full Stack Dev here at APi Group in Mississauga.",
      "He built our field reporting platform with Next.js, C#, .NET, AWS, and DynamoDB. Streamlined inspections across 1,000+ site assets and cut manual coordination by 90%.",
      "Also architected our company-wide payroll system for 500+ employees. Multi-stage approvals, Azure auth, batch processing. Replaced years of spreadsheets.",
      "And he wrote an AI documentation tool using Claude API that dropped manual docs effort by 75% after every release.",
      "Take Deploybug with you. He's earned it.",
    ],
  },
  {
    id: "waterloo",
    name: "Prof. Chen",
    role: "Waterloo Computer Engineering",
    x: 20, // near Waterloo Hall (bldg at x=17..22)
    y: 8,
    color: "#eab308",
    hair: "#78350f",
    givesPokemon: "codeling",
    dialogue: [
      "Ah, Vardaan Mehandiratta. Computer Engineering, class of 2030.",
      "Won the President's Scholarship of Distinction and the David Johnston International Student Entrance Scholarship.",
      "Sharp student. Data structures, algorithms, digital systems. Already shipping production code in his first year.",
      "Here, take a Codeling. Every good engineer starts with one.",
    ],
  },
  {
    id: "bharatDenim",
    name: "Rahul",
    role: "Bharat Denim Backend Dev",
    x: 33, // near Bharat Denim (bldg at x=31..35)
    y: 8,
    color: "#a855f7",
    hair: "#0f172a",
    givesPokemon: "datamouse",
    dialogue: [
      "Vardaan? Yeah, worked with him summer 2025. SWE Intern.",
      "Built backend features for our inventory system serving 10,000+ customers. Optimized a bunch of SQL queries.",
      "Refactored MySQL and PostgreSQL schemas — 15% reduction in daily processing time. Not bad for an intern.",
      "Also drove Git workflows for our backend team of 5. Branching strategy, PR reviews, merge conflicts. Solid engineer.",
      "Datamouse is yours. It handles data like he does.",
    ],
  },
  {
    id: "hackathon",
    name: "Sam",
    role: "Hackathon Judge",
    x: 20, // near Hackathon Arena (bldg at x=17..22, y=16..19)
    y: 20,
    color: "#ef4444",
    hair: "#1c1917",
    givesPokemon: "buildo",
    dialogue: [
      "Oh you're asking about his projects? Buckle up.",
      "CXR-Triage at CXC AI Hackathon — full-stack medical triage system, custom CNN with 80% classification accuracy on chest X-rays. 36 hours flat.",
      "AInterview at McHacks 13 — interview sim with Gemini Pro and ElevenLabs. Real-time dashboard, 88% speech-to-text success.",
      "AI Netflix Recommendation Engine at 92% recommendation accuracy. And a UW Login Helper Chrome extension for daily student productivity.",
      "Kid ships. Reach him at vmehandi@uwaterloo.ca. Also, take Buildo — he'll help you build stuff too.",
    ],
  },
  {
    id: "resumeGuy",
    name: "Vardaan (the guy himself)",
    role: "Has his resume ready",
    x: 22,
    y: 14, // stands on the main path near spawn
    color: "#e11d48",
    hair: "#0f172a",
    accessory: "resume",
    dialogue: [
      "Hey! I'm Vardaan.",
      "Wanna grab a copy of my resume? Fresh off the printer.",
    ],
    choice: {
      question: "Take resume?",
      options: [
        {
          label: "Yes",
          action: "giveResume",
          responseLines: [
            "Here you go — thanks for stopping by!",
            "Let's build something together.",
          ],
        },
        {
          label: "No",
          responseLines: ["No worries — come back anytime."],
        },
      ],
    },
  },
];

export const findNPCAt = (x: number, y: number): NPC | undefined =>
  npcs.find((n) => n.x === x && n.y === y);
