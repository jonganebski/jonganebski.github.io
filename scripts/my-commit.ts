import { readFileSync, writeFileSync } from 'fs-extra';
import { prompt } from 'inquirer';

async function main() {
  try {
    const x = process.argv.slice(2)[0];

    console.log('x: ', x);

    const title = readFileSync(x).toString();

    console.log('title: ', title);

    console.log('토스 커밋');

    const { emoji } = await prompt({
      type: 'list',
      name: 'emoji',
      choices: [
        { value: '✨', name: '✨ - 새로운 기능이 추가됐어요.' },
        { value: ':recycle:', name: '♻️ - 리팩토링을 했어요.' },
        { value: '♻️', name: '♻️ - 리팩토링을 했어요.' },
        { value: '♻️', name: '♻️ - 리팩토링을 했어요.' },
        { value: '♻️', name: '♻️ - 리팩토링을 했어요.' },
      ],
      message: '골라',
    });

    console.log('Choice: ', emoji);

    writeFileSync(x, `${emoji} ${title}`);
    // process.exit(1);
  } catch (error) {}
}

main().catch(() => {
  console.log('Catch');
});
