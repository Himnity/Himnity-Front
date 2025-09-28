import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const label = mounted ? (language === "en" ? "EN" : "AR") : "EN";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 font-semibold tracking-wide"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  );
};
