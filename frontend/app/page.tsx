import Link from 'next/link';
import { 
  Activity, 
  Shield, 
  Zap, 
  Eye,
  ArrowRight,
  Camera,
  Brain,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';

const features = [
  {
    icon: Eye,
    title: 'Driver Eye Monitoring',
    description:
      'Tracks eye movement and blink patterns to identify signs of fatigue during long journeys.',
  },
  {
    icon: Brain,
    title: 'AI-Based Fatigue Detection',
    description:
      'Advanced algorithms analyze facial landmarks and driver behaviour in real time.',
  },
  {
    icon: Bell,
    title: 'Instant Safety Alerts',
    description:
      'Visual and audio warnings notify drivers before fatigue becomes dangerous.',
  },
  {
    icon: Shield,
    title: 'Made for Indian Roads',
    description:
      'Designed to support safer driving across highways, cities and long-distance transport routes.',
  },
];
const stats = [
  { value: '1.5 Lakh+', label: 'Road Deaths Annually in India' },
  { value: '13%', label: 'Crashes Linked to Fatigue & Sleepiness' },
  { value: '24/7', label: 'Continuous Monitoring' },
];
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-safe/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-safe/30 mb-8">
            <Activity className="w-4 h-4 text-safe" />
            <span className="text-sm text-safe">AI-Based Driver Safety System</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            <span className="text-foreground">Driver Drowsiness</span>
            <br />
            <span className="text-safe">Detection System</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            Designed for Indian roads, our AI-powered system continuously monitors
            driver alertness using computer vision and facial analysis to help
            reduce fatigue-related road accidents.
            
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2 bg-safe hover:bg-safe/90 text-background px-8">
              <Link href="/dashboard">
                Start Monitoring
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 px-8">
              <Link href="/how-it-works">
                Learn More
                <Zap className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto justify-center">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-safe mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Keep You <span className="text-safe">Safe</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our intelligent monitoring system continuously analyzes driver behaviour
              and provides early warnings to help prevent fatigue-related accidents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="glass-card rounded-xl p-6 hover:border-safe/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-safe/10 flex items-center justify-center mb-4 group-hover:bg-safe/20 transition-colors">
                    <Icon className="w-6 h-6 text-safe" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Real-time <span className="text-safe">Monitoring Dashboard</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our intuitive dashboard provides instant access to all critical metrics. 
                  Monitor eye aspect ratio, mouth aspect ratio, and overall sleep risk 
                  in real-time with visual indicators and instant alerts.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Live driver monitoring feed',
                    'AI-powered fatigue detection',
                    'Real-time alertness indicators',
                    'Instant visual and audio warnings',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-safe" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="mt-8 gap-2 bg-safe hover:bg-safe/90 text-background">
                  <Link href="/dashboard">
                    Open Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Mock Dashboard Preview */}
              <div className="relative">
                <div className="glass rounded-xl p-4 border border-border/50">
                  <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-16 h-16 text-muted-foreground/30" />
                    </div>
                    {/* CCTV corners */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-green-500/50" />
                    <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-green-500/50" />
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-green-500/50" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-green-500/50" />
                  </div>
                  
                  {/* Mini status indicators */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                      <div className="text-green-400 text-sm font-bold">SAFE</div>
                      <div className="text-xs text-muted-foreground">Status</div>
                    </div>
                    <div className="bg-secondary rounded-lg p-3 text-center">
                      <div className="text-foreground text-sm font-bold">0.31</div>
                      <div className="text-xs text-muted-foreground">EAR</div>
                    </div>
                    <div className="bg-secondary rounded-lg p-3 text-center">
                      <div className="text-foreground text-sm font-bold">0.22</div>
                      <div className="text-xs text-muted-foreground">MAR</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Drive <span className="text-safe">Safer</span>?
          </h2>
          <p className="text-muted-foreground mb-8">
            Start using our AI-powered drowsiness detection system today 
            and protect yourself and others on the road.
          </p>
          <Button asChild size="lg" className="gap-2 bg-safe hover:bg-safe/90 text-background px-8">
            <Link href="/dashboard">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-safe" />
            <span className="font-semibold">DrowsiGuard</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Keeping drivers safe with AI-powered monitoring technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
