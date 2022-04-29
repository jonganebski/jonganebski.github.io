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
        { value: '🐛', name: '🐛 - 버그를 고쳤어요.' },
        { value: '⚡', name: '⚡ - 성능을 개선했어요' },
        { value: '♻️', name: '♻️ - 리팩토링을 했어요.' },
        { value: '🧪', name: '🧪 - 테스를 추가하거나 수정했어요.' },
        { value: '🌀', name: '🌀 - CI/CD 설정을 추가하거나 수정했어요.' },
        { value: '📝', name: '📝 - 문서가 변경됐어요.' },
        { value: '🚀', name: '🚀 - 빌드 시스템이나 npm 배포 관련 수정사항이 있어요.' },
        { value: '🍺', name: '🍺 - 잡일' },
      ],
      message: '골라',
    });

    console.log('Choice: ', emoji);

    process.exit(1);

    // writeFileSync(x, `${emoji} ${title}`);
  } catch (error) {}
}

main().catch(() => {
  console.log('Catch');
});
