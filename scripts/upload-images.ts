/**
 * @file This file uploads local image files used in route post to the Cloudflare. The markdown post will be changed.
 * @param filename
 * @example
 * ```
 * // Execute this file with command like below.
 *
 * $ pnpm upload:images -- 2022-01-01~2022-02-02.md
 * ```
 */

import dotenv from 'dotenv';
import { readFile, createReadStream, writeFile } from 'fs-extra';
import { resolve } from 'path';
import axios from 'axios';
import FormData from 'form-data';
import chalk from 'chalk';

dotenv.config();

interface CloudFlareResponse {
  result: {
    id: string;
    uploadURL: string;
  };
  result_info: null;
  success: boolean;
  errors: [];
  messages: [];
}

const FILENAME = process.argv.slice(2)[0];

const MARKDOWN_PATH = `../src/pages/posts/routes/${FILENAME}`;

const uploadedIds: string[] = [];

/**
 *
 * @param content Full text of the markdown.
 * @returns
 * ```
 * // Example
 * {
 *      mdImgExp: "![image](../../../assets/kyrgyzstan_DSCF9516.jpg)",
 *      mdImgPath: "../../../assets/kyrgyzstan_DSCF9516.jpg",
 * }
 * ```
 */
function searchImageInMarkdown(content: string, index: number) {
  let mdImgExp = '';

  while (
    !mdImgExp.toLocaleLowerCase().endsWith('jpg)') &&
    !mdImgExp.toLocaleLowerCase().endsWith('jpeg)')
  ) {
    mdImgExp = mdImgExp + content[index];
    ++index;
  }

  const mdImgPath = mdImgExp.split(/[()]/).find((str) => /(jpg|jpeg)$/i.test(str));

  return { mdImgPath, mdImgExp };
}

async function uploadImageToCloudFlare(mdImgPath: string) {
  const stream = await createReadStream(resolve(__dirname, MARKDOWN_PATH, '../', mdImgPath));
  const filename = mdImgPath.split('/').reverse()[0];

  const formData = new FormData();
  formData.append('file', stream, { filename });

  const {
    data: {
      result: { id },
    },
  } = await axios.post<CloudFlareResponse>(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
    },
  );
  uploadedIds.push(id);

  console.log(chalk.green(`${filename} is uploaded successfully.`));

  return { id };
}

async function handleImages(content: string): Promise<string> {
  const startIdx = content.search(/!\[image\].*jpg/i);
  if (startIdx < 0) return content;

  const { mdImgPath, mdImgExp } = searchImageInMarkdown(content, startIdx);
  if (!mdImgPath) throw Error(`Path to a image of ${mdImgExp} not found.`);

  const { id } = await uploadImageToCloudFlare(mdImgPath);

  const replacedContent = await handleImages(
    content.replace(
      mdImgExp,
      `<ui-lazy-image src="https://imagedelivery.net/fOEhHq_KNsIgC-hb-3NU0w/${id}/post" />`,
    ),
  );

  return replacedContent;
}

async function updateContentWithCloudflareImages(content: string) {
  await writeFile(resolve(__dirname, MARKDOWN_PATH), content, { encoding: 'utf-8' });
}

async function deleteImages() {
  await Promise.all(
    uploadedIds.map((id) => {
      console.log(chalk.red(`Deleting image with id ${id}`));
      return axios.delete(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
          },
        },
      );
    }),
  );
}

async function main() {
  console.log('\n---------- Uploading local images to Cloudflare ----------\n');
  if (!FILENAME) throw new Error('Filename is not given.');
  try {
    const content = await readFile(resolve(__dirname, MARKDOWN_PATH), { encoding: 'utf-8' });
    updateContentWithCloudflareImages(await handleImages(content));
  } catch (err) {
    console.error(err);
    await deleteImages();
  } finally {
    console.log('\n----------------------------------------------------------');
  }
}

main();
