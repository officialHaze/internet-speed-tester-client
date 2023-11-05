import axiosInstance from "../utils/axios.config";

export default async function checkLatency() {
  try {
    const startTime = new Date().getTime() / 1000;
    await axiosInstance.get("/latency");
    const endtime = new Date().getTime() / 1000;

    const latency = endtime - startTime;
    return latency;
  } catch (err) {
    throw err;
  }
}
