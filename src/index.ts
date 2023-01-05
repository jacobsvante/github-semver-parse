import * as core from "@actions/core";
import semverParse from "semver/functions/parse";

(async function main() {
  const version = core.getInput("version");
  const v = semverParse(version);
  if (v) {
    core.setOutput("major", v.major);
    core.setOutput("minor", v.minor);
    core.setOutput("patch", v.patch);
    core.setOutput("prerelease", v.prerelease.join("."));
    core.setOutput("build", v.build.join("."));
    core.setOutput("version", v.version);
  } else {
    core.setOutput("version", "");
  }
})();
