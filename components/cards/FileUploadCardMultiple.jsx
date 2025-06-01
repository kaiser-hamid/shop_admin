"use client"

import { useCallback, useRef, useState } from "react";
import { AsteriskIcon, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

export default function FileUploadCardMultiple({
  heading,
  name,
  onChange,
  onDelete,
  paths = [],
  required = false,
  disabled = false,
  dimension = "800 * 400"
}) {

  const [markedImages, setMarkedImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        const appendFiles = acceptedFiles?.map((file) => {
          const fullPath = URL.createObjectURL(file);
          return { path: file, full_path: fullPath };
        });
        onChange({
          target: {
            name,
            value: appendFiles,
          },
        });
      }
    },
    [name, onChange]
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  const handleMarkImage = ({ target: { name, value, checked } }) => {
    const copy__markedImages = [...markedImages];
    if (checked) {
      copy__markedImages.push(value);
      setMarkedImages(copy__markedImages);
    } else {
      const remainingImages = copy__markedImages.filter(
        (item) => item !== value
      );
      setMarkedImages(remainingImages);
    }
  };

  const handleRemoveFiles = () => {
    onDelete(markedImages);
    setMarkedImages([]);
  };

  let removableFiles = null;
  if (markedImages.length) {
    removableFiles = `${markedImages.length} file${markedImages.length > 1 ? "s" : ""
      } selected`;
  }

  return (
    <div className="border border-Gray-200 rounded-lg">
      <div className="border-b border-Gray-100 p-4">
        {removableFiles ? (
          <div className="flex justify-between items-center">
            <div className="flex gap-x-1 items-center">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-accent w-5 h-5 rounded-md"
              />
              <h2 className="text-black text-lg font-medium">
                {removableFiles}
              </h2>
            </div>
            <div>
              <button
                type="button"
                onClick={handleRemoveFiles}
                className="text-red-500 hover:text-red-600 transition-all duration-200"
              >
                Delete file{markedImages.length > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        ) : (
          <h2 className="flex items-center gap-0.5 text-black text-lg font-medium">{heading} {required && <AsteriskIcon className="h-4 w-4 text-red-500" />}</h2>
        )}
      </div>
      <div className="flex flex-col gap-y-2 p-4">
        {paths.length ? (
          <ImagePlaceHolderDiv
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
            paths={paths}
            handleMarkImage={handleMarkImage}
            markedImages={markedImages}
          />
        ) : (
          <ImagePlaceHolderFull
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
            dimension={dimension}
          />
        )}
      </div>
    </div>
  );
}

const ImagePlaceHolderFull = ({
  getRootProps,
  getInputProps,
  isDragAccept,
  isDragReject,
  dimension
}) => {
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-Gray-200 rounded-lg px-4 py-6 cursor-pointer ${isDragAccept ? "bg-[#F6F7F9] border-Gray-300" : "border-Gray-200"
        } ${isDragReject && "border-red-400"}`}
    >
      <input {...getInputProps()} />
      <div className="flex justify-center">
        <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full border-8 border-slate-100 bg-slate-200">
          <UploadCloud className="text-slate-800" />
        </div>
      </div>

      <div className="pt-6 flex flex-col gap-y-2">
        <div className="flex justify-center">
          <span className="px-4 py-2 text-Gray-800 text-xs font-medium rounded-lg border border-gray-300">
            Upload Image
          </span>
        </div>
        <div className="text-center">
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
  );
};
const ImagePlaceHolderDiv = ({
  getRootProps,
  getInputProps,
  isDragAccept,
  isDragReject,
  paths,
  handleMarkImage,
  markedImages,
}) => {
  const copyData = [...paths, null];
  const firstItem = copyData.shift();
  const secondFourItems = copyData.length ? copyData.splice(0, 4) : [];
  const restItems = copyData.length ? copyData.splice(0) : [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="col-span-2">
          <div className="relative flex justify-center rounded-lg overflow-hidden w-full h-[288px]">
            <label className="flex w-full h-[288px] group">
              <div
                className={`absolute top-0 left-0 w-full h-full bg-red-300 ${markedImages.includes("0") ? "bg-opacity-40" : "bg-opacity-0"
                  } group-hover:bg-opacity-40 transition-opacity duration-150`}
              >
                <input
                  type="checkbox"
                  value="0"
                  checked={markedImages.includes("0")}
                  onChange={handleMarkImage}
                  className={`${markedImages.includes("0") ? "block" : "hidden"
                    } group-hover:block checkbox checkbox-accent w-5 h-5 rounded-md bg-white absolute top-2 left-2`}
                />
              </div>
              <Image
                src={firstItem}
                alt="Media image"
                width={400}
                height={288}
                className="object-cover object-center"
              />
            </label>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {secondFourItems?.map((item, i) =>
            item ? (
              <div
                key={i}
                className="relative flex justify-center rounded-lg overflow-hidden bg-red-300 h-[140px]"
              >
                <label className="flex w-full h-full group">
                  <div
                    className={`absolute top-0 left-0 w-full h-full bg-red-300 ${markedImages.includes((1 + i).toString())
                      ? "bg-opacity-40"
                      : "bg-opacity-0"
                      } group-hover:bg-opacity-40 transition-opacity duration-150`}
                  >
                    <input
                      type="checkbox"
                      value={String(1 + i)}
                      checked={markedImages.includes(String(1 + i))}
                      onChange={handleMarkImage}
                      className={`${markedImages.includes((1 + i).toString())
                        ? "block"
                        : "hidden"
                        } group-hover:block checkbox checkbox-accent w-5 h-5 rounded-md bg-white absolute top-2 left-2`}
                    />
                  </div>
                  <Image
                    src={item}
                    width={400}
                    height={280}
                    alt="Media image"
                    className="object-center object-cover"
                  />
                </label>
              </div>
            ) : (
              <div
                key={i}
                {...getRootProps()}
                className={`border-2 border-dashed border-Gray-200 rounded-lg flex flex-col items-center py-4 justify-between h-[140px] cursor-pointer ${isDragAccept
                  ? "bg-[#F6F7F9] border-Gray-300"
                  : "border-Gray-200"
                  } ${isDragReject && "border-red-400"}`}
              >
                <input {...getInputProps()} />
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full border-8 border-slate-100 bg-slate-200">
                    <UploadCloud className="text-slate-800" />
                  </div>
                </div>

                <div className="pt-6 flex flex-col gap-y-2">
                  <div className="flex justify-center">
                    <span className="px-4 py-2 text-Gray-800 text-xs font-medium rounded-lg border border-gray-300 hover:shadow transition-all duration-200 ease-in-out">
                      Add More
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {restItems?.map((item, i) =>
          item ? (
            <div
              key={i}
              className="relative flex justify-center rounded-lg overflow-hidden bg-red-300 h-[140px]"
            >
              <label className="flex w-full h-full group">
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-red-300 ${markedImages.includes((5 + i).toString())
                    ? "bg-opacity-40"
                    : "bg-opacity-0"
                    } group-hover:bg-opacity-40 transition-opacity duration-150`}
                >
                  <input
                    type="checkbox"
                    value={String(5 + i)}
                    onChange={handleMarkImage}
                    checked={markedImages.includes(String(5 + i))}
                    className={`${markedImages.includes((5 + i).toString())
                      ? "block"
                      : "hidden"
                      } group-hover:block checkbox checkbox-accent w-5 h-5 rounded-md bg-white absolute top-2 left-2`}
                  />
                </div>
                <Image
                  src={item}
                  width={400}
                  height={280}
                  alt="Media image"
                  className="object-center object-cover"
                />
              </label>
            </div>
          ) : (
            <div
              key={i}
              {...getRootProps()}
              className={`border-2 border-dashed border-Gray-200 rounded-lg flex flex-col items-center py-4 justify-between h-[140px] cursor-pointer ${isDragAccept
                ? "bg-[#F6F7F9] border-Gray-300"
                : "border-Gray-200"
                } ${isDragReject && "border-red-400"}`}
            >
              <input {...getInputProps()} />
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-[54px] h-[54px] rounded-full border-8 border-slate-100 bg-slate-200">
                  <UploadCloud className="text-slate-800" />
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-y-2">
                <div className="flex justify-center">
                  <span className="px-4 py-2 text-Gray-800 text-xs font-medium rounded-lg border border-gray-300 hover:shadow transition-all duration-200 ease-in-out">
                    Add More
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
