import { readFileSync, writeFileSync } from 'fs-extra';
import { prompt } from 'inquirer';

enum INQUIRY_NAME {
  description = 'description',
  confirm = 'confirm',
  emoji = 'emoji',
  scope = 'scope',
  title = 'title',
}

interface Inquiry {
  [INQUIRY_NAME.description]: string;
  [INQUIRY_NAME.confirm]: boolean;
  [INQUIRY_NAME.emoji]: string;
  [INQUIRY_NAME.scope]: string;
  [INQUIRY_NAME.title]: string;
}

async function main() {
  try {
    const x = process.argv.slice(2)[0];

    const title = readFileSync(x).toString();

    console.log('title: ', title);

    console.log('토스 커밋');

    const inquiry = await prompt<Inquiry>([
      {
        message: '커밋 타입이 뭔가요:',
        name: INQUIRY_NAME.emoji,
        type: 'list',
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
      },
      {
        message: '커밋 스코프가 뭔가요:',
        name: INQUIRY_NAME.scope,
        type: 'input',
        default: process.cwd().split('/').reverse()[0],
      },
      {
        message: '커밋 제목이 뭔가요:',
        name: INQUIRY_NAME.title,
        type: 'input',
        default: title.split('\n')[0],
        validate: (val) => {
          if (val.length === 0) {
            console.log('\n제목은 필수 사항이에요.');
            return false;
          }
          return true;
        },
      },
      {
        message: '추가적인 설명이 필요한가요:',
        name: INQUIRY_NAME.description,
        type: 'input',
      },
      {
        message: (inquiry) => `커밋은 이렇게 생겼어요.

${formatCommit(inquiry)}

콜인가요?`,
        name: INQUIRY_NAME.confirm,
        type: 'confirm',
      },
    ]);

    console.log(process.cwd().split('/').reverse()[0]);

    if (!inquiry.confirm) process.exit(1);

    writeFileSync(x, formatCommit(inquiry));
  } catch (error) {
    console.error(error);
  }
}

function formatCommit({ emoji, scope, title, description }: Inquiry) {
  return `${emoji}(${scope}) ${title}${description ? `\n\n${description}` : ''}`;
}

main();
