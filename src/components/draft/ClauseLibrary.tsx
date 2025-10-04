import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

export interface Clause {
  id: string;
  title: string;
  content: string;
  isCustom?: boolean;
}

const predefinedClauses: Clause[] = [
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: "Each party agrees to maintain the confidentiality of all proprietary information disclosed during the term of this agreement and shall not disclose such information to any third party without prior written consent.",
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: "Payment shall be made within 30 days of invoice date. Late payments will incur a fee of 1.5% per month. All payments shall be made in the agreed currency via bank transfer.",
  },
  {
    id: "termination",
    title: "Termination",
    content: "Either party may terminate this agreement with 30 days written notice. Upon termination, all outstanding obligations must be fulfilled and all confidential materials returned.",
  },
  {
    id: "governing",
    title: "Governing Law",
    content: "This agreement shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.",
  },
];

interface ClauseLibraryProps {
  selectedClauses: Clause[];
  onClausesChange: (clauses: Clause[]) => void;
}

export const ClauseLibrary = ({ selectedClauses, onClausesChange }: ClauseLibraryProps) => {
  const [editingClause, setEditingClause] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const addClause = (clause: Clause) => {
    if (selectedClauses.find(c => c.id === clause.id)) {
      toast.error("Clause already added");
      return;
    }
    onClausesChange([...selectedClauses, clause]);
    toast.success(`${clause.title} added`);
  };

  const removeClause = (clauseId: string) => {
    onClausesChange(selectedClauses.filter(c => c.id !== clauseId));
    toast.success("Clause removed");
  };

  const startEdit = (clause: Clause) => {
    setEditingClause(clause.id);
    setEditContent(clause.content);
  };

  const saveEdit = (clauseId: string) => {
    onClausesChange(
      selectedClauses.map(c => 
        c.id === clauseId ? { ...c, content: editContent } : c
      )
    );
    setEditingClause(null);
    toast.success("Clause updated");
  };

  const cancelEdit = () => {
    setEditingClause(null);
    setEditContent("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Clause Library</CardTitle>
          <CardDescription>Select clauses to include in your contract</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {predefinedClauses.map((clause) => {
            const isAdded = selectedClauses.find(c => c.id === clause.id);
            return (
              <div key={clause.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{clause.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{clause.content}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={isAdded ? "secondary" : "default"}
                    onClick={() => addClause(clause)}
                    disabled={!!isAdded}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {selectedClauses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Clauses</CardTitle>
            <CardDescription>Edit or remove clauses as needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedClauses.map((clause) => (
              <div key={clause.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-sm">{clause.title}</h4>
                  <div className="flex gap-1">
                    {editingClause === clause.id ? (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => saveEdit(clause.id)}>
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={cancelEdit}>
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => startEdit(clause)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => removeClause(clause.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                {editingClause === clause.id ? (
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                    className="text-sm"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{clause.content}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
