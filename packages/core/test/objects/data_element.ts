import {expect} from "chai";
import {Registry} from "../../src/registry";
import {MemoryFile} from "../../src/files/memory_file";
import {DataElement} from "../../src/objects";
import {CharacterType, UnknownType, HexType, VoidType, StringType, PackedType, FloatingPointType} from "../../src/abap/types/basic";

describe("Data element, parse main xml", () => {

  it("CharacterType", async () => {
    const xml = `
<?xml version="1.0" encoding="utf-8"?>
<abapGit version="v1.0.0" serializer="LCL_OBJECT_DTEL" serializer_version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <DD04V>
    <ROLLNAME>ZDDIC</ROLLNAME>
    <DATATYPE>CHAR</DATATYPE>
    <LENG>000002</LENG>
    <OUTPUTLEN>000002</OUTPUTLEN>
    <DDTEXT>testing</DDTEXT>
   </DD04V>
  </asx:values>
 </asx:abap>
</abapGit>`;
    const reg = new Registry().addFile(new MemoryFile("zddic.dtel.xml", xml));
    await reg.parseAsync();
    const dtel = reg.getFirstObject()! as DataElement;
    const type = dtel.parseType(reg);
    expect(type).to.be.instanceof(CharacterType);
    expect(dtel.getDescription()).to.equal("testing");
  });

  it("HexType", async () => {
    const xml = `
<?xml version="1.0" encoding="utf-8"?>
<abapGit version="v1.0.0" serializer="LCL_OBJECT_DTEL" serializer_version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <DD04V>
    <ROLLNAME>ZAGS_ADLER32</ROLLNAME>
    <DATATYPE>RAW</DATATYPE>
    <LENG>000004</LENG>
    <OUTPUTLEN>000008</OUTPUTLEN>
   </DD04V>
  </asx:values>
 </asx:abap>
</abapGit>`;
    const reg = new Registry().addFile(new MemoryFile("zags_adler32.dtel.xml", xml));
    await reg.parseAsync();
    const dtel = reg.getFirstObject()! as DataElement;
    const type = dtel.parseType(reg);
    expect(type).to.be.instanceof(HexType);
  });

  it("parser error", async () => {
    const xml = `sdfsdf`;
    const reg = new Registry().addFile(new MemoryFile("zddic.dtel.xml", xml));
    await reg.parseAsync();
    const dtel = reg.getFirstObject()! as DataElement;
    const type = dtel.parseType(reg);
    expect(type).to.be.instanceof(UnknownType);
  });

  it("parser error, valid xml", async () => {
    const xml = `<foo></bar>`;
    const reg = new Registry().addFile(new MemoryFile("zddic.dtel.xml", xml));
    await reg.parseAsync();
    const dtel = reg.getFirstObject()! as DataElement;
    const type = dtel.parseType(reg);
    expect(type).to.be.instanceof(UnknownType);
  });

  it("Reference to domain", async () => {
    const dtelxml = `
<?xml version="1.0" encoding="utf-8"?>
<abapGit version="v1.0.0" serializer="LCL_OBJECT_DTEL" serializer_version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <DD04V>
    <ROLLNAME>ZDTEL</ROLLNAME>
    <DDLANGUAGE>E</DDLANGUAGE>
    <DOMNAME>ZDOMA</DOMNAME>
    <DTELMASTER>E</DTELMASTER>
    <REFKIND>D</REFKIND>
   </DD04V>
  </asx:values>
 </asx:abap>
</abapGit>`;
    const domaxml = `
<?xml version="1.0" encoding="utf-8"?>
<abapGit version="v1.0.0" serializer="LCL_OBJECT_DOMA" serializer_version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <DD01V>
    <DOMNAME>ZDOMA</DOMNAME>
    <DDLANGUAGE>E</DDLANGUAGE>
    <DATATYPE>CHAR</DATATYPE>
    <LENG>000006</LENG>
    <OUTPUTLEN>000006</OUTPUTLEN>
    <LOWERCASE>X</LOWERCASE>
    <DDTEXT>Type</DDTEXT>
   </DD01V>
  </asx:values>
 </asx:abap>
</abapGit>`;
    const reg = new Registry();
    reg.addFile(new MemoryFile("zdtel.dtel.xml", dtelxml));
    reg.addFile(new MemoryFile("zdoma.doma.xml", domaxml));

    await reg.parseAsync();
    const dtel = reg.getFirstObject()! as DataElement;
    const type = dtel.parseType(reg);
    expect(type).to.be.instanceof(CharacterType);
  });

  it("Reference to domain, outside namespace, expect void", async () => {
    const dtelxml = `
<?xml version="1.0" encoding="utf-8"?>
<abapGit version="v1.0.0" serializer="LCL_OBJECT_DTEL" serializer_version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <DD04V>
    <ROLLNAME>ZDTEL</ROLLNAME>
    <DDLANGUAGE>E</DDLANGUAGE>
    <DOMNAME>OUTSIDE_NAMESPACE</DOMNAME>
    <DTELMASTER>E</DTELMASTER>
    <REFKIND>D</REFKIND>
   </DD04V>
  </asx:values>
 </asx:abap>
</abapGit>`;
    const reg = new Registry();
    reg.addFile(new MemoryFile("zdtel.dtel.xml", dtelxml));

    await reg.parseAsync();
    const dtel = reg.getFirstObject()! as DataElement;
    const type = dtel.parseType(reg);
    expect(type).to.be.instanceof(VoidType);
  });

  it("String", async () => {
    const dtelxml = `
<?xml version="1.0" encoding="utf-8"?>
<abapGit version="v1.0.0" serializer="LCL_OBJECT_DTEL" serializer_version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <DD04V>
    <ROLLNAME>ZDTEL</ROLLNAME>
    <DDLANGUAGE>E</DDLANGUAGE>
    <DTELMASTER>E</DTELMASTER>
    <DATATYPE>STRG</DATATYPE>
   </DD04V>
  </asx:values>
 </asx:abap>
</abapGit>`;
    const reg = new Registry();
    reg.addFile(new MemoryFile("zdtel.dtel.xml", dtelxml));

    await reg.parseAsync();
    const dtel = reg.getFirstObject()! as DataElement;
    const type = dtel.parseType(reg);
    expect(type).to.be.instanceof(StringType);
  });

  it("Packed", async () => {
    const dtelxml = `
<?xml version="1.0" encoding="utf-8"?>
<abapGit version="v1.0.0" serializer="LCL_OBJECT_DTEL" serializer_version="v1.0.0">
 <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
  <asx:values>
   <DD04V>
    <ROLLNAME>ZDTEL</ROLLNAME>
    <DATATYPE>DEC</DATATYPE>
    <LENG>000005</LENG>
    <DECIMALS>000002</DECIMALS>
    <OUTPUTLEN>000006</OUTPUTLEN>
   </DD04V>
  </asx:values>
 </asx:abap>
</abapGit>`;
    const reg = new Registry();
    reg.addFile(new MemoryFile("zdtel.dtel.xml", dtelxml));

    await reg.parseAsync();
    const dtel = reg.getFirstObject()! as DataElement;
    const type = dtel.parseType(reg);
    expect(type).to.be.instanceof(PackedType);
  });

  it("FLTP", async () => {
    const dtelxml = `
    <?xml version="1.0" encoding="utf-8"?>
    <abapGit version="v1.0.0" serializer="LCL_OBJECT_DTEL" serializer_version="v1.0.0">
     <asx:abap xmlns:asx="http://www.sap.com/abapxml" version="1.0">
      <asx:values>
       <DD04V>
        <ROLLNAME>ZEXCEL_STYLE_COLOR_TINT</ROLLNAME>
        <DDLANGUAGE>E</DDLANGUAGE>
        <HEADLEN>22</HEADLEN>
        <SCRLEN1>10</SCRLEN1>
        <SCRLEN2>15</SCRLEN2>
        <SCRLEN3>20</SCRLEN3>
        <DDTEXT>Tint</DDTEXT>
        <REPTEXT>Tint</REPTEXT>
        <SCRTEXT_S>Tint</SCRTEXT_S>
        <SCRTEXT_M>Tint</SCRTEXT_M>
        <SCRTEXT_L>Tint</SCRTEXT_L>
        <DTELMASTER>E</DTELMASTER>
        <DATATYPE>FLTP</DATATYPE>
        <LENG>000016</LENG>
        <DECIMALS>000016</DECIMALS>
        <OUTPUTLEN>000022</OUTPUTLEN>
       </DD04V>
      </asx:values>
     </asx:abap>
    </abapGit>`;
    const reg = new Registry();
    reg.addFile(new MemoryFile("zexcel_style_color_tint.dtel.xml", dtelxml));

    await reg.parseAsync();
    const dtel = reg.getFirstObject()! as DataElement;
    const type = dtel.parseType(reg);
    expect(type).to.be.instanceof(FloatingPointType);
  });

});