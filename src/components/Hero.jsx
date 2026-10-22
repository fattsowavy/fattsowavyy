import profilePhoto from "../assets/ftwp.jpeg";
import { education, profile, skillGroups } from "../data/profile";
import PixelIcon from "./pixel/PixelIcon";
import PlayerCard from "./pixel/PlayerCard";
import SakuraCat from "./SakuraCat";
import StarField from "./pixel/StarField";
import Typewriter from "./pixel/Typewriter";

// Decorative HUD tag per fact, in the order of profile.facts. Red is icon-only: as small text it fails contrast.
const HUD = [
  { tag: "LV", icon: "star", color: "text-px-yellow" },
  { tag: "XP", icon: "scroll", color: "text-px-cyan" },
  {
    tag: "HP",
    icon: "heart",
    color: "text-px-orange",
    iconColor: "text-px-red",
  },
  { tag: "Coins", icon: "coin", color: "text-px-yellow" },
];

// Back of the player card: real data only, presented as RPG stats
const STATS = [
  { label: "Class", value: education[0]?.degree },
  { label: "Guild", value: education[0]?.school },
  { label: "LV", value: `${profile.facts[0]?.value} ${profile.facts[0]?.label}` },
  { label: "Base", value: profile.location },
  { label: "Skills", value: skillGroups[1]?.items.join(" · ") },
].filter((s) => s.value);

const scrollTo = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Hero = () => (
  <section
    id="home"
    className="relative scroll-mt-20 overflow-hidden pt-[70px]"
  >
    <StarField />
    <SakuraCat />

    <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 md:pt-20 lg:px-8">
      <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
        {/* Player avatar */}
        <div className="mx-auto w-56 sm:w-64">
          <p className="mb-4 text-center font-pixel text-[10px] uppercase text-px-yellow">
            Player 1
          </p>
          <PlayerCard
            src={profilePhoto}
            alt={`Portrait of ${profile.name}`}
            stats={STATS}
          />
          <p
            className="mt-4 animate-px-breathe text-center font-pixel text-[8px] uppercase text-px-muted"
            aria-hidden="true"
          >
            Click card to flip
          </p>
          <p className="mt-6 flex items-center justify-center gap-2 text-px-muted">
            <PixelIcon name="pin" className="h-4 w-3 text-px-red" />
            {profile.location}
          </p>
        </div>

        {/* Title screen */}
        <div className="text-center md:text-left">
          <h1
            className="font-pixel text-2xl uppercase leading-snug sm:text-4xl md:text-3xl lg:text-5xl lg:leading-tight"
            style={{
              textShadow:
                "4px 4px 0 rgb(var(--px-red)), 8px 8px 0 rgb(var(--px-purple))",
            }}
          >
            {profile.name}
          </h1>
          <p className="mt-8 font-pixel text-xs leading-loose text-px-yellow sm:text-sm">
            <Typewriter text={profile.tagline} speed={45} cursor />
          </p>
          <p className="mx-auto mt-6 max-w-xl text-xl md:mx-0">
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#about"
              onClick={(e) => scrollTo(e, "about")}
              className="px-btn px-btn-primary"
            >
              <PixelIcon name="cursor" className="h-3 w-2 animate-px-blink" />
              Press Start
            </a>
            <a href={profile.cv} download className="px-btn px-btn-ghost">
              Download CV
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "contact")}
              className="px-btn px-btn-ghost"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* HUD */}
      <dl className="px-card mt-16 grid grid-cols-2 md:grid-cols-4">
        {profile.facts.map((fact, i) => (
          <div
            key={fact.label}
            className={`flex flex-col p-4 sm:p-5 ${i % 2 ? "border-l-4" : ""} ${i > 1 ? "border-t-4 md:border-t-0" : ""} ${
              i === 2 ? "md:border-l-4" : ""
            } border-px-line`}
          >
            <span
              className={`flex items-center gap-2 font-pixel text-[10px] uppercase ${HUD[i]?.color}`}
              aria-hidden="true"
            >
              <PixelIcon
                name={HUD[i]?.icon ?? "star"}
                className={`h-4 w-4 ${HUD[i]?.iconColor ?? ""}`}
              />
              {HUD[i]?.tag}
            </span>
            <dt className="order-last mt-1 text-px-muted">{fact.label}</dt>
            <dd className="mt-3 font-pixel text-2xl sm:text-3xl">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Hero;
