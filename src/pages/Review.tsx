import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Brain, ArrowLeft, Upload, Loader2, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Review = () => {
  const navigate = useNavigate();
  const [contractText, setContractText] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResults, setReviewResults] = useState<any>(null);

  const handleReview = async () => {
    if (!contractText.trim()) {
      toast.error("Please provide contract text to review");
      return;
    }

    setIsReviewing(true);

    // Simulate AI review - will be connected to Lovable AI
    setTimeout(() => {
      const mockResults = {
        summary: "This contract has been analyzed for completeness, risk factors, and potential improvements.",
        missingClauses: [
          {
            title: "Confidentiality Clause",
            description: "No explicit confidentiality provisions found. Consider adding protections for sensitive information."
          },
          {
            title: "Dispute Resolution",
            description: "Missing clear dispute resolution mechanism. Consider adding arbitration or mediation clauses."
          },
          {
            title: "Termination Notice Period",
            description: "No specific notice period for termination mentioned."
          }
        ],
        riskyTerms: [
          {
            title: "Unlimited Liability",
            description: "The contract contains unlimited liability provisions which could expose parties to significant risk.",
            location: "Section 4.2",
            severity: "high"
          },
          {
            title: "Vague Payment Terms",
            description: "Payment terms lack specificity regarding due dates and late payment penalties.",
            location: "Section 2.1",
            severity: "medium"
          }
        ],
        suggestions: [
          {
            title: "Add Force Majeure Clause",
            description: "Include provisions for unforeseen circumstances that prevent contract fulfillment."
          },
          {
            title: "Clarify Intellectual Property Rights",
            description: "Explicitly define ownership of any intellectual property created during the contract period."
          },
          {
            title: "Include Severability Clause",
            description: "Add a clause to ensure remaining provisions stay valid if one is found unenforceable."
          }
        ]
      };

      setReviewResults(mockResults);
      setIsReviewing(false);
      toast.success("Contract review completed!");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                LegalMate AI
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Contract</h1>
          <p className="text-muted-foreground">
            Upload or paste your contract text for AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Text</CardTitle>
                <CardDescription>
                  Paste your contract text or upload a file
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your contract text here..."
                  rows={15}
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  className="font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload File
                  </Button>
                  <Button
                    onClick={handleReview}
                    disabled={isReviewing || !contractText.trim()}
                    className="flex-1 bg-gradient-accent"
                  >
                    {isReviewing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Reviewing...
                      </>
                    ) : (
                      "Review Contract"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {reviewResults ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-accent" />
                      Missing Clauses
                    </CardTitle>
                    <CardDescription>Important provisions not found in the contract</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {reviewResults.missingClauses.map((clause: any, idx: number) => (
                      <div key={idx} className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                        <h4 className="font-semibold text-sm mb-1">{clause.title}</h4>
                        <p className="text-xs text-muted-foreground">{clause.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Risky Terms
                    </CardTitle>
                    <CardDescription>Potentially problematic clauses identified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {reviewResults.riskyTerms.map((term: any, idx: number) => (
                      <div key={idx} className={`p-3 border rounded-lg ${
                        term.severity === 'high' 
                          ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
                          : 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
                      }`}>
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-sm">{term.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            term.severity === 'high'
                              ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                              : 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                          }`}>
                            {term.severity}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{term.description}</p>
                        <p className="text-xs text-muted-foreground font-medium">Location: {term.location}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      Suggestions
                    </CardTitle>
                    <CardDescription>Recommended improvements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {reviewResults.suggestions.map((suggestion: any, idx: number) => (
                      <div key={idx} className="p-3 bg-muted rounded-lg">
                        <h4 className="font-semibold text-sm mb-1">{suggestion.title}</h4>
                        <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button className="w-full bg-gradient-accent">
                  Save Review Results
                </Button>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-16 text-muted-foreground">
                  <Brain className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Paste contract text and click Review to start analysis</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Review;
