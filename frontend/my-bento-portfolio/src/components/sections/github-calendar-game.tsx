"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "../ui/card";
import { Github, RotateCcw, Volume2, VolumeX, Keyboard, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play, Cpu } from "lucide-react";
import { fallbackContributions, fallbackTotalContributions, SimplifiedDay } from "@/lib/github-contributions-mock";

// BFS Pathfinding to find the next direction towards the nearest green contribution block
function findNextMove(
  head: { x: number; y: number },
  snakeBody: { x: number; y: number }[],
  contributions: SimplifiedDay[][]
): { x: number; y: number } | null {
  const width = 53;
  const height = 7;

  // Track visited cells (coordinates serialized as strings)
  const visited = new Set<string>();
  snakeBody.forEach(cell => visited.add(`${cell.x},${cell.y}`));

  // Queue holds elements: { x, y, firstDir }
  // firstDir stores the first step taken to reach this cell
  const queue: { x: number; y: number; firstDir: { x: number; y: number } | null }[] = [];

  const dirs = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];

  // Initialize queue with valid moves from the head
  for (const d of dirs) {
    const nx = head.x + d.x;
    const ny = head.y + d.y;
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const key = `${nx},${ny}`;
      if (!visited.has(key)) {
        queue.push({ x: nx, y: ny, firstDir: d });
        visited.add(key);
      }
    }
  }

  while (queue.length > 0) {
    const current = queue.shift()!;

    // Check if this cell is a green contribution cell
    const targetCell = contributions[current.x]?.[current.y];
    if (targetCell && targetCell.l > 0) {
      return current.firstDir; // Return direction for the first step on the shortest path
    }

    // Queue neighbors
    for (const d of dirs) {
      const nx = current.x + d.x;
      const ny = current.y + d.y;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const key = `${nx},${ny}`;
        if (!visited.has(key)) {
          queue.push({ x: nx, y: ny, firstDir: current.firstDir });
          visited.add(key);
        }
      }
    }
  }

  // Fallback: If no paths to green blocks exist or are reachable, make any safe move
  for (const d of dirs) {
    const nx = head.x + d.x;
    const ny = head.y + d.y;
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const isSnake = snakeBody.some(cell => cell.x === nx && cell.y === ny);
      if (!isSnake) {
        return d;
      }
    }
  }

  return null;
}

