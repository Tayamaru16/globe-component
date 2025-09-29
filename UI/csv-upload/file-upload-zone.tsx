"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X } from "lucide-react"

interface FileUploadZoneProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
}

export function FileUploadZone({ onFileSelect, selectedFile }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      const csvFile = files.find((file) => file.name.endsWith(".csv"))

      if (csvFile) {
        onFileSelect(csvFile)
      }
    },
    [onFileSelect],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && file.name.endsWith(".csv")) {
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">ファイルアップロード</h3>
        </div>

        {selectedFile ? (
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">{selectedFile.name}</p>
                <p className="text-sm text-green-600">{(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onFileSelect(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mb-4">
              <FileText className="h-12 w-12 text-gray-400 mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">CSVファイルを選択またはドラッグ&ドロップ</h4>
            <p className="text-gray-600 mb-4">連絡先データを含むCSVファイルをアップロードしてください</p>
            <input type="file" accept=".csv" onChange={handleFileInput} className="hidden" id="csv-upload" />
            <label htmlFor="csv-upload">
              <Button asChild>
                <span>ファイルを選択</span>
              </Button>
            </label>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
