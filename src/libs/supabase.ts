/**
 * @file This file describes the tables in the Supabase DB and Supabase Client.
 */

import { createClient } from '@supabase/supabase-js';
import { supabaseAnonKey, supabaseUrl } from './env';

/*----------------------------------
| Profiles Table
----------------------------------*/

/**
 * ### Interface of the Profiles Table
 *
 * @example
 * ```ts
 * id: '627cbb5c-8c85-4bc4-92f5-952353eca321';
 * created_at: '2022-02-07T05:56:07+00:00';
 * updated_at: '2022-02-07T05:56:07+00:00';
 * email: 'jon.ganebski@gmail.com';
 * avatar_url: 'https://avatars.githubusercontent.com/u/62702084?v=4';
 * user_name: 'jonganebski';
 * ```
 */
export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  email?: string;
  avatar_url?: string;
  user_name?: string;
}

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
| Mine Sweeper Records Table
----------------------------------*/

/**
 * ### Interface of the Mine Sweeper Records Table
 *
 * @example
 * ```ts
 * id: 1;
 * created_at: '2022-02-07T05:56:07+00:00';
 * updated_at: '2022-02-07T05:56:07+00:00';
 * user_id: 'ba6546d0-1303-46ee-bddf-77b780542a91'
 * mode_id: 2;
 * score: 20326
 * ```
 */
export interface MineSweeperRecord {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  mode_id: number;
  score: number;
}

/*----------------------------------
| Mine Sweeper Modes Table
----------------------------------*/

/**
 * ### Interface of the Mine Sweeper Modes Table
 *
 * @example
 * ```ts
 * id: 1;
 * created_at: '2022-02-07T05:56:07+00:00';
 * mode: 'intermediate'
 * ```
 */
export interface MineSweeperMode {
  id: number;
  created_at: string;
  mode: 'beginner' | 'intermediate' | 'expert';
}

/*----------------------------------
| Sliding Puzzle Records Table
----------------------------------*/

/**
 * ### Interface of the Sliding Puzzle Records Table
 *
 * @example
 * ```ts
 * id: 1;
 * created_at: '2022-02-07T05:56:07+00:00';
 * updated_at: '2022-02-07T05:56:07+00:00';
 * user_id: 'ba6546d0-1303-46ee-bddf-77b780542a91'
 * score: 200
 * ```
 */
export interface SlidingPuzzleRecord {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  score: number;
}

/*----------------------------------
| Tetris Records Table
----------------------------------*/

/**
 * ### Interface of the Tetris Records Table
 *
 * @example
 * ```ts
 * id: 1;
 * created_at: '2022-02-07T05:56:07+00:00';
 * updated_at: '2022-02-07T05:56:07+00:00';
 * user_id: 'ba6546d0-1303-46ee-bddf-77b780542a91'
 * score: 30234
 * ```
 */
export interface TetrisRecord {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  score: number;
}

/*----------------------------------
| Supabase Client
----------------------------------*/

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
