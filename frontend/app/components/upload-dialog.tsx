"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCollectionsOptions,
  uploadVideoMutation,
} from "@/generated/api/@tanstack/react-query.gen";
import type { VideoUploadRequest } from "@/generated/api";
import { useCallback, useState } from "react";
import { FileVideo, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/app/components/ui/button";
import {
  CollectionPicker,
  type SelectedCollection,
} from "@/app/components/collection-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/utils";
import {
  getPartCount,
  getPartRange,
  getVideoContentType,
  startPartUpload,
} from "@/lib/uploads";
import { formatFileSize } from "@/lib/utils";
import { titleFromFilename } from "@/lib/utils";

type UploadDialogProps = {
  label?: string;
  size?: "default" | "lg";
  className?: string;
};

type UploadErrorContent = {
  message: string;
  description?: string;
};

const uploadErrorContent: Record<string, UploadErrorContent> = {
  "file-invalid-type": {
    message: "Unsupported file type",
    description: "Choose a video file.",
  },
  "file-too-large": {
    message: "File is too large",
  },
  "file-too-small": {
    message: "File is too small",
  },
};

const fallbackUploadError: UploadErrorContent = {
  message: "This file could not be uploaded",
};

export function UploadDialog({
  label = "Upload",
  size = "default",
  className,
}: UploadDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [selectedCollections, setSelectedCollections] = useState<
    SelectedCollection[]
  >([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const chooseFile = useCallback((nextFile: File) => {
    setFile(nextFile);
    setFileError(null);
    setTitle((current) => current || titleFromFilename(nextFile.name));
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } =
    useDropzone({
      accept: {
        "video/*": [],
        "application/x-matroska": [".mkv"],
      },
      multiple: false,
      maxFiles: 1,
      noClick: true,
      onDrop: (acceptedFiles, rejections) => {
        const fileCount = acceptedFiles.length + rejections.length;
        const hasTooManyFiles = fileCount > 1;

        if (hasTooManyFiles) {
          toast.error("Too many files", {
            description: "Choose one video at a time.",
          });
        }

        for (const rejection of rejections) {
          for (const error of rejection.errors) {
            if (error.code === "too-many-files") continue;

            const { message, description } =
              uploadErrorContent[error.code] ?? fallbackUploadError;

            toast.error(message, { description });
          }
        }

        if (hasTooManyFiles || rejections.length > 0) {
          setFile(null);
          setFileError("Upload failed");
          return;
        }

        const [acceptedFile] = acceptedFiles;
        if (acceptedFile) {
          chooseFile(acceptedFile);
          toast.success("Video selected", {
            description: acceptedFile.name,
          });
        }
      },
    });

  const collectionsQuery = useQuery(getCollectionsOptions());
  const availableCollections =
    collectionsQuery.data?.map((collection) => ({
      id: collection.id,
      label: collection.name,
      color: "bg-cyan-500",
    })) ?? [];

  function resetUploadForm() {
    setFile(null);
    setTitle("");
    setSelectedCollections([]);
    setFileError(null);
  }

  const upload = useMutation({
    ...uploadVideoMutation(),

    onSuccess: (data) => {
      console.log(data.video_id);
      console.log(data.upload_id);
      console.log(data.status);
      if (file) {
        console.log(startPartUpload(data.video_id, data.upload_id, file));
      }
      setOpenDialog(false);
      toast.success("Upload started", { description: title });
      resetUploadForm();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  function handleUpload() {
    if (!file || !title.trim()) return;

    const body: VideoUploadRequest = {
      title: title.trim(),
      filename: file.name,
      content_type: getVideoContentType(
        file.name,
        file.type,
      ) as VideoUploadRequest["content_type"],
      size_bytes: file.size,
      collection_ids: selectedCollections.map(({ id }) => id),
    };

    upload.mutate({ body });
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger render={<Button size={size} className={className} />}>
        <Upload data-icon="inline-start" />
        {label}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a lecture</DialogTitle>
          <DialogDescription>
            Add a recording to your library. You can choose a file or drop it
            below.
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
              fileError && "border-destructive bg-destructive/5",
              isDragActive && "border-green-600 bg-green-600/5",
              isDragReject && "border-destructive bg-destructive/5",
            )}
          >
            <input {...getInputProps()} />
            {file ? (
              <>
                <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileVideo className="size-6" />
                </span>
                <p className="max-w-full truncate text-sm font-medium">
                  {file.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={resetUploadForm}
                >
                  <X data-icon="inline-start" />
                  Remove
                </Button>
              </>
            ) : (
              <>
                <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Upload className="size-6" />
                </span>
                <p
                  role={fileError ? "alert" : undefined}
                  className={cn(
                    "text-sm font-medium",
                    fileError && "text-destructive",
                  )}
                >
                  {fileError ?? "Drop your lecture file here"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {fileError
                    ? "Review the error notifications and try again"
                    : "or select it from your device"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={open}
                >
                  Select file
                </Button>
              </>
            )}
          </div>
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
          <div className="space-y-2">
            <span className="text-sm font-medium">
              Collections{" "}
              <span className="text-muted-foreground">(optional)</span>
            </span>
            <CollectionPicker
              collections={availableCollections}
              value={selectedCollections}
              onChange={setSelectedCollections}
            />
            <p className="text-xs text-muted-foreground">
              Add this video to one or more collections.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-7">
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button
            type="button"
            disabled={!file || !title.trim()}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
