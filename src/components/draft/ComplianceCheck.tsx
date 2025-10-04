import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { Clause } from "./ClauseLibrary";

interface ComplianceCheckProps {
  selectedClauses: Clause[];
}

const mandatoryClauses = [
  { id: "confidentiality", title: "Confidentiality" },
  { id: "termination", title: "Termination" },
  { id: "governing", title: "Governing Law" },
];

export const ComplianceCheck = ({ selectedClauses }: ComplianceCheckProps) => {
  const missingClauses = mandatoryClauses.filter(
    (mandatory) => !selectedClauses.find((clause) => clause.id === mandatory.id)
  );

  const isCompliant = missingClauses.length === 0;

  return (
    <Card className={isCompliant ? "bg-green-50 dark:bg-green-950/20" : "bg-yellow-50 dark:bg-yellow-950/20"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className={`h-5 w-5 ${isCompliant ? "text-green-600" : "text-yellow-600"}`} />
          Compliance Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isCompliant ? (
          <div className="flex items-start gap-2 text-green-700 dark:text-green-400">
            <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">All mandatory clauses included</p>
              <p className="text-xs mt-1 opacity-80">Your contract meets basic compliance requirements</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-yellow-700 dark:text-yellow-400">
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Missing mandatory clauses</p>
                <p className="text-xs mt-1 opacity-80">Add these clauses for better legal protection:</p>
              </div>
            </div>
            <ul className="ml-7 space-y-1">
              {missingClauses.map((clause) => (
                <li key={clause.id} className="text-sm text-yellow-700 dark:text-yellow-400">
                  • {clause.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
