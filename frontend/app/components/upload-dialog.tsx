"use client"

import { useCallback, useState } from "react"
import { FileVideo, Upload, X } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { cn } from "@/lib/utils"

type UploadDialogProps = {
  label?: string
  size?: "default" | "lg"
  className?: string
}

function titleFromFilename(filename: string) {
  return filename.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ")
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadDialog({
  label = "Upload",
  size = "default",
  className,
}: UploadDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [fileError, setFileError] = useState<string | null>(null)

  const chooseFile = useCallback((nextFile: File) => {
    setFile(nextFile)
    setFileError(null)
    setTitle((current) => current || titleFromFilename(nextFile.name))
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    open,
  } = useDropzone({
    accept: {
      "video/*": [],
    },
    multiple: false,
    maxFiles: 1,
    noClick: true,
    onDropAccepted: ([acceptedFile]) => {
      if (acceptedFile) chooseFile(acceptedFile)
    },
    onDropRejected: ([rejection]) => {
      const hasTooManyFiles = rejection?.errors.some(
        (error) => error.code === "too-many-files"
      )

      setFileError(
        hasTooManyFiles
          ? "Choose one video at a time."
          : "This file isn’t a video. Choose a video file to continue."
      )
    },
  })

  function clearFile() {
    setFile(null)
    setFileError(null)
  }

  return (
    <Dialog>
      <DialogTrigger
        render={<Button size={size} className={className} />}
      >
        <Upload data-icon="inline-start" />
        {label}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a lecture</DialogTitle>
          <DialogDescription>
            Add a recording to your library. You can choose a file or drop it below.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-5">
          <div
            {...getRootProps({
              role: "region",
              "aria-label": "Lecture file upload",
            })}
            className={cn(
              "flex min-h-48 flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/35 px-6 py-8 text-center transition-colors",
              isDragActive && "border-primary bg-primary/5",
              isDragReject && "border-destructive bg-destructive/5"
            )}
          >
            <input {...getInputProps()} />
            {file ? (
              <>
                <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileVideo className="size-6" />
                </span>
                <p className="max-w-full truncate text-sm font-medium">{file.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                <Button type="button" variant="ghost" size="sm" className="mt-3" onClick={clearFile}>
                  <X data-icon="inline-start" />
                  Remove
                </Button>
              </>
            ) : (
              <>
                <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Upload className="size-6" />
                </span>
                <p className="text-sm font-medium">Drop your lecture file here</p>
                <p className="mt-1 text-xs text-muted-foreground">or select it from your device</p>
                <Button type="button" variant="outline" className="mt-4" onClick={open}>
                  Select file
                </Button>
              </>
            )}
          </div>
          {fileError && (
            <p role="alert" className="-mt-3 text-sm text-destructive">
              {fileError}
            </p>
          )}

          <div className="space-y-2">
            <label htmlFor="lecture-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="lecture-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Introduction to neural networks"
            />
            <p className="text-xs text-muted-foreground">
              You can change how this lecture appears in your library.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-7">
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button type="button" disabled={!file || !title.trim()}>
            Add to library
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
