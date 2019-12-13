import { spawn } from "child_process";

/**
 * This function will launch documentation from jocumentation.js
 * following the JSDocs syntax.
 * @function
 * @returns {undefined}
 * @example
 * import { launchDocumentationJs } from "../imports/api/launchDocumentationJs";
 *
 * // This will auto generate Documentation when the meteor application runs
 * // Anything in the ./imports/ folder will generate.
 * try: {
 *  launchDocumentationJs()
 * } catch (e) {
 *  console.log(`EpicenterError: ${e}\n\n`)
 * }
 *
 */
const launchDocumentationJs = () => {
  // documentation build ../** -f html -g -o ../..public/docs */

  const documentationJs = spawn(`documentation`, [
    "build",
    "../../../../../imports/**",
    "-f",
    "html",
    "-g",
    "-o",
    "../../../../../public/docs"
  ]);

  documentationJs.stdout.on("data", data => {
    console.log(`DocumentationJS Data: ${data}:`);
  });
  documentationJs.stdout.on("error", error => {
    console.log(`DocumentationJS Error: ${error}:`);
  });
  documentationJs.stdout.on("close", code => {
    //console.log(`DOCUMENTATION ${process.cwd()}`);
    console.log(`Generated Docs, status: ${code ? "error" : "success"}`);
  });
};

export { launchDocumentationJs };
