import { createWriteStream } from "fs";
import archiver from "archiver";

const distDir = `${process.cwd()}/dist`;
const outputFilePath = `${distDir}/zipped/dist.zip`;
const output = createWriteStream(outputFilePath);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  const maxSizeAllowed = 13 * 1024;
  const fileSize = archive.pointer();
  const fileSizeDifference = Math.abs(maxSizeAllowed - fileSize);
  const isUnderSizeLimit = fileSize <= maxSizeAllowed;
  const status = isUnderSizeLimit ? "under" : "over";
  const statusColor = isUnderSizeLimit ? "\x1b[32m" : "\x1b[31m";

  console.log(`Zip file created successfully!`);
  console.log(`File path: ${outputFilePath}`);
  console.log(`File size: ${fileSize} Bytes`);
  console.log(
    `${statusColor}%s\x1b[0m`,
    `Status: ${fileSizeDifference} bytes ${status} the 13KB limit!`
  );
});

archive.pipe(output);
archive.directory(`${distDir}/inlined/`, false);
archive.finalize();
