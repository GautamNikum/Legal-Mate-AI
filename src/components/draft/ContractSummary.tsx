import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ContractSummaryProps {
  summary: string;
}

export const ContractSummary = ({ summary }: ContractSummaryProps) => {
  if (!summary) return null;

  return (
    <Card className="bg-accent/5 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <FileText className="h-5 w-5" />
          Contract Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{summary}</p>
      </CardContent>
    </Card>
  );
};
