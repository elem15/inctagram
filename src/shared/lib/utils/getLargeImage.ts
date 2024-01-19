export const getLargeImage = (item: PostDataItem) => {
  let img

  if (item.images.length) {
    img = item.images.find(i => i.width === 1440)
  }

  if (!img) {
    img = item.images[0]
  }

  return {
    id: item.id,
    description: item.description,
    url: img ? img.url : '',
    width: img ? img.width : 640,
    height: img ? img.height : 360,
  }
}
