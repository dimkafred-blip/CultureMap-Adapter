
import { CultureProfile } from './types';

export const CULTURE_PROFILES: Record<string, CultureProfile> = {
  France: {
    name: 'France',
    flag: '🇫🇷',
    communicating: 'High-context (Subtle, layered, read between the lines)',
    evaluating: 'Direct negative feedback (Constructive but blunt criticism)',
    persuading: 'Principles-first (Understand the "why" before the "how")',
    leading: 'Hierarchical (High power distance, respect for status)',
    deciding: 'Consensual (Group debate/discussion before decision)',
    trusting: 'Relationship-based (Trust built through meals and long-term bonding)',
    disagreeing: 'Confrontational (Disagreement is seen as intellectually stimulating)',
    scheduling: 'Flexible-time (Fluid, focus on relationship over clock)',
    summary: 'French culture values intellectual debate, principles, and professional eloquence wrapped in a hierarchical social structure.'
  },
  Italy: {
    name: 'Italy',
    flag: '🇮🇹',
    communicating: 'High-context (Implicit, expressive, non-verbal cues)',
    evaluating: 'Direct negative feedback (Strongly expressed opinions)',
    persuading: 'Principles-first (Focus on theory and conceptual foundation)',
    leading: 'Hierarchical (Clear respect for authority and seniority)',
    deciding: 'Top-down (Decisions often made by the highest-ranking individual)',
    trusting: 'Relationship-based (Trust is personal and emotional)',
    disagreeing: 'Confrontational (Emotional and expressive disagreement)',
    scheduling: 'Flexible-time (Time is a fluid concept, focus on the present)',
    summary: 'Italian business culture emphasizes personal connections, hierarchy, and a preference for conceptual reasoning over raw data.'
  },
  USA: {
    name: 'USA',
    flag: '🇺🇸',
    communicating: 'Low-context (Explicit, clear, say what you mean)',
    evaluating: 'Indirect negative feedback (The "Sandwich" method: positive-negative-positive)',
    persuading: 'Applications-first (Get to the point, show the practical result)',
    leading: 'Egalitarian (Flat structures, managers are facilitators)',
    deciding: 'Top-down (The boss decides quickly to ensure speed)',
    trusting: 'Task-based (Trust built through professional reliability)',
    disagreeing: 'Confrontational (but separated from the person)',
    scheduling: 'Linear-time (Punctuality is a virtue, focus on the clock)',
    summary: 'American culture prioritizes speed, efficiency, and explicit communication, often sacrificing long-term relationship building for immediate task completion.'
  },
  Egypt: {
    name: 'Egypt',
    flag: '🇪🇬',
    communicating: 'High-context (Deeply implicit, emphasis on honor and face)',
    evaluating: 'Indirect negative feedback (Saving face is critical; feedback is gentle)',
    persuading: 'Holistic (Everything is connected; religious and social context matters)',
    leading: 'Hierarchical (Deep respect for authority, age, and status)',
    deciding: 'Top-down (Authority figures decide after informal consultation)',
    trusting: 'Relationship-based (Trust is built through long-term hospitality and personal loyalty)',
    disagreeing: 'Avoids confrontation (Public disagreement is often seen as a personal slight)',
    scheduling: 'Flexible-time (Fluid schedules, "Inshallah" mentality - God willing)',
    summary: 'Egyptian culture is rooted in deep hospitality, hierarchical respect, and relationship-driven business where honor and "saving face" are paramount.'
  }
};
