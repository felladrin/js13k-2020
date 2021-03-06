import { statSync } from "fs";
import { resolve } from "path";
import * as zip from "bestzip";
import * as efficientCompressionTool from "ect-bin";
import * as crossExecFile from "cross-exec-file";

const distFolderPath = resolve(__dirname, "..", "..", "dist");
const baseDirectoryToZip = resolve(distFolderPath, "inlined");
const zippedFilePath = resolve(distFolderPath, "zipped", "dist.zip");

(async () => {
  await zip({
    cwd: baseDirectoryToZip,
    source: "index.html",
    destination: zippedFilePath,
  });

  console.log("Zip file created successfully!");

  try {
    console.log(
      "Running Efficient Compression Tool to reduce the zip file size."
    );
    const { stdout } = await crossExecFile(efficientCompressionTool, [
      "-9",
      "-zip",
      zippedFilePath,
    ]);

    console.log(stdout);
  } catch {
    console.log("Skipping usage of Efficient Compression Tool.");
  }

  const maxSizeAllowed = 13 * 1024;
  const fileSize = statSync(zippedFilePath).size;
  const fileSizeDifference = Math.abs(maxSizeAllowed - fileSize);
  const isUnderSizeLimit = fileSize <= maxSizeAllowed;
  const status = isUnderSizeLimit ? "under" : "over";
  const statusColor = isUnderSizeLimit ? "\x1b[32m" : "\x1b[31m";

  console.log(`File path: ${zippedFilePath}`);
  console.log(`File size: ${fileSize} Bytes`);
  console.log(
    `${statusColor}%s\x1b[0m`,
    `Status: ${fileSizeDifference} Bytes ${status} the 13KB limit!`
  );
})();
