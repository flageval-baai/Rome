import React from 'react';
import { CirclePlus, LayoutDashboard, Users } from 'lucide-react';

const NoticeBar = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 border-muted-foreground">
      <div className="flex items-center justify-center space-x-2">
        <div className="text-sm flex flex-col items-center max-w-[75%] mx-auto w-[75%] text-center">
          <span>
            Humanity's Last Exam is still accepting questions from late contributors and submissions for the dataset and 
            <span className="whitespace-nowrap">co-authorship</span>, but new submissions are not eligible for the prize pool.
          </span>
        </div>
      </div>

      <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <a 
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 text-sm text-foreground hover:text-muted-foreground"
            href="https://agi.safe.ai/submit"
          >
            <CirclePlus className="h-4 w-4" />
            <span>New Submission</span>
          </a>
          <span className="text-xs text-muted-foreground">(for new contributors)</span>
        </div>

        <span className="hidden sm:inline-block text-muted-foreground">|</span>

        <div className="flex flex-col items-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-foreground hover:text-muted-foreground"
            href="https://agi.safe.ai/dashboard"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Sign In Dashboard</span>
          </a>
          <span className="text-xs text-muted-foreground">(for current contributors)</span>
        </div>

        <span className="hidden sm:inline-block text-muted-foreground">|</span>

        <a
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-sm text-foreground hover:text-muted-foreground"
          href="https://agi.safe.ai/contributors"
        >
          <Users className="h-4 w-4" />
          <span>Current Contributors</span>
        </a>
      </div>
    </div>
  );
};

export default NoticeBar;
