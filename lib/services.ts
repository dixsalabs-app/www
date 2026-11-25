import type { ProjectType } from "@/lib/contact-schema"
import type { SceneId } from "@/lib/scenes"
import { serviceList } from "@/lib/site"

export type Discipline =
  | "web-apps"
  | "websites"
  | "mobile"
  | "ai"
  | "marketing"
  | "seo"
  | "video"

export type FrameTone =
  | "copper"
  | "forest"
  | "ink"
  | "sand"
  | "slate"
  | "wine"

type ServiceDetail = {
  projectType: ProjectType
  disciplines: Discipline[]
  title: string
  hook: string
  plain: string
  summary: string
  problem: string
  solution: string
  outcome: string
  length: string
  when: string
  leaveWith: string
  includes: string[]
  fit: string[]
  notFit: string[]
  insightSlug?: string
  tone: FrameTone
  scene: SceneId
}

const details: Record<(typeof serviceList)[number]["slug"], ServiceDetail> = {
  websites: {
    projectType: "website",
    disciplines: ["websites"],
    title: "A website people can trust in one reading",
    hook: "They land. They know what to do.",
    plain:
      "A public site that says what you do, who it is for, and how to call, visit, or order. Written from real customer questions, not a company history.",
    summary:
      "A site people can trust, with a clear offer and a next step that matches how you actually sell.",
    problem:
      "The current site talks about the company and does not help a buyer decide. The words, the photos, and the button disagree. People leave, or they call with the wrong question.",
    solution:
      "We write the page around the decision a buyer has to make. The first version is small enough to launch: the offer, the proof, and one way to start. Your team can update it after we leave.",
    outcome:
      "More of the right enquiries. Fewer messages asking what you actually do. A site a new hire can keep current.",
    length: "5–10 weeks for a first site",
    when: "People cannot find a clear next step, or the site no longer matches the business.",
    leaveWith:
      "A live site, a way for your team to update it, and written steps a new hire can follow.",
    includes: [
      "Words taken from real customer questions",
      "A written scope tied to one result",
      "A fixed price before the work starts",
      "Pages for the offer, the proof, and the next step",
      "A private link every week, so you can use the real thing",
      "Launch, a short training, and a defined support window",
    ],
    fit: [
      "Companies whose site no longer matches the business",
      "Firms that need a serious enquiry, not a bigger brochure",
      "Owners who will answer the calls the site creates",
    ],
    notFit: [
      "A logo dropped onto a template, with the offer left unchanged",
      "A private tool for orders and staff. That is a web app.",
    ],
    tone: "sand",
    scene: "site",
  },
  "web-apps": {
    projectType: "web-application",
    disciplines: ["web-apps"],
    title: "One private app for the job the team repeats",
    hook: "The same list. No more retyping.",
    plain:
      "A private web app for orders, status, files, or follow-ups. The people who do the work share one list, instead of a chat and a spreadsheet.",
    summary:
      "An app the team opens every day, connected to the tools you already use, small enough to launch.",
    problem:
      "Orders and follow-ups still move through chats and spreadsheets. Staff retype the same details. The office finds out late, and the owner is the bottleneck.",
    solution:
      "We pick the daily job, write a scope around that result, and build one private app. Logins and roles are included. It connects to the tools you already pay for. The first version is the one your team will actually open.",
    outcome:
      "Fewer messages asking where an order stands. A system your team can run after we leave.",
    length: "8–14 weeks for a first version",
    when: "The team is still retyping the same details, and a public website will not fix that.",
    leaveWith:
      "A live app, logins for the people who use it, and written steps a new hire can follow.",
    includes: [
      "A written scope tied to one job",
      "A fixed price before the work starts",
      "Logins and roles",
      "A connection to the tools you already use",
      "A private link every week, so you can click through the real thing",
      "Launch, a short training, and a defined support window",
    ],
    fit: [
      "Teams that have outgrown a mix of spreadsheets and chat",
      "Companies that need one list for the office and the floor",
      "Owners who can name the job that takes the morning",
    ],
    notFit: [
      "A public brochure. That is a website.",
      "A nine-month rebuild with nothing a customer can use",
    ],
    insightSlug: "custom-app-or-another-subscription",
    tone: "forest",
    scene: "orders",
  },
  "mobile-apps": {
    projectType: "mobile-app",
    disciplines: ["mobile"],
    title: "An app for the phone they already carry",
    hook: "The job, in their pocket.",
    plain:
      "A mobile app for customers or staff. Orders, bookings, or a daily task, designed for a phone first.",
    summary:
      "A phone app for the people who buy from you, or the people who do the work away from a desk.",
    problem:
      "The work happens away from a computer. A website they have to pinch and zoom does not get opened. Staff keep the status in a notebook or a chat, and the office finds out later.",
    solution:
      "We design the few screens the job needs, then build the app for iPhone and Android. The first version does one job well. A person on your team can still see what happened.",
    outcome:
      "People finish the task on the phone. You stop calling to ask for a status you should already have.",
    length: "10–16 weeks for a first version",
    when: "The buyer or the staff member is not at a computer when the work happens.",
    leaveWith:
      "An app you can put in people’s hands, with logins, and a short guide for your team.",
    includes: [
      "A first version scoped to one job",
      "Screens designed on a phone, not shrunk from a desktop",
      "Logins for customers, staff, or both",
      "A simple record of what was done",
      "Help getting it onto the App Store and Play Store",
      "Training for the person who will run it",
    ],
    fit: [
      "Businesses whose customers already try to do the job from a phone",
      "Teams in the field who need one list, not another chat group",
      "Companies ready to launch a small first version",
    ],
    notFit: [
      "An app-store listing with nothing useful inside it",
      "A phone brochure of pages people will visit once",
    ],
    tone: "slate",
    scene: "phone",
  },
  "ai-automation": {
    projectType: "ai-automation",
    disciplines: ["ai"],
    title: "A repeated job, still checked by a person",
    hook: "The busy morning, finished. You still say yes.",
    plain:
      "Software drafts the quote, the reminder, or the first reply. Someone on your team approves it before a customer sees it.",
    summary:
      "One daily task — quotes, intake, or sorting the inbox — done faster, with a person still responsible for what goes out.",
    problem:
      "The same work takes the morning. The steps live in a few people’s heads. A chatbot on the website did not help, because it was never attached to the real job.",
    solution:
      "We pick one task with enough volume to matter, connect it to the tools you already use, and put a review step where a wrong answer would be costly. Staff get hours back. Customers still hear from a person when it counts.",
    outcome:
      "That job moves faster. You can see what was drafted, and the team can correct it before it leaves.",
    length: "4–8 weeks for one workflow",
    when: "You can name the repeated task, the inputs are already on a computer, and a person can check the result.",
    leaveWith:
      "A working workflow, simple instructions, and a review step your team will actually use.",
    includes: [
      "We start from the hours the job takes",
      "It connects to the inbox and the tools you already use",
      "A person approves anything a customer will see",
      "Tested on your real past work, not a made-up example",
      "A record of what the system drafted",
      "Written steps a new teammate can follow",
    ],
    fit: [
      "Teams with a clear, repetitive process and enough volume to justify it",
      "Operators who want the help inside the job, not a badge on the homepage",
      "Companies that already tried a generic chatbot and turned it off",
    ],
    notFit: [
      "An open-ended plan with nothing to ship",
      "A public chatbot as the first project, before the real workflow is touched",
    ],
    insightSlug: "what-smbs-should-automate-first",
    tone: "wine",
    scene: "quote",
  },
  content: {
    projectType: "content",
    disciplines: ["video", "marketing"],
    title: "New work, and a clearer version of what you already published",
    hook: "They read it. They recognise the offer.",
    plain:
      "Pages, posts, scripts, and short films. We also take what you already have and make it tighter, so the site, the listing, and the next post say the same thing.",
    summary:
      "Content creation and enhancement. New pieces in your voice, and a sharper cut of the pages and posts that are already live.",
    problem:
      "The offer is clear in the room and muddy on the page. Old posts contradict the site. Nobody has time to write the next one, or to fix the ones that already confuse a buyer.",
    solution:
      "We write the new pieces in the way you already talk about the work, and we revise the pages that are doing the most harm. You approve the words before they go out. The format is one your team can reuse.",
    outcome:
      "A buyer can understand the offer without a phone call. The next post does not start from a blank page.",
    length: "3–6 weeks for a first set, then a rhythm you can keep",
    when: "The work is good, and the words around it are thin, old, or inconsistent.",
    leaveWith:
      "A set of finished pieces, the revised pages, and a short plan for what to publish next.",
    includes: [
      "New pages, posts, scripts, or a short film, scoped before we start",
      "A pass over the pages and posts that already confuse people",
      "One voice across the site and the new work",
      "Your approval before anything is published",
      "Titles, descriptions, and images that say the same thing",
      "Notes your team can follow without us in the room",
    ],
    fit: [
      "Companies whose buyers decide after they have read or watched something",
      "Teams with pages that are live and no longer accurate",
      "Owners willing to review the words, not only the design",
    ],
    notFit: [
      "A posting schedule with no offer attached",
      "A pile of pages written for machines. That belongs with SEO, and only after the offer is clear.",
    ],
    tone: "copper",
    scene: "film",
  },
  seo: {
    projectType: "seo",
    disciplines: ["seo"],
    title: "Found on Google when someone looks for what you sell",
    hook: "They search. You are there.",
    plain:
      "The pages, titles, and structure that help you show up on Google for the thing you actually sell. Classic search, written for a buyer.",
    summary:
      "SEO for the searches a buyer already types. The important pages get fixed first.",
    problem:
      "You do the work. A competitor with a clearer site shows up first. Your pages were written for the company, not for the question a buyer types into Google.",
    solution:
      "We look at the questions buyers already ask, then fix the pages that should answer them. Titles, descriptions, and the structure of the site are part of the same pass. AI answers are a separate service, so this one stays on Google search.",
    outcome:
      "More visits from people who already want the service. Fewer pages that exist and are never found.",
    length: "A first set of fixes in 4–6 weeks. Search keeps compounding after that.",
    when: "People search for what you sell, and another company’s page answers them.",
    leaveWith:
      "The important pages rewritten, a short list of what to publish next, and a way to see if you are being found.",
    includes: [
      "A look at the questions buyers already ask",
      "Fixes to the pages that should be found first",
      "Clear titles, descriptions, and a structure Google can read",
      "Internal links that match how a buyer looks",
      "A short plan for the next pages, in order",
      "No tricks that break when the rules change",
    ],
    fit: [
      "Businesses people already try to find by searching",
      "Companies whose site is thin, slow, or written only about themselves",
      "Owners who can keep publishing a page when we hand over the list",
    ],
    notFit: [
      "A promise of the top spot by next Tuesday",
      "A public chatbot. If the problem is what AI answers repeat, that is AI SEO.",
    ],
    insightSlug: "show-up-when-they-search",
    tone: "ink",
    scene: "search",
  },
  "google-marketplace": {
    projectType: "google-marketplace",
    disciplines: ["marketing", "seo"],
    title: "A Google listing people can find, call, and buy from",
    hook: "On the map. On Google. Ready to visit.",
    plain:
      "Your Google Business Profile, the map pin, and a marketplace listing for what you sell. Hours, photos, products, and a way to call or order.",
    summary:
      "Google Marketplace work: the business profile, Maps, and product listings so a nearby buyer can choose you without guessing.",
    problem:
      "The shop is real. On Google it looks closed, incomplete, or like a different business. Products never appear where people compare them. The website says one thing and the listing says another.",
    solution:
      "We set up or repair the profile, the pin, the photos, and the facts a buyer checks before they visit. Where it fits, we list the products on Google’s marketplace and point them at a page that matches. You can see calls, direction requests, and what people viewed.",
    outcome:
      "A listing that matches the business. Fewer wrong calls. A way for someone nearby to choose you.",
    length: "2–4 weeks to put the listing in order, then a light monthly check",
    when: "People search for a place nearby, or they compare products on Google before they buy.",
    leaveWith:
      "A live profile, a map pin that is right, product listings where they belong, and a short guide for keeping them current.",
    includes: [
      "The Google Business Profile, claimed and completed",
      "Hours, phone, photos, and the categories you actually sell",
      "A map pin a person can follow to the door",
      "Product listings on Google, when the catalogue is ready",
      "The site and the listing saying the same offer",
      "A simple read of calls, direction requests, and views",
    ],
    fit: [
      "Shops, clinics, hotels, and restaurants people visit",
      "Sellers who want products visible on Google, not only on their own site",
      "Owners who will keep hours and photos honest after launch",
    ],
    notFit: [
      "A pile of ads with no listing behind them",
      "A catalogue that changes every hour and has no one to maintain it",
    ],
    tone: "forest",
    scene: "pos",
  },
  "ai-seo": {
    projectType: "ai-seo",
    disciplines: ["seo"],
    title: "Quoted correctly when an AI answers",
    hook: "The assistant repeats your offer, not a guess.",
    plain:
      "Pages shaped so Google’s AI answers, ChatGPT, and the rest can cite you. The offer, the place, and the next step stay accurate.",
    summary:
      "AI SEO. When someone asks an assistant for what you sell, the answer can quote you instead of inventing a neighbour.",
    problem:
      "Buyers ask an AI tool before they open a website. The answer names a competitor, or it describes your work wrong: the price, the city, or what you do not do.",
    solution:
      "We write the facts an assistant needs in plain sentences: what you sell, where you work, who it is for, and how to start. We structure the pages so those facts are easy to quote, then we check what the common tools currently say and correct the pages that caused the miss.",
    outcome:
      "The public description of the business matches the one you would give on a call. Fewer buyers arrive with the wrong idea.",
    length: "3–5 weeks for the first pass. Worth checking again as the tools change.",
    when: "People already ask an assistant for your kind of work, and the answer is vague or wrong.",
    leaveWith:
      "The key pages rewritten for accurate citation, a note on what the tools said before and after, and a short list to maintain.",
    includes: [
      "The facts an answer must get right: offer, place, and next step",
      "Pages structured so an assistant can quote them",
      "A check of what common AI tools currently say",
      "Fixes where they invent a price, a city, or a service",
      "The same offer on the site, the listing, and the answer",
      "No hidden text written only for machines",
    ],
    fit: [
      "Businesses people might ask an assistant to recommend",
      "Companies whose public pages are thin or contradictory",
      "Owners who want the quote to be accurate, not merely frequent",
    ],
    notFit: [
      "A trick to force a mention in every answer",
      "Classic Google rankings as the only goal. That is SEO.",
    ],
    tone: "wine",
    scene: "search",
  },
}

export type Service = (typeof serviceList)[number] & ServiceDetail

export const services: Service[] = serviceList.map((item) => ({
  ...item,
  ...details[item.slug],
}))

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function serviceStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export function servicesInGroup(group: Service["group"]) {
  return services.filter((service) => service.group === group)
}
