import { computeRandInt } from '~/libs/random';
import { useMyI18n } from '~/plugins/i18n';

export interface ImageOption {
  label: string;
  url: string;
  provider?: { name: string; url?: string };
  creator?: { name: string; url?: string };
}

export interface ImageCategory {
  categoryName: string;
  options: ImageOption[];
}

const STORAGE_URL =
  'https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/sliding-puzzle-images';

const UNSPLASH_QUERY = 'utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText';

export function useImages() {
  const { t } = useMyI18n();

  const backDoor = ref(false);
  const worshipCount = ref(0);

  const images = computed<ImageCategory[]>(() =>
    backDoor.value
      ? [
          {
            categoryName: t('fate_series'),
            options: [
              { label: t('jean_alter'), url: `${STORAGE_URL}/jean-alter.jpg` },
              { label: t('rider_5th'), url: `${STORAGE_URL}/rider-5th.jpg` },
            ],
          },
          {
            categoryName: t('eighty_six'),
            options: [{ label: t('vladilena_milize'), url: `${STORAGE_URL}/vladilena-milize.jpg` }],
          },
          {
            categoryName: t('attack_on_titan'),
            options: [{ label: t('eren_yeager'), url: `${STORAGE_URL}/eren-yeager.jpg` }],
          },
        ]
      : [
          {
            categoryName: t('nature'),
            options: [
              {
                label: 'Kamran Ch',
                url: `${STORAGE_URL}/mountain.jpg`,
                provider: {
                  name: 'Unsplash',
                  url: `https://unsplash.com/t/act-for-nature?${UNSPLASH_QUERY}`,
                },
                creator: {
                  name: 'Kamran Ch',
                  url: `https://unsplash.com/@kamranch?${UNSPLASH_QUERY}`,
                },
              },
              {
                label: 'David Scanlon',
                url: `${STORAGE_URL}/gorilla.jpg`,
                provider: {
                  name: 'Unsplash',
                  url: `https://unsplash.com/t/nature?${UNSPLASH_QUERY}`,
                },
                creator: {
                  name: 'David Scanlon',
                  url: `https://unsplash.com/@dsartwork?${UNSPLASH_QUERY}`,
                },
              },
            ],
          },
          {
            categoryName: t('cat', 2),
            options: [
              {
                label: 'Pacto Visual',
                url: `${STORAGE_URL}/cat_pacto-visual.jpg`,
                provider: {
                  name: 'Unsplash',
                  url: `https://unsplash.com/s/photos/cat?${UNSPLASH_QUERY}`,
                },
                creator: {
                  name: 'Pacto Visual',
                  url: `https://unsplash.com/@pactovisual?${UNSPLASH_QUERY}`,
                },
              },
              {
                label: 'Georgi Benev',
                url: `${STORAGE_URL}/cat_georgi-benev.jpg`,
                provider: {
                  name: 'Unsplash',
                  url: `https://unsplash.com/s/photos/cat-box?${UNSPLASH_QUERY}`,
                },
                creator: {
                  name: 'georgi benev',
                  url: `https://unsplash.com/@georgibenev97?${UNSPLASH_QUERY}`,
                },
              },
            ],
          },
        ],
  );

  const selectedImageUrl = ref<string>(getRandomImage());

  function getRandomImage() {
    const categoryIdx = computeRandInt(0, images.value.length - 1);
    const optionIdx = computeRandInt(0, images.value[categoryIdx].options.length - 1);
    return images.value[categoryIdx].options[optionIdx].url;
  }

  let setTimeoutId: NodeJS.Timeout;

  function worship() {
    worshipCount.value += 1;
    clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(() => (worshipCount.value = 0), 200);
    if (worshipCount.value !== 10) return;
    backDoor.value = !backDoor.value;
    selectedImageUrl.value = getRandomImage();
  }

  function findImageByUrl(url: string) {
    for (let i = 0; i < images.value.length; i++) {
      for (let j = 0; j < images.value[i].options.length; j++) {
        if (images.value[i].options[j].url !== url) continue;
        return images.value[i].options[j];
      }
    }
  }

  return { selectedImageUrl, images, findImageByUrl, worship };
}
