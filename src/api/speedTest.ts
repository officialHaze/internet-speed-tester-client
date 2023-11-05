import axiosInstance from "../utils/axios.config";
import { Readable } from "stream";
import { AxiosProgressEvent } from "axios";

let starttime = new Date().getTime() / 1000;

const speedList: number[] = [];

const progressEvt = (evt: AxiosProgressEvent, latency: number) => {
  const bytes = evt.bytes;
  const endtime = new Date().getTime() / 1000;

  const seconds = endtime - starttime;

  let speed: number = 0;

  speed = bytes / (seconds + latency);
  speedList.push(speed);
  if (speed < 1024) console.log(`${speed.toFixed(2)} bps`);
  else if (speed >= 1024 && speed < 1024 * 1024) {
    // convert to kbps
    speed = speed / 1024;
    console.log(`${speed.toFixed(2)} kbps`);
  } else {
    // convert to mbps
    speed = speed / (1024 * 1024);
    console.log(`${speed.toFixed(2)} mbps`);
  }
  starttime = endtime;
  return;
};

export default async function speedTest(latency: number, testNumber: string) {
  try {
    await axiosInstance.get<Readable>(
      `https://www.dropbox.com/scl/fi/t36inwzeoyb4abwn6gzza/test_file_1.txt?rlkey=7zjz68bhfvu1to4vxtor8v9x9&dl=1`,
      {
        responseType: "stream",
        onDownloadProgress: evt => {
          progressEvt(evt, latency);
        },
      }
    );
    // Calculate the avg speed
    const size = speedList.length;
    let total = 0;
    speedList.forEach(speed => {
      total += speed;
    });
    const avgspeed = total / size;
    if (avgspeed >= 1024 && avgspeed < 1024 * 1024) {
      // convert to kbps
      const speed = avgspeed / 1024;
      console.log(`${speed.toFixed(2)} kbps`);
    } else {
      // convert to mbps
      const speed = avgspeed / (1024 * 1024);
      console.log(`${speed.toFixed(2)} mbps`);
    }
  } catch (err) {
    throw err;
  }
}
