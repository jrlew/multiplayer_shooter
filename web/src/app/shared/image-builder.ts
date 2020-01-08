export class ImageBuilder {
  public static async buildImage(src: string): Promise<HTMLImageElement> {
    const image: HTMLImageElement = new Image();
    await this.waitForImageLoad(image, `assets/images/${src}`);
    return image;
  }

  private static async waitForImageLoad(image: HTMLImageElement, src: string) {
    image.src = src;
    return new Promise((res, rej) => {
      try {
        image.onload = () => {
          res();
        };
      } catch (err) {
        console.log(err);
        // TODO: create a ResourceFailedToLoad error and reject this promise with that
        rej('Unable to load Image');
      }
    });
  }
}
