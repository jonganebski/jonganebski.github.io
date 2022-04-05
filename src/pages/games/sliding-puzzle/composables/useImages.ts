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

  const WORSHIP_ENOUGH_COUNT = 20;

  const backDoor = ref(false);
  const worshipCount = ref(0);
  const worshipRatioReverse = computed(
    () => 100 - Math.min(100, (worshipCount.value / WORSHIP_ENOUGH_COUNT) * 100),
  );

  const images = computed<ImageCategory[]>(() =>
    backDoor.value
      ? [
          {
            categoryName: t('fate_series'),
            options: [
              { label: t('jeanne_alter'), url: `${STORAGE_URL}/jean-alter.jpg` },
              { label: t('rider_5th'), url: `${STORAGE_URL}/rider-5th.jpg` },
            ],
          },
          {
            categoryName: t('eighty_six'),
            options: [{ label: t('vladilena_milize'), url: `${STORAGE_URL}/vladilena-milize.jpg` }],
          },
          {
            categoryName: t('attack_on_titan'),
            options: [
              { label: t('eren_yeager'), url: `${STORAGE_URL}/eren-yeager.jpg` },
              { label: t('sasha_braus'), url: `${STORAGE_URL}/sasha-braus.jpg` },
            ],
          },
          {
            categoryName: t('evangelion'),
            options: [
              { label: t('asuka_langley_sohryu'), url: `${STORAGE_URL}/asuka-langley-soryu.jpg` },
              { label: t('rei_ayanami'), url: `${STORAGE_URL}/rei-ayanami.png` },
            ],
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
              {
                label: 'Inés Álvarez Fdez',
                url: `${STORAGE_URL}/wave.jpg`,
                provider: {
                  name: 'Unsplash',
                  url: `https://unsplash.com/s/photos/ocean?${UNSPLASH_QUERY}`,
                },
                creator: {
                  name: 'Inés Álvarez Fdez',
                  url: `https://unsplash.com/@powwpic?${UNSPLASH_QUERY}`,
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
              {
                label: 'Michael Sum',
                url: `${STORAGE_URL}/cat_michael-sum.jpg`,
                provider: {
                  name: 'Unsplash',
                  url: `https://unsplash.com/s/photos/cat?${UNSPLASH_QUERY}`,
                },
                creator: {
                  name: 'Michael Sum',
                  url: `https://unsplash.com/@michaelsum1228?${UNSPLASH_QUERY}`,
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
    if (backDoor.value) return;
    worshipCount.value += 1;
    clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(() => (worshipCount.value = 0), 200);
    if (worshipCount.value !== WORSHIP_ENOUGH_COUNT) return;
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

  return { worshipRatioReverse, selectedImageUrl, images, findImageByUrl, worship };
}
