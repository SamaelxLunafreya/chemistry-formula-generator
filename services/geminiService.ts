import { GoogleGenAI, Type } from "@google/genai";
import type { SynthesisInstruction } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    compoundName: { type: Type.STRING, description: "Nazwa syntetyzowanego związku chemicznego." },
    introduction: { type: Type.STRING, description: "Krótkie wprowadzenie lub opis związku." },
    safetyWarnings: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista kluczowych ostrzeżeń dotyczących bezpieczeństwa, w tym wymagane środki ochrony osobistej i zagrożenia."
    },
    requiredReagents: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          quantity: { type: Type.STRING }
        },
        required: ["name", "quantity"]
      },
      description: "Lista wymaganych odczynników chemicznych wraz z ich ilościami."
    },
    requiredEquipment: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista wymaganego sprzętu laboratoryjnego."
    },
    procedure: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER },
          description: { type: Type.STRING },
          explanation: { type: Type.STRING, description: "Wyjaśnienie terminów technicznych (np. TLC, rekrystalizacja) użytych w opisie kroku, jeśli występują. Przeznaczone dla osób początkujących." }
        },
        required: ["step", "description"]
      },
      description: "Szczegółowa procedura syntezy krok po kroku."
    }
  },
  required: ["compoundName", "introduction", "safetyWarnings", "requiredReagents", "requiredEquipment", "procedure"]
};


export async function generateSynthesisInstructions(compoundName: string): Promise<SynthesisInstruction> {
  const prompt = `
    Wygeneruj profesjonalną, ale zrozumiałą instrukcję syntezy chemicznej dla związku: "${compoundName}".
    Odpowiedź MUSI być w formacie JSON zgodnym z podanym schematem.
    Instrukcja powinna być szczegółowa i zawierać następujące sekcje:
    1.  **Wprowadzenie**: Krótki opis związku.
    2.  **Ostrzeżenia dotyczące bezpieczeństwa**: Absolutnie kluczowe i bardzo wyraźne ostrzeżenia. Podkreśl, że wszystkie czynności muszą być wykonywane w profesjonalnym laboratorium, pod nadzorem wykwalifikowanego chemika i z użyciem odpowiednich środków ochrony osobistej (okulary, rękawice, fartuch, wyciąg). Wymień specyficzne zagrożenia związane z odczynnikami i procedurą.
    3.  **Wymagane odczynniki**: Lista wszystkich potrzebnych chemikaliów z przykładowymi ilościami.
    4.  **Wymagany sprzęt**: Lista niezbędnego sprzętu laboratoryjnego.
    5.  **Procedura krok po kroku**: Szczegółowy opis każdego etapu syntezy, napisany w sposób jasny i jednoznaczny.
    
    BARDZO WAŻNE: Dla każdego kroku w procedurze, jeśli używany jest techniczny termin (np. 'analiza TLC', 'refluks', 'krystalizacja', 'łaźnia wodna'), dodaj proste, zrozumiałe dla laika wyjaśnienie tego terminu w polu 'explanation'. Na przykład, dla 'analiza TLC', wyjaśnienie powinno tłumaczyć, czym jest chromatografia cienkowarstwowa i jak pozwala monitorować postęp reakcji.

    Informacje te są przeznaczone wyłącznie do celów edukacyjnych i teoretycznych. Nigdy nie należy podejmować prób syntezy chemicznej bez odpowiedniego przeszkolenia, sprzętu i nadzoru.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Walidacja czy otrzymane dane pasują do typu
    if (isSynthesisInstruction(parsedData)) {
        return parsedData;
    } else {
        throw new Error("Otrzymane dane JSON nie pasują do oczekiwanej struktury.");
    }

  } catch (error) {
    console.error("Błąd podczas komunikacji z Gemini API:", error);
    throw new Error("Nie udało się przetworzyć odpowiedzi z API.");
  }
}

// Funkcja sprawdzająca typ, aby upewnić się, że sparsowany JSON ma właściwą strukturę
function isSynthesisInstruction(obj: any): obj is SynthesisInstruction {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.compoundName === 'string' &&
        typeof obj.introduction === 'string' &&
        Array.isArray(obj.safetyWarnings) &&
        Array.isArray(obj.requiredReagents) &&
        Array.isArray(obj.requiredEquipment) &&
        Array.isArray(obj.procedure)
    );
}