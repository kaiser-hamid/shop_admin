import { useCallback } from "react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

export default function FileUploadCardSingle({
  heading,
  name,
  onChange,
  path,
  dimension = "800 * 400",
  disabled = false,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const fullPath = URL.createObjectURL(acceptedFiles[0]);
      onChange({
        target: {
          name,
          value: { path: acceptedFiles[0], full_path: fullPath },
        },
      });
    },
    [name, onChange]
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
    });

  return (
    <div className="rounded-lg border border-Gray-200">
      <div className="px-3 py-4 border-b">
        <h4 className="text-lg font-medium text-Black-950">{heading}</h4>
      </div>
      <div className="px-4 py-6">
        <div
          {...getRootProps()}
          className={`pt-6 pb-5 px-4 rounded-lg border-2 border-dashed  cursor-pointer ${isDragAccept
            ? "bg-[#F6F7F9] border-Gray-300"
            : "bg-white border-Gray-200"
            } ${isDragReject && "border-red-400"}`}
        >
          <input {...getInputProps()} />
          <div className="flex justify-center bg-transparent">
            {path ? (
              <div className="flex items-center justify-center h-[54px] w-[90px] rounded overflow-hidden">
                <Image
                  src={path}
                  width={90}
                  height={54}
                  alt={heading}
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full border-8 border-slate-100 bg-slate-200">
                <UploadCloud className="text-slate-800" />
              </div>
            )}
          </div>
          <div className="pt-6 flex flex-col gap-y-2 bg-transparent">
            <div className="flex justify-center bg-transparent">
              <span
                className={`${disabled && "cursor-not-allowed"
                  } px-4 py-2 text-Gray-800 text-xs font-medium rounded-lg border border-gray-300`}
              >
                {path ? "Change Image" : " Upload Image"}
              </span>
            </div>
            <div className="text-center bg-transparent">
              {isDragReject ? (
                <p className="text-xs text-red-400 font-normal">
                  File not allowed!
                </p>
              ) : (
                <p className="text-xs text-Gray-600 font-normal">
                  SVG, PNG, or JPG ({dimension})
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
