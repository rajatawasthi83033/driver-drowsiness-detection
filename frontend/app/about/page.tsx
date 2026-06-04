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
      { name: 'Flask/FastAPI', description: 'REST API framework' },
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
      { name: 'dlib', description: 'Facial landmark detection' },
      { name: 'SciPy', description: 'Scientific computing' },
      { name: 'NumPy', description: 'Numerical operations' },
      { name: 'imutils', description: 'Image processing utilities' },
    ],
  },
];

const futureImprovements = [
  {
    title: 'Mobile App Integration',
    description: 'Native iOS and Android apps for seamless monitoring on any device.',
    icon: Users,
  },
  {
    title: 'Cloud Analytics',
    description: 'Historical data analysis and driving pattern insights through cloud storage.',
    icon: Code2,
  },
  {
    title: 'Multi-driver Support',
    description: 'Driver profiles with personalized thresholds and preferences.',
    icon: Shield,
  },
  {
    title: 'Vehicle Integration',
    description: 'Direct integration with vehicle systems for automated safety responses.',
    icon: Zap,
  },
];

const projectGoals = [
  'Reduce drowsy driving accidents by providing real-time monitoring',
  'Create an accessible, affordable safety system for all drivers',
  'Leverage AI and computer vision for accurate fatigue detection',
  'Build an intuitive interface that drivers can trust and rely on',
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
              An AI-powered driver safety system designed to prevent accidents 
              caused by drowsy driving through real-time monitoring and alerts.
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
                    Driver drowsiness is a leading cause of road accidents worldwide. 
                    Our mission is to leverage cutting-edge AI and computer vision 
                    technology to create a reliable, real-time drowsiness detection 
                    system that can save lives.
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
                  stat: '4.8 Lakh+',
                  label: 'Road accidents reported annually in India',
                },
                {
                  stat: '1.7 Lakh+',
                  label: 'Lives lost on Indian roads every year',
                },
                {
                  stat: '20 Hours',
                  label: 'Being awake this long impairs driving like alcohol',
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
                passionate about Artificial Intelligence, Computer Vision, and Road Safety.
              </p>
            </div>
                      
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-safe/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-safe" />
                </div>
                <h3 className="text-xl font-semibold">Rajat Awasthi</h3>
              </div>
          
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-safe/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-safe" />
                </div>
                <h3 className="text-xl font-semibold">Yogesh Kumar</h3>
              </div>
          
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-safe/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-safe" />
                </div>
                <h3 className="text-xl font-semibold">Vaibhav Shrivastav</h3>
        
              </div>
          
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-safe/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-safe" />
                </div>
                <h3 className="text-xl font-semibold">Palak Shrivastav</h3>
                
              </div>
          
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-safe/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-safe" />
                </div>
                <h3 className="text-xl font-semibold">Anuska Maurya</h3>
                
              </div>
          
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
                  { method: 'GET', endpoint: '/video_feed', desc: 'Live camera stream' },
                  { method: 'POST', endpoint: '/start', desc: 'Start detection' },
                  { method: 'POST', endpoint: '/stop', desc: 'Stop detection' },
                  { method: 'GET', endpoint: '/status', desc: 'Real-time status JSON' },
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
