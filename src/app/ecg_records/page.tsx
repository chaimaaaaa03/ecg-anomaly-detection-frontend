"use client";

import { columns, Records } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"
import NavBarPatient from "@/components/navBarPatient";



export default function RecordsList() {
 
  const [records, setRecords] = useState<Records[]>([])

  useEffect(() => {
    const fetchRecords = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecg-anomaly-detection-backend-2.onrender.com';
      try {
        const res = await fetch(`${API_URL}/api/ecg_records`,{
          credentials: "include",
        });
        
        const data = await res.json()
        console.log("Fetched data:", data);

        

        setRecords(data.records)
      } catch (error) {
        console.error("Error fetching records:", error)
      } finally {

      }
    }

    fetchRecords()
  }, [])

  return (
    <>
    <NavBarPatient />
    <div className="container mx-auto py-20">
        
      {/* Titre et barre de recherche */}
      
      <div className="table-auto mx-auto mt-5" style={{width: "90%"}} >
        <DataTable columns={columns} data={records} />
      </div>
    </div>
    
    </>
  );
}