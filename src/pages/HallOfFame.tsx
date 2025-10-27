import { AppLayout } from "@/components/Layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown, TrendingUp, Award, Users, MapPin, Calendar, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

// Tunisian cities for filters
const tunisianCities = [
  "Tunis",
  "Sousse",
  "Sfax",
  "Bizerte",
  "Nabeul",
  "Monastir",
  "Gabès",
  "Kairouan",
  "Gafsa",
  "Mahdia",
  "Tozeur",
  "Kasserine",
  "Zarzis"
];

// Mock leaderboard data with Tunisian names (top 10)
const individualLeaders = [
  { rank: 1, name: "Amina Ben Salah", points: 8122, avatar: "AB" },
  { rank: 2, name: "Youssef Trabelsi", points: 8032, avatar: "YT" },
  { rank: 3, name: "Oussama Gharbi", points: 7884, avatar: "OG" },
  { rank: 4, name: "Rim Chaabane", points: 7881, avatar: "RC" },
  { rank: 5, name: "Khalil Haddad", points: 6971, avatar: "KH" },
  { rank: 6, name: "Ons Saidi", points: 6943, avatar: "OS" },
  { rank: 7, name: "Malek Khemiri", points: 6940, avatar: "MK" },
  { rank: 8, name: "Faten Jlassi", points: 6898, avatar: "FJ" },
  { rank: 9, name: "Nour Ben Messaoud", points: 6725, avatar: "NM" },
  { rank: 10, name: "Sami Rekik", points: 6612, avatar: "SR" }
];

const ngoLeaders = [
  { rank: 1, name: "Jeunes pour l’Environnement", avatar: "JE", impact: 8450 },
  { rank: 2, name: "Tunisie Digitale", avatar: "TD", impact: 8320 },
  { rank: 3, name: "Solidarité Sousse", avatar: "SS", impact: 8110 },
  { rank: 4, name: "Club Culturel Sfax", avatar: "CC", impact: 7990 },
  { rank: 5, name: "Nabeul Green", avatar: "NG", impact: 7825 },
  { rank: 6, name: "Kairouan Care", avatar: "KC", impact: 7740 },
  { rank: 7, name: "Monastir Solidarity", avatar: "MS", impact: 7612 },
  { rank: 8, name: "Tozeur Oasis", avatar: "TO", impact: 7530 },
  { rank: 9, name: "SOS Bizerte", avatar: "SB", impact: 7422 },
  { rank: 10, name: "Darna Mahdia", avatar: "DM", impact: 7315 }
];

const champions = [
  { title: "Champion de la semaine", name: "Amina Ben Salah", achievement: "Plus grand nombre d’actions (5)", avatar: "AB", badge: "🏆" },
  { title: "Idée innovante", name: "Youssef Trabelsi", achievement: "Proposition d’événement adoptée", avatar: "YT", badge: "💡" },
  { title: "Bâtisseur·se de communauté", name: "Jeunes pour l’Environnement", achievement: "Meilleur engagement participants", avatar: "JE", badge: "🌟" }
];

