jest.mock("@actions/core");

test("complex test", async () => {
  const core = require("@actions/core");
  core.getInput.mockImplementationOnce((key: string) => {
    expect(key).toBe("version");
    return "v1.12.123-alpha.1+BUILD.ID";
  });

  require("./index");

  await new Promise<void>((resolve) => setImmediate(() => resolve()));

  expect(core.setOutput.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "major",
        1,
      ],
      [
        "minor",
        12,
      ],
      [
        "patch",
        123,
      ],
      [
        "prerelease",
        "alpha.1",
      ],
      [
        "build",
        "BUILD.ID",
      ],
      [
        "version",
        "1.12.123-alpha.1",
      ],
    ]
  `);
});
