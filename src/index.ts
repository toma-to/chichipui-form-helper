import { inputs } from './inputs';

const sleep = (ms: number) =>
  new Promise<void>((resolv) => setTimeout(resolv, ms));

async function main() {
  const tagInput = [...document.getElementsByClassName('input')].find(
    (val) =>
      val instanceof HTMLInputElement &&
      val.placeholder.startsWith('タグを入力'),
  ) as HTMLInputElement;

  if (tagInput?.parentElement == null) {
    return;
  }

  const tagButton = [...tagInput.parentElement.children].find(
    (val) => val instanceof HTMLButtonElement && val.textContent === '追加',
  ) as HTMLButtonElement;

  for (const tag of inputs.tags) {
    tagInput.focus();
    await sleep(100);
    tagInput.value = tag;
    tagInput.dispatchEvent(new InputEvent('input', { data: tag }));
    await sleep(100);
    tagButton.click();
  }

  const captionText = [...document.getElementsByClassName('textarea')].find(
    (val) =>
      val instanceof HTMLTextAreaElement &&
      val.placeholder.startsWith('キャプション'),
  ) as HTMLTextAreaElement;
  if (captionText != null) {
    captionText.textContent = inputs.caption;
    tagInput.dispatchEvent(new InputEvent('input', { data: inputs.caption }));
  }
}
main();
