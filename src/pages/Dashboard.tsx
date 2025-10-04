import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain, FileText, Search, LogOut, Plus, History } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole] = useState<"free" | "premium">("free");
  const [userName, setUserName] = useState("Guest User");
  const [userEmail, setUserEmail] = useState("");
  const contractsUsed = 0;
  const contractLimit = userRole === "free" ? 2 : Infinity;

  useEffect(() => {
    // Get user info from localStorage (temporary until auth is connected)
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name || "Guest User");
        setUserEmail(user.email || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle animate-fade-in">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Brain className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              LegalMate AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" alt={userName} />
                <AvatarFallback className="bg-accent/10 text-accent">
                  {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">{userName}</p>
                {userEmail && <p className="text-xs text-muted-foreground">{userEmail}</p>}
                <p className="text-xs text-muted-foreground">Plan: <span className="capitalize">{userRole}</span></p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-6 animate-slide-up">
          <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground">
            {userRole === "free"
              ? `You have ${contractLimit - contractsUsed} contracts remaining this month`
              : "Unlimited contracts available"}
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer animate-slide-up stagger-1" onClick={() => navigate("/draft")}>
            <CardHeader>
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Draft Contract</CardTitle>
              <CardDescription>
                Create a new contract with AI assistance. Choose from templates and customize to your needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-accent">
                <Plus className="mr-2 h-4 w-4" />
                Start Drafting
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer animate-slide-up stagger-2" onClick={() => navigate("/review")}>
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Review Contract</CardTitle>
              <CardDescription>
                Upload an existing contract for AI-powered review. Get insights on risks and missing clauses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Start Review
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Contracts */}
        <Card className="animate-slide-up stagger-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Recent Contracts</CardTitle>
            </div>
            <CardDescription>Your contract history will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No contracts yet. Start by drafting or reviewing your first contract!</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
