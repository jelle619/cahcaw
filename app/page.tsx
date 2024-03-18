import * as xlsx from 'xlsx';
import CommuneMap from './commune-map';

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
  const url = "https://www.googleapis.com/drive/v3/files/1fPM_4ubBrFDJudcbh4nWyu7WnV5YSk1q?alt=media&key=" + process.env.GOOGLE_DRIVE_API_KEY
  const file = await (await fetch(url, {redirect: "follow", next: { revalidate: 600 }})).arrayBuffer();
  const workbook = xlsx.read(file);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(worksheet, {
    blankrows: false
  });

  const filteredData = data.filter((entry: any) =>
  entry.coordinates !== undefined &&
  entry.coordinates !== null &&
  !isNaN(entry.coordinates.split(", ")[0]) &&
  !isNaN(entry.coordinates.split(", ")[1]) &&
  Object.keys(entry.coordinates).length !== 0);

  return filteredData;
}

export default async function Home() {
  const data = await fetchData();

  return (
    <>
      <CommuneMap data={data}/>
    </>
  )
}
