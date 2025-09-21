import { AppLayout } from "@/components/Layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Crown, TrendingUp, Award, Users } from "lucide-react";

// Mock leaderboard data
const individualLeaders = [
  { 
    rank: 1, 
    name: "Maria Santos", 
    points: 2850, 
    avatar: "MS",
    level: 12,
    eventsJoined: 34,
    hoursContributed: 127,
    badges: 8
  },
  { 
    rank: 2, 
    name: "David Kim", 
    points: 2420, 
    avatar: "DK",
    level: 10,
    eventsJoined: 28,
    hoursContributed: 95,
    badges: 6
  },
  { 
    rank: 3, 
    name: "Sarah Johnson", 
    points: 2180, 
    avatar: "SJ",
    level: 9,
    eventsJoined: 25,
    hoursContributed: 88,
    badges: 5
  },
  { 
    rank: 4, 
    name: "Alex Chen", 
    points: 1950, 
    avatar: "AC",
    level: 8,
    eventsJoined: 22,
    hoursContributed: 75,
    badges: 4
  },
  { 
    rank: 5, 
    name: "Emma Wilson", 
    points: 1820, 
    avatar: "EW",
    level: 7,
    eventsJoined: 19,
    hoursContributed: 68,
    badges: 4
  }
];

const ngoLeaders = [
  {
    rank: 1,
    name: "Green Future NGO",
    avatar: "GF", 
    eventsOrganized: 45,
    totalParticipants: 1250,
    impactScore: 9.2,
    category: "Environment"
  },
  {
    rank: 2,
    name: "TechForAll", 
    avatar: "TA",
    eventsOrganized: 28,
    totalParticipants: 890,
    impactScore: 8.9,
    category: "Education"
  },
  {
    rank: 3,
    name: "Ocean Guardians",
    avatar: "OG",
    eventsOrganized: 22,
    totalParticipants: 675,
    impactScore: 8.7,
    category: "Environment"
  }
];

const champions = [
  {
    title: "Weekly Champion",
    name: "Maria Santos",
    achievement: "Most events joined this week (5)",
    avatar: "MS",
    badge: "🏆"
  },
  {
    title: "Innovation Leader", 
    name: "David Kim",
    achievement: "Most adopted event proposal",
    avatar: "DK",
    badge: "💡"
  },
  {
    title: "Community Builder",
    name: "Green Future NGO", 
    achievement: "Highest participant engagement",
    avatar: "GF",
    badge: "🌟"
  }
];

const HallOfFame = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Award className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <AppLayout title="Hall of Fame" showFab={false}>
      <div className="space-y-6 p-4">
        {/* Champions Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-foreground">
            🌟 Featured Champions
          </h2>
          <div className="space-y-3">
            {champions.map((champion, index) => (
              <Card key={index} className="p-4 card-civic gradient-primary">
                <div className="flex items-center space-x-3 text-white">
                  <div className="text-2xl">{champion.badge}</div>
                  <div className="flex-1">
                    <div className="font-heading font-semibold">{champion.title}</div>
                    <div className="text-sm opacity-90">{champion.name}</div>
                    <div className="text-xs opacity-75">{champion.achievement}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Leaderboards */}
        <Tabs defaultValue="individuals" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individuals">Individuals</TabsTrigger>
            <TabsTrigger value="ngos">Organizations</TabsTrigger>
          </TabsList>

          <TabsContent value="individuals" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold">
                Top Individual Contributors
              </h3>
              <Badge variant="outline">
                <TrendingUp className="h-3 w-3 mr-1" />
                This Month
              </Badge>
            </div>

            <div className="space-y-3">
              {individualLeaders.map((user) => (
                <Card key={user.rank} className="p-4 card-civic">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className={`font-medium text-white ${
                        user.rank === 1 ? 'bg-yellow-500' :
                        user.rank === 2 ? 'bg-gray-400' :
                        user.rank === 3 ? 'bg-amber-600' : 'bg-primary'
                      }`}>
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-semibold text-foreground">
                        {user.name}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Level {user.level}</span>
                        <span>{user.eventsJoined} events</span>
                        <span>{user.hoursContributed}h</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{user.points}</div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ngos" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold">
                Top Organizations
              </h3>
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-1" />
                All Time
              </Badge>
            </div>

            <div className="space-y-3">
              {ngoLeaders.map((ngo) => (
                <Card key={ngo.rank} className="p-4 card-civic">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(ngo.rank)}
                    </div>
                    
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className={`font-medium text-white ${
                        ngo.rank === 1 ? 'bg-yellow-500' :
                        ngo.rank === 2 ? 'bg-gray-400' :
                        ngo.rank === 3 ? 'bg-amber-600' : 'bg-primary'
                      }`}>
                        {ngo.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-semibold text-foreground">
                        {ngo.name}
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {ngo.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{ngo.eventsOrganized} events</span>
                        <span>{ngo.totalParticipants} participants</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-secondary">{ngo.impactScore}</div>
                      <div className="text-xs text-muted-foreground">Impact Score</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default HallOfFame;