"use client";

import { useState } from "react";
import "./LogoCoverUploader.scss";

const LogoCoverUploader = () => {
  const [logoImg, setLogoImg] = useState<File | string>(""); // Initializing state with File or string
  // const [converImg, setCoverImg] = useState<File | string>("");

  // logo image
  const logoHandler = (file: File) => {
    // Explicitly typing the file as File
    setLogoImg(file);
  };

  // cover image
  // const coverHandler = (file: File) => { // Explicitly typing the file as File
  //     setCoverImg(file);
  // };

  return (
    <>
      <div>
        <div className="uploading-outer">
          <div className="uploadButton">
            <input
              className="uploadButton-input"
              type="file"
              name="attachments[]"
              accept="image/*"
              id="upload"
              required
              onChange={(e) => logoHandler(e.target.files![0])} // Using `!` to assert that files will not be null
            />
            <label
              className="uploadButton-button ripple-effect"
              htmlFor="upload"
            >
              {logoImg !== "" ? (logoImg as File).name : " Browse Logo"}
            </label>
            <span className="uploadButton-file-name"></span>
          </div>
          <div className="pic-text">
            Max file size is 500KB, Minimum dimension: 100x100 And Suitable
            files are .jpg & .png
          </div>
        </div>
      </div>

      {/* <div className="uploading-outer">
                <div className="uploadButton">
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*, application/pdf"
                        id="upload_cover"
                        onChange={(e) => coverHandler(e.target.files![0])}
                    />
                    <label
                        className="uploadButton-button ripple-effect"
                        htmlFor="upload_cover"
                    >
                        {converImg !== "" ? (converImg as File).name : "Browse Cover"}
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
                <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg & .png
                </div>
            </div> */}
    </>
  );
};

export default LogoCoverUploader;
