import chalk from 'chalk';
import fs from 'fs-extra';
import objectPath from 'object-path';
import path from 'path';
import VueI18NExtract from 'vue-i18n-extract';

type TMessages = { [key: string]: string | TMessages };

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

function handleUnusedKey(messages: TMessages, path: string) {
  objectPath.del(messages, path);
}

function handleMissingKey(messages: TMessages, path: string) {
  objectPath.set(messages, path, '__missing__');
}

async function main() {
  console.log('\n--------------------- Extract i18n ---------------------\n');

  const enUSFilePath = path.resolve(__dirname, `../locales/en.json`);
  const viVNFilePath = path.resolve(__dirname, `../locales/ko.json`);

  const enUSMessages = await fs.readJson(enUSFilePath);
  const viVNMessages = await fs.readJson(viVNFilePath);

  const { missingKeys, unusedKeys } = await VueI18NExtract.createI18NReport({
    languageFiles: path.resolve(__dirname, `../locales/*.json`),
    vueFiles: path.resolve(__dirname, `../src/**/*.?(ts|vue)`),
  });

  missingKeys.forEach((key) => {
    switch (key.language) {
      case 'en':
        handleMissingKey(enUSMessages, key.path);
        break;
      case 'ko':
        handleMissingKey(viVNMessages, key.path);
        break;
    }
  });

  unusedKeys.forEach((key) => {
    switch (key.language) {
      case 'en':
        handleUnusedKey(enUSMessages, key.path);
        break;
      case 'ko':
        handleUnusedKey(viVNMessages, key.path);
        break;
    }
  });
  const sortedEnUS = sortMessages(enUSMessages);
  const sortedViVN = sortMessages(viVNMessages);

  try {
    await fs.writeJson(enUSFilePath, sortedEnUS);

    await fs.writeJson(viVNFilePath, sortedViVN);

    console.log(chalk.green('I18n extraction completed!'));
  } catch (err) {
    console.log(chalk.bgRed(`Failed with following error `));
    console.error(err);
  } finally {
    console.log('\n--------------------------------------------------------');
  }
}

main();
