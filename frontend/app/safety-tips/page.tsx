import { Navbar } from '@/components/navbar';
import { 
  Coffee, 
  Moon, 
  Clock, 
  Car,
  AlertTriangle,
  Heart,
  Sun,
  Phone,
  MapPin,
  Wind
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const safetyCategories = [
  {
    title: 'Before Your Trip',
    icon: Clock,
    tips: [
      {
        title: 'Get Adequate Sleep',
        description: 'Aim for 7-9 hours of quality sleep the night before a long drive.',
        icon: Moon,
      },
      {
        title: 'Plan Your Route',
        description: 'Know your route and plan rest stops every 2 hours or 100 miles.',
        icon: MapPin,
      },
      {
        title: 'Avoid Medication',
        description: 'Check if your medications cause drowsiness and avoid driving if so.',
        icon: Heart,
      },
    ],
  },
  {
    title: 'During Your Drive',
    icon: Car,
    tips: [
      {
        title: 'Take Regular Breaks',
        description: 'Stop every 2 hours to stretch, walk around, and refresh yourself.',
        icon: Clock,
      },
      {
        title: 'Stay Hydrated',
        description: 'Drink water regularly. Dehydration can increase fatigue.',
        icon: Coffee,
      },
      {
        title: 'Keep It Cool',
        description: 'Maintain a comfortable, slightly cool temperature in your vehicle.',
        icon: Wind,
      },
    ],
  },
  {
    title: 'Warning Signs',
    icon: AlertTriangle,
    tips: [
      {
        title: 'Frequent Yawning',
        description: 'If you find yourself yawning repeatedly, it is time to rest.',
        icon: Moon,
      },
      {
        title: 'Heavy Eyelids',
        description: 'Difficulty keeping your eyes open is a critical warning sign.',
        icon: Sun,
      },
      {
        title: 'Lane Drifting',
        description: 'Unintentionally drifting between lanes indicates severe fatigue.',
        icon: Car,
      },
    ],
  },
];

const emergencyTips = [
  {
    title: 'Pull Over Safely',
    description: 'Find a safe location like a rest stop or parking area to stop your vehicle.',
    color: 'border-yellow-500/30 bg-yellow-500/10',
  },
  {
    title: 'Take a Power Nap',
    description: 'A 15-20 minute nap can significantly improve alertness.',
    color: 'border-blue-500/30 bg-blue-500/10',
  },
  {
    title: 'Call Someone',
    description: 'If possible, call a friend or family member to help you stay awake or take over driving.',
    color: 'border-green-500/30 bg-green-500/10',
  },
  {
    title: 'Don\'t Push Through',
    description: 'Never try to "push through" drowsiness. It is not worth the risk.',
    color: 'border-red-500/30 bg-red-500/10',
  },
];

const statistics = [
  {
    value: "100K+",
    label: "Drowsy Driving Crashes / Year",
  },
  {
    value: "1,550+",
    label: "Fatigue-Related Deaths",
  },
  {
    value: "71K+",
    label: "Injuries Reported Annually",
  },
  {
    value: "6%",
    label: "Fatal Crashes Due to Drowsiness",
  },
];
export default function SafetyTipsPage() {
  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Safety <span className="text-safe">Tips</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Essential guidelines to help you stay alert and safe on the road.
              Remember: No destination is worth risking your life.
            </p>
          </div>

          {/* Statistics */}
          <section className="mb-16">
            <div className="glass-card rounded-2xl p-8 border border-red-500/20">
              <h2 className="text-xl font-bold text-center mb-6 text-red-400">
                The Dangers of Drowsy Driving
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statistics.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-6">
                Source: National Highway Traffic Safety Administration (NHTSA)
              </p>
            </div>
          </section>

          {/* Safety Categories */}
          <section className="mb-16">
            <div className="space-y-12">
              {safetyCategories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <div key={category.title}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-safe/10 flex items-center justify-center">
                        <CategoryIcon className="w-5 h-5 text-safe" />
                      </div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {category.tips.map((tip) => {
                        const TipIcon = tip.icon;
                        return (
                          <div key={tip.title} className="glass-card rounded-xl p-6 hover:border-safe/30 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-safe/10 flex items-center justify-center mb-4">
                              <TipIcon className="w-6 h-6 text-safe" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                            <p className="text-sm text-muted-foreground">{tip.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Emergency Response */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Emergency <span className="text-red-400">Response</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                If you notice signs of drowsiness while driving, take immediate action.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {emergencyTips.map((tip) => (
                <div key={tip.title} className={`rounded-xl p-6 border ${tip.color}`}>
                  <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Reference Card */}
          <section className="mb-16">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Quick Reference</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Do's */}
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs">
                      ✓
                    </div>
                    Do&apos;s
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Get enough sleep before driving',
                      'Take breaks every 2 hours',
                      'Share driving responsibilities',
                      'Pull over when feeling drowsy',
                      'Use caffeine strategically',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Don'ts */}
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs">
                      ✗
                    </div>
                    Don&apos;ts
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Drive after poor sleep',
                      'Rely only on caffeine',
                      'Drive during sleep hours',
                      'Ignore warning signs',
                      'Push through drowsiness',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Emergency Contact Banner */}
          <section className="glass-card rounded-2xl p-8 border border-safe/30 text-center mb-8">
            <Phone className="w-12 h-12 text-safe mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">In Case of Emergency</h2>
            <p className="text-muted-foreground mb-4">
              If you witness a drowsy driver or are in an accident, call emergency services immediately.
            </p>
            <div className="text-3xl font-bold text-safe">911</div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Button asChild size="lg" className="gap-2 bg-safe hover:bg-safe/90 text-background">
              <Link href="/dashboard">
                Start Monitoring Now
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
