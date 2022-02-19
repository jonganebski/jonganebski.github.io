import fs from 'fs';
import gpxparser from 'gpxparser';
import { resolve } from 'path';
import { supabase } from '../../src/libs/supabase/commonjs';
import type { Point, Point__point } from '../../src/libs/supabase/interfaces';

const ONE_MINUTE = 1_000 * 60;

async function insertPoints(fileName: string, data: Partial<Point>) {
  console.log(`${fileName} points: Does not exist. Inserting...`);
  try {
    const res = await supabase.from<Point>('points').insert(data);
    if (res.error) throw Error(res.error.message);
  } catch (err) {
    console.error(err);
  }
}

async function extractPoints(fileName: string) {
  try {
    const date = `${fileName.split(' ')[0].replace('Track_', '')}`;
    const res = await supabase.from<Point>('points').select('*').eq('date', date);

    if (!res.data) throw Error(res.error.message);
    if (0 < res.data.length) {
      console.log(`${fileName} points: Already Exists. Ignored.`);
      return;
    }

    const gpx = new gpxparser();
    const file = await fs.readFileSync(resolve(__dirname, './gpx', fileName));
    gpx.parse(file.toString());
    const points: Point__point[] = [];
    const points_summary: Point__point[] = [];

    gpx.tracks[0].points.forEach((point) => {
      const lastPoint = points.at(-1);
      if (!lastPoint) {
        points.push(point as unknown as Point__point);
        return;
      }
      const isClose =
        new Date(point.time).getTime() - new Date(lastPoint.time).getTime() < 10 * ONE_MINUTE;
      if (isClose) return;

      points.push(point as unknown as Point__point);
    });

    points_summary.push(points[0]);
    points_summary.push(points[points.length - 1]);

    await insertPoints(fileName, { date, points, points_summary });
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const fileNames = await fs.readdirSync(resolve(__dirname, './gpx'));
  await Promise.all(
    fileNames
      .filter((content) => content.endsWith('.gpx'))
      .map((fileName) => extractPoints(fileName)),
  );
}

main();
