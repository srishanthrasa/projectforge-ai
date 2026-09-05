import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge } from '../ui/Primitives';
import {
  Sparkles,
  GitCompare,
  ArrowRight,
  ArrowUpDown,
  Clock,
  Star,
  Search,
  Check
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
};

export const IdeasListView: React.FC = () => {
  const {
    ideas,
    navigateTo,
    savedIdeaIds,
    toggleSaveIdea,
    compareIdeaIds,
    toggleCompareIdea,
    setActiveProject
  } = useApp();

  const [sortBy, setSortBy] = useState<'match' | 'innovation' | 'feasibility' | 'career' | 'duration'>('match');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sortedAndFilteredIdeas = useMemo(() => {
    return ideas
      .filter(idea => {
        if (selectedDifficulty !== 'All' && idea.difficulty !== selectedDifficulty) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = idea.title.toLowerCase().includes(q);
          const matchesDesc = idea.description.toLowerCase().includes(q);
          const matchesTech = idea.technology_stack.some(t => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDesc && !matchesTech) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') return b.match_score - a.match_score;
        if (sortBy === 'innovation') return b.innovation_score - a.innovation_score;
        if (sortBy === 'feasibility') return b.feasibility_score - a.feasibility_score;
        if (sortBy === 'career') return b.career_score - a.career_score;
        return a.estimated_duration.localeCompare(b.estimated_duration);
      });
  }, [ideas, sortBy, selectedDifficulty, searchQuery]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-4 space-y-6 font-['Poppins',sans-serif]"
    >
      {/* Header & Controls */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              {ideas.length} Recommendations
            </span>
            <span className="text-xs text-slate-400 font-medium">Ranked by ProjectForge AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Recommended Project Ideas
          </h1>
        </div>

        <Btn
          variant="subtle"
          size="sm"
          icon={<Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
          onClick={() => navigateTo('/generate')}
        >
          Regenerate Ideas
        </Btn>
      </motion.div>

      {/* Filter and Sort Bar */}
      <motion.div
        variants={itemVariants}
        className="p-3 bg-white border border-slate-200/80 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter by title or tech..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-normal text-xs"
          />
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium mr-1">Difficulty:</span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
            <motion.button
              key={diff}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {diff}
            </motion.button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium text-xs focus:outline-none cursor-pointer"
          >
            <option value="match">Match Score</option>
            <option value="innovation">Innovation Score</option>
            <option value="feasibility">Feasibility Score</option>
            <option value="career">Career Value</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </motion.div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedAndFilteredIdeas.map(idea => {
          const isSaved = savedIdeaIds.includes(idea.id);
          const isCompared = compareIdeaIds.includes(idea.id);

          return (
            <motion.div
              key={idea.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {idea.match_score}% Match
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {idea.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {idea.estimated_duration}
                    </span>
                  </div>

                  {/* Bookmark Star Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={e => {
                      e.stopPropagation();
                      toggleSaveIdea(idea.id);
                    }}
                    title={isSaved ? 'Remove from saved' : 'Save idea'}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-amber-50 border-amber-200 text-amber-500'
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                  </motion.button>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                  {idea.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                  {idea.description}
                </p>

                {/* Scores Row */}
                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Innovation</div>
                    <div className="text-xs font-bold text-indigo-600">{idea.innovation_score}/10</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Feasibility</div>
                    <div className="text-xs font-bold text-emerald-600">{idea.feasibility_score}/10</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Career Value</div>
                    <div className="text-xs font-bold text-amber-600">{idea.career_score}/10</div>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {idea.technology_stack.slice(0, 5).map(tech => (
                    <span key={tech} className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                      {tech}
                    </span>
                  ))}
                  {idea.technology_stack.length > 5 && (
                    <span className="text-[10px] text-slate-400 font-medium self-center">
                      +{idea.technology_stack.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggleCompareIdea(idea.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isCompared
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:text-slate-900 bg-white'
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                </motion.button>

                <Btn
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => {
                    setActiveProject(idea);
                    navigateTo('/project', idea.id);
                  }}
                >
                  View Details &amp; Plan
                </Btn>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky Compare Bar */}
      <AnimatePresence>
        {compareIdeaIds.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-slate-200 px-5 py-2.5 rounded-full shadow-lg flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-semibold text-slate-800">
                {compareIdeaIds.length} projects selected for comparison
              </span>
            </div>
            <Btn
              variant="accent"
              size="sm"
              onClick={() => navigateTo('/compare')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Compare Now
            </Btn>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

