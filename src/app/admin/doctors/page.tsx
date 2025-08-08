"use client";
import NavBar from "@/components/navBar";
import { columns, Doctor } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"



export default function DoctorsList() {
 
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    const fetchDoctors = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecg-anomaly-detection-backend-2.onrender.com';

      try {
        const res = await fetch(`${API_URL}/api/admin/doctors`, {
        credentials: "include", // Important
      });
    
        console.log("Response status:", res.status); // Ajouté
        if (!res.ok) {
          const text = await res.text(); // Récupérer le HTML si erreur
          console.error("Response error text:", text);
          throw new Error(`HTTP error ${res.status}`);
        }
        const data = await res.json()
        console.log("Fetched data:", data);

        

        setDoctors(data.doctors)
      } catch (error) {
        console.error("Error fetching doctors:", error)
      } finally {

      }
    }

    fetchDoctors()
  }, [])

  return (
    <>
    <NavBar />
    <div className="container mx-auto py-20">
        
      {/* Titre et barre de recherche */}
      
      <div className="table-auto mx-auto mt-5" style={{width: "90%"}} >
        <DataTable columns={columns} data={doctors} />
      </div>
    </div>
    
    </>
  );
}