const HallOfFame = () => {
  const [individualTimeFilter, setIndividualTimeFilter] = useState("this-month");
  const [individualCity, setIndividualCity] = useState("Sousse");
  const [ngoTimeFilter, setNgoTimeFilter] = useState("all-time");
  const [ngoCity, setNgoCity] = useState("Sousse");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Award className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getTimeFilterLabel = (filter: string) => {
    const labels = {
      "this-week": "This Week",
      "this-month": "This Month", 
      "this-year": "This Year",
      "all-time": "All Time"
    };
    return labels[filter as keyof typeof labels] || filter;
  };

  // Small presentational components for podium + rows
  const Podium = ({
    items,
    scoreLabel = "XP"
  }: {
    items: Array<{ rank: number; name: string; avatar: string; score: number }>;
    scoreLabel?: string;
  }) => {
    if (!items?.length) return null;
    const first = items.find(i => i.rank === 1) ?? items[0];
    const second = items.find(i => i.rank === 2) ?? items[1];
    const third = items.find(i => i.rank === 3) ?? items[2];
    return (
      <div className="relative mx-auto mt-2 flex w-full max-w-md items-end justify-center gap-6">
        {/* Second */}
        {second && (
          <div className="flex flex-col items-center -mb-2">
            <div className="mb-1 text-sm font-medium text-muted-foreground">2</div>
            <div className="relative">
              <Avatar className="h-16 w-16 ring-2 ring-emerald-400/60">
                <AvatarFallback className="bg-muted text-foreground">{second.avatar}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-2 text-xs text-muted-foreground truncate max-w-[6rem]">@{second.name.split(" ")[0]?.toLowerCase()}</div>
            <div className="text-sm font-semibold text-foreground">{second.score}</div>
          </div>
        )}

        {/* First */}
        {first && (
          <div className="flex flex-col items-center">
            <div className="mb-1 flex items-center gap-1 text-sm font-semibold text-yellow-500">
              <Crown className="h-4 w-4" /> 1
            </div>
            <div className="relative">
              <span className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-emerald-500/20" />
              <Avatar className="h-24 w-24 ring-4 ring-emerald-400 shadow-[0_0_30px_0_rgba(16,185,129,0.35)]">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">{first.avatar}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-2 text-sm font-medium text-foreground truncate max-w-[10rem]">@{first.name.split(" ")[0]?.toLowerCase()}</div>
            <div className="text-base font-bold text-primary">{first.score}</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">{scoreLabel}</div>
          </div>
        )}

        {/* Third */}
        {third && (
          <div className="flex flex-col items-center -mb-2">
            <div className="mb-1 text-sm font-medium text-muted-foreground">3</div>
            <div className="relative">
              <Avatar className="h-16 w-16 ring-2 ring-emerald-400/60">
                <AvatarFallback className="bg-muted text-foreground">{third.avatar}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-2 text-xs text-muted-foreground truncate max-w-[6rem]">@{third.name.split(" ")[0]?.toLowerCase()}</div>
            <div className="text-sm font-semibold text-foreground">{third.score}</div>
          </div>
        )}
      </div>
    );
  };

  const RankRow = ({
    rank,
    name,
    avatar,
    score,
    scoreLabel = "XP",
    trend
  }: {
    rank: number; name: string; avatar: string; score: number; scoreLabel?: string; trend?: "up"|"down"|"flat";
  }) => (
    <div className="flex items-center justify-between rounded-full border border-border/50 bg-muted/60 px-3 py-2">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-6 text-sm font-semibold text-muted-foreground">{rank}</div>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">{avatar}</AvatarFallback>
        </Avatar>
        <div className="truncate max-w-[10rem] text-sm text-foreground">@{name.split(" ")[0]?.toLowerCase()}</div>
      </div>
      <div className="flex items-center gap-2">
        {trend === "up" && <ChevronUp className="h-4 w-4 text-emerald-500" />}
        {trend === "down" && <ChevronDown className="h-4 w-4 text-red-500" />}
        <div className="text-sm font-semibold text-primary">{score}</div>
        <div className="text-[10px] text-muted-foreground">{scoreLabel}</div>
      </div>
    </div>
  );

  return (
    <AppLayout title="Hall of Fame">
      <div className="space-y-6 p-4">
        {/* Leaderboards */}
        <Tabs defaultValue="individuals" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individuals">Individuals</TabsTrigger>
            <TabsTrigger value="ngos">Organizations</TabsTrigger>
          </TabsList>

          <TabsContent value="individuals" className="space-y-4">
            {/* Filters (inline, date + city) - keep on one line, no horizontal scroll */}
            <div className="mx-auto flex max-w-full flex-nowrap items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={individualTimeFilter} onValueChange={setIndividualTimeFilter}>
                  <SelectTrigger className="w-[120px] sm:w-[140px] md:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Select value={individualCity} onValueChange={setIndividualCity}>
                  <SelectTrigger className="w-[120px] sm:w-[140px] md:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Tunisia</SelectItem>
                    {tunisianCities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dynamic title */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold">
                Top Individual Contributors {individualCity !== "All" ? `— ${individualCity}` : ""} • {getTimeFilterLabel(individualTimeFilter)}
              </h3>
            </div>

            {/* Podium Top 3 */}
            <Podium
              items={individualLeaders
                .slice(0, 3)
                .map(u => ({ rank: u.rank, name: u.name, avatar: u.avatar, score: u.points }))}
              scoreLabel="XP"
            />

            {/* Rest of leaderboard */}
            <div className="space-y-2">
              {individualLeaders
                .slice(0, 10)
                .filter(u => u.rank > 3)
                .map((u, idx) => (
                  <RankRow
                    key={u.rank}
                    rank={u.rank}
                    name={u.name}
                    avatar={u.avatar}
                    score={u.points}
                    scoreLabel="XP"
                    trend={idx % 2 === 0 ? "up" : "down"}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="ngos" className="space-y-4">
            {/* Filters for NGOs (inline) - keep on one line, no horizontal scroll */}
            <div className="mx-auto flex max-w-full flex-nowrap items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={ngoTimeFilter} onValueChange={setNgoTimeFilter}>
                  <SelectTrigger className="w-[120px] sm:w-[140px] md:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Select value={ngoCity} onValueChange={setNgoCity}>
                  <SelectTrigger className="w-[120px] sm:w-[140px] md:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Tunisia</SelectItem>
                    {tunisianCities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dynamic title */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold">
                Top Organizations {ngoCity !== "All" ? `— ${ngoCity}` : ""} • {getTimeFilterLabel(ngoTimeFilter)}
              </h3>
            </div>

            {/* Podium Top 3 */}
            <Podium
              items={ngoLeaders
                .slice(0, 3)
                .map(n => ({ rank: n.rank, name: n.name, avatar: n.avatar, score: n.impact }))}
              scoreLabel="Impact"
            />

            {/* Rest of leaderboard */}
            <div className="space-y-2">
              {ngoLeaders
                .slice(0, 10)
                .filter(n => n.rank > 3)
                .map((n, idx) => (
                  <RankRow
                    key={n.rank}
                    rank={n.rank}
                    name={n.name}
                    avatar={n.avatar}
                    score={n.impact}
                    scoreLabel="Impact"
                    trend={idx % 2 === 0 ? "up" : "down"}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Champions moved to bottom */}
        <section className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-foreground">
            🌟 Featured Champions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {champions.map((champion, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-accent/10 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* background glow */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary to-accent opacity-40 blur-sm" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-background ring-2 ring-primary/60">
                      <span className="text-lg" aria-hidden>
                        {champion.badge}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-heading text-sm font-semibold text-foreground">
                        {champion.name}
                      </span>
                      <Badge className="rounded-full bg-primary/15 text-primary hover:bg-primary/20">Honorable</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{champion.title}</div>
                    <div className="mt-0.5 text-xs text-foreground/80">
                      {champion.achievement}
                    </div>
                  </div>
                  <Sparkles className="h-5 w-5 text-primary/70" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default HallOfFame;
