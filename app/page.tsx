"use client";

import FormCard from "@/components/formCard/FormCard";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";

export default function HomePage() {

  return (
    <main >
       <Navbar />
       <FormCard />
      
    </main>
  );
}
