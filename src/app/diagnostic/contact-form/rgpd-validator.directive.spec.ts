import { RgpdRequiredIfDirective } from "./rgpd-validator.directive";

describe("RgpdRequiredIfDirective", () => {
  it("should create an instance", () => {
    const directive = new RgpdRequiredIfDirective();
    expect(directive).toBeTruthy();
  });
});
