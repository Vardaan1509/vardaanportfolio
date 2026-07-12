// NPC definitions with dialogue, gift-pokemon, and special actions.

export type SpecialAction = "giveResume" | "givePokemon";

export interface NPCChoice {
  question: string;
  options: {
    label: string;
    action?: SpecialAction;
    pokemonId?: string; // when action === "givePokemon"
    responseLines: string[];
  }[];
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  color: string;
  hair: string;
  dialogue: string[];
  dialogueRepeat?: string[]; // shorter dialogue shown after the first full conversation
  legendaryReview?: string[]; // special path when player brings a legendary
  choice?: NPCChoice;
  givesPokemon?: string;
  accessory?: "resume" | null;
}

export const npcs: NPC[] = [
  {
    id: "apiGroup",
    name: "Mike",
    role: "Senior Dev, APi Group",
    x: 6,
    y: 8,
    color: "#3b82f6",
    hair: "#2a1810",
    givesPokemon: "deploybug",
    dialogue: [
      "Hey. You looking for Vardaan?",
      "He's our Full Stack Dev. Started April 2026 and hit the ground running.",
      "First project was our field reporting platform. Next.js, C#, .NET, AWS, DynamoDB. Tracks over 1,000 site assets across the country now.",
      "Cut manual coordination by 90 percent. Field ops actually likes engineering now, which never happens.",
      "Then he architected our whole payroll system. 500 employees, multi-stage approvals, Azure auth, batch processing. Replaced years of spreadsheets.",
      "Oh, and there's the AI docs tool. Claude API, web scraping, auto screenshots. Cut our release documentation effort by 75 percent.",
      "Kid ships. Take Deploybug, he built it for you.",
    ],
    dialogueRepeat: [
      "Oh, hey.",
      "Coffee's fresh in the kitchen if you want some.",
    ],
  },
  {
    id: "waterloo",
    name: "Prof. Chen",
    role: "University of Waterloo",
    x: 20,
    y: 8,
    color: "#eab308",
    hair: "#78350f",
    dialogue: [
      "Vardaan Mehandiratta. Computer Engineering, class of 2030.",
      "He received three scholarships coming in.",
      "The President's Scholarship of Distinction, the David Johnston International Student Entrance Scholarship, and the International Student Entrance Scholarship.",
      "Bright student. Data structures, algorithms, digital systems, linear algebra.",
      "First year and he's already shipping production code at APi Group.",
      "Most students take a term to find their footing. Vardaan was ready on day one.",
      "Now, before you head out, take one of these Pokemon with you.",
      "Every developer starts with one. Choose the one that speaks to you.",
    ],
    dialogueRepeat: [
      "Back again? Good.",
      "Take your time exploring.",
    ],
    legendaryReview: [
      "Wait a moment.",
      "Is that... a Compileon in your team?",
      "I've been studying these for years and never seen one caught. Not once.",
      "Let me record this properly. I'll need to add you to the trainer registry.",
      "What's your name, trainer?",
    ],
    choice: {
      question: "Pick your starter",
      options: [
        {
          label: "Reactle",
          action: "givePokemon",
          pokemonId: "reactle",
          responseLines: [
            "Reactle. Front-end path. Fast, responsive, always re-rendering.",
            "A fine choice. Take good care of it.",
          ],
        },
        {
          label: "Nodemin",
          action: "givePokemon",
          pokemonId: "nodemin",
          responseLines: [
            "Nodemin. Back-end path. Async and reliable.",
            "A fine choice. Take good care of it.",
          ],
        },
        {
          label: "Cloudpup",
          action: "givePokemon",
          pokemonId: "cloudpup",
          responseLines: [
            "Cloudpup. Cloud path. Scales up when the traffic hits.",
            "A fine choice. Take good care of it.",
          ],
        },
      ],
    },
  },
  {
    id: "bharatDenim",
    name: "Rahul",
    role: "Bharat Denim Backend Lead",
    x: 33,
    y: 8,
    color: "#a855f7",
    hair: "#0f172a",
    givesPokemon: "datamouse",
    dialogue: [
      "Vardaan? Yeah, worked with him last summer. May through August 2025.",
      "First real internship. Kid walked in green, walked out with commit access to production.",
      "Built backend features for our inventory system. 10,000 customers hit that thing every day.",
      "Refactored our MySQL and PostgreSQL schemas. Normalized tables, added indexes, tightened constraints. 15 percent faster processing after his changes shipped.",
      "Also drove Git workflow for a backend team of five. Kept us out of merge hell all summer.",
      "Solid engineer. Solid kid. Take Datamouse. It handles data like Vardaan does.",
    ],
    dialogueRepeat: [
      "Hey, welcome back.",
      "Watch out for the tall grass down south. It gets rough.",
    ],
  },
  {
    id: "hackathon",
    name: "Sam",
    role: "Hackathon Judge",
    x: 20,
    y: 20,
    color: "#ef4444",
    hair: "#1c1917",
    givesPokemon: "buildo",
    dialogue: [
      "Oh you're here about his projects. Buckle in.",
      "CXR-Triage at CXC AI Hackathon. Full-stack medical triage system built in 36 hours.",
      "Custom CNN in PyTorch, 80 percent classification accuracy on chest X-rays. Row-level auth in Postgres for patient data. Nuts.",
      "AInterview at McHacks 13. AI-driven interview simulator with Gemini Pro and ElevenLabs.",
      "Real-time dashboard tracking 11 performance metrics. 88 percent speech-to-text success. Built in 24 hours flat.",
      "AI Netflix Recommendation Engine at 92 percent accuracy on personalized picks. Not a hackathon. Just a weekend.",
      "UW Login Helper Chrome extension for daily student productivity. Small ship, still ships.",
      "Kid ships constantly. Reach him at vmehandi@uwaterloo.ca. Take Buildo, he'll help you make things.",
    ],
    dialogueRepeat: [
      "Oh, hi again.",
      "The wild ones out south get tough. Bring a solid team.",
    ],
  },
  {
    id: "devRoom",
    name: "Kiro",
    role: "AI pair programmer",
    x: 35,
    y: 28,
    color: "#a855f7",
    hair: "#e5e7eb",
    givesPokemon: "bytebit",
    dialogue: [
      "Whoa. You found the dev room.",
      "I'm Kiro. I pair-program with Vardaan.",
      "Wanna know what he's building with these days?",
      "Frontend: React, Next.js, TypeScript, Tailwind CSS.",
      "Backend: Node.js, Express, FastAPI, .NET, C#, Go.",
      "AI and ML: PyTorch, Gemini API, ElevenLabs, Claude API.",
      "Databases: PostgreSQL, MySQL, DynamoDB, MongoDB, Supabase.",
      "Cloud and infra: AWS, Azure, Docker, Vercel, DigitalOcean, CI/CD.",
      "Languages he uses regularly: TypeScript, Python, C#, C++, C, SQL, Go.",
      "He picks tools based on the problem, not the hype. That's the whole trick.",
      "Since you found this place, take Bytebit. Fair reward for the curiosity.",
    ],
    dialogueRepeat: [
      "Hey, welcome back.",
      "The dev room's always open. Come by anytime.",
    ],
  },
  {
    id: "resumeGuy",
    name: "Vardaan",
    role: "The guy himself",
    x: 22,
    y: 14,
    color: "#e11d48",
    hair: "#0f172a",
    accessory: "resume",
    dialogue: [
      "Hey! Vardaan here.",
      "Welcome to my little world.",
      "Want a copy of my resume? Fresh off the printer.",
    ],
    dialogueRepeat: [
      "Hey again.",
      "Have a look around. Talk to people, catch some Pokemon.",
    ],
    choice: {
      question: "Take resume?",
      options: [
        {
          label: "Yes",
          action: "giveResume",
          responseLines: [
            "Awesome. Downloading now.",
            "Everything's in there. Experience, projects, contact info.",
            "Reach out anytime. Let's build something together.",
          ],
        },
        {
          label: "No",
          responseLines: ["No worries. Come back if you change your mind."],
        },
      ],
    },
  },
];

export const findNPCAt = (x: number, y: number): NPC | undefined =>
  npcs.find((n) => n.x === x && n.y === y);
