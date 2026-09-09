"use client";

import getDocs, { uploadDocs } from "@/lib/api/documents";
import { useRouter } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["PDF"];

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading , setLoading] = useState(false)
  const router = useRouter()


  // const handleChange = async (file: File | File[]) => {
  //   setFile(Array.isArray(file) ? file[0] ?? null : file);
  //   const data = await uploadDocs(file)
  // };

   const handleChange = (uploadedFile: File | File[]) => {
    // setError('')
    setFile(Array.isArray(uploadedFile) ? uploadedFile[0] ?? null : uploadedFile)
  }

  const handleSubmit = async () =>{
    setLoading(true)
    try{
      if (!file) return;
      const data = await uploadDocs(file)
      router.push(`/documents/${data.newDocs._id}`)
    }
    catch (err: any) {
      console.error(err.response?.data?.message || 'Upload failed')
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
    
      <h1>This is the Document upload page</h1>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        classes="!w-full !border-2 !border-dashed !border-[#1A1A1A]/30 !bg-[#F5F0E6] !rounded-xl !p-10"
      />
      {loading && (
        <h1>Loading....</h1>
      )}
      <button className="p-4 bg-red-700 text-white font-bold  rounded-[50px] my-3" onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default UploadPage;
