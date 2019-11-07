const launchTransmission = () => {
  import { spawn } from "child_process";
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
