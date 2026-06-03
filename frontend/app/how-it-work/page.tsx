import { Navbar } from '@/components/navbar';
import { 
  Camera, 
  Scan, 
  Brain, 
  Bell, 
  ArrowRight,
  Eye,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    icon: Camera,
    title: 'Camera Captures Face',
    description: 'A camera mounted in the vehicle continuously captures video of the driver\'s face in real-time.',
    details: [
      'Works with standard webcams',
      'Optimized for various lighting conditions',
      'Supports different face angles',
      'Minimal latency capture',
    ],
  },
  {
    number: '02',
    icon: Scan,
    title: 'AI Detects Eyes & Mouth',
    description: 'MediaPipe facial landmark detection identifies 68 key points on the face, focusing on eyes and mouth regions.',
    details: [
      '68-point facial landmark detection',
      'Eye region tracking',
      'Mouth position analysis',
      'Head pose estimation',
    ],
  },
  {
    number: '03',
    icon: Brain,
    title: 'Calculates Fatigue Metrics',
    description: 'Advanced algorithms calculate Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) to determine fatigue levels.',
    details: [
      'EAR threshold monitoring',
      'Yawn detection via MAR',
      'Blink frequency analysis',
      'Cumulative fatigue scoring',
    ],
  },
  {
    number: '04',
    icon: Bell,
    title: 'Triggers Alert',
    description: 'When drowsiness is detected, the system immediately triggers audio and visual alerts to wake the driver.',
    details: [
      'Instant audio alarms',
      'Visual dashboard alerts',
      'Progressive warning levels',
      'Alert logging and history',
    ],
  },
];

const metrics = [
  {
    title: 'Eye Aspect Ratio (EAR)',
    icon: Eye,
    description: 'Measures the openness of the eyes. When eyes close, EAR decreases significantly.',
    formula: 'EAR = (|p2-p6| + |p3-p5|) / (2 × |p1-p4|)',
    thresholds: [
      { label: 'Normal', value: '> 0.25', color: 'text-green-400' },
      { label: 'Warning', value: '0.20 - 0.25', color: 'text-yellow-400' },
      { label: 'Danger', value: '< 0.20', color: 'text-red-400' },
    ],
  },
  {
    title: 'Mouth Aspect Ratio (MAR)',
    icon: Activity,
    description: 'Detects yawning by measuring mouth openness. Higher values indicate potential drowsiness.',
    formula: 'MAR = (|p2-p8| + |p3-p7| + |p4-p6|) / (2 × |p1-p5|)',
    thresholds: [
      { label: 'Normal', value: '< 0.50', color: 'text-green-400' },
      { label: 'Warning', value: '0.50 - 0.60', color: 'text-yellow-400' },
      { label: 'Yawning', value: '> 0.60', color: 'text-red-400' },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-safe">Works</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system uses computer vision and machine learning 
              to detect drowsiness in real-time and keep drivers safe.
            </p>
          </div>

          {/* Steps Section */}
          <section className="mb-20">
            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div key={step.number} className="relative">
                    <div className="glass-card rounded-2xl p-8">
                      <div className="grid md:grid-cols-12 gap-6 items-start">
                        {/* Step Number & Icon */}
                        <div className="md:col-span-2 flex md:flex-col items-center gap-4">
                          <div className="text-5xl font-bold text-safe/20">
                            {step.number}
                          </div>
                          <div className="w-16 h-16 rounded-xl bg-safe/10 flex items-center justify-center">
                            <Icon className="w-8 h-8 text-safe" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="md:col-span-5">
                          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                        
                        {/* Details */}
                        <div className="md:col-span-5">
                          <ul className="space-y-2">
                            {step.details.map((detail) => (
                              <li key={detail} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-safe" />
                                <span className="text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connector Arrow */}
                    {!isLast && (
                      <div className="flex justify-center py-4">
                        <ArrowRight className="w-6 h-6 text-safe/50 rotate-90" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Metrics Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Key <span className="text-safe">Metrics</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Understanding the metrics that power our drowsiness detection system.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.title} className="glass-card rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-safe/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-safe" />
                      </div>
                      <h3 className="text-xl font-semibold">{metric.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{metric.description}</p>
                    
                    {/* Formula */}
                    <div className="bg-secondary/50 rounded-lg p-3 mb-4 font-mono text-sm">
                      {metric.formula}
                    </div>
                    
                    {/* Thresholds */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground mb-2">Thresholds:</p>
                      {metric.thresholds.map((threshold) => (
                        <div key={threshold.label} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{threshold.label}</span>
                          <span className={`font-mono ${threshold.color}`}>{threshold.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="glass-card rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'OpenCV', desc: 'Computer Vision' },
                { name: 'MediaPipe', desc: 'Face Detection' },
                { name: 'Python', desc: 'Backend Processing' },
                { name: 'React', desc: 'Frontend Interface' },
              ].map((tech) => (
                <div key={tech.name} className="text-center p-4 bg-secondary/30 rounded-xl">
                  <div className="text-lg font-semibold text-safe">{tech.name}</div>
                  <div className="text-sm text-muted-foreground">{tech.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Try It?</h2>
            <p className="text-muted-foreground mb-6">
              Experience the power of AI-driven drowsiness detection.
            </p>
            <Button asChild size="lg" className="gap-2 bg-safe hover:bg-safe/90 text-background">
              <Link href="/dashboard">
                Open Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
