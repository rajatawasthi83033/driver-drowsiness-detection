import { Navbar } from '@/components/navbar';
import { 
  Activity, 
  Target, 
  Code2, 
  Rocket,
  Users,
  Shield,
  Zap,
  GitBranch,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const technologies = [
  {
    category: 'Backend',
    items: [
      { name: 'Python', description: 'Core programming language' },
      { name: 'OpenCV', description: 'Computer vision library' },
      { name: 'MediaPipe', description: 'Face detection & landmarks' },
      { name: 'FastAPI', description: 'REST API framework' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React.js', description: 'UI component library' },
      { name: 'Next.js', description: 'React framework' },
      { name: 'TypeScript', description: 'Type-safe JavaScript' },
      { name: 'Tailwind CSS', description: 'Utility-first styling' },
    ],
  },
  {
    category: 'AI/ML',
    items: [
      { name: 'MediaPipe Face Mesh', description: 'Facial landmark tracking' },
      { name: 'SciPy', description: 'Scientific computing' },
      { name: 'NumPy', description: 'Numerical operations' },
      { name: 'imutils', description: 'Image processing utilities' },
    ],
  },
];

const futureImprovements = [
  {
    title: 'Mobile App Integration',
    description: 'Monitor driver alertness directly from smartphones and tablets.',
    icon: Users,
  },
  {
    title: 'Cloud-Based Reports',
    description: 'Store and analyze driver fatigue data for long-term insights.',
    icon: Code2,
  },
  {
    title: 'Personalized Alert System',
    description: 'Custom fatigue thresholds and alert preferences for each driver.',
    icon: Shield,
  },
  {
    title: 'Voice Assistant Alerts',
    description: 'Smart voice warnings when signs of drowsiness are detected.',
    icon: Zap,
  },
];
const projectGoals = [
  'Detect driver fatigue and drowsiness before it becomes dangerous',
  'Provide real-time alerts that help drivers stay awake and attentive',
  'Leverage AI and computer vision for accurate fatigue detection',
  'Deliver a simple and reliable monitoring system for everyday drivers',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-safe/30 mb-6">
              <Activity className="w-4 h-4 text-safe" />
              <span className="text-sm text-safe">DrowsiGuard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About This <span className="text-safe">Project</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              An AI-powered Driver Drowsiness Detection System that monitors driver alertness in real time and provides instant fatigue alerts before dangerous sleep episodes occur.
              
            </p>
          </div>

          {/* Project Description */}
          <section className="mb-16">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Our <span className="text-safe">Mission</span>
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Driver fatigue is one of the major contributors to road accidents on 
                    Indian highways, especially among commercial vehicle drivers,
                    long-distance travelers, and night-shift commuters.
                    Our mission is to develop a reliable real-time driver drowsiness
                    detection system that can identify fatigue early and alert drivers
                    before they fall asleep while driving.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This project combines Python-based backend processing with OpenCV 
                    and MediaPipe for facial analysis, paired with a modern React 
                    frontend for intuitive monitoring and control.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="glass rounded-xl p-6 border border-safe/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-safe" />
                      <h3 className="text-lg font-semibold">Project Goals</h3>
                    </div>
                    <ul className="space-y-3">
                      {projectGoals.map((goal) => (
                        <li key={goal} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-safe mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Purpose Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why It <span className="text-safe">Matters</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  stat: '13%',
                  label: 'Highway accidents linked to driver fatigue',
                  icon: Users,
                },
                {
                  stat: '24/7',
                  label: 'Real-time driver monitoring',
                  icon: Target,
                },
                {
                  stat: '20 Hours',
                  label: 'Wakefulness can impair driving like alcohol',
                  icon: Activity,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="glass-card rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-safe/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-safe" />
                    </div>
                    <div className="text-3xl font-bold text-safe mb-2">{item.stat}</div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Technologies Used */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Technologies <span className="text-safe">Used</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Built with modern, reliable technologies for optimal performance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {technologies.map((tech) => (
                <div key={tech.category} className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-5 h-5 text-safe" />
                    <h3 className="text-lg font-semibold">{tech.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {tech.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* System Architecture */}
          <section className="mb-16">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">System Architecture</h2>
              
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: 'Camera Input', desc: 'Captures video stream' },
                  { label: 'Python Backend', desc: 'Processes with OpenCV' },
                  { label: 'REST API', desc: 'Serves detection data' },
                  { label: 'React Frontend', desc: 'Displays real-time UI' },
                ].map((item, index) => (
                  <div key={item.label} className="relative">
                    <div className="bg-secondary/50 rounded-xl p-4 text-center">
                      <div className="w-8 h-8 rounded-full bg-safe/20 text-safe flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="font-medium mb-1">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-safe/50" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Future Improvements */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Future <span className="text-safe">Improvements</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Planned enhancements to make the system even more powerful.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {futureImprovements.map((improvement) => {
                const Icon = improvement.icon;
                return (
                  <div key={improvement.title} className="glass-card rounded-xl p-6 hover:border-safe/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-safe/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-safe" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{improvement.title}</h3>
                        <p className="text-sm text-muted-foreground">{improvement.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Team Section */}
         
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Our <span className="text-safe">Team</span>
              </h2>
          
              <p className="text-safe font-medium text-lg mb-4">
                Team Visionary Coders
              </p>
          
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This project was successfully developed by a dedicated team of students
                passionate about Artificial Intelligence, Computer Vision, and Driver Safety Systems.
              </p>
            </div>
          
            <div className="flex flex-wrap justify-center gap-8">
          
              {[
                "Rajat Awasthi",
                "Yogesh Kumar",
                "Vaibhav Shrivastav",
                "Palak Shrivastav",
                "Anushka Maurya"
              ].map((member) => (
                <div
                  key={member}
                  className="glass-card w-72 h-72 rounded-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-safe/10 flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-safe" />
                  </div>
          
                  <h3 className="text-lg font-semibold px-4">
                    {member}
                  </h3>
                </div>
              ))}
          
            </div>
          </section>
          

          

          

          {/* API Endpoints Reference */}
          <section className="mb-16">
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <GitBranch className="w-5 h-5 text-safe" />
                <h2 className="text-2xl font-bold">API Endpoints</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    method: 'GET',
                    endpoint: '/',
                    desc: 'API health check',
                  },
                  {
                    method: 'POST',
                    endpoint: '/detect',
                    desc: 'Analyze image for drowsiness',
                  },
                  {
                    method: 'GET',
                    endpoint: '/static/alarm_sound.mp3',
                    desc: 'Alarm audio file',
                  },
                ].map((api) => (
                  <div key={api.endpoint} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                    <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                      api.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {api.method}
                    </span>
                    <code className="font-mono text-sm flex-1">{api.endpoint}</code>
                    <span className="text-sm text-muted-foreground">{api.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Experience the power of AI-driven drowsiness detection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2 bg-safe hover:bg-safe/90 text-background">
                <Link href="/dashboard">
                  <Rocket className="w-4 h-4" />
                  Open Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/how-it-works">
                  <ExternalLink className="w-4 h-4" />
                  Learn How It Works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
