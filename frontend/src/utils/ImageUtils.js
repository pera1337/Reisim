export function base64StringtoFile(base64String, filename) {
  var arr = base64String.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function canvasReftoFile(canvas, imgSrc) {
  const fileExt = extractImageFileExtensionFromBase64(imgSrc);
  const imageData64 = canvas.toDataURL("image/" + fileExt);
  const myFileName = "profile." + fileExt;
  return base64StringtoFile(imageData64, myFileName);
}

export function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring(
    "data:image/".length,
    base64Data.indexOf(";base64")
  );
}

export function image64toCanvasRef(canvasRef, image64, pixelCrop, ogImage) {
  const canvas = canvasRef;
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = image64;
  const scaleX = ogImage.naturalWidth / ogImage.width;
  const scaleY = ogImage.naturalHeight / ogImage.height;
  image.onload = function() {
    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  };
}
