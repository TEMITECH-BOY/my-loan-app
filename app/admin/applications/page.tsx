import { Suspense } from "react";
import ApplicationsContent from "./applicationsContent";

export default function ApplicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground">
          Loading applications...
        </div>
      }
    >
      <ApplicationsContent />
    </Suspense>
  );
}