export function GithubCalendarGame() {
  // Contributions data state
  const [contributions, setContributions] = useState<SimplifiedDay[][]>(fallbackContributions);
  const [totalContributions, setTotalContributions] = useState<number>(fallbackTotalContributions);
  const [originalContributions, setOriginalContributions] = useState<SimplifiedDay[][]>(fallbackContributions);
  const [originalTotal, setOriginalTotal] = useState<number>(fallbackTotalContributions);
  const [loading, setLoading] = useState<boolean>(true);

  // Snake game state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([]);
  const [direction, setDirection] = useState<{ x: number; y: number }>({ x: 1, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [activeTooltip, setActiveTooltip] = useState<{ day: SimplifiedDay; x: number; y: number } | null>(null);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const GRID_WIDTH = 53; // weeks
  const GRID_HEIGHT = 7; // days

  // Fetch real contribution data
  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true);
        const response = await fetch("https://github-contributions-api.deno.dev/kaiju-no-9.json");
        if (!response.ok) {
          throw new Error("Failed to fetch contribution data");
        }
        const data = await response.json();
        
        const levelMap: Record<string, number> = {
          'NONE': 0,
          'FIRST_QUARTILE': 1,
          'SECOND_QUARTILE': 2,
          'THIRD_QUARTILE': 3,
          'FOURTH_QUARTILE': 4
        };

        interface RawDay {
          date: string;
          contributionCount: number;
          contributionLevel: string;
        }

        const mapped: SimplifiedDay[][] = data.contributions.map((week: RawDay[]) => 
          week.map((day: RawDay) => ({
            d: day.date,
            c: day.contributionCount,
            l: levelMap[day.contributionLevel] || 0
          }))
        );

        setContributions(mapped);
        setOriginalContributions(mapped);
        setTotalContributions(data.totalContributions);
        setOriginalTotal(data.totalContributions);
      } catch (err) {
        console.warn("Could not fetch real-time contributions, using cached fallback data.", err);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();

    // Load High Score
    const savedHighScore = localStorage.getItem("github_snake_high_score");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Initialize/Start Game (default to Auto-Play Mode)
  const startGame = useCallback((auto = true) => {
    // Reset board to original contributions
    setContributions(originalContributions.map(week => week.map(day => ({ ...day }))));
    setTotalContributions(originalTotal);

    // Initial Snake: 3 blocks long in the middle of grid moving right
    const initialSnake = [
      { x: 15, y: 3 },
      { x: 14, y: 3 },
      { x: 13, y: 3 }
    ];

    setSnake(initialSnake);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setIsAutoPlaying(auto);
  }, [originalContributions, originalTotal]);

  // Trigger game start automatically once loading is completed
  useEffect(() => {
    if (!loading && originalContributions.length > 0 && !isPlaying && !gameOver) {
      startGame(true);
    }
  }, [loading, originalContributions, isPlaying, gameOver, startGame]);

  const stopGame = () => {
    setIsPlaying(false);
    setIsAutoPlaying(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  };

  // Map contribution levels to color classes
  const getContributionColor = (level: number) => {
    switch (level) {
      case 0: return "bg-[#161b22] border-transparent";
      case 1: return "bg-[#0e4429] border-transparent";
      case 2: return "bg-[#006d32] border-transparent";
      case 3: return "bg-[#26a641] border-transparent";
      case 4: return "bg-[#39d353] border-transparent";
      default: return "bg-[#161b22] border-transparent";
    }
  };

  // Handle game tick
  const gameTick = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      let currentDir = direction;

      // AI solver pathfinding
      if (isAutoPlaying) {
        const nextDir = findNextMove(head, prevSnake, contributions);
        if (nextDir) {
          currentDir = nextDir;
          setDirection(nextDir);
        }
      }

      const nextHead = { x: head.x + currentDir.x, y: head.y + currentDir.y };

      // Wall collision
      if (nextHead.x < 0 || nextHead.x >= GRID_WIDTH || nextHead.y < 0 || nextHead.y >= GRID_HEIGHT) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Self collision
      if (prevSnake.some(cell => cell.x === nextHead.x && cell.y === nextHead.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [nextHead, ...prevSnake];

      // Check if nextHead hits a contribution block (eats a contribution!)
      const targetCell = contributions[nextHead.x]?.[nextHead.y];
      const hasContribution = targetCell && targetCell.l > 0;

      if (hasContribution) {
        // Sound effect
        if (soundEnabled) {
          try {
            const AudioContextClass = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
            if (AudioContextClass) {
              const ctx = new AudioContextClass();
              const osc = ctx.createOscillator();
              osc.type = "sine";
              osc.frequency.setValueAtTime(600, ctx.currentTime);
              osc.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.08);
            }
          } catch (e) {
            console.error(e);
          }
        }

        // Increment Score
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("github_snake_high_score", newScore.toString());
          }
          return newScore;
        });

        // "Eat" contribution: Update grid cell level back to 0
        let isBoardCleared = false;
        setContributions(prevContributions => {
          const updated = prevContributions.map(week => week.map(day => ({ ...day })));
          updated[nextHead.x][nextHead.y].l = 0;
          updated[nextHead.x][nextHead.y].c = 0;

          // Check if board is cleared
          const anyGreenLeft = updated.some(week => week.some(day => day.l > 0));
          if (!anyGreenLeft) {
            isBoardCleared = true;
          }
          return updated;
        });

        setTotalContributions(prev => Math.max(0, prev - 1));

        // If board cleared, auto-respawn level
        if (isBoardCleared) {
          setTimeout(() => {
            setContributions(originalContributions.map(week => week.map(day => ({ ...day }))));
            setTotalContributions(originalTotal);
          }, 150);
        }

        // Growth: we grow by not popping the tail
      } else {
        // Normal movement: pop the tail
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, isPlaying, gameOver, isAutoPlaying, contributions, soundEnabled, highScore, originalContributions, originalTotal]);

  // Set up game loop timer (200ms tick speed)
  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(gameTick, 200);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, gameTick]);

  // Keyboard controls (disables AI and starts manual takeover)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isPlaying) return;

    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "w", "a", "s", "d"].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }

    let isDirectionKey = false;
    let newDir = direction;

    switch (e.key.toLowerCase()) {
      case "arrowup":
      case "w":
        if (direction.y !== 1) {
          newDir = { x: 0, y: -1 };
          isDirectionKey = true;
        }
        break;
      case "arrowdown":
      case "s":
        if (direction.y !== -1) {
          newDir = { x: 0, y: 1 };
          isDirectionKey = true;
        }
        break;
      case "arrowleft":
      case "a":
        if (direction.x !== 1) {
          newDir = { x: -1, y: 0 };
          isDirectionKey = true;
        }
        break;
      case "arrowright":
      case "d":
        if (direction.x !== -1) {
          newDir = { x: 1, y: 0 };
          isDirectionKey = true;
        }
        break;
      case "escape":
        stopGame();
        break;
    }

    if (isDirectionKey) {
      setIsAutoPlaying(false);
      setDirection(newDir);
    }
  }, [direction, isPlaying]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Mobile button click handler
  const changeDirection = (x: number, y: number) => {
    if (!isPlaying) return;
    if (x !== 0 && direction.x === -x) return;
    if (y !== 0 && direction.y === -y) return;

    setIsAutoPlaying(false);
    setDirection({ x, y });
  };

  // Helper check methods
  const isSnakeCell = (x: number, y: number) => snake.some(cell => cell.x === x && cell.y === y);
  const isSnakeHead = (x: number, y: number) => snake.length > 0 && snake[0].x === x && snake[0].y === y;

  const formatDateString = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const renderMonthLabels = () => {
    const labels: { label: string; offset: number }[] = [];
    let lastMonth = -1;

    contributions.forEach((week, weekIdx) => {
      if (week[0]) {
        const date = new Date(week[0].d);
        const month = date.getMonth();
        if (month !== lastMonth && weekIdx < 50) {
          labels.push({
            label: date.toLocaleDateString("en-US", { month: "short" }),
            offset: weekIdx
          });
          lastMonth = month;
        }
      }
    });

    return (
      <div className="relative h-4 text-[10px] text-gh-500 font-medium mb-1 w-[680px]">
        {labels.map((item, idx) => (
          <span
            key={idx}
            className="absolute"
            style={{ left: `${item.offset * 12.8 + 24}px` }}
          >
            {item.label}
          </span>
        ))}
      </div>
    );
  };

  const handleCellHover = (e: React.MouseEvent, day: SimplifiedDay) => {
    if (isPlaying) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setActiveTooltip({
        day,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 38
      });
    }
  };

  return (
    <Card className="col-span-1 sm:col-span-2 lg:col-span-4 p-5 flex flex-col justify-between">
      <div ref={containerRef} className="relative flex flex-col w-full h-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#238636]/20 flex items-center justify-center text-emerald-400">
              <Github size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white">GitHub Contribution Arcade</h3>
                {isPlaying && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    isAutoPlaying 
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_6px_rgba(59,130,246,0.1)]"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_6px_rgba(16,185,129,0.1)]"
                  }`}>
                    {isAutoPlaying ? <Cpu size={10} className="animate-pulse" /> : <Play size={10} />}
                    {isAutoPlaying ? "AI Auto-Playing" : "Manual Play"}
                  </span>
                )}
              </div>
              <p className="text-gh-500 text-xs mt-0.5">
                {isAutoPlaying 
                  ? "🤖 AI is clearing contributions! Press WASD / Arrow keys to take control instantly." 
                  : "🎮 Use keyboard arrows or WASD to eat the remaining contributions."
                }
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center flex-wrap gap-4 text-xs font-semibold text-gh-400 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2">
            <div>
              Remaining Commits: <span className="text-emerald-400">{totalContributions}</span>
            </div>
            <div className="h-3 w-px bg-white/[0.08]" />
            <div>
              Score: <span className="text-primary">{score}</span>
            </div>
            <div className="h-3 w-px bg-white/[0.08]" />
            <div>
              High Score: <span className="text-accent">{highScore}</span>
            </div>
          </div>
        </div>

        {/* Calendar / Game Area Wrapper */}
        <div className="relative w-full overflow-x-auto scrollbar-none rounded-xl border border-white/[0.06] bg-black/40 p-4 min-h-[140px] flex flex-col justify-center items-center">
          
          {/* Custom Tooltip */}
          {activeTooltip && !isPlaying && (
            <div 
              className="absolute z-10 bg-[#161b22] border border-[#30363d] text-white text-[11px] px-2 py-1 rounded shadow-lg pointer-events-none transform -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${activeTooltip.x}px`, top: `${activeTooltip.y}px` }}
            >
              <div className="font-medium">
                <span className="text-emerald-400">{activeTooltip.day.c} commits</span> on {formatDateString(activeTooltip.day.d)}
              </div>
              <div className="w-2 h-2 bg-[#161b22] border-r border-b border-[#30363d] rotate-45 mt-1 -mb-2" />
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center gap-2 py-8">
              <div className="w-6 h-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
              <span className="text-xs text-gh-500 font-medium">Booting arcade...</span>
            </div>
          ) : (
            <div className="flex flex-col items-start select-none">
              
              {/* Months Row */}
              {renderMonthLabels()}

              <div className="flex gap-1.5 w-[680px]">
                {/* Day of Week Labels */}
                <div className="flex flex-col justify-between text-[9px] text-gh-500 h-[88px] pr-1 py-1 font-medium w-4 shrink-0">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* Contribution / Game Grid */}
                <div 
                  className="grid grid-rows-7 grid-flow-col gap-[2px] sm:gap-[3px]"
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  {contributions.map((week, weekIdx) => 
                    week.map((day, dayIdx) => {
                      const isSnake = isSnakeCell(weekIdx, dayIdx);
                      const isHead = isSnakeHead(weekIdx, dayIdx);

                      let cellClass = "";
                      if (isPlaying) {
                        if (isHead) {
                          cellClass = "bg-primary shadow-[0_0_8px_#58a6ff] scale-110 z-10 border-[#58a6ff] rounded-[3px]";
                        } else if (isSnake) {
                          cellClass = "bg-[#388bfd]/80 border-[#388bfd]/50 rounded-[2px]";
                        } else {
                          cellClass = getContributionColor(day.l) + " rounded-[2px]";
                        }
                      } else {
                        cellClass = getContributionColor(day.l) + " hover:scale-125 hover:z-10 hover:border-white/30 hover:shadow-[0_0_6px_rgba(255,255,255,0.2)] transition-all duration-100 rounded-[2px]";
                      }

                      return (
                        <div
                          key={`${weekIdx}-${dayIdx}`}
                          className={`w-[10px] h-[10px] sm:w-[11.2px] sm:h-[11.2px] border ${cellClass}`}
                          onMouseEnter={(e) => handleCellHover(e, day)}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-4 rounded-xl z-20 transition-all duration-300">
              <div className="text-center">
                <h4 className="text-accent text-lg font-bold uppercase tracking-wider mb-1">Game Over</h4>
                <p className="text-gh-400 text-xs mb-3">Score: <span className="text-white font-semibold">{score}</span></p>
                <div className="flex gap-2.5 justify-center">
                  <button
                    onClick={() => startGame(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-emerald-950/20"
                  >
                    <RotateCcw size={13} />
                    Auto Play Again
                  </button>
                  <button
                    onClick={() => startGame(false)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-blue-950/20"
                  >
                    <Play size={13} />
                    Play Manually
                  </button>
                  <button
                    onClick={() => { setGameOver(false); setIsPlaying(false); }}
                    className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] text-gh-200 border border-white/[0.06] rounded-lg text-xs font-semibold transition-colors"
                  >
                    Back to Grid
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-5">
          {/* Sound / Instructions */}
          <div className="flex items-center gap-3">
            {!isPlaying ? (
              <div className="flex items-center gap-1.5 text-xs text-gh-500 font-medium">
                <Keyboard size={14} className="text-gh-400" />
                <span>Interactive grid loaded. Auto-play runs by default.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-lg text-xs text-gh-400 hover:text-gh-200 transition-colors"
                >
                  {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  <span>Sound: {soundEnabled ? "On" : "Off"}</span>
                </button>
                
                {/* AI / Manual Toggle Button */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors ${
                    isAutoPlaying 
                      ? "bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border-emerald-500/20"
                      : "bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {isAutoPlaying ? <Keyboard size={13} /> : <Cpu size={13} />}
                  <span>{isAutoPlaying ? "Take Control (Manual)" : "Let AI Play"}</span>
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!isPlaying ? (
              <>
                <button
                  onClick={() => startGame(true)}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-emerald-300/50 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-emerald-950/20"
                >
                  <Cpu size={13} />
                  Let AI Play
                </button>
                <button
                  onClick={() => startGame(false)}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-blue-300/50 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-blue-950/20"
                >
                  <Play size={13} />
                  Manual Play
                </button>
              </>
            ) : (
              <button
                onClick={stopGame}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.06] text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <RotateCcw size={13} />
                Stop and Reset Grid
              </button>
            )}
          </div>
        </div>

        {/* Mobile Control Pad - Rendered only when active */}
        {isPlaying && !isAutoPlaying && (
          <div className="flex flex-col items-center justify-center mt-5 md:hidden select-none">
            <div className="grid grid-cols-3 gap-2 w-36">
              <div />
              <button
                onTouchStart={() => changeDirection(0, -1)}
                className="h-10 w-10 flex items-center justify-center bg-white/[0.05] border border-white/[0.1] active:bg-primary/20 active:border-primary/50 text-white rounded-lg active:scale-95 transition-all"
              >
                <ChevronUp size={18} />
              </button>
              <div />

              <button
                onTouchStart={() => changeDirection(-1, 0)}
                className="h-10 w-10 flex items-center justify-center bg-white/[0.05] border border-white/[0.1] active:bg-primary/20 active:border-primary/50 text-white rounded-lg active:scale-95 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="h-10 w-10 flex items-center justify-center text-[10px] font-bold text-gh-600">🎮</div>
              <button
                onTouchStart={() => changeDirection(1, 0)}
                className="h-10 w-10 flex items-center justify-center bg-white/[0.05] border border-white/[0.1] active:bg-primary/20 active:border-primary/50 text-white rounded-lg active:scale-95 transition-all"
              >
                <ChevronRight size={18} />
              </button>

              <div />
              <button
                onTouchStart={() => changeDirection(0, 1)}
                className="h-10 w-10 flex items-center justify-center bg-white/[0.05] border border-white/[0.1] active:bg-primary/20 active:border-primary/50 text-white rounded-lg active:scale-95 transition-all"
              >
                <ChevronDown size={18} />
              </button>
              <div />
            </div>
          </div>
        )}

      </div>
    </Card>
  );
}
