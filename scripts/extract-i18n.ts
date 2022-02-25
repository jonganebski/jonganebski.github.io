/**
 * @file This file extracts i18n and handle locale json file automatically.
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import objectPath from 'object-path';
import path from 'path';
import VueI18NExtract from 'vue-i18n-extract';

/*----------------------------------
| Types
----------------------------------*/

/**
 * ### Type of Locale Json File
 *
 * @example
 * ```json
 * {
 *  "nav": { "home": "Home", "routes": "Routes", "techs": "Techs" },
 *  "altitude": "Altitude",
 *  "click": "Click",
 * }
 * ```
 */
type TMessages = { [key: string]: string | TMessages };

/*----------------------------------
| Helper Functions
----------------------------------*/

/**
 * ### Sort Messages
 *
 * This function sorts i18n keys in alphanumeric order.
 * This is a recursive function.
 *
 * @param messages The messages object.
 * @returns Sorted messages object.
 */
function sortMessages(messages: TMessages) {
  const newMessages: TMessages = {};
  const keys = [];
  for (const key in messages) {
    const value = messages[key];
    switch (typeof value) {
      case 'object':
        newMessages[key] = sortMessages(value);
        break;
      case 'string':
        keys.push(key);
        break;
    }
  }
  const sortedKeys = keys.slice().sort((a, b) => a.localeCompare(b));

  sortedKeys.forEach((key) => {
    newMessages[key] = messages[key];
  });

  return newMessages;
}

/*----------------------------------
| Main function
----------------------------------*/

async function main() {
  console.log('\n--------------------- Extract i18n ---------------------\n');

  // Path to the locale json file.
  const enFilePath = path.resolve(__dirname, `../locales/en.json`);
  const koFilePath = path.resolve(__dirname, `../locales/ko.json`);

  // Message Object of the locale json file.
  const enMessages = await fs.readJson(enFilePath);
  const koMessages = await fs.readJson(koFilePath);

  // Run vue-i18n-extract and get the keys of the missing/unused i18n.
  const { missingKeys, unusedKeys } = await VueI18NExtract.createI18NReport({
    languageFiles: path.resolve(__dirname, `../locales/*.json`),
    vueFiles: path.resolve(__dirname, `../src/**/*.?(ts|vue)`),
  });

  // Add the missing i18n key with set value as '__missing__'.
  missingKeys.forEach((key) => {
    switch (key.language) {
      case 'en':
        objectPath.set(enMessages, key.path, '__missing__');
        break;
      case 'ko':
        objectPath.set(koMessages, key.path, '__missing__');
        break;
    }
  });

  // Delete the unused i18n key and value.
  unusedKeys.forEach((key) => {
    switch (key.language) {
      case 'en':
        objectPath.del(enMessages, key.path);
        break;
      case 'ko':
        objectPath.del(koMessages, key.path);
        break;
    }
  });

  // Sort locale json files.
  const sortedEn = sortMessages(enMessages);
  const sortedKo = sortMessages(koMessages);

  try {
    // Write locale json files
    await fs.writeJson(enFilePath, sortedEn);
    await fs.writeJson(koFilePath, sortedKo);

    console.log(chalk.green('I18n extraction completed!'));
  } catch (err) {
    // Log error
    console.log(chalk.bgRed(`Failed with following error `));
    console.error(err);
  } finally {
    console.log('\n--------------------------------------------------------');
  }
}

main();
