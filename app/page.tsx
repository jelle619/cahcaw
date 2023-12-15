import * as xlsx from 'xlsx';

// load 'fs' for readFile and writeFile support
import * as fs from 'fs';
xlsx.set_fs(fs);

// load 'stream' for stream support
import { Readable } from 'stream';
xlsx.stream.set_readable(Readable);

// load the codepage support library for extended support with older formats
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
xlsx.set_cptable(cpexcel);

async function fetchData() {
  const url = "https://sheetjs.com/data/PortfolioSummary.xls"
  const file = await (await fetch(url, {redirect: "follow"})).arrayBuffer();
  const workbook = xlsx.read(file);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  console.log(worksheet);
}

export default async function Home() {
  await fetchData();
  return (
    <>
      <h1>Cahcaw</h1>
      <p>This is a placeholder website.</p>
    </>
  )
}
