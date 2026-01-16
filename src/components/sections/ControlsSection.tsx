import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Chip } from "@/components/ui/Chip";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Home,
  Bed,
  Briefcase,
  Wind,
  Lamp,
  RollerCoaster,
  Tv,
  Thermometer,
  Droplets,
  Lightbulb,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const rooms = [
  {
    name: "Living Room",
    icon: <Home className="w-6 h-6" />,
    sensors: [
      { name: "Main Lights", icon: <Lamp className="w-5 h-5" />, type: "switch", value: true },
      { name: "Floor Lamp", icon: <Lightbulb className="w-5 h-5" />, type: "slider", value: 60 },
      { name: "Blinds", icon: <RollerCoaster className="w-5 h-5" />, type: "switch", value: false },
      { name: "Television", icon: <Tv className="w-5 h-5" />, type: "switch", value: true },
    ],
  },
  {
    name: "Bedroom",
    icon: <Bed className="w-6 h-6" />,
    sensors: [
      { name: "Bedside Lamp", icon: <Lightbulb className="w-5 h-5" />, type: "slider", value: 30 },
      { name: "Blinds", icon: <RollerCoaster className="w-5 h-5" />, type: "switch", value: true },
      { name: "Temperature", icon: <Thermometer className="w-5 h-5" />, type: "temperature", value: 21 },
    ],
  },
  {
    name: "Office",
    icon: <Briefcase className="w-6 h-6" />,
    sensors: [
      { name: "Desk Lamp", icon: <Lightbulb className="w-5 h-5" />, type: "slider", value: 90 },
      { name: "HVAC", icon: <Wind className="w-5 h-5" />, type: "temperature", value: 23 },
      { name: "Humidity", icon: <Droplets className="w-5 h-5" />, type: "value", value: "45%" },
    ],
  },
];

export function ControlsSection() {
  return (
    <div>
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {rooms.map((room) => (
          <GlassPanel key={room.name} variants={item}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {room.icon}
              </div>
              <h3 className="text-xl font-semibold">{room.name}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.sensors.map((sensor) => (
                <GlassPanel key={sensor.name} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-muted-foreground">{sensor.icon}</div>
                      <h4 className="font-medium text-sm">{sensor.name}</h4>
                    </div>
                    {sensor.type === "switch" && <Switch checked={sensor.value as boolean} />}
                  </div>
                  {sensor.type === "slider" && (
                    <div className="flex items-center gap-3">
                      <Slider defaultValue={[sensor.value as number]} max={100} step={1} />
                      <span className="text-xs font-mono w-12 text-right">{sensor.value}%</span>
                    </div>
                  )}
                  {sensor.type === "temperature" && (
                     <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{sensor.value}°C</span>
                        <div className="flex gap-1">
                            <button className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20">-</button>
                            <button className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20">+</button>
                        </div>
                     </div>
                  )}
                   {sensor.type === "value" && (
                     <span className="text-2xl font-bold">{sensor.value}</span>
                  )}
                </GlassPanel>
              ))}
            </div>
          </GlassPanel>
        ))}
      </motion.div>
    </div>
  );
}