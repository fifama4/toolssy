import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Clock, Timer as TimerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const TimerInterface = () => {
  // Timer state
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerTime, setTimerTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer functions
  const startTimer = () => {
    if (timerTime <= 0 && (timerHours > 0 || timerMinutes > 0 || timerSeconds > 0)) {
      const totalSeconds = timerHours * 3600 + timerMinutes * 60 + timerSeconds;
      setTimerTime(totalSeconds);
      setTimerRunning(true);
      toast.success("Timer started!");
    } else if (timerTime > 0) {
      setTimerRunning(true);
      toast.success("Timer resumed!");
    }
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    toast.info("Timer paused");
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerTime(0);
    setTimerHours(0);
    setTimerMinutes(0);
    setTimerSeconds(0);
    toast.success("Timer reset");
  };

  useEffect(() => {
    if (timerRunning && timerTime > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerTime((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            toast.success("Timer finished!", {
              description: "Your countdown is complete!",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerRunning, timerTime]);

  // Stopwatch functions
  const startStopwatch = () => {
    setStopwatchRunning(true);
    toast.success("Stopwatch started!");
  };

  const pauseStopwatch = () => {
    setStopwatchRunning(false);
    toast.info("Stopwatch paused");
  };

  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
    toast.success("Stopwatch reset");
  };

  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current);
      }
    }

    return () => {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current);
      }
    };
  }, [stopwatchRunning]);

  // Format time displays
  const formatTimerDisplay = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const formatStopwatchDisplay = (milliseconds: number) => {
    const ms = Math.floor((milliseconds % 1000) / 10);
    const s = Math.floor((milliseconds / 1000) % 60);
    const m = Math.floor((milliseconds / 60000) % 60);
    const h = Math.floor(milliseconds / 3600000);
    return { h, m, s, ms };
  };

  const stopwatchDisplay = formatStopwatchDisplay(stopwatchTime);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-hero relative overflow-hidden min-h-screen">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            Timer & <span className="bg-gradient-primary bg-clip-text text-transparent">Stopwatch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
            Track your time easily and efficiently with our premium online timer and stopwatch
          </p>
        </div>

        {/* Main Tool Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border shadow-premium-xl animate-scale-in overflow-hidden" style={{ animationDelay: "0.3s" }}>
            <Tabs defaultValue="timer" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/50 p-2">
                <TabsTrigger 
                  value="timer" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 data-[state=active]:shadow-premium-md"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Timer
                </TabsTrigger>
                <TabsTrigger 
                  value="stopwatch"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 data-[state=active]:shadow-premium-md"
                >
                  <TimerIcon className="w-4 h-4 mr-2" />
                  Stopwatch
                </TabsTrigger>
              </TabsList>

              {/* Timer Tab */}
              <TabsContent value="timer" className="p-6 md:p-10 space-y-8">
                {/* Timer Display */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-8 md:p-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl mb-8 shadow-premium-lg hover:shadow-premium-xl transition-all duration-300">
                    <p className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground font-mono tracking-wider">
                      {timerTime > 0 ? formatTimerDisplay(timerTime) : "00:00:00"}
                    </p>
                  </div>
                </div>

                {/* Timer Input Fields */}
                {timerTime === 0 && !timerRunning && (
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-in">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground text-center block">Hours</label>
                      <Input
                        type="number"
                        min="0"
                        max="23"
                        value={timerHours}
                        onChange={(e) => setTimerHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                        className="text-center text-2xl font-bold focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground text-center block">Minutes</label>
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={timerMinutes}
                        onChange={(e) => setTimerMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                        className="text-center text-2xl font-bold focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground text-center block">Seconds</label>
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={timerSeconds}
                        onChange={(e) => setTimerSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                        className="text-center text-2xl font-bold focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary"
                      />
                    </div>
                  </div>
                )}

                {/* Timer Controls */}
                <div className="flex justify-center gap-4">
                  {!timerRunning ? (
                    <Button
                      onClick={startTimer}
                      size="lg"
                      className="group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300 px-8 py-6 text-lg"
                      disabled={timerTime === 0 && timerHours === 0 && timerMinutes === 0 && timerSeconds === 0}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      <span className="relative z-10">Start</span>
                      <span className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-500"></span>
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      size="lg"
                      className="group relative overflow-hidden bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300 px-8 py-6 text-lg"
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      <span className="relative z-10">Pause</span>
                    </Button>
                  )}
                  <Button
                    onClick={resetTimer}
                    size="lg"
                    variant="outline"
                    className="group relative overflow-hidden border-2 hover:border-primary hover:text-primary shadow-premium-sm hover:shadow-premium-md transition-all duration-300 px-8 py-6 text-lg"
                  >
                    <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="relative z-10">Reset</span>
                  </Button>
                </div>
              </TabsContent>

              {/* Stopwatch Tab */}
              <TabsContent value="stopwatch" className="p-6 md:p-10 space-y-8">
                {/* Stopwatch Display */}
                <div className="text-center">
                  <div className="inline-flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl mb-8 shadow-premium-lg hover:shadow-premium-xl transition-all duration-300">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground font-mono">
                        {String(stopwatchDisplay.h).padStart(2, "0")}
                      </span>
                      <span className="text-3xl md:text-5xl text-muted-foreground">:</span>
                      <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground font-mono">
                        {String(stopwatchDisplay.m).padStart(2, "0")}
                      </span>
                      <span className="text-3xl md:text-5xl text-muted-foreground">:</span>
                      <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground font-mono">
                        {String(stopwatchDisplay.s).padStart(2, "0")}
                      </span>
                      <span className="text-3xl md:text-4xl text-muted-foreground ml-2">
                        .{String(stopwatchDisplay.ms).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stopwatch Controls */}
                <div className="flex justify-center gap-4">
                  {!stopwatchRunning ? (
                    <Button
                      onClick={startStopwatch}
                      size="lg"
                      className="group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300 px-8 py-6 text-lg"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      <span className="relative z-10">Start</span>
                      <span className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-500"></span>
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseStopwatch}
                      size="lg"
                      className="group relative overflow-hidden bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300 px-8 py-6 text-lg"
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      <span className="relative z-10">Pause</span>
                    </Button>
                  )}
                  <Button
                    onClick={resetStopwatch}
                    size="lg"
                    variant="outline"
                    className="group relative overflow-hidden border-2 hover:border-primary hover:text-primary shadow-premium-sm hover:shadow-premium-md transition-all duration-300 px-8 py-6 text-lg"
                  >
                    <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="relative z-10">Reset</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Ad Placeholder - Top */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground text-sm">Ad Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimerInterface;
