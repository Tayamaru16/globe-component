"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { FileUploadZone } from "@/components/csv-upload/file-upload-zone"
import { FormatGuide } from "@/components/csv-upload/format-guide"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function CSVUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setSelectedFile(null)
      alert("CSVファイルのアップロードが完了しました！")
    }, 2000)
  }

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">CSVアップロード</h1>
          <p className="text-gray-600 mt-1">CSVファイルから連絡先を一括登録できます</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FileUploadZone selectedFile={selectedFile} onFileSelect={setSelectedFile} />

            {selectedFile && (
              <div className="flex justify-end">
                <Button onClick={handleUpload} disabled={isUploading} className="bg-orange-600 hover:bg-orange-700">
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      アップロード中...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      アップロード実行
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <FormatGuide />
        </div>
      </div>
    </MainLayout>
  )
}
