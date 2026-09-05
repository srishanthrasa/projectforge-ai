import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge } from '../ui/Primitives';
import { Bookmark, ArrowRight, Trash2, Clock, GitCompare, Sparkles } from 'lucide-react';

export const SavedIdeasView: React.FC = () => {
  const {
    ideas,
    savedIdeaIds,
    toggleSaveIdea,
    setActiveProject,
    navigateTo,
    compareIdeaIds,
    toggleCompareIdea
  } = useApp();

  const savedIdeas = ideas.filter(i => savedIdeaIds.includes(i.id));

  return (
    <div className="py-6 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5 fill-amber-400" />
              <span>Bookmarked Capstones</span>
            </span>
            <span className="text-xs text-slate-400">{savedIdeas.length} Saved</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Poppins']">
            Saved Project Ideas
          </h1>
        </div>

        <Btn
          variant="subtle"
          size="sm"
          onClick={() => navigateTo('/ideas')}
        >
          Browse All Recommendations
        </Btn>
      </div>

      {savedIdeas.length === 0 ? (
        <Card className="p-12 text-center space-y-4 max-w-md mx-auto">
          <Bookmark className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white font-['Poppins']">
            No Saved Ideas Yet
          </h3>
          <p className="text-xs text-slate-400">
            Star projects from the recommendations list to review them later with your team or faculty advisor.
          </p>
          <Btn variant="primary" onClick={() => navigateTo('/ideas')}>
            Explore Project Ideas
          </Btn>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedIdeas.map(idea => {
            const isCompared = compareIdeaIds.includes(idea.id);
            return (
              <Card key={idea.id} hover className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="accent">{idea.match_score}% Match</Badge>
                      <Badge variant="neutral">{idea.difficulty}</Badge>
                    </div>
                    <button
                      onClick={() => toggleSaveIdea(idea.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white font-['Poppins']">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {idea.technology_stack.slice(0, 4).map(t => (
                      <Badge key={t} variant="neutral" size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleCompareIdea(idea.id)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
                      isCompared
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                  </button>

                  <Btn
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => {
                      setActiveProject(idea);
                      navigateTo('/project', idea.id);
                    }}
                  >
                    Open Project
                  </Btn>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
