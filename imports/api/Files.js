import { FilesCollection } from "meteor/ostrio:files";

// needed on client and server for queries.
export const Files = new FilesCollection({
  collectionName: "Files",
  allowClientCode: false, // Disallow remove files from Client
  storagePath: "../../../../../public/Files"
});
