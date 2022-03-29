import { randArrayElements } from '~/libs/random';
import { useMyI18n } from '~/plugins/i18n';

interface ImageCategory {
  categoryName: string;
  options: {
    label: string;
    value: string;
    provider?: { name: string; url?: string };
    creator?: { name: string; url?: string };
  }[];
}

export function useImages() {
  const { t } = useMyI18n();

  const backDoor = ref(false);

  const images = computed<ImageCategory[]>(() =>
    backDoor.value
      ? [
          {
            categoryName: t('fate_series'),
            options: [
              {
                label: t('jean_alter'),
                value:
                  'https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/sliding-puzzle-images/jean-alter.jpg',
              },
              { label: '', value: '' },
            ],
          },
          {
            categoryName: t('eighty_six'),
            options: [
              {
                label: t('vladilena_milize'),
                value:
                  'https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/sliding-puzzle-images/vladilena-milize.jpg',
              },
            ],
          },
          {
            categoryName: t('attack_on_titan'),
            options: [
              {
                label: t('eren_yeager'),
                value:
                  'https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/sliding-puzzle-images/eren-yeager.jpg',
              },
            ],
          },
        ]
      : [
          {
            categoryName: t('nature'),
            options: [
              {
                label: 'Kamran Ch',
                value:
                  'https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/sliding-puzzle-images/mountain.jpg',
                provider: {
                  name: 'Unsplash',
                  url: 'https://unsplash.com/t/act-for-nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
                },
                creator: {
                  name: 'Kamran Ch',
                  url: 'https://unsplash.com/@kamranch?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
                },
              },
              {
                label: 'David Scanlon',
                value:
                  'https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/sliding-puzzle-images/gorilla.jpg',
                provider: {
                  name: 'Unsplash',
                  url: 'https://unsplash.com/t/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
                },
                creator: {
                  name: 'David Scanlon',
                  url: 'https://unsplash.com/@dsartwork?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
                },
              },
            ],
          },
          {
            categoryName: t('cats'),
            options: [
              {
                label: 'Pacto Visual',
                value:
                  'https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/sliding-puzzle-images/cat_pacto-visual.jpg',
                provider: {
                  name: 'Unsplash',
                  url: 'https://unsplash.com/s/photos/cat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
                },
                creator: {
                  name: 'Pacto Visual',
                  url: 'https://unsplash.com/@pactovisual?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
                },
              },
              {
                label: 'Georgi Benev',
                value:
                  'https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/sliding-puzzle-images/cat_georgi-benev.jpg',
                provider: {
                  name: 'Unsplash',
                  url: 'https://unsplash.com/s/photos/cat-box?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
                },
                creator: {
                  name: 'georgi benev',
                  url: 'https://unsplash.com/@georgibenev97?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
                },
              },
            ],
          },
        ],
  );
  // Photo by <a href="https://unsplash.com/@georgibenev97?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">georgi benev</a> on <a href="https://unsplash.com/s/photos/cat-box?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

  const selectedImage = ref(getRandomImage());

  function getRandomImage() {
    return randArrayElements(1, randArrayElements(1, images.value)[0].options)[0];
  }

  function openBackDoor() {
    backDoor.value = true;
    selectedImage.value = getRandomImage();
  }

  return { selectedImage, images, openBackDoor };
}
