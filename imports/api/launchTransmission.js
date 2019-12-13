import { spawn } from "child_process";

/**
 * This function will launch transmission on Linux and Windows platforms
 * @function
 * @returns {undefined}
 * @example
 * import { launchTransmission } from "../imports/api/launchTransmission";
 *
 * // This will work on Windows or Linux
 * // In Transmission's preferances, navigate to the "Remote" tab
 * // Click the radio button "Allow remote access"
 * // HTTP port 9091
 * // Uncheck "Use authentication"
 * // Check "Only allow these IP addresses"
 * // Addresses: 127.0.0.1
 * // Now meteor should be able to communicate with Transmission RPC.
 * try: {
 *  launchTransmission()
 * } catch (e) {
 *  console.log(`EpicenterError: ${e}\n\n`)
 *  console.log(`Could not launch Transmission, You likely need to install: https://transmissionbt.com/download/ before running meteor`)
 * }
 *
 */
const launchTransmission = () => {
  if (process.platform === "linux") {
    const transmissionGtk = spawn("transmission-gtk");

    transmissionGtk.stdout.on("data", data => {
      console.log(`transmissionGtkData: ${data}`);
    });

    transmissionGtk.stderr.on("data", data => {
      console.error(`transmissionGtkError: ${data}`);
    });

    transmissionGtk.on("close", code => {
      console.log(`transmissionGtk child process exited with code ${code}`);
      //launchTransmission(); // always reload transmission
    });
  } else if (process.platform === "win32") {
    try {
      const transmissionGtk = spawn(
        `C:\\Program Files\\Transmission\\transmission-qt.exe`
      );

      transmissionGtk.stdout.on("data", data => {
        console.log(`transmissionQtData: ${data}`);
      });

      transmissionGtk.stderr.on("data", data => {
        console.error(`transmissionQtError: ${data}`);
      });

      transmissionGtk.on("close", code => {
        console.log(`transmissionQt child process exited with code ${code}`);
        //launchTransmission(); // always reload transmission
      });
    } catch (e) {
      const transmissionURL = `https://transmissionbt.com/download/`;
      console.log(
        `Please install transmission. Must be installed on default path (don't change the directory when you run the installer.) \n    You can download transmission here: ${transmissionURL}`
      );
    }
  }
};

export { launchTransmission };
