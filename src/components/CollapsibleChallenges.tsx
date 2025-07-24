
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import InvestmentChallenges from './InvestmentChallenges';

const CollapsibleChallenges = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-white rounded-xl shadow-sm border mb-6">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
          >
            <h2 className="text-xl font-bold text-gray-900">Investment Challenges</h2>
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-6 pb-6">
          <InvestmentChallenges />
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default CollapsibleChallenges;
