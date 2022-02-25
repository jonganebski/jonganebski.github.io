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

async function main() {
  console.log('\n--------------------- Extract i18n ---------------------\n');

  const enFilePath = path.resolve(__dirname, `../locales/en.json`);
  const koFilePath = path.resolve(__dirname, `../locales/ko.json`);

  const enMessages = await fs.readJson(enFilePath);
  const koMessages = await fs.readJson(koFilePath);

  const { missingKeys, unusedKeys } = await VueI18NExtract.createI18NReport({
    languageFiles: path.resolve(__dirname, `../locales/*.json`),
    vueFiles: path.resolve(__dirname, `../src/**/*.?(ts|vue)`),
  });

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
  const sortedEn = sortMessages(enMessages);
  const sortedKo = sortMessages(koMessages);

  try {
    await fs.writeJson(enFilePath, sortedEn);
    await fs.writeJson(koFilePath, sortedKo);

    console.log(chalk.green('I18n extraction completed!'));
  } catch (err) {
    console.log(chalk.bgRed(`Failed with following error `));
    console.error(err);
  } finally {
    console.log('\n--------------------------------------------------------');
  }
}

main();
