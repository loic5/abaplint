import "../../typings/index.d.ts";
import File from "../../src/file";
import Runner from "../../src/runner";
import * as chai from "chai";
import * as Statements from "../../src/statements/";

let expect = chai.expect;

describe("CONDENSE statement type", () => {
  let tests = [
    "condense lv_foo.",
    ];

  tests.forEach((test) => {
    let file = new File("temp.abap", test);
    Runner.run([file]);
    let slist = file.getStatements();

    it("\"" + test + "\" should be CONDENSE", () => {
      let compare = slist[0] instanceof Statements.Condense;
      expect(compare).to.equals(true);
    });
  });
});
