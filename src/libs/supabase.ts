/**
 * @file This file describes the tables in the Supabase DB and Supabase Client.
 */

import { createClient } from '@supabase/supabase-js';
import { supabaseAnonKey, supabaseUrl } from './env';

/*----------------------------------
| Points Table
----------------------------------*/

/**
 * ### Interface of the Points Table
 *
 * @property points_summary: A short version of the points column.
 *
 * @example
 * ```ts
 * id: 1;
 * created_at: '2022-02-07T05:56:07+00:00';
 * date: '2018-05-11';
 * points_summary: Point__point[];
 * points: Point__point[];
 * ```
 */
export interface Point {
  id: number;
  created_at: string;
  date: string;
  points_summary: Point__point[];
  points: Point__point[];
}

/**
 * ### Interface of the column points & points_summary
 *
 * This is originated from the GPX file data.
 *
 * @example
 * ```ts
 * lat: 46.3743066508;
 * lon: 96.2513661291;
 * ele: 2196.75;
 * time:"2018-06-16T01:57:21.000Z";
 * ```
 */
export interface Point__point {
  lat: number;
  lon: number;
  ele: number;
  time: string;
}

/*----------------------------------
| Supabase Client
----------------------------------*/

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
