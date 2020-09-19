import cluster from "cluster";
import os from "os";

const NUM_CPUS = os.cpus().length;

if (cluster.isMaster) {
  [...Array(NUM_CPUS).keys()].forEach(() => {
    cluster.fork();
  });
} else {
  import("./index");
}
