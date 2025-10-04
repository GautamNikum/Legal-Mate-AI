import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Brain, ArrowLeft, FileText, Loader2, Download, Copy, Save } from "lucide-react";
import { toast } from "sonner";
import { ClauseLibrary, Clause } from "@/components/draft/ClauseLibrary";
import { LanguageSelector, Language } from "@/components/draft/LanguageSelector";
import { ContractSummary } from "@/components/draft/ContractSummary";
import { ComplianceCheck } from "@/components/draft/ComplianceCheck";
import { parseAdditionalInfo, formatContract } from "@/utils/contractParser";
import { exportContractToPDF } from "@/utils/pdfExport";

const contractTypes = [
  {
    value: "nda",
    label: "Non-Disclosure Agreement (NDA)",
    description: "Protect confidential information between parties"
  },
  {
    value: "service",
    label: "Service Agreement",
    description: "Define terms for service provision"
  },
  {
    value: "lease",
    label: "Lease Agreement",
    description: "Rental agreement for property or equipment"
  }
];

const Draft = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState("");
  const [selectedClauses, setSelectedClauses] = useState<Clause[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");
  const [contractSummary, setContractSummary] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleGenerate = async () => {
    if (!selectedType) {
      toast.error("Please select a contract type");
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation with language and clauses support
    setTimeout(() => {
      const isHindi = selectedLanguage === "hindi";
      const contractTypeName = contractTypes.find(t => t.value === selectedType)?.label;
      
      // Parse additional information to extract structured data
      const parsedDetails = parseAdditionalInfo(additionalInfo);
      
      // Build clauses section
      let clausesSection = "";
      if (selectedClauses.length > 0) {
        selectedClauses.forEach((clause, index) => {
          clausesSection += `\n${index + 1}. ${clause.title.toUpperCase()}\n   ${clause.content}\n`;
        });
      }

      const mockContract = isHindi ? `
[${contractTypeName}]

यह समझौता ${parsedDetails.effectiveDate} को निम्नलिखित पक्षों के बीच किया गया है:

पक्ष A: ${parsedDetails.partyA || '[कंपनी/व्यक्ति का नाम]'}
पक्ष B: ${parsedDetails.partyB || '[कंपनी/व्यक्ति का नाम]'}

प्रभावी तिथि: ${parsedDetails.effectiveDate}
${parsedDetails.duration ? `अनुबंध अवधि: ${parsedDetails.duration}` : ''}
${parsedDetails.endDate ? `समाप्ति तिथि: ${parsedDetails.endDate}` : ''}

जबकि, पक्ष इस समझौते में प्रवेश करना चाहते हैं...

परिभाषाएं:
"गोपनीय जानकारी" का अर्थ है...
"प्रभावी तिथि" का अर्थ है ${parsedDetails.effectiveDate}

नियम और शर्तें:
${parsedDetails.paymentTerms ? `भुगतान शर्तें: ${parsedDetails.paymentTerms}` : 'भुगतान चालान तिथि के 30 दिनों के भीतर किया जाएगा।'}
पक्ष सहमत हैं कि...
इस समझौते के तहत सभी दायित्व...
${clausesSection}

साक्षी के रूप में, पक्षों ने इस समझौते पर हस्ताक्षर किए हैं।

_____________________     _____________________
पक्ष A हस्ताक्षर          पक्ष B हस्ताक्षर

हस्ताक्षर तिथि: ${parsedDetails.effectiveDate}
      `.trim() : `
[${contractTypeName}]

THIS AGREEMENT is made on ${parsedDetails.effectiveDate} between:

Party A: ${parsedDetails.partyA || '[Company/Individual Name]'}
Party B: ${parsedDetails.partyB || '[Company/Individual Name]'}

Effective Date: ${parsedDetails.effectiveDate}
${parsedDetails.duration ? `Contract Duration: ${parsedDetails.duration}` : ''}
${parsedDetails.endDate ? `Termination Date: ${parsedDetails.endDate}` : ''}

WHEREAS, the parties wish to enter into this agreement...

1. DEFINITIONS
   1.1 "Confidential Information" means...
   1.2 "Effective Date" means ${parsedDetails.effectiveDate}

2. TERMS AND CONDITIONS
   ${parsedDetails.paymentTerms ? `2.1 Payment Terms: ${parsedDetails.paymentTerms}` : '2.1 Payment shall be made within 30 days of invoice date.'}
   2.2 The parties agree to...
   2.3 All obligations under this agreement...
${clausesSection}

IN WITNESS WHEREOF, the parties have executed this agreement.

_____________________     _____________________
Party A Signature         Party B Signature

Date of Signature: ${parsedDetails.effectiveDate}
      `.trim();

      setGeneratedContract(mockContract);
      setContractSummary(
        isHindi 
          ? `यह ${contractTypeName} ${parsedDetails.partyA || 'पक्ष A'} और ${parsedDetails.partyB || 'पक्ष B'} के बीच एक कानूनी समझौता स्थापित करता है। ${parsedDetails.duration ? `अनुबंध की अवधि ${parsedDetails.duration} है और यह ${parsedDetails.endDate} को समाप्त होगा। ` : ''}${selectedClauses.length > 0 ? `इसमें ${selectedClauses.map(c => c.title).join(', ')} शामिल हैं।` : 'इसमें मानक शर्तें शामिल हैं।'}`
          : `This ${contractTypeName} establishes a legal agreement between ${parsedDetails.partyA || 'Party A'} and ${parsedDetails.partyB || 'Party B'}. ${parsedDetails.duration ? `The contract duration is ${parsedDetails.duration} and will terminate on ${parsedDetails.endDate}. ` : ''}${selectedClauses.length > 0 ? `It incorporates ${selectedClauses.map(c => c.title).join(', ')}.` : 'It includes standard terms.'}`
      );
      setIsGenerating(false);
      setIsEditing(false);
      toast.success("Contract generated successfully!");
    }, 2000);
  };

  const handleCopyToClipboard = async () => {
    if (!generatedContract) {
      toast.error("No contract to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedContract);
      toast.success("Contract copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleSaveContract = () => {
    if (!generatedContract) {
      toast.error("No contract to save");
      return;
    }

    // Save to localStorage
    const savedContracts = JSON.parse(localStorage.getItem("savedContracts") || "[]");
    const newContract = {
      id: Date.now(),
      type: selectedType,
      content: generatedContract,
      createdAt: new Date().toISOString(),
    };
    savedContracts.push(newContract);
    localStorage.setItem("savedContracts", JSON.stringify(savedContracts));
    
    toast.success("Contract saved successfully!");
  };

  const handleExportPDF = () => {
    if (!generatedContract) {
      toast.error("No contract to export");
      return;
    }

    const contractType = contractTypes.find(t => t.value === selectedType)?.label || 'Contract';
    const filename = `${contractType.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    exportContractToPDF(generatedContract, filename);
    toast.success("Contract exported as PDF!");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle animate-fade-in">
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
        <div className="mb-6 animate-slide-up">
          <h1 className="text-3xl font-bold mb-2">Draft New Contract</h1>
          <p className="text-muted-foreground">
            Select a contract type and let AI generate a professional draft for you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6 animate-slide-in">
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
            <Card>
              <CardHeader>
                <CardTitle>Select Contract Type</CardTitle>
                <CardDescription>Choose the type of contract you want to create</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contractTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-accent ${
                      selectedType === type.value ? "border-accent bg-accent/5" : ""
                    }`}
                    onClick={() => setSelectedType(type.value)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <div
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                            selectedType === type.value ? "border-accent" : "border-muted"
                          }`}
                        >
                          {selectedType === type.value && (
                            <div className="h-3 w-3 rounded-full bg-accent" />
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{type.label}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <ClauseLibrary 
              selectedClauses={selectedClauses}
              onClausesChange={setSelectedClauses}
            />

            <ComplianceCheck selectedClauses={selectedClauses} />

            <Card>
              <CardHeader>
                <CardTitle>Additional Information (Optional)</CardTitle>
                <CardDescription>
                  Provide any specific details or requirements for your contract
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={`E.g.:\nParty A: ABC Corporation\nParty B: XYZ Ltd\nDuration: 6 months\nPayment Terms: Net 30 days via bank transfer`}
                  rows={6}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Tip: Include party names, duration, and payment terms for auto-fill
                </p>
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedType}
              className="w-full bg-gradient-accent"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Contract...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-5 w-5" />
                  Generate Contract
                </>
              )}
            </Button>
          </div>

          {/* Output Section */}
          <Card className="lg:sticky lg:top-24 h-fit animate-slide-in stagger-1">
            <CardHeader>
              <CardTitle>Generated Contract</CardTitle>
              <CardDescription>
                Your AI-generated contract will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedContract ? (
                <div className="space-y-4">
                  <ContractSummary summary={contractSummary} />
                  <div className="bg-muted p-4 rounded-lg max-h-[600px] overflow-y-auto">
                    {isEditing ? (
                      <Textarea
                        value={generatedContract}
                        onChange={(e) => setGeneratedContract(e.target.value)}
                        rows={20}
                        className="font-mono text-sm"
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedContract}
                      </pre>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Preview' : 'Edit'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCopyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm" 
                      onClick={handleSaveContract}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button 
                      className="bg-gradient-accent flex-1"
                      size="sm"
                      onClick={handleExportPDF}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Select a contract type and click Generate to start</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Draft;
