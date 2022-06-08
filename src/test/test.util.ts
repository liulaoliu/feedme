export function testFnStart(fnName: string) {
  console.log("\x1B[31m%s\x1B[0m", `===> test ${fnName} <== start`);
}

export function testFnEnd(fnName: string) {
  console.log("\x1B[36m%s\x1B[0m", `===>${fnName} finish<==`);
}
