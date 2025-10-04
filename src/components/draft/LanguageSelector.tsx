import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages } from "lucide-react";

export type Language = "english" | "hindi";

const languages = [
  { value: "english" as Language, label: "English", flag: "🇬🇧" },
  { value: "hindi" as Language, label: "हिंदी (Hindi)", flag: "🇮🇳" },
];

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          Contract Language
        </CardTitle>
        <CardDescription>Choose the language for your contract</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {languages.map((lang) => (
          <div
            key={lang.value}
            className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-accent ${
              selectedLanguage === lang.value ? "border-accent bg-accent/5" : ""
            }`}
            onClick={() => onLanguageChange(lang.value)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex items-center gap-2">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    selectedLanguage === lang.value ? "border-accent" : "border-muted"
                  }`}
                >
                  {selectedLanguage === lang.value && (
                    <div className="h-3 w-3 rounded-full bg-accent" />
                  )}
                </div>
                <span className="font-medium">{lang.label}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
