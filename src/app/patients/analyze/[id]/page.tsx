import AnalyzeECGClient from "./AnalyzeECGClient";
import { use } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AnalyzePage({ params }: PageProps) {
  // Use the `use` hook to unwrap the Promise
  const { id } = use(params);

  return (
     <div className="container mx-auto py-20">
        <AnalyzeECGClient patientId={id} />
      </div>
    )
}
