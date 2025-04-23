
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, TimerOff, AlertCircle } from "lucide-react";

interface TriggerCard {
  title: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const triggerCards: TriggerCard[] = [
  {
    title: "Scheduled Time",
    icon: Calendar,
    description: "Machines turn on/off based on scheduled time slots",
    color: "bg-blue-500",
  },
  {
    title: "Usage Request",
    icon: Users,
    description: "Activates when customer requests to use machines",
    color: "bg-green-500",
  },
  {
    title: "Idle Detection",
    icon: TimerOff,
    description: "Deactivates after 30 minutes of inactivity",
    color: "bg-amber-500",
  },
  {
    title: "Maintenance",
    icon: AlertCircle,
    description: "Turns off during scheduled maintenance periods",
    color: "bg-red-500",
  },
];

const AutomatedTriggers = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Automated Machine On/Off System</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {triggerCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${card.color} text-white mr-4`}>
                  <card.icon size={24} />
                </div>
                <div>
                  <h3 className="font-medium">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AutomatedTriggers;