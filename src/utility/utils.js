export const extractUrlAndId = (cloudURL) => {
  const lastSlashIndex = cloudURL.lastIndexOf("/")
  const url = cloudURL.substring(0, lastSlashIndex)
  const id = cloudURL.substring(lastSlashIndex+1)
  return {url, id}
}

export const clearHTML = (html) => {
  return new DOMParser().parseFromString(html, "text/html").body.textContent
}