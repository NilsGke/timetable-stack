import * as htmlToImage from "html-to-image";

const width = 1920;
const height = 1080;

export type Format = Extract<
  keyof typeof htmlToImage,
  "toSvg" | "toJpeg" | "toPng"
>;

export const formatMap = {
  JPEG: "toJpeg",
  PNG: "toPng",
  SVG: "toSvg",
} as const satisfies Record<string, Format>;

export const generateScreenshot = async (elm: HTMLElement, format: Format) => {
  elm.style.width = width + "px";
  elm.style.height = height + "px";
  htmlToImage.toJpeg;

  const fn = htmlToImage[format];

  const image = await fn(elm, {
    height,
    width,
    canvasHeight: height * 2,
    canvasWidth: width * 2,
  });

  elm.style.height = "100%";
  elm.style.width = "100%";

  return image;
};

export const downloadScreenshot = async (dataURL: string) => {
  var link = document.createElement("a");
  link.download = "timetable";
  link.href = dataURL;
  link.click();
};

export function openImageInNewTab(dataUrl: string) {
  const byteString = atob(dataUrl.split(",")[1]);
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, "_blank");
}
