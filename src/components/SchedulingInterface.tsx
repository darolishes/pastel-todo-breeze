import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from 'lucide-react';

interface ScheduleItem {
  id: string;
  name: string;
  avatarUrl: string;
  proposedTime: string;
}

interface ComplexQuestion {
  id: string;
  avatarUrl: string;
  question: string;
}

interface DemoFeedback {
  id: string;
  name: string;
  avatarUrl: string;
  date: string;
}

export const SchedulingInterface = () => {
  const scheduleItems: ScheduleItem[] = [
    {
      id: '1',
      name: 'Savannah Nguyen',
      avatarUrl: '/placeholder.svg',
      proposedTime: 'Wednesday 3 PM'
    },
    {
      id: '2',
      name: 'Nathaniel Welch',
      avatarUrl: '/placeholder.svg',
      proposedTime: 'tomorrow at 1 PM'
    },
    {
      id: '3',
      name: 'Tracy Stroman',
      avatarUrl: '/placeholder.svg',
      proposedTime: '4 PM next Friday'
    }
  ];

  const complexQuestions: ComplexQuestion[] = [
    {
      id: '1',
      avatarUrl: '/placeholder.svg',
      question: 'Do you have users in allianz.co.uk domain?'
    }
  ];

  const demoFeedbacks: DemoFeedback[] = [
    {
      id: '1',
      name: 'Jacob Jones',
      avatarUrl: '/placeholder.svg',
      date: 'Fri, 20 Apr 2023 1 PM'
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Scheduling Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Scheduling
            <span className="bg-primary/20 text-primary text-sm px-2 py-0.5 rounded-full">5</span>
          </h2>
          <button className="text-sm text-primary hover:text-primary/80">Collapse</button>
        </div>
        <div className="space-y-3">
          {scheduleItems.map((item) => (
            <Card key={item.id} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <img src={item.avatarUrl} alt={item.name} />
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        How about <span className="text-primary">{item.proposedTime}</span>?
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 text-primary">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-destructive/10 text-destructive">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Complex Questions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Complex Question
            <span className="bg-primary/20 text-primary text-sm px-2 py-0.5 rounded-full">2</span>
          </h2>
          <button className="text-sm text-primary hover:text-primary/80">See all</button>
        </div>
        <div className="space-y-3">
          {complexQuestions.map((question) => (
            <Card key={question.id} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <img src={question.avatarUrl} alt="User" />
                    </Avatar>
                    <p className="text-sm text-muted-foreground">{question.question}</p>
                  </div>
                  <Button variant="secondary" className="text-sm">
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Demo Feedback Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Demo Feedback
            <span className="bg-primary/20 text-primary text-sm px-2 py-0.5 rounded-full">1</span>
          </h2>
        </div>
        <div className="space-y-3">
          {demoFeedbacks.map((feedback) => (
            <Card key={feedback.id} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <img src={feedback.avatarUrl} alt={feedback.name} />
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Demo with {feedback.name}</h3>
                      <p className="text-sm text-muted-foreground">{feedback.date}</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="text-sm">
                    Give Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};