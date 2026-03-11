import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Trophy, ArrowRight, RefreshCcw, Home } from "lucide-react";
import { useQuestions, useSubmitAnswer } from "@/hooks/use-questions";
import { PlayfulButton } from "@/components/PlayfulButton";
import { clsx } from "clsx";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const { data: questions, isLoading, error } = useQuestions();
  const { mutateAsync: submitAnswer, isPending: isSubmitting } = useSubmitAnswer();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ correct: boolean; correctAnswer: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Trigger confetti on finish if score is good
  useEffect(() => {
    if (isFinished && questions && score >= questions.length / 2) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#6366f1', '#ec4899', '#f59e0b', '#22c55e']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6366f1', '#ec4899', '#f59e0b', '#22c55e']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isFinished, questions, score]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-8 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    );
  }

  if (error || !questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="glass-card p-8 rounded-[2rem] text-center max-w-md w-full">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl mb-2">Oops! Something went wrong.</h2>
          <p className="text-muted-foreground mb-6">We couldn't load the questions right now.</p>
          <PlayfulButton onClick={() => window.location.reload()}>Try Again</PlayfulButton>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSelectOption = (option: string) => {
    if (isAnswered || isSubmitting) return;
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (!selectedOption || isAnswered) return;

    try {
      const result = await submitAnswer({ id: question.id, answer: selectedOption });
      setSubmissionResult(result);
      setIsAnswered(true);
      if (result.correct) {
        setScore((prev) => prev + 1);
        // Micro-interaction for correct
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#4ade80']
        });
      }
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setSubmissionResult(null);
    } else {
      setIsFinished(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setSubmissionResult(null);
    setIsFinished(false);
  };

  // Option Styling Logic
  const getOptionClasses = (option: string) => {
    const isSelected = selectedOption === option;
    
    // Default / Hover states when not answered yet
    if (!isAnswered) {
      return clsx(
        "border-2 text-left p-4 sm:p-6 rounded-2xl transition-all duration-200 cursor-pointer font-sans font-semibold text-lg flex items-center justify-between",
        isSelected 
          ? "border-primary bg-primary/10 shadow-[0_4px_0_0_#6366f1] transform -translate-y-1" 
          : "border-border bg-white shadow-[0_4px_0_0_#e2e8f0] hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-1 hover:shadow-[0_6px_0_0_#e2e8f0]"
      );
    }

    // After Answered: Show Correct / Incorrect colors
    const isCorrectAnswer = submissionResult?.correctAnswer === option;
    
    if (isCorrectAnswer) {
      return "border-2 border-green-500 bg-green-50 text-green-900 text-left p-4 sm:p-6 rounded-2xl font-sans font-bold text-lg flex items-center justify-between shadow-sm scale-[1.02] transition-transform";
    }

    if (isSelected && !submissionResult?.correct) {
      return "border-2 border-red-500 bg-red-50 text-red-900 text-left p-4 sm:p-6 rounded-2xl font-sans font-bold text-lg flex items-center justify-between shadow-sm opacity-90";
    }

    // Unselected and incorrect options just fade out slightly
    return "border-2 border-border bg-gray-50 text-muted-foreground text-left p-4 sm:p-6 rounded-2xl font-sans font-medium text-lg flex items-center justify-between opacity-50 cursor-not-allowed";
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Good effort!";
    if (percentage === 100) message = "Perfect Score!";
    else if (percentage >= 80) message = "Amazing Job!";
    else if (percentage >= 50) message = "Not bad!";

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.6 }}
          className="glass-card max-w-md w-full p-10 rounded-[2.5rem] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-br from-accent to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-accent/40"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-4xl text-primary mb-2">{message}</h2>
          <p className="text-muted-foreground font-sans text-lg mb-8">
            You scored <span className="font-bold text-foreground">{score}</span> out of {questions.length}!
          </p>

          <div className="space-y-4">
            <PlayfulButton variant="primary" size="lg" className="w-full" onClick={handlePlayAgain}>
              <RefreshCcw className="w-5 h-5 mr-2" /> Play Again
            </PlayfulButton>
            <PlayfulButton variant="outline" size="lg" className="w-full" onClick={() => setLocation("/")}>
              <Home className="w-5 h-5 mr-2" /> Back to Home
            </PlayfulButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto p-4 sm:p-8">
      {/* Header & Progress */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex-1 mr-8">
          <div className="flex justify-between font-sans font-bold text-sm text-primary mb-2">
            <span>Question {currentIndex + 1}</span>
            <span>{questions.length} Total</span>
          </div>
          <div className="h-4 bg-primary/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary rounded-full"
              initial={{ width: `${((currentIndex) / questions.length) * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl font-bold text-lg shadow-sm border border-border flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" /> {score}
        </div>
      </header>

      {/* Main Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="flex-1 flex flex-col"
        >
          <div className="bg-white border border-border/50 shadow-xl shadow-primary/5 rounded-[2rem] p-6 sm:p-10 mb-8 relative">
            {/* Decorative quote marks */}
            <span className="absolute text-8xl font-serif text-primary/10 -top-4 left-4 select-none">"</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground leading-snug relative z-10">
              {question.question}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {question.options.map((option, idx) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSelectOption(option)}
                disabled={isAnswered || isSubmitting}
                className={getOptionClasses(option)}
              >
                <span>{option}</span>
                
                {/* Result Icons */}
                {isAnswered && submissionResult?.correctAnswer === option && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </motion.div>
                )}
                {isAnswered && selectedOption === option && !submissionResult?.correct && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <XCircle className="w-6 h-6 text-red-600" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          <div className="mt-auto flex justify-end">
            {!isAnswered ? (
              <PlayfulButton
                variant={selectedOption ? "primary" : "outline"}
                size="lg"
                disabled={!selectedOption || isSubmitting}
                isLoading={isSubmitting}
                onClick={handleSubmit}
                className="w-full sm:w-auto min-w-[200px]"
              >
                Submit Answer
              </PlayfulButton>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full sm:w-auto"
              >
                <PlayfulButton
                  variant="secondary"
                  size="lg"
                  onClick={handleNext}
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  {currentIndex < questions.length - 1 ? "Next Question" : "See Results"} 
                  <ArrowRight className="w-5 h-5 ml-2" />
                </PlayfulButton>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
